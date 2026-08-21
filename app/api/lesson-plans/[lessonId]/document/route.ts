import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { AUTH_COOKIE_NAME, verifySessionToken } from "@/lib/auth";
import {
  LESSON_PLANS_CSV_URL,
  buildLessonPlanDocumentExportUrl,
  getLessonPlanById,
  parseCsv,
  rowsToLessonPlans
} from "@/data/lessonPlans";

export const runtime = "nodejs";

async function loadLessonPlan(lessonId: string) {
  const response = await fetch(LESSON_PLANS_CSV_URL, {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Failed to load lesson plans: ${response.status}`);
  }

  const csvText = await response.text();
  const lessons = rowsToLessonPlans(parseCsv(csvText));
  return getLessonPlanById(lessons, lessonId);
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  const { lessonId } = await params;
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  const session = await verifySessionToken(sessionToken, process.env.SESSION_SECRET ?? "");

  if (!session || session.active === false) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let lesson = null;

  try {
    lesson = await loadLessonPlan(lessonId);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to load the requested lesson plan."
      },
      { status: 502 }
    );
  }

  if (!lesson) {
    return NextResponse.json({ error: "Lesson plan not found." }, { status: 404 });
  }

  if (!lesson.fileUrl) {
    return NextResponse.json({ error: "Lesson plan document is unavailable." }, { status: 404 });
  }

  const exportUrl = buildLessonPlanDocumentExportUrl(lesson.fileUrl);
  if (!exportUrl) {
    return NextResponse.json({ error: "Unable to resolve the lesson document." }, { status: 404 });
  }

  try {
    const upstream = await fetch(exportUrl, {
      cache: "no-store"
    });

    if (!upstream.ok || !upstream.body) {
      return NextResponse.json(
        { error: `Failed to retrieve lesson document: ${upstream.status}` },
        { status: 502 }
      );
    }

    const contentType = upstream.headers.get("content-type") || "application/pdf";
    const disposition = new URL(_request.url).searchParams.get("download") === "1"
      ? "attachment"
      : "inline";
    const filename = `${lesson.title || "lesson-plan"}.pdf`
      .replace(/[\\/:"*?<>|]+/g, "-")
      .replace(/\s+/g, " ")
      .trim();

    const buffer = Buffer.from(await upstream.arrayBuffer());

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `${disposition}; filename="${filename}"`,
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff"
      }
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to retrieve the lesson document right now."
      },
      { status: 502 }
    );
  }
}
