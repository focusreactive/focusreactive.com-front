import { SanityApiAuthor } from '@site/src/types';

const getAuthors = (allAuthors: SanityApiAuthor[], authorIds: string[]) => {
  const selected = authorIds
    .map((authorId) => allAuthors.find((author) => author.id === authorId))
    .filter(Boolean);
  return selected;
};

export default getAuthors;
