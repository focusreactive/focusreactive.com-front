export type SanityApiAuthor = {
  name: string;
  id: string;
  picture: string;
  about: string;
  url: string;
};

export type BlogApiTag = {
  label: string;
  /** Permalink to this tag's page, without the `/tags/` base path. */
  permalink: string;
};

export interface BlogApiRelatedPost {
  title: string;
  permalink: string;
  formattedDate: string;
  authors: string[];
  readingTime: string;
  date: string;
  tags: BlogApiTag[];
}

export interface BlogApiPost {
  title: string;
  permalink: string;
  formattedDate: string;
  authors: string[];
  readingTime: string;
  date: string;
  tags: BlogApiTag[];
}
