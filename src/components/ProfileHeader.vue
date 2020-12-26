<template>
  <div class="pf-header-bg">
    <div class="pf-header-bg-texture">
      <div class="pf-header">
        <div class="pf-header-content">
          <!--Persona-->
          <div class="pf-header-persona">
            <div class="pf-name">Steam Artwork Creator</div>
            <div class="pf-real-name">
              Made with <span style="color:red">&#x2764;</span> by Monster in
              <img src="@/assets/hk.gif" class="pf-flag" /> Hong Kong
            </div>
          </div>
          <!--Avatar-->
          <div class="pf-header-avatar">
            <div class="pf-header-avatar-inner">
              <img
                :src="imgSrc"
                alt="avatar"
                style="max-width:164px;height:164px;"
              />
            </div>
          </div>

          <!--Bageinfo-->
          <div class="pf-header-badge">
            <div class="pf-header-lvl">
              <div class="lazy"></div>
            </div>
            <div class="pf-header-badge-con"></div>
            <div style="font-size:18px;margin:5px;">
              <a href="https://github.com/Monster030/steam-artwork">
                <svg
                  height="32"
                  viewBox="0 0 16 16"
                  version="1.1"
                  width="32"
                  aria-hidden="true"
                  fill="#ffffff"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                  ></path>
                </svg>
              </a>
            </div>
          </div>

          <div class="pf-header-summary">
            <div class="pf-name" style="height:40px;">&nbsp;</div>
            <div class="pf-real-name" style="height:52px;">&nbsp;</div>
            <div class="pf-summary">
              <div class="form__group field">
                <input
                  type="input"
                  class="form__field"
                  placeholder="Image URL"
                  name="name"
                  id="url"
                  v-model="input"
                  @keyup.enter="$emit('changeUrl', input)"
                  @submit="e => e.preventDefault()"
                />
                <label for="url" class="form__label"
                  >Image URL (mp4 and webm are not supported)</label
                >
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
  name: "ProfileHeader",
  data: function() {
    return {
      input: ""
    };
  },
  props: {
    imgSrc: String
  }
};
</script>

<style scoped>
.pf-header-bg {
  position: relative;
  max-width: 1018px;
  min-height: 224px;
  padding-bottom: 0px;
  margin: 0 auto;
  background-repeat: no-repeat;
  background-position: center bottom;
}

.pf-header-bg-texture {
  max-width: 976px;
  min-height: 224px;
  margin: 0 auto;
  background: radial-gradient(
      farthest-side at bottom right,
      rgba(109, 38, 44, 0.301),
      transparent 500px
    ),
    radial-gradient(
      farthest-corner at bottom left,
      rgba(50, 255, 193, 0.103),
      transparent 600px
    );
  background-color: rgba(34, 35, 48, 0.93);
  background-repeat: no-repeat;
  background-position: center;
}

.pf-header {
  position: relative;
  max-width: 926px;
  margin: 0 auto;
  padding-top: 24px;
}

.pf-header-content {
  position: relative;
  padding-top: 8px;
  padding-right: 8px;
  color: #898989;
  font-size: 13px;
}

.pf-header-persona {
  position: absolute;
  left: 186px;
  right: 268px;
  white-space: nowrap;
}

.pf-header-avatar {
  float: left;
  margin-right: 18px;
  position: relative;
  width: 166px;
  height: 166px;
  background: linear-gradient(
    to bottom,
    rgba(106, 106, 106, 1) 5%,
    rgba(85, 85, 85, 1) 95%
  );
  filter: none;
  border-radius: 0;
  padding: 1px;
}

.pf-header-avatar-inner {
  position: absolute;
  top: 2px;
  right: 2px;
  bottom: 2px;
  left: 2px;
}

.pf-flag {
  vertical-align: middle;
  width: 16px;
  height: 11px;
}

.pf-header-avatar-inner img {
  background: none;
  filter: none;
  display: block;
  padding: 0;
  width: 100%;
  height: 100%;
}

.pf-header-badge {
  float: right;
  width: 268px;
}

.pf-header-lvl {
  height: 40px;
  margin-bottom: 13px;
}
.pf-header-badge-con {
  border-radius: 3px !important;
  background-color: rgba(0, 0, 0, 0.3) !important;
  height: 70px;
  margin-bottom: 13px;
}

.pf-header-summary {
  overflow: hidden;
  padding-right: 18px;
}

.pf-summary {
  height: 76px;
  overflow: hidden;
  margin-bottom: 8px;
}

.pf-name {
  font-size: 24px;
  line-height: 40px;
  color: #ffffff;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-weight: 200;
}

.pf-real-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.form__group {
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
  width: 95%;
}

.form__field {
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid #9b9b9b;
  outline: 0;
  font-size: 14px;
  color: #fff;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;
}
.form__field::placeholder {
  color: transparent;
}
.form__field:placeholder-shown ~ .form__label {
  font-size: 14px;
  cursor: text;
  top: 20px;
}

.form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 14px;
  color: #9b9b9b;
}

.form__field:focus {
  padding-bottom: 6px;
  font-weight: 700;
  border-width: 3px;
  border-image: linear-gradient(to right, white, lightgray);
  border-image-slice: 1;
}
.form__field:focus ~ .form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 14px;
  color: white;
  font-weight: 400;
}

/* reset input */
.form__field:required,
.form__field:invalid {
  box-shadow: none;
}
</style>
