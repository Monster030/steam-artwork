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
              <img src="@/assets/hk.gif" class="pf-flag" alt="hong kong" /> Hong
              Kong
            </div>
          </div>
          <!--Avatar-->
          <div class="pf-header-avatar disable-download" v-if="disableDl">
            <a class="pf-header-avatar-inner">
              <img
                :src="imgSrc"
                alt="avatar"
                style="max-width:164px;height:164px;"
              />
            </a>
          </div>
          <div class="pf-header-avatar" v-else>
            <a
              class="pf-header-avatar-inner"
              :href="imgSrc"
              download="avatar.png"
            >
              <img
                :src="imgSrc"
                alt="avatar"
                style="max-width:164px;height:164px;"
              />
            </a>
          </div>

          <!--Bageinfo-->
          <div class="pf-header-badge">
            <div class="pf-header-lvl">
              <div class="lazy"></div>
            </div>
            <div class="pf-header-badge-con">
              <div
                style="padding: 12px 8px;display: flex;justify-content: space-between;height: 100%;"
              >
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="14pt"
                    viewBox="0 0 16 14"
                    fill="#fff"
                    width="16pt"
                  >
                    <path
                      d="m7.976562 12.625c1.054688 0 2.035157-.265625 2.949219-.796875.921875-.539063 1.644531-1.257813 2.167969-2.167969.527344-.929687.789062-1.917968.789062-2.960937 0-1.050781-.261718-2.035157-.789062-2.949219-.527344-.90625-1.25-1.625-2.167969-2.160156-.910156-.539063-1.890625-.804688-2.949219-.804688-.53125 0-1.042968.066406-1.527343.195313-.484375.132812-.960938.328125-1.425781.589843-.902344.515626-1.625 1.238282-2.164063 2.167969-.539063.90625-.804687 1.894531-.804687 2.960938 0 1.0625.261718 2.046875.789062 2.964843.265625.457032.578125.867188.9375 1.226563.359375.363281.769531.675781 1.230469.9375.917969.53125 1.90625.796875 2.964843.796875zm0-12.835938c1.234376 0 2.386719.3085942 3.453126.925782.535156.3125 1.011718.679687 1.429687 1.101562s.78125.898438 1.09375 1.433594c.617187 1.058594.925781 2.210938.925781 3.449219 0 1.234375-.308594 2.386719-.925781 3.453125-.3125.535156-.675781 1.015625-1.09375 1.4375s-.894531.789062-1.429687 1.101562c-1.066407.621094-2.21875.929688-3.453126.929688-1.25 0-2.40625-.308594-3.46875-.929688-.535156-.3125-1.011718-.675781-1.433593-1.09375-.417969-.421875-.78125-.902344-1.09375-1.445312-.613281-1.066406-.921875-2.21875-.921875-3.453125 0-1.242188.3125-2.398438.933594-3.46875.3125-.535157.679687-1.011719 1.101562-1.425781.421875-.417969.902344-.785157 1.4375-1.09375 1.070312-.617188 2.21875-.921876 3.445312-.921876zm-.710937 10.449219v-5.175781h1.414063v5.175781zm.710937-7.191406c.507813 0 .765626.230469.765626.691406 0 .460938-.257813.691407-.765626.691407-.511718 0-.765624-.230469-.765624-.691407 0-.460937.253906-.691406.765624-.691406zm0 0"
                    />
                  </svg>
                </div>
                <span style="margin-left:8px;">
                  You can directly click on the artwork / avatar to download
                  either one of them.
                </span>
              </div>
            </div>
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
                  id="url"
                  v-model="input"
                  autocomplete="off"
                  @keyup.enter="$emit('changeUrl', input)"
                  @submit="e => e.preventDefault()"
                />
                <label for="url" class="form__label">Image/Video URL</label>
                <span class="form__submit" @click="$emit('changeUrl', input)">
                  <svg
                    fill="#fff"
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z" />
                  </svg>
                </span>
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
    imgSrc: String,
    disableDl: Boolean
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
  display: block;
}

.pf-header-avatar:hover {
  background: #97c0e3 !important;
  cursor: pointer;
}

.disable-download:hover {
  background: linear-gradient(
    to bottom,
    rgba(106, 106, 106, 1) 5%,
    rgba(85, 85, 85, 1) 95%
  ) !important;
  cursor: default !important;
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
  box-sizing: border-box;
  clear: both;
  font-size: 1rem;
  position: relative;
  text-align: inherit;
  display: flex;
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
  padding-right: 2rem;
  display: inline-flex;
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

.form__submit {
  height: 1.5em;
  pointer-events: none;
  position: absolute;
  right: 0;
  bottom: 0;
  width: 1.5em;
  z-index: 99;
  align-items: center;
  display: inline-flex;
  justify-content: center;
  padding-bottom: 0.4em;
  cursor: pointer;
  pointer-events: auto;
}
</style>
