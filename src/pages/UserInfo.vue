<template>
 <div>
  <div style="margin: 20px;"></div>
  <el-form :label-position="labelPosition" label-width="80px" :model="userInfo">
    <el-form-item label="用户名">
      <el-input v-model="userInfo.userName" disabled></el-input>
    </el-form-item>
    <el-form-item label="昵称">
      <el-input v-model="userInfo.nickname" :disabled="!editting"></el-input>
    </el-form-item>
    <el-form-item label="地址">
      <el-input type="text-area" v-model="userInfo.address" :disabled="!editting"></el-input>
    </el-form-item>
    <el-form-item label="电子邮箱">
      <el-input v-model="userInfo.emailAddress" :disabled="!editting"></el-input>
    </el-form-item>
    <el-form-item label="电话号码">
      <el-input v-model="userInfo.phoneNumber" :disabled="!editting"></el-input>
    </el-form-item>

    <el-form-item>
        <el-button 
         type="primary"
         @click="submitEdit(userInfo)" 
         v-if="editting"
         >确定</el-button>
        <el-button type="primary" @click="cancelEdit"  v-if="editting">取消修改</el-button>
        <el-button @click="edit" v-else>编辑</el-button>
      </el-form-item>
  </el-form>

 </div>
</template>

<script>
export default {
    data() {
        return {
          labelPosition: 'left',
          userInfo: {},
          editting: false
        }
    },
    methods: {
      cancelEdit() {
        this.userInfo = JSON.parse(localStorage.getItem('user'))
        this.editting = false
      },
      edit() {
        this.editting = true
      },
      submitEdit(userInfo) {
        this.axios.put('/user', userInfo).then(res => {
          if (res.data.code === 1) {
            let localUserInfo = JSON.parse(localStorage.getItem('user'))
            console.log(localUserInfo);
            localUserInfo.userName = this.userInfo.userName
            localUserInfo.nickname = this.userInfo.nickname
            localUserInfo.address = this.userInfo.address
            localUserInfo.emailAddress = this.userInfo.emailAddress
            localUserInfo.phoneNumber = this.userInfo.phoneNumber

            localStorage.setItem('user', JSON.stringify(localUserInfo))
            this.editting = false;
            this.$message.success(res.data.data)
          } else {
            this.$message.error('修改失败！')
          }
        })
      }
    },
    created() {
      this.userInfo = JSON.parse(localStorage.getItem('user'))
    }
}
</script>
<style scoped>
  .el-form-item {
    width: 500px;
  }
</style>
