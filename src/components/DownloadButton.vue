<template>
  <button class="download-button" @click="$emit('downloadOnClick')">
    Download
  </button>
</template>

<script>
export default {};
</script>

<style>
.download-button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px 30px;
  height: 46px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 3px;
  cursor: pointer;
}

.download-button:hover {
  background-color: #3c863e;
}
</style>
