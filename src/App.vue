<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Manage from './pages/Manage.vue'

export default {
  name: 'App',
  components: {
    Manage
  },
}
</script>

<style>
  #app{
    height: 100%;
  }

  * {
    margin: 0;
    padding: 0;
  }

  a {
			text-decoration: none;
	}

  .el-button {
    cursor: pointer !important;
  }
</style>