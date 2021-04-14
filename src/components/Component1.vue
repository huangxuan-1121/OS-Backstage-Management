<template>
  <div class="component1">
    <h3>基本信息</h3>
    <div class="main">
      <div class="change-photo">
        <el-upload
          class="avatar-uploader"
          action
          :show-file-list="false"
          :on-change="onUploadChange"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="this.imgbase" :src="this.imgbase" class="avatar" />
          <!-- <img v-else src="../assets/bac.png" alt /> -->
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <button @click="request" class="imgbtn">保存头像</button>
      </div>
      <div class="change-form">
        <div>
          姓名
          <input type="text" v-model="name" />
        </div>
        <div>
          邮箱
          <input type="text" v-model="email" />
        </div>
        <div>
          电话
          <input type="text" v-model="tel" />
        </div>

        <div class="radio-box">
          性别
          <input name="sex" id="man" type="radio" value="男" v-model="sex" />男
          <label for="man" class="check"></label>
          <input name="sex" id="woman" type="radio" value="女" v-model="sex" />女
          <label for="woman" class="check"></label>
          <span>*必填</span>
        </div>
        <div>
          职称
          <select name="cars" v-model="tittle">
            <option value></option>
            <option value="教授">教授</option>
            <option value="副教授">副教授</option>
            <option value="讲师">讲师</option>
            <option value="导师">导师</option>
          </select>
          <span>*必填</span>
        </div>
      </div>
    </div>
    <div class="sub-botton">
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">修改保存</el-button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Qs from "qs";
export default {
  name: "Component1",
  data() {
    return {
      name: "",
      email: "",
      tel: "",
      sex: "",
      tittle: "",
      imgbase: "",
      information: []
    };
  },
  mounted() {
    axios({
      url: "/api/user/getAdById/" + window.sessionStorage.data,
      method: "get"
    })
      .then(res => {
        let info = [
          { key: "username", value: res.data.obj.username },
          { key: "email", value: res.data.obj.email },
          { key: "title", value: res.data.obj.title },
          { key: "tel", value: res.data.obj.tel },
          { key: "sex", value: res.data.obj.sex }
        ];
        this.name = res.data.obj.username;
        this.tel = res.data.obj.tel;
        this.tittle = res.data.obj.title;
        this.email = res.data.obj.email;
        this.sex = res.data.obj.sex;
        this.imgbase = res.data.obj.avatarUrl;
        this.information = info;
        // console.log(this.information);
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    onUploadChange(file) {
      var reader = new FileReader();
      reader.readAsDataURL(file.raw);
      var that = this;
      reader.onload = function(e) {
        that.imgbase = reader.result;
      };
    },
    request() {
      axios({
        url: "/api/user/base64Upload",
        method: "post",
        params: {
          id: window.sessionStorage.data
        },
        data: {
          base64Data: this.imgbase
        },
        transformRequest: [
          function(data) {
            data = Qs.stringify(data);
            return data;
          }
        ],
        dataType: "json"
      })
        .then(res => {
          let avatarUrl
          this.$emit('func',res.data.obj)  //上传头像成功后将后端返回的头像连接传给父组件
          this.$message({
          message: '恭喜你，上传成功！',
          type: 'success'
        });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    submitUpload() {
      //判断哪些修改了
      let info = [
        { key: "username", value: this.name },
        { key: "email", value: this.email },
        { key: "title", value: this.tittle },
        { key: "tel", value: this.tel },
        { key: "sex", value: this.sex }
      ];
      var change = "";
      let sum = 0;
      for (sum; sum < info.length; sum++)
        if (info[sum].value !== this.information[sum].value)
          change += "&" + info[sum].key + "=" + info[sum].value;
      axios({
        url:"/api/user/updateAd?" + "id=" + window.sessionStorage.data + change,
        method: "put"
      })
        .then(res => {
          this.$message({
          message: '修改成功！',
          type: 'success'
        });
          this.$emit('func',this.name)
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped lang="css">
.component1 {
  margin-top: 1rem;
  padding: 1.5rem;
  width: 92%;
  box-shadow: 0 0 0.8rem rgba(232, 231, 231, 0.897);
}
.component1 h3 {
  text-indent: 2rem;
  color: rgb(3, 76, 186);
  font-weight: 400;
  letter-spacing: 0.5rem;
  margin: 0.5rem 0;
}
.main {
  width: 100%;
  border-top: 1px solid rgb(182, 182, 182);
  box-sizing: border-box;
  display: flex;
  padding-top: 1.8rem;
  padding-left: 0.5rem;
}
.change-photo {
  padding: 0.5rem;
  box-sizing: border-box;
  width: 12rem;
}
.change-photo img {
  width: 5rem;
  height: 5rem;
}
.change-form {
  color: rgb(80, 74, 74);
  width: 100%;
  padding: 0.6rem;
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-template-rows: 50% 50%;
}
.change-form div {
  font-size: 0.8rem;
  letter-spacing: 0.1rem;
}
.change-form div span {
  color: red;
  letter-spacing: 0;
  font-size: 0.8rem;
}
.change-form input[type="text"] {
  box-sizing: border-box;
  padding: 0.2rem;
}
.change-form input[type="text"],
.change-form select {
  border: 0.04rem solid rgb(177, 177, 177);
  border-radius: 0.3rem;
  height: 1.3rem;
  width: 7rem;
  outline: none;
}
.change-form select {
  cursor: pointer;
  width: 4.5rem;
}
.change-form label {
  cursor: pointer;
}
input[type="radio"] {
  font-size: 0.7rem;
  letter-spacing: 0;
  visibility: hidden;
}
.check {
  height: 12px;
  width: 12px;
  display: inline-block;
  position: relative;
  left: -2.4rem;
  top: 0.1rem;
  border: 0.04rem solid grey;
}
.check1 {
  height: 12px;
  width: 12px;
  display: inline-block;
  position: relative;
  left: -3.1rem;
  top: 0.1rem;
  border: 0.04rem solid grey;
}
.check2 {
  height: 12px;
  width: 12px;
  display: inline-block;
  position: relative;
  left: -5.3rem;
  top: 0.1rem;
  border: 0.04rem solid grey;
}
input[type="radio"]:checked + .check {
  background-image: url(../assets/gou.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position-x: 0.1rem;
}
.sub-botton {
  padding: 1rem;
  display: flex;
  justify-content: center;
}
.component1 button {
  cursor: pointer;
  width: 5.5rem;
  height: 1.7rem;
  border-radius: 0.3rem;
  background-color: rgb(3, 76, 186);
  color: azure;
  font-weight: 500;
  letter-spacing: 0.1rem;
  border: 0.02rem solid rgba(128, 128, 128, 0.452);
}
.component1 .imgbtn {
  width: 4.5rem;
  margin-top: 1rem;
  margin-left: .6rem;
}
</style>
<style>
.el-upload-list--picture .el-upload-list__item {
  display: none;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width:6rem;
  height:6rem;
  line-height:6rem;
  text-align: center;
}
.avatar {
  width:6rem;
  height:6rem;
  display: block;
}
</style>