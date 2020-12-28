<template>
  <div class="modal-wrapper">
    <div class="modal">
      <div class="gradient-bar"></div>
      <div class="text-wrapper">
        <h3>We are generating your GIF image</h3>
        <div class="progress-outter">
          <div
            class="progress-inner"
            :style="{ width: Math.round(progress * 100) + '%' }"
          ></div>
        </div>
        <p>
          {{ log }}
        </p>
        <!-- <button
          class="button button-ok"
          :disabled="progress != 1"
          @click="$emit('close')"
        >
          Okay, Continue
        </button> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    header: String,
    progress: Number,
    log: String
  }
};
</script>

<style scoped>
.progress-inner {
  border-radius: 16px;
  background-image: linear-gradient(to right, #ff9a9e, #fad0c4);
  height: 15px;
}
.progress-outter {
  margin-bottom: 20px;
  border-radius: 16px;
  background-color: #f1f1f1;
}

.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  width: 100%;
  height: 100%;
  overflow: hidden;
  outline: 0;
}
.modal {
  position: relative;
  display: flex;
  align-items: center;
  margin: 1.75rem auto;
  background-color: #111111;
  color: #fff;
  height: 225px;
  width: 450px;
  border-radius: 3px;
  overflow: hidden;
}

.gradient-bar {
  width: 100%;
  height: 7px;
  background-image: linear-gradient(to right, #ff9a9e, #fad0c4);
  display: block;
  position: absolute;
  top: 0;
}

.text-wrapper {
  text-align: center;
  width: 80%;
  font-family: "Open Sans";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.text-wrapper h3 {
  font-size: 18px;
}
.text-wrapper p {
  margin: 10px 0px 20px 0px;
  font-size: 8px;
  color: #b3b3b3;
}
.text-wrapper .button {
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: 600;
  border: none;
  margin: 0px 5px;
  height: 40px;
  transition: all 0.3s;
  cursor: pointer;
}
.text-wrapper .button-ok {
  background-color: #ff9a9e;
  color: #fff;
}
.text-wrapper .button-ok:hover {
  background-image: none;
  background-color: #d17f82;
}
.text-wrapper .button-ok:disabled {
  background-image: none;
  background-color: #493333;
  cursor: default;
}
</style>
