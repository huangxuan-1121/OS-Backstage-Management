<template>
  <div class="component2">
    <h3>教师信息</h3>
    <div class="main">
      <div class="header">
        <div>
          姓名
          <input type="text" v-model="searchKey" />
          <button @click="Search()">
            查询
            <i class="el-icon-search"></i>
          </button>
        </div>
        <div>
          <el-button type="text" @click="dialogFormVisible = true" class="el-buntton">
            <i class="el-icon-plus"></i>新增
          </el-button>
          <el-dialog title="新增信息" :visible.sync="dialogFormVisible" :destroy-on-close="true">
            <el-form :model="form" ref="ruleForm">
              <el-form-item label="姓名" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="工号" :label-width="formLabelWidth">
                <el-input v-model="form.number" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="职称" :label-width="formLabelWidth">
                <el-input v-model="form.title" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="性别" :label-width="formLabelWidth">
                <el-select v-model="form.sex" placeholder="请选择">
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="form.email" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="手机号码" :label-width="formLabelWidth">
                <el-input v-model="form.tel" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="resetForm('ruleForm')">重置</el-button>
              <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            </div>
          </el-dialog>
          <button @click="printTable()">
            <i class="el-icon-printer"></i>打印
          </button>
        </div>
      </div>
      <div class="middle">
        <table id="printTable">
          <tr>
            <th>
              <input type="checkbox" @click="selectAll" id="all" />
              姓名
            </th>
            <th>工号</th>
            <th>职称</th>
            <th>性别</th>
            <th>邮箱</th>
            <th>手机号码</th>
          </tr>
          <tr v-for="list in currentPageData" :key="list.index">
            <td>
              <input type="checkbox" name="check" :value="list.id" @click="checkBox()" />
              {{list.username}}
            </td>
            <td>{{list.sno}}</td>
            <td>{{list.title}}</td>
            <td>{{list.sex}}</td>
            <td>{{list.email}}</td>
            <td>{{list.tel}}</td>
          </tr>
        </table>
        <div class="make">
          <button @click="writeinfo()" id="writeBtn" disabled>编辑</button>
          <el-dialog title="修改信息" :visible.sync="dialogFormVisible2">
            <el-form :model="writeform" ref="writeForm">
              <el-form-item label="姓名" :label-width="formLabelWidth">
                <el-input v-model="writeform.username" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="工号" :label-width="formLabelWidth">
                <el-input v-model="writeform.sno" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="职称" :label-width="formLabelWidth">
                <el-input v-model="writeform.title" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="性别" :label-width="formLabelWidth">
                <el-select v-model="writeform.sex" placeholder="请选择">
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="writeform.email" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="手机号码" :label-width="formLabelWidth">
                <el-input v-model="writeform.tel" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="resetForm('writeForm')">重置</el-button>
              <el-button @click="submitWrite()">确定</el-button>
            </div>
          </el-dialog>
          <button @click="deleinfo()" disabled id="deleBtn">删除</button>
        </div>
      </div>
      <div class="footer">
        <!-- 分页 -->
        <button @click="prePage()">
          <i class="el-icon-arrow-left"></i>
        </button>
        <button
          v-for="count in totalPage"
          :key="count"
          @click="goPage(count)"
          name="btnPage"
        >{{count}}</button>
        <button @click="nextPage()">
          <i class="el-icon-arrow-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Qs from "qs";
export default {
  name: "Component2",
  data() {
    return {
      form: {
        id: "",
        name: "",
        number: "",
        sex: "",
        email: "",
        tel: "",
        title: ""
      },
      writeform: {
        id: "",
        username: "",
        sno: "",
        sex: "",
        email: "",
        tel: "",
        title: ""
      },
      oldinfo:{},
      searchKey: "",
      checked: "",
      totalPage: 1, // 统共页数，默认为1
      currentPage: 1, //当前页数 ，默认为1
      pageSize: 6, // 每页显示数量
      currentPageData: [], //当前页显示内容
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogFormVisible2: false,
      formLabelWidth: "120px"
    };
  },
  mounted() {
    this.getCurrentPageData("1");
  },
  methods: {
    selectAll() {
      //实现列表全选与全不选
      var flag = document.getElementById("all");
      var checks = document.getElementsByName("check");
      if (flag.checked) {
        for (let i = 0; i < checks.length; i++) {
          checks[i].checked = flag;
        }
      } else {
        for (let i = 0; i < checks.length; i++) {
          checks[i].checked = !flag;
        }
      }
    },
    getCurrentPageData(page) {
      axios({
        url: "/api/user/getAllAdByPage",
        method: "post",
        data: {
          pageNum: page,
          pageSize: "6"
        },
        dataType: "json",
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
        .then(res => {
          console.log(res);
          let list = [];
          let currentPageData = [];
          list = res.data.content;
          currentPageData = res.data.content;
          this.totalPage = res.data.totalPages;
          // this.list = list
          this.currentPageData = currentPageData;
          // console.log(this.list)
        })
        .catch(function(error) {
          console.log(error);
        });
      let checks = document.getElementsByName("check");
      for (let i = 0; i < checks.length; i++) checks[i].checked = false;
    },
    butPage() {
      //设置页码
      var flag = document.getElementById("all");
      flag.checked = false;
      var Allpage = document.getElementsByName("btnPage");
      var i;
      for (i = 0; i < this.totalPage; i++) {
        Allpage[i].className = "butpage";
      }
      var button = this.currentPage - 1;
      Allpage[button].className = "currentPage";
    },
    goPage(page) {
      //跳转页面
      this.currentPage = page;
      this.getCurrentPageData(this.currentPage);
      this.butPage();
    },
    prePage() {
      //下一页
      if (this.currentPage == 1) {
        return false;
      } else {
        this.currentPage--;
        this.getCurrentPageData(this.currentPage);
        this.butPage();
      }
    },
    nextPage() {
      // 下一页
      if (this.currentPage == this.totalPage) {
        return false;
      } else {
        this.currentPage++;
        this.getCurrentPageData(this.currentPage);
        this.butPage();
      }
    },
    Search() {
      axios({
        url: "/api/user/getAllAdByPage",
        method: "post",
        data: {
          pageNum: "1",
          pageSize: "6"
        },
        params: {
          keywords: this.searchKey
        },
        dataType: "json",
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
        .then(res => {
          console.log(res);
          let list = [];
          let currentPageData = [];
          list = res.data.content;
          currentPageData = res.data.content;
          this.totalPage = res.data.totalPages;
          // this.list = list
          this.currentPageData = currentPageData;
          // console.log(this.list)
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    deleinfo() {
      //传要删除的id
      axios({
        url: "/api/user/deleteUserById/" + this.checked.value,
        method: "delete",
        dataType: "json",
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
        .then(res => {
          this.$message({
            message: "删除成功！",
            type: "success"
          });
          this.goPage(1);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    printTable() {
      //打印Table
      var tableToPrint = document.getElementById("printTable"); //将要被打印的表格
      var newWin = window.open(""); //新打开一个空窗口
      newWin.document.write(tableToPrint.outerHTML); //将表格添加进新的窗口
      newWin.document.close(); //在IE浏览器中使用必须添加这一句
      newWin.focus(); //在IE浏览器中使用必须添加这一句
      newWin.print(); //打印
      newWin.close(); //关闭窗口
    },
    submitForm(formName) {    //提交新增表单
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$message({
            message: "新增成功！",
            type: "success"
          });
          axios({
            url: "/api/user/insertAd",
            method: "post",
            params: {
              username: this.form.name,
              sex: this.form.sex,
              sno: this.form.number,
              title: this.form.title,
              tel: this.form.tel,
              email: this.form.email
            },
            dataType: "json",
            headers: {
              "Content-Type": "application/json;charset=UTF-8"
            }
          })
            .then(res => {
              this.goPage(1);
            })
            .catch(function(error) {
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      //重置按钮
      this.form = {};
      this.writeform = {};
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      });
    },
    writeinfo() {
      //要传修改的值和id
      //获取要修改的值
      this.dialogFormVisible2 = true;
      let writeId = this.checked.value; //获取点击的id值
      let arr = this.currentPageData;   
      var obj = arr.find(function(obj) {  //将数组对象转换成对象
        return obj.id == writeId;
      });
      this.writeform = obj    //将获取到对应id的值赋给弹出框的form表单
      // 将旧的值存入数组中，以便比较在提交后哪些值被修改了
      this.oldinfo.id = obj.id;   
      this.oldinfo.username = obj.username;
      this.oldinfo.tel = obj.tel;
      this.oldinfo.sno = obj.sno;
      this.oldinfo.title = obj.title;
      this.oldinfo.sex = obj.sex;
      this.oldinfo.email = obj.email;
    },
    submitWrite() {   //提交修改表单
      //获取新填入的值
      let info = {
        username: this.writeform.username,
        email: this.writeform.email,
        title: this.writeform.title,
        tel: this.writeform.tel,
        sex: this.writeform.sex,
        sno: this.writeform.sno
      };
      var change = "";
      for (let i in info)   //比较那些值被更改了，并存入change中
          if(info[i]!==this.oldinfo[i])
              change += "&" + i + "=" + info[i];
      axios({
        url:"/api/user/updateAd?" + "id=" + this.checked.value + change,
        method: "put"
      })
        .then(res => {
          this.$message({
          message: '修改成功！',
          type: 'success'
        });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    checkBox() {
      //思路是：判断当前页有多少个checkbox被点击
      let count = 0;  //记录被点击数
      let checks = document.getElementsByName("check");
      for (let i = 0; i < checks.length; i++)
        if (checks[i].checked == true) {
          count++;
          this.checked = checks[i];
        }
      if (count == 1) { //等于一个按钮可点击
        let writeBtn = document.getElementById("writeBtn");
        let deleBtn = document.getElementById("deleBtn");
        writeBtn.disabled = false;
        deleBtn.disabled = false;
      } else {
        writeBtn.disabled = true;
        deleBtn.disabled = true;
      }
    }
  }
};
</script>
<style scoped lang="css">
.el-button {
  padding: 0;
}
.component2 {
  margin-top: 1rem;
  padding: 1.5rem;
  width: 92%;
  box-shadow: 0 0 0.8rem rgba(232, 231, 231, 0.897);
}
.component2 h3 {
  text-indent: 2rem;
  color: rgb(3, 76, 186);
  font-weight: 400;
  letter-spacing: 0.5rem;
  margin: 0;
  line-height: 2rem;
}
.main {
  width: 100%;
  border-top: 1px solid rgb(182, 182, 182);
  box-sizing: border-box;
  padding-top: 1rem;
  padding-left: 0.5rem;
}
.header {
  display: flex;
  width: 95%;
  justify-content: space-between;
  justify-items: center;
  padding: 0 0.8rem;
  letter-spacing: 0.4rem;
}
.header div {
  color: rgb(80, 74, 74);
  font-size: 0.8rem;
}
.header div button {
  background-color: white;
  letter-spacing: 0.1rem;
  outline: none;
  cursor: pointer;
}
.header div:last-child button:hover {
  color: rgb(3, 76, 186);
  border-color: rgb(3, 76, 186);
}
.header div:first-child button {
  background-color: white;
  color: rgb(3, 76, 186);
  border: 0.07rem solid rgb(3, 76, 186);
  border-radius: 0.2rem;
  letter-spacing: 0.1rem;
  height: 1.6rem;
  outline: none;
}
.header div:first-child button i {
  font-weight: 600;
}
.header input {
  border: 0.07rem solid rgba(177, 173, 173, 0.61);
  padding: 0.3rem;
  border-radius: 0.1rem;
  height: 0.8rem;
  outline: none;
  width: 7rem;
}
.header div:last-child button {
  background-color: white;
  color: rgb(80, 74, 74);
  border: 0.05rem solid rgba(177, 173, 173, 0.61);
  border-radius: 1rem;
  letter-spacing: 0.1rem;
  height: 1.5rem;
  width: 3.5rem;
  font-size: 0.7rem;
  outline: none;
}
.middle {
  width: 100%;
  padding: 0.5rem;
}
.middle table {
  border-collapse: collapse;
  color: #606266;
  width: 100%;
  text-align: center;
}
.middle table th {
  letter-spacing: 0.2rem;
  background-color: rgb(239, 243, 246);
  font-weight: 400;
  font-size: 0.8rem;
  color: black;
  line-height: 1.5rem;
  border-bottom: 1px solid rgb(182, 182, 182);
}
.middle table td {
  line-height: 2.2rem;
  font-size: 0.8rem;
  border-bottom: 1px solid rgba(182, 182, 182, 0.842);
  color: rgb(85, 83, 83);
}
.middle table th:first-child,
.middle table td:first-child {
  text-align: left;
  box-sizing: border-box;
  padding-left: 2rem;
}
.middle table i {
  color: rgb(133, 131, 131);
  cursor: pointer;
}
.make {
  box-sizing: border-box;
  width: 10rem;
  height: 3.2rem;
  padding: 0.8rem;
}
.make button {
  background-color: white;
  border: 0.05rem solid rgba(177, 173, 173, 0.61);
  /* color:grey; */
  height: 1.4rem;
  width: 3rem;
  border-radius: 0.2rem;
  cursor: pointer;
}
.footer {
  text-align: center;
}
.footer button {
  cursor: pointer;
  background-color: white;
  border: 0.05rem solid rgba(177, 173, 173, 0.61);
  border-radius: 0.2rem;
  outline: none;
  margin: 0 0.1rem;
}
.footer button:nth-child(2) {
  border-color: rgb(3, 76, 186);
  color: rgb(3, 76, 186);
}
input[type="checkbox"] {
  cursor: pointer;
  -webkit-appearance: none;
  vertical-align: middle;
  margin-top: 0;
  background: #fff;
  border: rgb(177, 176, 176) solid 0.05rem;
  min-height: 0.8rem;
  min-width: 0.8rem;
  outline: none;
}
input[type="checkbox"]:checked {
  background-image: url(../assets/gou.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position-x: 0.1rem;
}
.main .footer .butpage {
  background-color: white;
  border: 0.05rem solid rgba(177, 173, 173, 0.61);
  color: black;
}
.main .footer .currentPage {
  border-color: rgb(3, 76, 186);
  color: rgb(3, 76, 186);
}
</style>
