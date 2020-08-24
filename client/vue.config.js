module.exports = {
  devServer: {
    proxy: "http://localhost:5000",
  },
  pages: {
    index: {
      entry: "src/main.js",
      title: "welcome to the virtual lot",
    },
  },
};
