export const SITE_CONFIG = {
  REPOSITORY_URL: "https://github.com/zakiego/baku-hantam",
  CREATE_ISSUE: (title: string) =>
    `https://github.com/zakiego/baku-hantam/issues/new?title=${title}&labels=feedback`,
  FORM: "https://baku-hantam.vercel.app/form",
} as const;
