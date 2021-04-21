const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
  },

  images: {
    domains: ["cdn.discordapp.com", "instagram.fpoa13-1.fna.fbcdn.net"],
  },
});
