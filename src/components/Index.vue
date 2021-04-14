<template>
  <div class="index">
    <div class="top">
      <div>
        <h2>欢 迎 使 用</h2>
        <h3>操 作 系 统 原 理 共 享 课 管 理 平 台</h3>
      </div>
      <img src="../assets/smill.png" alt />
    </div>
    <div class="bottom">
      <p>
        {{this.time}}
        <span>{{this.weeks}}</span>
      </p>
      <!-- <p>上次登录时间：</p> -->
    </div>
  </div>
</template>
<script>

export default {
  name: "Index",
  data() {
    return {
      time: "",
      weeks: ""
    };
  },
  created() {
    var CurrentDate = new Date();
    var year = CurrentDate.getFullYear();
    var month = CurrentDate.getMonth() + 1;
    var day = CurrentDate.getDate();
    var week = CurrentDate.getDay();
    switch (week) {
      case 1:
        week = "MON";
        break;
      case 2:
        week = "TUES";
        break;
      case 3:
        week = "WED";
        break;
      case 4:
        week = "THURS";
        break;
      case 5:
        week = "FRI";
        break;
      case 6:
        week = "SAT";
        break;
      case 0:
        week = "SUN";
        break;
    }
    this.time = year + "年" + month + "月" + day + "日";
    this.weeks = week;
  },

  methods: {}
};
</script>
<style scoped lang="css">
.index {
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  align-items: end;
  margin-top: 1rem;
  padding: 1.5rem;
  width: 92%;
  height: 20rem;
  box-shadow: 0 0 0.8rem rgba(232, 231, 231, 0.897);
}
.top {
  display: flex;
  justify-content: center;
}
.top h2 {
  color: rgb(73, 73, 73);
}
.top h3 {
  font-weight: 500;
  color: rgb(113, 113, 113);
}
.top img {
  width: 15rem;
  height: 10rem;
}

.bottom {
  top: 0;
  /* display: flex; */
  /* justify-content:center; */
  /* text-align: center; */
}

.bottom p span {
  margin-left: 1rem;
}
</style>
