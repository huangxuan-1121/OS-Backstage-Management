<template>
  <div class="component3-4">
    <h3>模拟试卷</h3>
    <div class="main">
      <div class="header">
        <div>
          <span>试卷名称</span>
          <input type="text" v-model="searchKey" placeholder="请输入关键词" />
          <button @click="Search()">
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
            <th class="firstTd">作业标题</th>
            <th>未交人数</th>
            <th>已交人数</th>
            <th>带批改</th>
            <th></th>
          </tr>
          <tr>
            <td class="firstTd">第一章 第一讲 操作系统导学一</td>
            <td>10</td>
            <td>36</td>
            <td>29</td>
            <td>
              <button>查看</button>
              <span>|</span>
              <button>删除</button>
            </td>
          </tr>
          <tr>
            <td class="firstTd">第一章 第二讲 操作系统导学一</td>
            <td>10</td>
            <td>36</td>
            <td>29</td>
            <td>
              <button>查看</button>
              <span>|</span>
              <button>删除</button>
            </td>
          </tr>
          <tr>
            <td class="firstTd">第一章 第三讲 操作系统导学一</td>
            <td>10</td>
            <td>36</td>
            <td>29</td>
            <td>
              <button>查看</button>
              <span>|</span>
              <button>删除</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Component3-4",
  data() {
    return {};
  },
  methods: {}
};
</script>
<style scoped lang="css">
.component3-4 {
  margin-top: 1rem;
  padding: 1.5rem;
  width: 92%;
  box-shadow: 0 0 0.8rem rgba(232, 231, 231, 0.897);
}
.component3-4 h3 {
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

.tableBox table {
  width: 100%;
  color: #606266;
  width: 100%;
  text-align: center;
  text-indent: 1rem;
  border-collapse: collapse;

}
.tableBox table th {
  background-color: rgb(239, 243, 246);
  line-height: 2.5rem;
  border-bottom: 1px solid rgba(182, 182, 182, 0.842);
  border-top: 0px;
}
.tableBox table td {
  border-bottom: 1px solid rgba(182, 182, 182, 0.842);
  line-height: 2.2rem;
}
.tableBox .firstTd
{
  text-align: left;
}
.tableBox table button {
  background-color: white;
  border: 0.05rem solid rgba(177, 173, 173, 0.61);
  line-height: 1.1rem;
  width: 2.4rem;
  border-radius: 0.6rem;
  cursor: pointer;
}
.tableBox table span{
  color:rgb(216, 216, 216);
  font-size: .9rem;
}
</style>

