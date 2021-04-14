<template>
  <div class="component3-1">
    <h3>课程信息</h3>
    <div class="main">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="课程介绍" name="first">
          <div class="first">
            <h5>已上传 课程介绍.doc</h5>
            <!-- <button @click="uploadword()">上传</button> -->
            <input
              type="file"
              name="file"
              @change="uploadfile"
              ref="inputer"
              accept="application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf"
            />
            <button>删除</button>
            <button>打印</button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="教师团队" name="second">
          <div class="second">
            <table>
              <tr>
                <td>李宏伟</td>
                <td>
                  <button>上传</button>
                  <button>删除</button>
                  <button>打印</button>
                </td>
              </tr>
              <tr>
                <td>李宏伟</td>
                <td>
                  <button>上传</button>
                  <button>删除</button>
                  <button>打印</button>
                </td>
              </tr>
              <tr>
                <td>李宏伟</td>
                <td>
                  <button>上传</button>
                  <button>删除</button>
                  <button>打印</button>
                </td>
              </tr>
              <tr>
                <td>李宏伟</td>
                <td>
                  <button>上传</button>
                  <button>删除</button>
                  <button>打印</button>
                </td>
              </tr>
            </table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="教师团队" name="third">教师团队</el-tab-pane>
        <el-tab-pane label="教师团队" name="fourth">教师团队</el-tab-pane>
        <el-tab-pane label="教师团队" name="fiveth">教师团队</el-tab-pane>
        <el-tab-pane label="教师团队" name="sixth">教师团队</el-tab-pane>
        <el-tab-pane label="教师团队" name="seventh">教师团队</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Qs from "qs";
export default {
  name: "Component3-1",
  data() {
    return {
      activeName: "first",
      formData: new FormData(),
      file: {} //文件数据
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    uploadfile() {
      // var _this = this;
      let inputDOM = this.$refs.inputer;
      // let oldLen = this.filLen;
      this.file = inputDOM.files[0];
      let len = this.file.length;
      let size = Math.floor(this.file.size / 1024);
      if (size > 5 * 1024 * 1024) {
        alert("请选择5M以内的文件！");
        return false;
      }
      this.formData.append("file", this.file);
      const instance = axios.create({
        withCredentials: true
      });
      instance.post("/api/upload/singleFile", this.formData)
        .then(res => {
          console.log(res)
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped lang="css">
.component3-1 {
  margin-top: 1rem;
  padding: 1.5rem;
  width: 92%;
  height: 25rem;
  box-shadow: 0 0 0.8rem rgba(232, 231, 231, 0.897);
}
.component3-1 h3 {
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
  padding: 2rem 3rem;
  margin: 0 auto;
  /* padding-left: 3rem; */
}
.main h5 {
  margin: 0;
  line-height: 3rem;
}

.first {
  width: 100%;
  padding: 1rem 2rem;
  border-top: none;
  box-sizing: border-box;
}
.first button,
.second button {
  border: 1px solid grey;
  border-radius: 1rem;
  width: 3rem;
  height: 1.5rem;
  background-color: #fff;
  letter-spacing: 0.1rem;
  outline: none;
  border: 0.05rem solid rgba(177, 173, 173, 0.61);
  cursor: pointer;
}
.second tr {
  border-bottom: 0.5rem solid rgba(177, 173, 173, 0.61);
  width: 100%;
}
</style>
<style>
.el-tabs--card > .el-tabs__header .el-tabs__item {
  border: 1px solid #ffffff;
  letter-spacing: 0.2rem;
  height: 100%;
}

.el-tabs--card > .el-tabs__header .el-tabs__nav {
  background: #e4e6eb;
  border-radius: 0px;
  border: none;
}
.el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
  border-top: 2px solid #0e55a0;
  color: black;
  background-color: #ffffff;
}
.el-tabs__item {
  height: 35px;
  line-height: 35px;
  padding: 0 15px;
}
.el-tabs--card > .el-tabs__header {
  border: none;
}
.el-tabs__header {
  margin: 0;
}

.el-tabs--card {
  width: 38rem;
  margin: 0 auto;
  border: 0.05rem solid rgba(177, 173, 173, 0.61);
}
</style>

