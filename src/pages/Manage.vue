<template>
  <el-container style="height: 100%;">
    <el-aside :width="sideWidth + 'px'" style="background-color: rgb(238, 241, 246); height: 100%;">
      <AsideMenu :isCollapse="isCollapse"/>
    </el-aside>
    <el-container>
      <el-header style="border-bottom: solid 1px #ccc; ">
        <MyHeader :collapse="collapse" :collapseButtonIcon="collapseButtonIcon"></MyHeader>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AsideMenu from '../components/AsideMenu.vue';
import MyHeader from '../components/MyHeader.vue';

export default {
    data() {
        return {
            //侧边栏折叠
            collapseButtonIcon: "el-icon-s-fold",
            isCollapse: true,
            sideWidth: 64,
        };
    },
    components: {
        AsideMenu, MyHeader
    },
    methods: {
        //开关侧边栏
        collapse() {
            this.isCollapse = !this.isCollapse;
            if (this.isCollapse) {
                this.collapseButtonIcon = "el-icon-s-fold";
                this.sideWidth = 64;
            } else {
                this.collapseButtonIcon = "el-icon-s-unfold";
                this.sideWidth = 200;
            }
        }
    },
    components: { AsideMenu, MyHeader }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>