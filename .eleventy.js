const fg = require("fast-glob");
// Run search for images in /gallery
const galleryImages = fg.sync(["**/gallery/*", "!**/_site"]);

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("assets");

  eleventyConfig.addPassthroughCopy("admin");

  const { DateTime } = require("luxon");

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, {
      zone: "utc",
    }).toFormat("yy-MM-dd");
  });

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, {
      zone: "utc",
    }).toFormat("dd-MM-yy");
  });

  //Create collection of gallery images
  eleventyConfig.addCollection("gallery", function (collection) {
    return galleryImages;
  });
};
