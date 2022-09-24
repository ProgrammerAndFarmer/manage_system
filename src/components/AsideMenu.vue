<template>
  <el-menu :default-openeds="['1', '3']" :collapse="isCollapse" :collapse-transition="false" style="height: 100%; overflow-x: hidden;" background-color="rgb(48, 65, 86)" text-color="#fff" router>
    <div v-if="!isCollapse" style="height: 60px; line-height: 60px; font-size: 20px; font-weight: 700; text-align: center; color: #fff; background-color:#000">
      <img src="../assets/logo.png" alt="" style="position:relative; top:3px; height: 20px;"> 后台管理系统
    </div>
    <div v-if="isCollapse" style="height: 60px; line-height: 60px;text-align: center;">
      <img src="../assets/logo.png" alt="" style="position:relative; top:3px; height: 20px;">
    </div>
    <!-- 侧边栏菜单详情 -->
    <el-menu-item index="/">
      <i class="el-icon-s-home"></i>
      <span slot="title">主页</span>
    </el-menu-item>
    <el-submenu index="2">
    <template slot="title">
      <i class="el-icon-menu"></i>
      <span slot="title">系统管理</span>
    </template>
    <el-menu-item index="/user">
      <i class="el-icon-user-solid"></i>
      <span slot="title">用户管理</span>
    </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
    name: 'AsideMenu',
    data() {
        return {
          
        }
    },
    props: {
      isCollapse: {
        type: Boolean,
        default: false
      }
    }
}
</script>
<style scoped>

</style>
