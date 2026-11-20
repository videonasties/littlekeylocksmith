export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy("src/favicon.svg");
  eleventyConfig.addPassthroughCopy("src/theme.js");

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
}
