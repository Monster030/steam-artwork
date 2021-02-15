<template>
  <footer>
    <div class="content">
      Copyright © 2020
      <a href="https://github.com/Monster030">Monster030</a>. The code of this
      site is licensed under the MIT License. This site is not affiliated in any
      way with Valve Corporation and its affiliates. STEAM is the trademark of
      Valve Corporation.
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style scoped>
footer {
  background: #171a21;
  background-position: center top;
  min-width: 940px;
  font-size: 12px;
  padding-left: 16px;
  padding-right: 16px;
}
footer .content {
  background: #171a21;
  position: relative;
  width: 940px;
  margin: 0px auto;
  z-index: 402;
  padding: 12px;
  color: #303030;
}

footer .content a {
  color: #303030;
}

footer .content a:hover {
  color: #404040;
}
</style>
