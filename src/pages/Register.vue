<template>
 <div>
    <body>
      <div class="loginBox">
        <h2>华杰管理系统</h2>
            <div class="item">
              <input v-model="user.userName" type="text" id="userName" required autocomplete="off">
              <label for="userName"><i class="el-icon-user"></i> 用户名</label>
            </div>
            <div class="item">
              <input v-model="user.password" type="password" id="password" required autocomplete="off">
              <label for="password"><i class="el-icon-key"></i> 密码</label>
            </div>
            <div class="item">
              <input v-model="user.confirmPassword" type="password" id="confirmPassword" required autocomplete="off">
              <label for="confirmPassword"><i class="el-icon-key"></i> 确认密码</label>
            </div>
          
          <div class="btnBox">
            <button class="btn" @click="backToLogin">返回登录界面
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            </button>
            <button class="btn" @click="register">确认注册
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
      </div>
    </body>
  </div>
</template>

<script>
export default {
    data() {
        return {
          user: {
            userName: '',
            password: '',
            confirmPassword: ''
          },
          timer: null
        }
    },
    methods: {
      backToLogin() {
        this.$router.push('Login');
      },
      register() {
        if (this.user.password === this.user.confirmPassword) {
          const newUser = {
            userName: this.user.userName, 
            password: this.user.password
          }
          this.axios.post('/user/register', newUser).then(res => {
            if (res.data.code == 1) {
              this.$message.success('注册成功！自动登录中...')
              this.axios.post('/user/login', newUser).then(res => {
                if (res.data.code == 1) {
                  localStorage.setItem('user', JSON.stringify(res.data.data))
                  this.$router.push({name: 'Home'})
                  this.$message.success('登陆成功！')
                } else {
                  this.$message.error(res.data.data)
                }
              })
            } else {
              this.$message.info(res.data.data)
            }
          })
        } else {
          this.$message.info('两次密码输入不一致，请检查！')
        } 
      }
    },
    beforeDestroy() {
      clearTimeout(this.timer)
      time = null
    }
}

</script>
<style scoped>
  input,
		button {
			background: transparent;
			border: 0;
			outline: none;
		}

    button {
      cursor: pointer;
    }

		body {
			height: 100vh;
			background: linear-gradient(#141e30, #243b55);
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 16px;
			color: #03e9f4;
		}

		.loginBox {
			width: 400px;
			height: 364px;
			background-color: #0c1622;
			margin: 100px auto;
			border-radius: 10px;
			box-shadow: 0 15px 25px 0 rgba(0, 0, 0, .6);
			padding: 40px;
			box-sizing: border-box;
		}

		h2 {
			text-align: center;
			color: aliceblue;
			margin-bottom: 30px;
			font-family: 'Courier New', Courier, monospace;
		}

		.item {
			height: 45px;
			border-bottom: 1px solid #fff;
			margin-bottom: 20px;
			position: relative;
		}

		.item input {
			width: 100%;
			height: 100%;
			color: #fff;
			padding-top: 20px;
			box-sizing: border-box;
		}

		.item input:focus+label,
		.item input:valid+label {
			top: 0px;
			font-size: 2px;
		}

		.item label {
			position: absolute;
			left: 0;
			top: 12px;
			transition: all 0.5s linear;
		}

    .btnBox {
      display: flex;
      justify-content: space-around;
    }

		.btn {
			padding: 10px 20px;
			color: #03e9f4;
			position: relative;
			overflow: hidden;
			text-transform: uppercase;
			letter-spacing: 2px;
		}

		.btn:hover {
			border-radius: 5px;
			color: #fff;
			background: #03e9f4;
			box-shadow: 0 0 5px 0 #03e9f4,
				0 0 25px 0 #03e9f4,
				0 0 50px 0 #03e9f4,
				0 0 100px 0 #03e9f4;
			transition: all 1s linear;
		}

		.btn>span {
			position: absolute;
		}

		.btn>span:nth-child(1) {
			width: 100%;
			height: 2px;
			background: -webkit-linear-gradient(left, transparent, #03e9f4);
			left: -100%;
			top: 0px;
			animation: line1 1s linear infinite;
		}

		@keyframes line1 {

			50%,
			100% {
				left: 100%;
			}
		}

		.btn>span:nth-child(2) {
			width: 2px;
			height: 100%;
			background: -webkit-linear-gradient(top, transparent, #03e9f4);
			right: 0px;
			top: -100%;
			animation: line2 1s 0.25s linear infinite;
		}

		@keyframes line2 {

			50%,
			100% {
				top: 100%;
			}
		}

		.btn>span:nth-child(3) {
			width: 100%;
			height: 2px;
			background: -webkit-linear-gradient(left, #03e9f4, transparent);
			left: 100%;
			bottom: 0px;
			animation: line3 1s 0.75s linear infinite;
		}

		@keyframes line3 {

			50%,
			100% {
				left: -100%;
			}
		}

		.btn>span:nth-child(4) {
			width: 2px;
			height: 100%;
			background: -webkit-linear-gradient(top, transparent, #03e9f4);
			left: 0px;
			top: 100%;
			animation: line4 1s 1s linear infinite;
		}

		@keyframes line4 {

			50%,
			100% {
				top: -100%;
			}
		}
</style>