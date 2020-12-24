<template>
  <div class="pf-content">
    <div class="pf-content-inner">
      <div class="pf-right-col">
        <div
          class="lazy"
          style="background-color:rgba(211, 211, 211, 0.3);height: 30px;width:40%;margin-bottom:5px;"
        ></div>
        <div
          class="lazy"
          style="background-color:rgba(211, 211, 211, 0.3);height: 20px;width:60%;margin-bottom:20px;"
        ></div>

        <div
          class="lazy"
          style="background-color:rgba(211, 211, 211, 0.3);height: 30px;margin-bottom:25px;"
        ></div>
        <div
          class="lazy"
          style="background-color:rgba(211, 211, 211, 0.3);height: 30px;margin-bottom:25px;"
        ></div>
        <div
          class="lazy"
          style="background-color:rgba(211, 211, 211, 0.3);height: 30px;margin-bottom:25px;"
        ></div>
        <div
          class="lazy"
          style="background-color:rgba(211, 211, 211, 0.3);height: 30px;margin-bottom:25px;"
        ></div>
        <div
          class="lazy"
          style="background-color:rgba(211, 211, 211, 0.3);height: 30px;margin-bottom:25px;"
        ></div>
      </div>
      <div class="pf-left-col">
        <div class="pf-customization-area">
          <div class="pf-customization">
            <div class="pf-customization-block">
              <div>
                <div class="screenshot_showcase_primary_single">
                  <div class="screenshot-showcase-screenshot">
                    <div style="padding:1px;">
                      <div
                        class="main-img"
                        :style="{
                          maxWidth: '630px',
                          height: image.height - 256 + 'px',
                          backgroundImage: 'url(' + image.src + ')'
                        }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileContent",
  props: {
    image: {
      src: String,
      height: Number,
      width: Number
    }
  }
};
</script>

<style scoped>
.pf-customization-area {
  display: block;
}

.pf-customization {
  position: relative;
  background-position: top left;
  background-repeat: no-repeat;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(20px);
  border-radius: 3px;
  padding: 0px 0px 0px 0px;
  margin-bottom: 12px;
  font-size: 13px;
  overflow: hidden;
}
.pf-customization-block {
  position: relative;
  border-radius: 5px;
  padding: 15px 10px 11px 10px;
  margin-bottom: 0px;
  font-size: 13px;
  overflow: hidden;
}

.screenshot_showcase_primary_single {
  float: none;
  width: 100%;
  min-height: 100px;
  max-width: 100%;
  margin-right: 0px;
  display: block;
  position: relative;
}

.pf-content {
  position: relative;
  background: radial-gradient(
      farthest-side at top right,
      rgba(109, 38, 44, 0.301),
      transparent 500px
    ),
    radial-gradient(
      farthest-corner at top left,
      rgba(50, 255, 193, 0.103),
      transparent 600px
    ),
    radial-gradient(
      farthest-corner at bottom right,
      rgba(109, 38, 44, 0),
      transparent 500px
    ),
    radial-gradient(
      farthest-corner at bottom left,
      rgba(50, 255, 193, 0.103),
      transparent 600px
    );
  background-color: rgba(34, 35, 48, 0.93);
  margin-top: 0px;
  overflow: hidden;
  padding-top: 16px;
  background-repeat: no-repeat;
  padding: 12px 12px 64px 12px;
  width: 952px;
  margin: 0 auto;
  font-size: 13px;
  min-height: calc(100vh - 511px);
}

.pf-content-inner {
  position: relative;
}

.pf-right-col {
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(20px);
  padding: 10px;
  border-radius: 3px;
  width: 268px;
  float: right;
}

.pf-left-col {
  width: 652px;
  float: left;
}

.main-img {
  background-position: -495px -260px;
}
</style>
