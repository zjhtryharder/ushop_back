<template>
  <div class="login_warp">
    <div class="login_concent">
      <h3>小U商城后台管理系统</h3>
      <el-form
        :model="loginInfo"
        :rules="rules"
        ref="loginInfo"
        class="demo-loginInfo"
      >
        <el-form-item prop="username">
          <el-input type="text" v-model="loginInfo.username" autocomplete="off"
            ><template slot="prepend"
              ><i class="el-icon-user-solid"></i></template></el-input>
        </el-form-item>

        <el-form-item  prop="password">
          <el-input
            type="password"
            v-model="loginInfo.password"
            autocomplete="off"
            show-password
          >
            <template slot="prepend"><i class="el-icon-lock"></i></template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            class="login_btn"
            type="primary"
            @click="submitForm()"
            >登陆</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {userLogin} from '../request/user';
export default {
  data() {
    
    return {
      loginInfo: {
        username: "admin",
        password: "admin000",
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: "blur" }],
        password: [{ required: true, message: '请输入密码', trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.loginInfo.validate((valid) => {
        if (valid) {
          // alert("submit!");
          userLogin(this.loginInfo).then(res=>{
            console.log(res);
            if (res.code==200){
              //把接收的数据存储到本地
              localStorage.setItem('userInfo',JSON.stringify(res.list))
              //弹出消息框
              this.$message({
                message: res.msg,
                type: 'success'
              });
              this.$router.push('/')
            }else{
              this.$message({
                message: '登陆失败',
                type: 'error'
              });
            }
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style scoped>
.login_warp {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-image: url(../../static/imgs/loginbg.jpeg);
}
.login_concent {
  width: 400px;
  height: 300px;
  box-sizing: border-box;
  padding: 0 30px;
  margin: 200px auto;
  background-color: #fff;
  color: #409eff;
  text-align: center;
  overflow: hidden;
}
h3 {
  margin: 40px 0;
}
.login_btn {
  width: 100%;
}
</style>