<template>
  <div>
    <Header>
      <download-button @downloadOnClick="handleDownload"></download-button>
    </Header>
    <div
      class="pf"
      :style="{
        backgroundImage: 'url(' + img.src + ')'
      }"
    >
      <profile-header
        :img-src="avatar.src"
        @changeUrl="handleChangeUrl($event)"
      ></profile-header>
      <profile-content :img-src="mainArtwork.src"></profile-content>
    </div>
    <Footer />
    <div ref="hiddenimg" style="display:none;"></div>
  </div>
</template>

<script>
import ProfileHeader from "@/components/ProfileHeader.vue";
import ProfileContent from "@/components/ProfileContent.vue";
import DownloadButton from "@/components/DownloadButton.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { nanoid } from "nanoid";

export default {
  name: "Home",
  components: {
    Header,
    Footer,
    ProfileHeader,
    ProfileContent,
    DownloadButton
  },
  data: function() {
    return {
      img: {
        src: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=",
        height: null,
        width: null
      },
      mainArtwork: {
        src: ""
      },
      avatar: {
        src: ""
      }
    };
  },
  mounted() {
    this.handleChangeUrl(
      "https://steamcommunity-a.akamaihd.net/public/images/profile/2020/bg_dots.png"
    );
  },
  methods: {
    handleChangeUrl(e) {
      const self = this;
      if (!e) return;
      if (e.indexOf(".jpg") > -1 || e.indexOf(".png") > -1) {
        var bg = new Image();
        bg.src = "https://cors.m0n5ter.com/" + decodeURIComponent(e);
        bg.crossOrigin = "Anonymous";
        bg.onload = function() {
          var background = document.createElement("canvas");
          var backgroundctx = background.getContext("2d");
          background.height = this.naturalHeight;
          background.width = this.naturalWidth;
          backgroundctx.drawImage(this, 0, 0);
          self.img.src = background.toDataURL();

          self.img.height = this.height;
          self.img.width = this.width;

          const coordinatesMain = {
            x: 495,
            y: 256,
            w: 630,
            h: self.img.height - 256
          };

          const coordinatesAvatar = { x: 499, y: 34, w: 164, h: 164 };

          var canvasMain = document.createElement("canvas");
          var canvasAvatar = document.createElement("canvas");

          canvasMain.width = coordinatesMain.w;
          canvasMain.height = coordinatesMain.h;

          canvasAvatar.width = coordinatesAvatar.w;
          canvasAvatar.height = coordinatesAvatar.h;

          var mainContext = canvasMain.getContext("2d");
          mainContext.drawImage(
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

          self.mainArtwork.src = canvasMain.toDataURL();
          self.avatar.src = canvasAvatar.toDataURL();
        };
      } else {
        alert("Sorry, " + e.split(".").pop() + " is not supported");
      }
    },
    dataUrl2Base64(src) {
      return src.replace(/^data:image\/(png|jpg);base64,/, "");
    },
    handleDownload() {
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
    }
  }
};
</script>

<style scoped>
.pf {
  background-size: 100%;
  background-position: 49.999% 0;
  background-color: #000000;
  background-repeat: no-repeat;
  position: relative;
  min-width: 950px;
  background-size: auto;
}
</style>
