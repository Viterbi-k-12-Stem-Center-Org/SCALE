export type LessonPlan = {
  id: string;
  title: string;
  description: string;
  gradeLevel: string;
  subject: string;
  duration: string;
  keywords: string[];
  fileUrl: string;
};

export const LESSON_PLANS_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ50Vq8lrHnU28BiKI9j779DSW8GDgnRSuxYP_h6ECkjqXjGf3guTTUAKsLwVQtzr1zD8vkLOGpQzGQ/pub?gid=0&single=true&output=csv";

type CsvRow = Record<string, string>;

function normalizeKey(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function normalizeValue(value: unknown) {
  return String(value ?? "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function splitKeywords(value: string) {
  return value
    .split(/[;,|]/)
    .map((keyword) => keyword.trim())
    .filter(Boolean);
}

export function parseCsv(text: string): CsvRow[] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = "";
  let inQuotes = false;

  const pushCell = () => {
    currentRow.push(currentCell);
    currentCell = "";
  };

  const pushRow = () => {
    rows.push(currentRow);
    currentRow = [];
  };

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        currentCell += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      pushCell();
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") {
        index += 1;
      }

      if (currentCell.length > 0 || currentRow.length > 0) {
        pushCell();
        pushRow();
      }
      continue;
    }

    currentCell += char;
  }

  if (currentCell.length > 0 || currentRow.length > 0) {
    pushCell();
    pushRow();
  }

  const [headerRow, ...dataRows] = rows.filter((row) => row.some((cell) => cell.trim()));
  if (!headerRow) return [];

  const headers = headerRow.map((header) => normalizeKey(header));

  return dataRows.map((row) => {
    const record: CsvRow = {};
    headers.forEach((header, index) => {
      record[header] = row[index] ?? "";
    });
    return record;
  });
}

function pickValue(row: CsvRow, keys: string[]) {
  for (const key of keys) {
    const normalizedKey = normalizeKey(key);
    if (row[normalizedKey]) {
      return row[normalizedKey];
    }
  }

  return "";
}

export function rowsToLessonPlans(rows: CsvRow[]): LessonPlan[] {
  return rows.map((row, index) => {
    const title = normalizeValue(
      pickValue(row, ["title", "lesson title", "lesson"])
    );
    const description = normalizeValue(
      pickValue(row, ["description", "summary", "overview"])
    );
    const gradeLevel = normalizeValue(
      pickValue(row, ["gradeLevel", "grade level", "grade"])
    );
    const subject = normalizeValue(
      pickValue(row, ["subject", "discipline", "topic"])
    );
    const duration = normalizeValue(
      pickValue(row, ["duration", "time", "lesson duration"])
    );
    const keywords = splitKeywords(
      normalizeValue(pickValue(row, ["keywords", "keyword", "tags"]))
    );
    const fileUrl = normalizeValue(
      pickValue(row, ["fileUrl", "file url", "url", "link", "drive link"])
    );
    const id =
      normalizeValue(pickValue(row, ["id", "identifier", "slug"])) ||
      `${normalizeKey(title) || "lesson"}-${index + 1}`;

    return {
      id,
      title,
      description,
      gradeLevel,
      subject,
      duration,
      keywords,
      fileUrl
    };
  }).filter((lesson) => lesson.title || lesson.description);
}

export function normalizeText(value: unknown) {
  return String(value ?? "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function parseMultiValueField(value: unknown) {
  return normalizeText(value)
    .split(/[;,|/]/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function parseGradeToken(token: string) {
  const normalized = normalizeText(token).replace(/^grade\s+/, "");
  if (!normalized) return null;
  if (normalized === "k" || normalized === "kindergarten") return 0;
  if (/^\d+$/.test(normalized)) return Number(normalized);
  return null;
}

export function parseGradeRange(value: unknown) {
  const tokens = parseMultiValueField(value);
  const grades = new Set<number>();

  for (const token of tokens) {
    const normalized = token.replace(/^grade\s+/, "").replace(/[–—]/g, "-");
    const rangeMatch = normalized.match(/^(k|\d+)\s*-\s*(k|\d+)$/);

    if (rangeMatch) {
      const start = parseGradeToken(rangeMatch[1]);
      const end = parseGradeToken(rangeMatch[2]);

      if (start === null || end === null) continue;

      const from = Math.min(start, end);
      const to = Math.max(start, end);

      for (let grade = from; grade <= to; grade += 1) {
        grades.add(grade);
      }
      continue;
    }

    const grade = parseGradeToken(normalized);
    if (grade !== null) {
      grades.add(grade);
    }
  }

  return Array.from(grades).sort((a, b) => a - b);
}

export function normalizeGradeLevels(value: unknown) {
  return parseGradeRange(value).map((grade) => (grade === 0 ? "K" : String(grade)));
}

export function normalizeSubjects(value: unknown) {
  return Array.from(
    new Set(
      normalizeText(value)
        .split(/[;,|/]/)
        .map((part) => part.trim())
        .filter(Boolean)
    )
  ).sort((a, b) => a.localeCompare(b));
}

type DurationRange = {
  min: number | null;
  max: number | null;
};

function parseNumber(value: string) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export function parseDurationToMinutes(value: unknown): DurationRange {
  const text = normalizeText(value);
  if (!text) return { min: null, max: null };

  const underMatch = text.match(/^under\s+(\d+(?:\.\d+)?)\s*(?:minutes?|mins?|min|hours?|hrs?|hr)?$/);
  if (underMatch) {
    const amount = parseNumber(underMatch[1]);
    if (amount === null) return { min: null, max: null };
    return { min: null, max: Math.max(0, amount - 0.01) };
  }

  const plusMatch = text.match(/^(\d+(?:\.\d+)?)\s*\+\s*(?:minutes?|mins?|min|hours?|hrs?|hr)?$/);
  if (plusMatch) {
    const amount = parseNumber(plusMatch[1]);
    if (amount === null) return { min: null, max: null };
    return { min: amount, max: null };
  }

  const rangeMatch = text.match(
    /^(\d+(?:\.\d+)?)\s*[-–]\s*(\d+(?:\.\d+)?)\s*(minutes?|mins?|min|hours?|hrs?|hr)?$/
  );
  if (rangeMatch) {
    const start = parseNumber(rangeMatch[1]);
    const end = parseNumber(rangeMatch[2]);
    if (start === null || end === null) return { min: null, max: null };
    const unit = rangeMatch[3] ?? "minutes";
    const multiplier = unit.startsWith("hour") || unit.startsWith("hr") ? 60 : 1;
    return {
      min: Math.min(start, end) * multiplier,
      max: Math.max(start, end) * multiplier
    };
  }

  const hoursMinutesMatch = text.match(
    /^(?:(\d+(?:\.\d+)?)\s*(?:hours?|hrs?|hr))?\s*(?:(\d+(?:\.\d+)?)\s*(?:minutes?|mins?|min))?$/
  );
  if (hoursMinutesMatch && (hoursMinutesMatch[1] || hoursMinutesMatch[2])) {
    const hours = hoursMinutesMatch[1] ? parseNumber(hoursMinutesMatch[1]) : 0;
    const minutes = hoursMinutesMatch[2] ? parseNumber(hoursMinutesMatch[2]) : 0;
    if (hours === null || minutes === null) return { min: null, max: null };
    const total = hours * 60 + minutes;
    return { min: total, max: total };
  }

  const exactWithUnit = text.match(
    /^(\d+(?:\.\d+)?)\s*(minutes?|mins?|min|hours?|hrs?|hr)$/
  );
  if (exactWithUnit) {
    const amount = parseNumber(exactWithUnit[1]);
    if (amount === null) return { min: null, max: null };
    const unit = exactWithUnit[2];
    const minutes = unit.startsWith("hour") || unit.startsWith("hr") ? amount * 60 : amount;
    return { min: minutes, max: minutes };
  }

  return { min: null, max: null };
}

export function parseDurationMinutes(value: unknown) {
  return parseDurationToMinutes(value).min;
}

export function getDurationBucketOptions() {
  return ["30+ minutes", "45+ minutes", "60+ minutes", "90+ minutes"];
}

function bucketToMinutes(value: unknown) {
  const normalized = normalizeText(value);
  const match = normalized.match(/^(\d+(?:\.\d+)?)\s*\+/);
  if (!match) return null;
  const parsed = Number.parseFloat(match[1]);
  return Number.isFinite(parsed) ? parsed : null;
}

export function lessonMatchesDuration(lessonDuration: unknown, selectedBucket: unknown) {
  const bucket = bucketToMinutes(selectedBucket);
  if (bucket === null) return true;

  const lesson = parseDurationMinutes(lessonDuration);
  if (lesson === null) return false;

  return lesson >= bucket;
}

export function durationMatchesRange(selected: unknown, lessonValue: unknown) {
  return lessonMatchesDuration(lessonValue, selected);
}
