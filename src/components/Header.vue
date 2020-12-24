<template>
  <header id="global_header">
    <div class="content">
      <div class="logo">
        <div class="lazy" style="height: 44px;"></div>
      </div>
      <div class="nav_container">
        <div class="menuitem">
          <div class="lazy" style="height: 16px;width:28px"></div>
        </div>
        <div class="menuitem">
          <div class="lazy" style="height: 16px;width:28px"></div>
        </div>
        <div class="menuitem">
          <div class="lazy" style="height: 16px;width:70px"></div>
        </div>
        <div class="menuitem">
          <div class="lazy" style="height: 16px;width:28px"></div>
        </div>
        <div class="menuitem">
          <div class="lazy" style="height: 16px;width:56px"></div>
        </div>
      </div>
      <div class="actions">
        <slot></slot>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style scoped>
#global_header {
  background: #171a21;
  background-position: center top;
  min-width: 940px;
  font-size: 14px;
  padding-left: 16px;
  padding-right: 16px;
}

#global_header .content {
  background: #171a21;
  position: relative;
  width: 940px;
  height: 104px;
  margin: 0px auto;
  z-index: 402;
}

#global_header .logo {
  float: left;
  padding-top: 30px;
  margin-right: 40px;
  width: 176px;
  height: 44px;
}

#global_header .lazy {
  border-radius: 5px;
  background-color: rgba(211, 211, 211, 0.2) !important;
}

#global_header .nav_container {
  position: absolute;
  left: 200px;
}

#global_header .menuitem {
  display: block;
  position: relative;
  padding-top: 45px;
  padding-left: 7px;
  padding-right: 7px;
  padding-bottom: 7px;
  line-height: 16px;
  float: left;
}

#global_header .actions {
  position: absolute;
  right: 0px;
  padding-top: 30px;
  line-height: 21px;
  color: #b8b6b4;
  z-index: 401;
}
</style>
