let Nunjucks = require("nunjucks");
const ClientObj = require("@sanity/client");
const imageUrlBuilder = require("@sanity/image-url");
const blocksToHtml = require("@sanity/block-content-to-html");
const { EleventyServerlessBundlerPlugin } = require("@11ty/eleventy");
const { buildFileUrl } = require("@sanity/asset-utils");
require("dotenv").config();

const PROJECT_ID = "vftxng62";
const DATASET = "production";

const client = ClientObj.createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: true,
});

const builder = imageUrlBuilder(client);

module.exports = function (eleventyConfig) {
  eleventyConfig.setBrowserSyncConfig({
    files: "./_site/assets/css/**/*.css",
  });

  eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
    name: "serverless", // The serverless function name from your permalink object
    redirects: false,
    copy: ["node_modules"],
  });

  eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
    name: "serverlessLandings", // The serverless function name from your permalink object
    redirects: false,
    copy: ["node_modules"],
  });

  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({ "src/assets/img/favicon.ico": "/" });
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  eleventyConfig.addWatchTarget("src/js");
  eleventyConfig.addWatchTarget("src/sass");

  eleventyConfig.addNunjucksShortcode("sectionClasses", function (block) {
    const sectionConfig = block?.sectionConfig;
    if (!sectionConfig) return "";
    const classes = [];
    const { disableTopPadding, disableBottomPadding } = sectionConfig;
    disableTopPadding && classes.push("pt-0");
    disableBottomPadding && classes.push("pb-0");
    return classes.join(" ");
  });

  let nunjucksEnvironment = new Nunjucks.Environment(new Nunjucks.FileSystemLoader("src/_includes"), {
    autoescape: false,
  });

  nunjucksEnvironment.addFilter("imgURL", function (value) {
    return builder.image(value).auto("format").url();
  });

  nunjucksEnvironment.addFilter("videoURL", (file) => {
    if (!file?.asset?._ref) return "";
    const [assetId, extension] = file.asset._ref.replace("file-", "").split("-");
    return buildFileUrl({ projectId: PROJECT_ID, dataset: DATASET, assetId, extension });
  });

  nunjucksEnvironment.addFilter("blockContent", function (value) {
    return blocksToHtml({
      blocks: value,
    });
  });

  eleventyConfig.setLibrary("njk", nunjucksEnvironment);

  return {
    addPassthroughFileCopy: true,
    markdownTemplateEngine: "njk",
    HTMLTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    templateFormats: ["html", "njk", "md"],
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
    },
  };
};
