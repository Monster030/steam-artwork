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
      ></profile-content>
    </div>
    <Footer />
    <Modal v-if="showModal" :progress="progress" />
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
        src: empty,
        image: true
      },
      mainArtwork: {
        src: ""
      },
      avatar: {
        src: ""
      },
      progress: 0,
      showModal: false,
      ffmpeg: null
    };
  },
  async mounted() {
    var self = this;
    this.handleChangeUrl(
      "https://steamcommunity-a.akamaihd.net/public/images/profile/2020/bg_dots.png"
    );
    this.ffmpeg = createFFmpeg({
      log: true,
      logger: msg => console.log(msg),
      progress: p => {
        self.progress = p.ratio;
      }
    });
    await this.ffmpeg.load();
  },
  methods: {
    async handleChangeUrl(e) {
      e = e.replace(/\s+/, "");
      const self = this;
      if (!e) return;
      if (e.indexOf(".jpg") > -1 || e.indexOf(".png") > -1) {
        var bg = new Image();
        bg.src = "https://cors.m0n5ter.com/" + decodeURIComponent(e);
        bg.crossOrigin = "Anonymous";
        bg.onload = function() {
          const coordinatesMain = {
            x: 495,
            y: 256,
            w: 630,
            h: this.naturalHeight - 256
          };

          const coordinatesAvatar = {
            x: 499,
            y: 34,
            w: 164,
            h: 164
          };
          // Background
          var background = document.createElement("canvas");
          background.height = this.naturalHeight;
          background.width = this.naturalWidth;
          var backgroundCtx = background.getContext("2d");
          backgroundCtx.drawImage(this, 0, 0);
          self.background.src = background.toDataURL();
          self.background.image = true;

          // Main Artwork
          var canvasMain = document.createElement("canvas");
          canvasMain.width = coordinatesMain.w;
          canvasMain.height = coordinatesMain.h;
          var mainCtx = canvasMain.getContext("2d");
          mainCtx.drawImage(
            bg,
            coordinatesMain.x,
            coordinatesMain.y,
            coordinatesMain.w,
            coordinatesMain.h,
            0,
            0,
            coordinatesMain.w,
            coordinatesMain.h
          );
          self.mainArtwork.src = canvasMain.toDataURL();

          // Avatar
          var canvasAvatar = document.createElement("canvas");
          canvasAvatar.width = coordinatesAvatar.w;
          canvasAvatar.height = coordinatesAvatar.h;
          var avatarContext = canvasAvatar.getContext("2d");
          avatarContext.drawImage(
            bg,
            coordinatesAvatar.x,
            coordinatesAvatar.y,
            coordinatesAvatar.w,
            coordinatesAvatar.h,
            0,
            0,
            coordinatesAvatar.w,
            coordinatesAvatar.h
          );
          self.avatar.src = canvasAvatar.toDataURL();
        };
      } else if (e.indexOf(".webm") > -1 || e.indexOf(".mp4") > -1) {
        if (!self.ffmpeg.isLoaded) return;
        self.showModal = true;
        self.ffmpeg.FS("writeFile", "inputFile", await fetchFile(e));
        const outputName = "output.gif";
        await self.ffmpeg.run(
          "-i",
          "inputFile",
          "-vf",
          "crop=630:ih-256:495:256",
          "-crf",
          "30",
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

        self.background.src = e;
        self.background.image = false;

        self.mainArtwork.src = URL.createObjectURL(blob);
        self.avatar.src = empty;
        self.showModal = false;
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
        zip.file("avatar.png", this.dataUrl2Base64(this.avatar.src), {
          base64: true
        });
        zip.file("main_artwork.png", this.dataUrl2Base64(this.avatar.src), {
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
