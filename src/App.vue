<template>
  <div id="app">
    <home></home>
  </div>
</template>

<script>
import Home from "@/views/Home";
export default {
  components: {
    Home
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

html,
body,
#app {
  background-color: #000;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  font-family: "Roboto", sans-serif;
}

a {
  color: white;
  text-decoration: none;
}

a:hover {
  color: lightgray;
}

button:focus {
  outline: none;
}

.lazy {
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.3);
  height: 100%;
  width: 100%;
}
</style>
