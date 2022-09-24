<template>
  <div style="font-size: 12px; line-height: 60px; display: flex;">
    <div style="flex: 1; font-size: 25px">
      <span :class="collapseButtonIcon" @click="collapse" style="cursor: pointer"></span>
      <el-breadcrumb separator-class="el-icon-arrow-right" style="display:inline-block;margin-left: 10px;font-size: 20px">
        <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="atHome">{{currentPathName}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    
    <el-dropdown style="width: 200px;">
      <i class="el-icon-arrow-down" style="margin-right: 15px; cursor: pointer;"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="toUserInfo"><i class="el-icon-user"></i> 查看用户信息</el-dropdown-item>
        <el-dropdown-item @click.native="logout"><i class="el-icon-switch-button"></i> 退出登录</el-dropdown-item>
      </el-dropdown-menu>
      <img class="userAvatar" :src="userInfo.avatarUrl" alt="">
      <span>{{userInfo.userName}}</span>
    </el-dropdown>
  </div>
</template>

<script>
export default {
    name: 'MyHeader',
    data() {
        return {
          userInfo: {},
          atHome: true
        }
    },
    computed: {
      currentPathName() {
        if (this.$store.state.currentPathName === 'User') {
          this.atHome = true
          return '用户管理'
        } else if (this.$store.state.currentPathName === 'Home') {
          this.atHome = false
          return '主页'
        } else {
          return ''
        }
      }
    },
    watch: {
      // currentPathName(newVal, oldVal) {
      //   console.log(newVal);
      // }
    },
    props: {
      collapseButtonIcon: {
        type: String,
        default: 'el-icon-s-fold'
      },
      collapse: {
        type: Function
      }
    },
    methods: {
      logout() {
        this.axios.get('/user/logout').then(res => {
          if (res.data.code === 1) {
            this.$message.success(res.data.data)
            localStorage.removeItem('user')
            this.$router.push('/user/login')
          } else {
            this.$message.error('未知错误！')
          }
        })
      },
      toUserInfo() {
        this.$router.push('/user/info')
      }
    },
    created() {
      const userInfo = localStorage.getItem('user');
      if (userInfo) {
        this.userInfo = JSON.parse(userInfo)
      }
    }
}
</script>
<style scoped>
  .userAvatar {
    display: inline-block;
    position: relative;
    top: 10px;
    right: 5px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
</style>
