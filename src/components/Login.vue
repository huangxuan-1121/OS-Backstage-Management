<template>
  <div id="login-box">
    <div class="card">
      <h1>登录</h1>
      <div class="content">
        <!-- 输入用户名 -->
        <el-input
          prefix-icon="el-icon-user-solid"
          placeholder="请输入帐号"
          v-model="userName"
          @blur="fill(0)"
          :class="{ active_input: exist[0] }"
        ></el-input>
        <!-- 密码 -->
        <el-input
          prefix-icon="el-icon-key"
          :show-password="true"
          placeholder="请输入密码"
          v-model="password"
          @blur="fill(1)"
          :class="{ active_input: exist[1] }"
        ></el-input>
        <!-- 记住密码 -->
        <!-- <el-checkbox v-model="checked">记住用户名和密码</el-checkbox> -->
        <el-button type="primary" @click="sub">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// import { request } from "@/router/request.js";
import axios from "axios";
import Qs from "qs";
// import { Decrypt, Encrypt } from "@/utils/Aes.js";
export default {
  data() {
    return {
      userName: "",
      password: "",
      checked: false,
      exist: [false, false]
    };
  },
  methods: {
    // 弹窗提示
    MessageBox(mes, type) {
      this.$message({
        message: mes,
        type: type
      });
    },
    // 失焦时判断用户名或密码是否存在
    fill(num) {
      if (num == 0) {
        if (this.userName == "") this.$set(this.exist, 0, true);
        else this.$set(this.exist, 0, false);
      } else if (num == 1) {
        if (this.password == "") this.$set(this.exist, 1, true);
        else this.$set(this.exist, 1, false);
      }
    },
    // 发送数据
    sub() {
      // 发送前判断用户名或密码是否存在
      if (this.userName == "") {
        this.$set(this.exist, 0, true);
        this.MessageBox("请输入用户名", "warning");
      } else if (this.password == "") {
        this.$set(this.exist, 1, true);
        this.MessageBox("请输入密码", "warning");
      } else {
        axios({
          url: "/api/login",
          method: "post",
          data: {
            username: this.userName,
            // password: Encrypt(this.password)
            password: this.password
          },
          transformRequest: [
            function(data) {
              // console.log(data.password);
              data = Qs.stringify(data);
              return data;
            }
          ],
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          dataType: "json"
        })
          .then(res => {
            console.log(res);
            if (res.data.msg == "登录成功!") {
              var ses = window.sessionStorage;
              var id = JSON.stringify(res.data.obj.id);
              ses.setItem("data", id);
              // console.log(window.sessionStorage.data)
              if (res.data.obj.access == 1) {
                this.$router.push("/");
                return true;
              } else {
                this.$notify({
                  message: "权限不足！",
                  color: "155,147,128",
                  background: "rgb(237,232,104)"
                });
                return false;
              }
            } else {
              this.$notify({
                message: "用户名或密码错误！",
                color: "155,147,128",
                background: "rgb(237,232,104)"
              });
              return false;
            }
          })
          .catch(error => {
            this.$notify({
              message: "用户名或密码错误！",
              color: "155,147,128",
              background: "rgb(237,232,104)"
            });
            return false;
            console.log(error);
          });
      }
    }
  }
};
</script>

<style scoped>
#login-box {
  width: 100%;
  height: 100vh;
  background: url("../assets/bac.png");
  background-size: cover;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  width: 400px;
  height: 300px;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  box-shadow: 0 0 10px rgba(1, 1, 1, 0.2);
  border-radius: 10px;
}
.el-button--primary {
  margin: 1.5rem;
}
.el-card__body {
  padding: 0 !important;
}
h1 {
  margin: 0;
  text-align: center;
  /* background: #8dc4ed; */
  background-color: rgb(64, 158, 255);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 12px 0;
  color: #ffffff;
  letter-spacing: 15px;
  font-weight: 500;
}

.content {
  display: flex;
  flex-direction: column;
  padding: 5% 15% 0 15%;
}
.el-input {
  margin: 10px 0;
}
.el-checkbox {
  text-align: left;
  margin-left: 5px;
  margin-bottom: 10px;
}
.active_input >>> .el-input__inner {
  border: 1px solid red;
  border-radius: 4px;
}
</style>
