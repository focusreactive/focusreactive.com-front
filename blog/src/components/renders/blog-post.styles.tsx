import styled from '@emotion/styled';

export const Article = styled.article`
  overflow: hidden;
`;

type ImageProps = {
  heroImage: string;
};

export const MarkdownBlock = styled.div<ImageProps>`
  margin-bottom: 80px;
  /* overflow: auto; */

  .hero-image {
    width: 100vw;
    height: auto;
    max-width: 100vw;
    position: relative;
    left: 50%;
    transform: translateX(-50vw);
  }
  .post-description {
    font-size: 14px;
    max-width: 540px;
    text-align: center;
    margin: 0 auto;
  }
  h4 {
    text-align: center;
    font-size: 22px;
    line-height: 1.2;
    max-width: 780px;
    margin: 32px auto;
    text-transform: uppercase;
    font-weight: 800;
  }
  h5 {
    text-align: left;
    font-size: 18px;
    max-width: 620px;
    margin: 32px auto 24px;
    font-weight: 800;
  }
  h6 {
    text-align: left;
    font-size: 16px;
    max-width: 620px;
    margin: 32px auto 16px;
    font-weight: 400;
  }
  hr {
    margin: 24px auto 24px;
    border: none;
    text-align: center;
    ::before {
      content: '...';
      letter-spacing: 0.6em;
      font-size: 28px;
    }
  }
  p {
    img {
      left: 50%;
      position: relative;
      transform: translate(-50%);
    }
  }
  span {
    max-width: unset !important;
    .gatsby-resp-image-background-image {
      height: 0px !important;
      padding-bottom: 0px !important;
    }
    .gatsby-resp-image-image {
      position: relative;
      box-shadow: #a5a5a5 2px 2px 10px 2px !important;
      margin-bottom: 32px !important;
    }
  }
  img {
    max-width: 100%;
    margin: 32px auto 8px;
  }
  img.full-width {
    width: 80vw;
    max-width: 80vw;
    position: relative;
    left: 50%;
    transform: translateX(-40vw);
  }
  img.inline {
    width: 70px;
  }
  img.small {
    width: 70px;
  }
  img.left-side {
    position: absolute;
    left: -90px;
    top: -20px;
  }
  img.hidden-hero {
    display: none;
  }
  code {
    padding: 0.2em 0.4em;
    margin: 0;
    font-size: 85%;
    border-radius: 3px;
    font-family:
      SFMono-Regular,
      Consolas,
      Liberation Mono,
      Menlo,
      monospace;
  }
  pre {
    padding: 8px;
    font-size: 85%;
    background-color: hsl(0, 0%, 97%);
    border-radius: 3px;
    font-family:
      SFMono-Regular,
      Consolas,
      Liberation Mono,
      Menlo,
      monospace;
    overflow: auto;
    max-width: 620px;
    margin: 26px auto 0;
  }
  a {
    color: #13cf2e;
  }
  table {
    max-width: 620px;
    margin: 26px auto 0;
    th,
    td {
      background-color: #fff;
      border: 1px solid #c6cbd1;
      padding: 2px 10px;
    }
  }
  ul {
    font-size: 16px;
    line-height: 1.72;
    max-width: 620px;
    margin: 26px auto 0;
    list-style-type: inherit;
    padding-left: 2em;
  }
  ol {
    list-style-type: decimal-leading-zero;
    font-size: 14px;
    line-height: 1.72;
    max-width: 650px;
    margin: 26px auto 0;
    padding-left: 2em;
    li {
      margin-bottom: 6px;
      min-height: unset;
    }
  }
  li {
    position: relative;
    p {
      margin: 16px 0;
    }
    img.left-side {
      position: absolute;
    }
    ul {
      padding-left: 20px;
      margin: unset;
      li {
        margin-bottom: 6px;
        min-height: unset;
      }
    }
  }
  blockquote {
    padding: 0 1em;
    color: #6a737d;
    border-left: 0.25em solid #dfe2e5;
    max-width: 620px;
    margin: 26px auto 0;
    p {
      font-size: 16px;
      line-height: 1.72;
    }
  }
`;
