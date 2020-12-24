<template>
  <div>
    <Header>
      <download-button @downloadOnClick="handleDownload"></download-button>
    </Header>
    <div class="pf" :style="{ backgroundImage: 'url(' + img.src + ')' }">
      <profile-header
        :image="img"
        @changeUrl="handleChangeUrl($event)"
      ></profile-header>
      <profile-content :image="img"></profile-content>
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
        src:
          "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/items/280160/198b92abfaae14144fdc924eb4ca432a3499bbd8.jpg",
        height: 1200,
        width: 1920
      }
    };
  },
  methods: {
    handleChangeUrl(e) {
      const self = this;
      if (!e) return;
      console.log(e);
      if (e.indexOf(".jpg") > -1 || e.indexOf(".png" > -1)) {
        self.img.src = e;

        var i = new Image();
        i.src = self.img.src;
        i.style.opacity = "0"; // Hide
        i.onload = function() {
          self.img.height = this.height;
          self.img.width = this.width;
        };
      }
    },
    handleDownload() {
      const self = this;
      // points = [TLx, TLy, BRx, BRy]
      // eslint-disable-next-line no-unused-vars
      const coordinatesMain = {
        x: 495,
        y: 260,
        w: 630,
        h: self.img.height - 260
      };

      const coordinatesAvatar = { x: 493, y: 35, w: 164, h: 164 };
      var bg = new Image();
      bg.src =
        "https://api.allorigins.win/raw?url=" +
        decodeURIComponent(self.img.src);
      bg.crossOrigin = "Anonymous";
      bg.onload = function() {
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

        canvasMain.toBlob(b => {
          var a = document.createElement("a");
          a.download = "main.png";
          a.href = URL.createObjectURL(b);
          a.click();
        }, "image/png");
        canvasAvatar.toBlob(b => {
          var a = document.createElement("a");
          a.download = "avatar.png";
          a.href = URL.createObjectURL(b);
          a.click();
        }, "image/png");
      };
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
}
</style>
