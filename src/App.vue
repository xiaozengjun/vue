<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang='less'>
*{
	-webkit-touch-callout:none;
	-webkit-user-select:none;
	-moz-user-select:none;
	-ms-user-select:none;
	user-select:none;
}
html,body,#app {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}
ul li {
  list-style: none; /*去掉小圆点*/
}
input {
  -webkit-user-select: text
}
</style>
