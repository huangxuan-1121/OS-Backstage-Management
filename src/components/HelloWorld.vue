<template>
  <div class="hello">
    <!-- 侧边导航start -->
    <div class="side-bar" id="side-bar">
      <div class="side-header">
        <img src="../assets/logo1.png" alt />
        <div>
          <p>后台管理系统</p>
          <p>Backstage Management</p>
        </div>
      </div>
      <div class="person">
        <img v-if="this.avatarUrl" :src="this.avatarUrl" alt />
        <img v-else src="../assets/bac.png" alt />
        <div>
          <p>{{username}}</p>
          <p>{{title}}</p>
        </div>
      </div>
      <div class="side-menu">
        <el-col :span="5" id="side-menu">
          <el-menu router default-active="this.$route.path" class="el-menu-vertical-demo">
            <el-menu-item index="/">
              <span slot="title">
                <i class="el-icon-s-home bar-icon"></i>首页
              </span>
            </el-menu-item>
            <el-menu-item index="1">
              <span slot="title">
                <i class="el-icon-edit-outline bar-icon"></i>个人管理
              </span>
            </el-menu-item>
            <el-menu-item index="2">
              <span slot="title">
                <i class="el-icon-user-solid bar-icon"></i>用户管理
              </span>
            </el-menu-item>
            <el-submenu index="3">
              <template slot="title">
                <span>
                  <i class="el-icon-suitcase bar-icon"></i>内容管理
                </span>
              </template>
              <el-menu-item-group unique-opened="true">
                <el-menu-item index="3-1">课程信息</el-menu-item>
                <el-menu-item index="3-2">课程学习</el-menu-item>
                <el-submenu index="3-3">
                  <template slot="title">
                    <span>资源管理</span>
                  </template>
                  <el-menu-item index="3-3-1">导学资源</el-menu-item>
                  <el-menu-item index="3-3-2">复习资源</el-menu-item>
                  <el-menu-item index="3-3-3">作业管理</el-menu-item>
                  <el-menu-item index="3-3-4">课程FAQ</el-menu-item>
                </el-submenu>
                <el-submenu index="3-4">
                  <template slot="title">
                    <span>作业管理</span>
                  </template>
                  <el-menu-item index="3-4-1">自我测试</el-menu-item>
                  <el-menu-item index="3-4-2">模拟试卷</el-menu-item>
                </el-submenu>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="4">
              <span slot="title">
                <i class="el-icon-setting bar-icon"></i>系统管理
              </span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </div>
    </div>
    <!-- 侧边导航ending -->
    <!-- 顶导航start -->
    <div class="container">
      <div class="top-bar">
        <div>
          <i class="icon-menu" @click="sideMenu">☰</i>
          <div class="search">
            <input type="text" placeholder="搜索..." />
            <button>
              <i class="el-icon-search"></i>
            </button>
          </div>
        </div>
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            Hi,{{username}}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="returnLogin">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <!-- 顶导航ending -->
      <div class="main">
        <BreadCrumbs></BreadCrumbs>
        <router-view @func="getMsgFormSon"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Qs from "qs";
import BreadCrumbs from "./BreadCrumb";
import Component1 from "./Component1";
export default {
  name: "HelloWorld",
  components: {
    BreadCrumbs,
    Component1
  },
  data() {
    return {
      username: "",
      title: "",
      avatarUrl: "",
      msgFormSon: ""
    };
  },
  created() {
    //判断登陆
    // if (!window.sessionStorage.data) {
    //   this.$router.push("/login");
    // }

    //   axios({
    //     url: "/api/menu/by/-1",
    //     method: "get",
    //     data: {},
    //     transformRequest: [
    //       function(data) {
    //         data = Qs.stringify(data);
    //         return data;
    //       }
    //     ],
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded"
    //     },
    //     dataType: "json"
    //   })
    //     .then(res => {
    //       // console.log(res);
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
  },
  mounted() {
    axios({
      url: "/api/user/getAdById/" + window.sessionStorage.data,
      method: "get"
    })
      .then(res => {
        let url = res.data.obj.avatarUrl;
        this.username = res.data.obj.username;
        this.title = res.data.obj.title;
        // console.log(res.data.obj);
        this.avatarUrl = url;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    getMsgFormSon(data) {   //data中的数据就是子路由中传过来的res.data.obj
      if (data.length < 10) {
        this.username = data;
      } else {
        this.avatarUrl = data;
      }
      console.log(data.length);
    },

    returnLogin() {
      sessionStorage.clear();
      this.$router.push("/Login");
    },
    sideMenu() {
      var sideMenu = document.getElementById("side-menu");
      var sidebar = document.getElementById("side-bar");
      if (sidebar.style.display == "block") {
        //点击一些展开，再点击一下折叠
        sidebar.style.display = "none";
      } else {
        sidebar.className = "side-bar move_right";
        sideMenu.className = "move_right";
        sidebar.style.display = "block";
      }
    }
  }
};
</script>
<style>
/* 定义UI组件的特殊样式 */
.el-col-5 {
  width: 10rem;
}
.el-menu {
  border-right: none;
  text-indent: 2rem;
  background-color: rgba(244, 248, 249);
}
.el-submenu .el-menu-item,.el-menu-item{
  height: 40px;
  line-height: 40px;
  font-size: 15px;
}
.el-submenu__title
{
  font-size: 15px;
}
.el-menu-item.is-active {
  color: rgb(3, 76, 186);
  border-right: 0.2rem solid;
}
.el-dropdown-link {
  cursor: pointer;
  font-size: 1.1rem;
  color: rgb(255, 255, 255);
}
.el-dropdown-link .el-icon-caret-bottom {
  font-size: 0.8rem;
}
.side-bar .bar-icon {
  position: relative;
  left: -2rem;
  font-size: 0.9rem;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  display: flex;
}
/* 侧边导航start */
.side-bar {
  display: none;
  width: 10rem;
  background-color: rgba(244, 248, 249);
  height: 100vh;
  box-shadow: 1px 0px 10px 0px #91909088;
}
.side-header {
  width: 100%;
  display: inline-flex;
  justify-content: space-around;
  padding: 0.6rem;
  box-sizing: border-box;
  height: 3.5rem;
  background-color: rgb(3, 76, 186);
  /* display: none; */
}
.side-header p {
  margin: 0;
  font-size: 1.2rem;
  text-align: center;
  color: azure;
}
.side-header p:last-child {
  font-size: 0.7rem;
}
.side-header img {
  width: 2.5rem;
  height: 2.5rem;
}
.person {
  width: 100%;
  height: 5rem;
}
.person img {
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
}
.person {
  width: 100%;
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem;
  box-sizing: border-box;
  height: 5rem;
}
.person p {
  margin: 0;
  font-size: 1.1rem;
}
.person p:last-child {
  font-size: 0.7rem;
  padding-top: 0.1rem;
  color: grey;
  text-align: center;
}
/* 动画start */
.move_right {
  -webkit-animation-name: move_right;
  animation-name: move_right;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-iteration-count: 1;
  animation-iteration-count: 1;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
}

@keyframes move_right {
  from {
    opacity: 0;
    width: 0;
    /* transform: translateX(0); */
  }
  to {
    opacity: 1;
    width: 15rem;
    /* transform: translateX(15rem); */
  }
}

/* 动画ending */

/* 侧边导航ending */

/* 顶导航start */
.top-bar {
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  box-sizing: border-box;
  height: 3.5rem;
  background-color: rgb(2, 75, 186);
  box-shadow: 1px 0px 10px 0px #3d3d3d88 inset;
}
.top-bar div:first-child {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 14rem;
}
.top-bar .icon-menu {
  cursor: pointer;
  font-style: normal;
  font-size: 1.8rem;
  color: rgb(255, 255, 255);
}
.search {
  position: relative;
  width: 10rem;
}
.search input {
  outline: none;
  background-color: rgba(244, 248, 249);
  border: none;
  border-radius: 1rem;
  height: 1.5rem;
  width: 12rem;
  padding: 0.8rem;
  box-sizing: border-box;
}
.search button {
  outline: none;
  color: grey;
  font-size: 1rem;
  position: absolute;
  right: -1.3rem;
  top: 0.35rem;
  border: none;
  padding: 0;
  background-color: rgba(244, 248, 249);
}
/* 顶导航ending */
.container {
  width: 100%;
}
.main {
  padding: 1.5rem;
}
</style>
