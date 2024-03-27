import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const imagePropsReg = /\$\{.*\}/;

const getImageAttr = (str) => {
  const matchStr = str.match(imagePropsReg);
  if (!matchStr || !matchStr[0]) {
    return [];
  }
  return matchStr[0]
    .replace('${', '')
    .replace('}', '')
    .split(',')
    .map((s) => s.trim());
};

const getImageAlt = (str) => str.replace(imagePropsReg, '');

const imageAttr = {
  'full-width': {
    className: 'full-width',
  },
  inline: {
    className: 'inline',
  },
  'left-side': {
    className: 'left-side',
  },
  small: {
    className: 'small',
  },
  centered: {
    wrapper: (element) => <div className={styles.centered}>{element}</div>,
  },
  'hidden-hero': {
    className: 'hidden-hero',
  },
};

const applyAttr = (attrList) => {
  const classList = [];
  const wrappers = [(e) => e];
  attrList.forEach((a) => {
    const modifier = imageAttr[a];
    if (!modifier) return;

    if (modifier.className) {
      classList.push(modifier.className);
    }
    if (modifier.wrapper) {
      wrappers.push(modifier.wrapper);
    }
  });
  return {
    classList,
    wrappers,
  };
};

const generateOptimizedSources = (src: string, { width }: { width: number }) => {
  const isSanityCDN = /^https:\/\/cdn\.sanity\.io.*/.test(src);

  if (!isSanityCDN) {
    return { optimizedSrcSet: src, optimizedSrc: src };
  }

  const hasParams = /.*\?.*/.test(src);

  if (hasParams) {
    return { optimizedSrcSet: src, optimizedSrc: src };
  }

  const optimizedSrc = `${src}?w=${width}&auto=format`;
  const optimizedSrcSet = [];

  for (let i = 1; i <= 4; i++) {
    optimizedSrcSet.push(`${src}?w=${width * i}&auto=format ${i}x`);
  }

  return { optimizedSrcSet: optimizedSrcSet.join(', '), optimizedSrc };
};

const constructElement = ({ src, srcSet, fullSizeSrc, altText, classList, wrappers }) => {
  const element = (
    <a href={fullSizeSrc} target={'_blank'}>
      <img
        className={clsx('image', classList)}
        src={src}
        alt={altText}
        loading="lazy"
        srcSet={srcSet}
      />
    </a>
  );
  const wrappedElement = wrappers.reduce((result, wr) => wr(result), element);
  return wrappedElement;
};

export const Image = ({ src, alt }) => {
  const { optimizedSrc, optimizedSrcSet } = generateOptimizedSources(src, { width: 620 });
  const rowAlt = alt || '';
  const attr = getImageAttr(rowAlt);
  const altText = getImageAlt(rowAlt);
  const modifiers = applyAttr(attr);
  const element = constructElement({
    src: optimizedSrc,
    srcSet: optimizedSrcSet,
    fullSizeSrc: src,
    altText,
    ...modifiers,
  });
  return element;
};

export const Divider = () => {};
