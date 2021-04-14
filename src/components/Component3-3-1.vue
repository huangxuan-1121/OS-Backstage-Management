<template>
  <div class="component3-3">
    <h3>导学资源</h3>
    <div class="main">
      <div class="header">
        <div>
          <span>标题</span>
          <input type="text" v-model="searchKey" />

          <button @click="search()">
            查询
            <i class="el-icon-search"></i>
          </button>
        </div>
        <div>
          <el-button type="text" @click="dialogFormVisible = true" class="el-buntton">
            <i class="el-icon-plus"></i>新增
          </el-button>
        </div>
      </div>
      <div class="tableBox">
        <table>
          <tr>
            <th>资源标题</th>
            <th>操作</th>
          </tr>
          <tr v-for="list in currentPageData" :key="list.index">
            <td>{{list.title}}</td>
            <td>
              <button>上传</button>
              <span>|</span>
              <button>删除</button>
              <span>|</span>
              <button @click="download(list.filepath)">下载</button>
            </td>
          </tr>
        </table>
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
  name: "Component3-3",
  data() {
    return {
      searchKey: "",
      totalPage: 1, // 统共页数，默认为1
      currentPage: 1, //当前页数 ，默认为1
      pageSize: 6, // 每页显示数量
      currentPageData: [] //当前页显示内容
    };
  },
  mounted() {
    this.getCurrentPageData("1");
  },
  methods: {
    getCurrentPageData(page) {
      axios({
        url: "/api/resource/findPage",
        method: "post",
        params: {
          p_id: "28"
        },
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
          let currentPageData = [];
          currentPageData = res.data.content;
          this.totalPage = res.data.totalPages;
          this.currentPageData = currentPageData;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    butPage() {
      //设置页码
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
    search() {
      axios({
        url: "/api/resource/findPage",
        method: "post",
        data: {
          pageNum: "1",
          pageSize: "6"
        },
        params: {
          keywords: this.searchKey,
          p_id: 28
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
          this.currentPageData = currentPageData;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    download(link){
      window.open(link, '_blank'); // 新开窗口下载
    },
  }
};
</script>
<style scoped lang="css">
.component3-3 {
  margin-top: 1rem;
  padding: 1.5rem;
  width: 92%;
  /* height: 25rem; */
  box-shadow: 0 0 0.8rem rgba(232, 231, 231, 0.897);
}
.component3-3 h3 {
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
  padding-top: 1.8rem;
  padding-left: 0.5rem;
}

.header {
  margin: 0;
  display: flex;
  width: 100%;
  justify-content: space-between;
  justify-items: center;
  /* letter-spacing: 0.4rem; */
}
.header div:first-child {
  color: rgb(80, 74, 74);
  font-size: 0.8rem;
  display: flex;
  justify-content: space-between;
  width: 17rem;
}
.header span {
  font-size: 1rem;
  line-height: 1.6rem;
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
  border-radius: 0.4rem;
  height: 0.8rem;
  outline: none;
  width: 8rem;
}
.header div:last-child button {
  background-color: rgb(3, 76, 186);
  color: rgb(255, 255, 255);
  border: 0.05rem solid rgba(177, 173, 173, 0.61);
  border-radius: 0.5rem;
  height: 1.5rem;
  width: 3.6rem;
  padding: 0;
  font-size: 0.7rem;
  outline: none;
}
.tableBox {
  margin: 0;
  box-sizing: border-box;
  width: 100%;
  padding: 0.5rem 0;
}
.tableBox table,
th,
td {
  border: 2px solid rgba(240, 238, 239, 0.863);
  border-collapse: collapse;
}
.tableBox table {
  width: 100%;
  color: #606266;
  width: 100%;
  text-align: left;
  text-indent: 1rem;
}
.tableBox table th {
  background-color: rgb(239, 243, 246);
  line-height: 2.5rem;
  border-top: 0px;
}
.tableBox table td {
  line-height: 2.2rem;
}
.tableBox table button {
  background-color: white;
  border: 0.05rem solid rgba(177, 173, 173, 0.61);
  line-height: 1.1rem;
  width: 2.4rem;
  border-radius: 0.6rem;
  cursor: pointer;
  outline: none;

}
.tableBox table span {
  color: rgb(216, 216, 216);
  font-size: 0.9rem;
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
.main .footer .butpage {
  background-color: white;
  border: 0.05rem solid rgba(177, 173, 173, 0.61);
  color: black;
}
.main .footer .currentPage {
  border-color: rgb(3, 76, 186);
  color: rgb(3, 76, 186);
}
.main .footer .butpage {
  background-color: white;
  border: 0.05rem solid rgba(177, 173, 173, 0.61);
  color: black;
}
</style>

