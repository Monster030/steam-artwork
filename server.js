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
  const cdns = [
    "steampowered.com",
    "steamcommunity.com",
    "steamgames.com",
    "steamusercontent.com",
    "steamcontent.com",
    "steamstatic.com",
    "akamaihd.net",
    "steambroadcast.akamaized.net",
    "steamcdn-a.akamaihd.net",
    "steamcommunity-a.akamaihd.net",
    "steamstore-a.akamaihd.net",
    "steamusercontent-a.akamaihd.net",
    "steamuserimages-a.akamaihd.net",
    "csgo.wmsj.cn",
    "dl.steam.ksyna.com",
    "dota2.wmsj.cn",
    "st.dl.bscstorage.net",
    "st.dl.eccdnx.com",
    "st.dl.pinyuncloud.com",
    "steampowered.com.8686c.com",
    "steamstatic.com.8686c.com",
    "s.team",
    "steam-chat.com",
    "valvesoftware.com"
  ];

  if (!targetURL) {
    res.status(400).send({
      status: 400,
      msg: "bad request"
    });
    return;
  }
  var _isSteamValidUrl = str => {
    let url;
    try {
      url = new URL(str);
    } catch (_) {
      return false;
    }
    str;
    var web = url.protocol === "http:" || url.protocol === "https:";
    var cdn = cdns.find(ele => url.hostname.includes(ele));

    return web && cdn;
  };

  if (_isSteamValidUrl(targetURL))
    request({
      url: targetURL,
      method: req.method
    }).pipe(res);
  else {
    res.status(400).send({
      status: 400,
      msg: "bad request"
    });
    return;
  }
});

app.use("/", serveStatic(path.join(__dirname, "/dist")));

app.get(/.*/, function(req, res) {
  res.sendFile(path.join(__dirname, "/dist/index.html"));
});

const port = process.env.PORT || 8081;
app.listen(port);
console.log(`Site is listening on port: ${port}`);
