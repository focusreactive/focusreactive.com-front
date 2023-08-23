let Nunjucks = require("nunjucks");
const ClientObj = require("@sanity/client");
const imageUrlBuilder = require("@sanity/image-url");
const blocksToHtml = require("@sanity/block-content-to-html");
const { EleventyServerlessBundlerPlugin } = require("@11ty/eleventy");
const esbuild = require("esbuild");
require("dotenv").config();

const client = ClientObj.createClient({
  projectId: "vftxng62",
  dataset: "production",
  token: process.env.SANITY_API_TOKEN,
  useCdn: true,
});

const builder = imageUrlBuilder(client);

module.exports = function (eleventyConfig) {
	eleventyConfig.on("eleventy.before", async () => {
		await esbuild.build({
			entryPoints: ["src/js/app.js"],
			bundle: true,
			sourcemap: true,
			outfile: "_site/assets/js/app.js",
		});
	});

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

	eleventyConfig.addWatchTarget("src/js");
	eleventyConfig.addWatchTarget("src/sass");

	let nunjucksEnvironment = new Nunjucks.Environment(
		new Nunjucks.FileSystemLoader("src/_includes"),
		{
			autoescape: false,
		}
	);

	nunjucksEnvironment.addFilter("imgURL", function (value) {
		return builder.image(value).auto("format").url();
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
