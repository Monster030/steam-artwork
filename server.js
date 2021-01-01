const express = require("express");
const helmet = require("helmet");
const serveStatic = require("serve-static");
const path = require("path");
const request = require("request");
const app = express();
app.use(
  helmet({
    contentSecurityPolicy: false
  })
);

app.use((req, res, next) => {
  /**
   * wasm support, self.crossOriginIsolated -> true
   *
   * Cross-Origin-Opener-Policy: same-origin
   * Cross-Origin-Embedder-Policy: require-corp
   *
   */
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

app.all(/\/cors\/(.*)/, function(req, res) {
  var targetURL = req.url.replace("/cors/", "");
  if (!targetURL) {
    res.send(400, {
      status: 400,
      msg: "bad request"
    });
    return;
  }
  request({
    url: targetURL,
    method: req.method
  }).pipe(res);
});

app.use("/", serveStatic(path.join(__dirname, "/dist")));

app.get(/.*/, function(req, res) {
  res.sendFile(path.join(__dirname, "/dist/index.html"));
});

const port = process.env.PORT || 8081;
app.listen(port);
console.log(`Site is listening on port: ${port}`);
