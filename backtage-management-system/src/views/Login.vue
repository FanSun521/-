<template>
  <div>
    <el-form
      ref="loginForm"
      label-width="70px"
      :inline="true"
      class="login"
      :model="form"
      :rules="rules"
      label-position="left"
    >
      <h3 class="title">系统登陆</h3>
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import Mock from "mockjs";
import { login } from "../api/request";
export default {
  name: "Login",
  props: {},
  data() {
    return {
      form: {
        userName: "",
        password: "",
      },
      rules: {
        userName: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          login(this.form).then((res) => {
            if (res.code === 20000) {
              // 通过浏览器cookie存储token
              Cookies.set("token", res.data.token);
              // 存储动态菜单
              this.$store.commit("setMenu", res.data.menu);
              // 动态注册路由
              this.$store.commit("setRouter", this.$router);
              this.$router.push("/home");
              this.$message({
                type: "success",
                message: "登陆成功!",
              });
            } else {
              this.$message({
                type: "error",
                message: "密码错误",
              });
            }
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -60%);
  text-align: center;
  width: 350px;
  border: 1px solid #eaeaea;
  padding: 35px 35px 15px 15px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;
  .title {
    text-align: center;
    margin-bottom: 40px;
    color: #505458;
  }
}
</style>
