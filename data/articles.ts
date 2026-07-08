export type ArticleItem = {
  title: string;
  description: string;
  tag: string;
  link: string;
};

export const articles: ArticleItem[] = [
  {
    title: "Building Capacity for Teaching Engineering in K-12 Education",
    description:
      "A brief overview of advancing engineering education in Kâ€“12 STEM learning.",
    tag: "Book",
    link: "https://www.nationalacademies.org/projects/NAE-NAE-15-01/publication/25612"
  },
  {
    title: "Early AI Literacy in Culturally Responsive STEM Outreach for Black Youth",
    description:
      "Insights into equitable STEM outreach, AI education, and youth engagement.",
    tag: "Journal Article",
    link: "https://arxiv.org/pdf/2605.12355"
  },
  {
    title: "A USC Blueprint for Expanding the College Pipeline",
    description:
      "A look at educational equity, access, and college pathway development.",
    tag: "Magazine Article",
    link: "https://socialjustice.usc.edu/wp-content/uploads/2020/08/USC-Blueprint-for-Expanding-the-College-Pipeline-Report.pdf"
  }
];
