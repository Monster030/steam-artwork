<template>
  <div class="pf-content">
    <div class="pf-content-inner">
      <div class="pf-right-col">
        <div>
          <div class="settings-element">
            <div class="settings-header">
              image compression level
            </div>
            <input
              class="compression-slider"
              ref="compression"
              type="range"
              min="0"
              max="1000"
              step="5"
              v-model="compressionValue"
              @input="$emit('imgCompress', $event.target.value)"
            />
            <div>
              <span class="compression-footer">
                size
              </span>
              <span class="compression-footer" style="float: right;">
                quality
              </span>
            </div>
          </div>
          <button class="apply-button" @click="$emit('applyChanges')">
            Apply Changes
          </button>
        </div>
      </div>
      <div class="pf-left-col">
        <div class="pf-customization-area">
          <div class="pf-customization">
            <div class="pf-customization-block">
              <div>
                <div class="screenshot_showcase_primary_single">
                  <div class="screenshot-showcase-screenshot">
                    <a
                      :download="gif ? 'main_artwork.gif' : 'main_artwork.png'"
                      :href="imgSrc"
                      class="main-artwork"
                    >
                      <img
                        style="max-width: 630px;display:block;"
                        :src="imgSrc"
                        alt="main artowrk"
                      />
                    </a>
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
    imgSrc: String,
    gif: Boolean
  },
  data: function() {
    return {
      compressionValue: 1000
    };
  }
};
</script>

<style scoped>
.settings-element {
  margin-bottom: 10px;
}
.apply-button {
  background-color: #ff9a9e;
  border: none;
  color: white;
  padding: 10px 20px;
  height: 30px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 10px;
  border-radius: 3px;
  cursor: pointer;
}
.apply-button:hover {
  background-color: #d38083;
}

.compression-footer {
  text-transform: uppercase;
  color: white;
}

.compression-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 10px;
  border-radius: 5px;
  background-image: linear-gradient(to right, #ff9a9e, #fad0c4);
  outline: none;
  padding: 0;
  margin: 0;
}
.compression-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #814e51;
  cursor: pointer;
}

.settings-header {
  font-size: 14px;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-transform: uppercase;
  color: #ebebeb;
}

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

  background-repeat: no-repeat;
  padding: 16px 12px 64px 12px;
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

.main-artwork {
  border: 1px solid #000;
  display: block;
}
.main-artwork:hover {
  border: 1px solid #97c0e3 !important;
  cursor: pointer;
}
</style>
