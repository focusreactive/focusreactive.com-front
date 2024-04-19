export const getImageDimensions = (src: string) => {
  if (!src) {
    return { width: 0, height: 0 };
  }

  const match = src.match(/(?<=-)(?<width>\d+)x(?<height>\d+)(?=.)/);

  return { ...match.groups };
};
