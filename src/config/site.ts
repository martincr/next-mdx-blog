import authorAvatar from "../../public/images/author/bearded-man-checkered-shirt-portrait.jpg";
export const siteConfig = {
  name: "Mdx Blog Template",
  description:
    "MDX Blog Template is a simple implementation of a markdown static blog. Built with Next.js and MDX.",
  author: "martin",
  authorImage: authorAvatar,
  social: {
    github: "https://github.com/devbertskie",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
  },
};

export type SiteConfig = typeof siteConfig;
