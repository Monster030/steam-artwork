<template>
  <div>
    <Header>
      <download-button @downloadOnClick="handleDownload"></download-button>
    </Header>
    <div
      class="pf"
      :style="{
        backgroundImage: background.image
          ? 'url(' + background.src + ')'
          : 'none'
      }"
    >
      <div class="pf-animated-bg" v-if="!background.image">
        <video playsinline autoplay muted loop :src="background.src" />
      </div>
      <profile-header
        :img-src="avatar.src"
        :disableDl="!background.image"
        @changeUrl="handleChangeUrl($event)"
      ></profile-header>
      <profile-content
        :img-src="mainArtwork.src"
        :gif="!background.image"
        @imgCompress="handleImageCompressionChange($event)"
        @applyChanges="applyChanges($event)"
      ></profile-content>
    </div>
    <Footer />
    <Modal
      v-if="showModal"
      :progress="progress"
      :log="log"
      :error="ffmpegError"
    />
  </div>
</template>

<script>
import ProfileHeader from "@/components/ProfileHeader.vue";
import ProfileContent from "@/components/ProfileContent.vue";
import DownloadButton from "@/components/DownloadButton.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Modal from "@/components/Modal.vue";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { nanoid } from "nanoid";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import UPNG from "upng-js";

const empty = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";

export default {
  name: "Home",
  components: {
    Header,
    Footer,
    ProfileHeader,
    ProfileContent,
    DownloadButton,
    Modal
  },
  data: function() {
    return {
      background: {
        osrc: "",
        src: empty,
        image: true
      },
      mainArtwork: {
        src: empty,
        blob: null
      },
      avatar: {
        src: empty,
        blob: null
      },
      progress: 0,
      showModal: false,
      ffmpeg: null,
      ffmpegError: "",
      log: "",

      imageCompression: 0
    };
  },
  async mounted() {
    var self = this;
    fetch("/ping"); // wake herokuapp

    self.background.src = "/img/bg_dots.webp";
    self.background.osrc =
      "https://steamcommunity-a.akamaihd.net/public/images/profile/2020/bg_dots.png";

    self.mainArtwork.blob = await fetch(
      "/img/bg_dots_main_artwork.webp"
    ).then(r => r.blob());
    self.mainArtwork.src = window.URL.createObjectURL(self.mainArtwork.blob);

    self.avatar.blob = await fetch("/img/bg_dots_avatar.webp").then(r =>
      r.blob()
    );
    self.avatar.src = window.URL.createObjectURL(self.avatar.blob);

    try {
      self.ffmpeg = createFFmpeg({
        log: true,
        logger: msg => (self.log = msg.message),
        progress: p => {
          self.progress = p.ratio;
        }
      });
      await self.ffmpeg.load();
    } catch (error) {
      self.ffmpegError = error.message;
    }
  },
  methods: {
    _isValidHttpUrl(str) {
      let url;
      try {
        url = new URL(str);
      } catch (_) {
        return false;
      }
      return url.protocol === "http:" || url.protocol === "https:";
    },

    applyChanges() {
      this.handleChangeUrl(this.background.osrc);
    },

    image2DataURL(image, mimeType) {
      var c = document.createElement("canvas");
      c.height = image.naturalHeight;
      c.width = image.naturalWidth;
      var ctx = c.getContext("2d");
      ctx.drawImage(image, 0, 0);
      var url = c.toDataURL(mimeType, 1.0);
      this.destroyCanvas(c);
      return url;
    },

    imageCrop(image, x, y, w, h) {
      var c = document.createElement("canvas");
      c.width = w;
      c.height = h;
      var ctx = c.getContext("2d");

      ctx.beginPath();
      ctx.rect(0, 0, w, h);
      ctx.fillStyle = "black";
      ctx.fill(); // fix #4

      ctx.drawImage(image, x, y, w, h, 0, 0, w, h);

      var dta = ctx.getImageData(0, 0, w, h).data;
      var png = UPNG.encode([dta.buffer], w, h, this.imageCompression);

      var blob = new Blob([new Uint8Array(png)], {
        type: "image/png" // prevent image cannot show /w blob obj url
      });
      var url = window.URL.createObjectURL(blob);

      this.destroyCanvas(c);
      return { url: url, blob: blob };
    },

    handleImageCompressionChange(e) {
      e = Number(e);
      // 0 is lossless compression
      if (e == 1000) {
        this.imageCompression = 0;
      } else {
        this.imageCompression = Math.max(2, Math.round((510 * e) / 1000));
      }
    },

    destroyCanvas(c) {
      c.height = 0;
      c.width = 0;
    },

    async handleChangeUrl(e) {
      e = e.replace(/\s+/, "");
      const self = this;
      if (!e || !self._isValidHttpUrl(e)) return;
      if (e.indexOf(".jpg") > -1 || e.indexOf(".png") > -1) {
        self.avatar.src = empty;
        self.mainArtwork.src = empty;
        // Get Mimetype
        var mime = "";
        if (e.indexOf(".jpg") > -1) mime = "image/jpeg";
        else mime = "image/png";

        var userbg = new Image();
        userbg.src = "/cors/" + decodeURIComponent(e);
        userbg.crossOrigin = "Anonymous";

        userbg.onload = function() {
          // Coords
          const coordinatesMain = [495, 256, 630, this.naturalHeight - 256];
          const coordinatesAvatar = [499, 34, 164, 164];

          // Background
          self.background.src = self.image2DataURL(this, mime);
          self.background.osrc = e;
          self.background.image = true;
          // Main Artwork
          var croppedArtwork = self.imageCrop(this, ...coordinatesMain);
          self.mainArtwork.src = croppedArtwork.url;
          self.mainArtwork.blob = croppedArtwork.blob;
          // Avatar
          var croppedAvatar = self.imageCrop(this, ...coordinatesAvatar);
          self.avatar.src = croppedAvatar.url;
          self.avatar.blob = croppedAvatar.blob;
        };
      } else if (e.indexOf(".webm") > -1 || e.indexOf(".mp4") > -1) {
        if (!self.ffmpeg.isLoaded() || self.ffmpegError != "") {
          if (self.ffmpegError == "") self.ffmpegError = "Ffmpeg not loaded";
          self.showModal = true;
          setTimeout(() => {
            self.ffmpegError = "";
            self.showModal = false;
          }, 3000);
          return;
        }
        try {
          self.showModal = true;
          self.ffmpeg.FS("writeFile", "inputFile", await fetchFile(e));
          const outputName = "output.gif";
          /**
          ffmpeg
          -i <input.mp4>
          -filter_complex "crop=630:ih-256:495:256,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse"
          -y
          <output.gif>
           */

          var colors =
            self.imageCompression == 0 || self.imageCompression == 1000
              ? 256
              : Math.max(Math.floor((self.imageCompression / 1000) * 256), 4);

          await self.ffmpeg.run(
            "-i",
            "inputFile",
            "-vf",
            `crop=630:ih-256:495:256,split[s0][s1];[s0]palettegen=${colors}[p];[s1][p]paletteuse`,
            "-crf",
            "30",
            "-y",
            outputName
          );
          const data = self.ffmpeg.FS("readFile", outputName);
          self.ffmpeg.FS("unlink", "inputFile");
          self.ffmpeg.FS("unlink", outputName);
          const blob = new Blob([data.buffer], {
            type: "image/gif"
          });

          self.background.src = "/cors/" + decodeURIComponent(e);
          self.background.osrc = e;
          self.background.image = false;

          self.mainArtwork.src = URL.createObjectURL(blob);
          self.avatar.src = empty;
          self.showModal = false;
        } catch (err) {
          self.ffmpegError = err.message;
          setTimeout(() => (self.showModal = false), 3000);
        }
      } else {
        alert("Sorry, " + e.split(".").pop() + " is not supported");
      }
    },
    dataUrl2Base64(src) {
      return src.replace(/^data:image\/(png|jpg);base64,/, "");
    },
    handleDownload() {
      if (this.background.image) {
        var zip = new JSZip();
        zip.file("avatar.png", this.avatar.blob, {
          base64: true
        });
        zip.file("main_artwork.png", this.mainArtwork.blob, {
          base64: true
        });
        zip.generateAsync({ type: "blob" }).then(function(content) {
          saveAs(content, `artwork_${nanoid(8)}.zip`);
        });
      } else {
        var a = document.createElement("a");
        a.href = this.mainArtwork.src;
        a.download = "main_artwork.gif";
        a.click();
      }
    }
  }
};
</script>

<style scoped>
.pf {
  background-position: 49.999% 0;
  background-color: #000000;
  background-repeat: no-repeat;
  position: relative;
  min-width: 950px;
}

.pf-animated-bg {
  position: absolute;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  overflow: hidden;
}

.pf-animated-bg video {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 1920px;
  object-fit: contain;
}
</style>
