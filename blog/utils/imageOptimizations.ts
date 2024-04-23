const deviceSizes = [320, 640, 750, 828, 1080, 1200, 1920, 2048, 3840];

export const generateOptimizedSources = (src: string, { width }: { width: number | 'full' }) => {
  const isSanityCDN = /^https:\/\/cdn\.sanity\.io.*/.test(src);
  let optimizedSrcSet;
  let optimizedSrc = src;

  if (!isSanityCDN) {
    return { optimizedSrcSet, optimizedSrc };
  }

  const withoutParams = src.split('?')[0];

  optimizedSrcSet = [];

  if (width === 'full') {
    optimizedSrc = `${withoutParams}?w=1920&auto=format`;

    for (const size of deviceSizes) {
      optimizedSrcSet.push(`${withoutParams}?w=${size}&auto=format ${size}w`);
    }
  } else {
    optimizedSrc = `${withoutParams}?w=${width}&auto=format`;

    for (let i = 1; i <= 4; i++) {
      optimizedSrcSet.push(`${withoutParams}?w=${width * i}&auto=format ${i}x`);
    }
  }

  return { optimizedSrcSet: optimizedSrcSet.join(', '), optimizedSrc };
};

export const getImageDimensions = (src: string) => {
  let width, height;

  if (!src) {
    return { width, height };
  }

  const match = src.match(/(?<=-)(?<width>\d+)x(?<height>\d+)(?=.)/);

  if (!match) {
    return { width, height };
  }

  return { ...match.groups };
};
