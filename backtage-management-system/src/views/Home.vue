<template>
  <div>
    <el-row>
      <el-col style="padding-right: 10px" :span="8">
        <el-card class="box-card" shadow="hover">
          <div class="user">
            <img src="../assets/images/qq头像.jpg" alt="" />
            <div class="userinfo">
              <p class="name">Admin</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登录时间:<span>2023-9-20</span></p>
            <p>上次登录地点:<span>山西</span></p>
          </div>
        </el-card>
        <el-card shadow="hover" style="margin-top: 20px; height: 460px">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column
              v-for="(val, key) in tableLabel"
              :key="val"
              :prop="key"
              :label="val"
            >
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col style="padding-left: 10px" :span="16">
        <div class="num">
          <el-card
            shadow="hover"
            :body-style="{
              display: 'flex',
              height: '80px',
              alignItems: 'center',
            }"
            v-for="item in countData"
            :key="item.name"
          >
            <i
              class="icon"
              :class="`el-icon-${item.icon}`"
              :style="{ background: item.color }"
            >
            </i>
            <div class="detail">
              <p class="price">￥{{ item.value }}</p>
              <p class="name">{{ item.name }}</p>
            </div>
          </el-card>
        </div>
        <!-- 折线图 -->
        <el-card shadow="hover" style="height: 280px">
          <div ref="echarts1" style="height: 280px"></div>
        </el-card>
        <div class="flexBox">
          <el-card shadow="hover" style="height: 230px">
            <div ref="echarts2" style="height: 230px"></div
          ></el-card>
          <el-card shadow="hover" style="height: 230px">
            <div ref="echarts3" style="height: 210px"></div
          ></el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { getHome } from "../api/request";
export default {
  name: "name",
  props: {},
  mounted() {
    getHome().then((res) => {
      this.tableData = res.data.tableData;
      // 创建echarts实例 折线图
      const echarts1 = echarts.init(this.$refs.echarts1);
      // 创建配置选项
      const echarts1Option = {
        title: {
          text: "近期销售量",
        },
        legend: {
          data: [],
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          data: [],
        },
        yAxis: {},
        series: [],
      };
      const orderData = res.data.orderData;
      //横坐标数据
      echarts1Option.xAxis.data = orderData.date;
      // 上方图例
      echarts1Option.legend.data = Object.keys(orderData.data[0]);
      //数据集
      const seriesData = new Array(echarts1Option.legend.data.length)
        .fill(0)
        .map((val) => []);
      orderData.data.forEach((element) => {
        const values = Object.values(element);
        values.forEach((val, index) => {
          seriesData[index].push(val);
        });
      });
      echarts1Option.legend.data.forEach((item, index) => {
        const seriesObj = {};
        seriesObj.name = item;
        seriesObj.type = "line";
        seriesObj.data = seriesData[index];
        echarts1Option.series.push(seriesObj);
      });
      echarts1.setOption(echarts1Option);

      //柱状图
      const echarts2 = echarts.init(this.$refs.echarts2);
      const echarts2Option = {
        title: {
          text: "本周用户活跃",
        },
        legend: {
          data: [],
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          data: [],
        },
        yAxis: {},
        series: [],
      };
      // 获取横轴数据
      echarts2Option.xAxis.data = res.data.userData.map((item) => item.date);
      // 获取图例
      const aAxisData = Object.keys(res.data.userData[0]);
      aAxisData.shift();
      echarts2Option.legend.data = aAxisData;
      // 数据集
      echarts2Option.legend.data.forEach((item, index) => {
        const seriesObj = {};
        seriesObj.name = echarts2Option.legend.data[index];
        seriesObj.type = "bar";
        seriesObj.data = res.data.userData.map((data) => data[item]);
        echarts2Option.series.push(seriesObj);
      });
      echarts2.setOption(echarts2Option);

      // 饼状图
      const echarts3 = echarts.init(this.$refs.echarts3);
      const echarts3Option = {
        title: {
          text: "手机总销量",
          left: "center",
        },
        legend: {
          left: "right",
          orient: "vertical",
        },
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            name: "各个手机总销量",
            type: "pie",
            data: res.data.videoData,
          },
        ],
      };
      echarts3.setOption(echarts3Option);
    });
  },
  data() {
    return {
      tableLabel: {
        name: "姓名",
        todayBuy: "日购买",
        monthBuy: "月购买",
        totalBuy: "总购买",
      },
      tableData: [],
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.user {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 20px;
  margin-bottom: 20px;
  img {
    width: 150px;
    height: 150px;
    margin-right: 40px;
    border-radius: 50%;
  }
  .userinfo {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access {
      color: #999999;
    }
  }
}
.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999999;
    span {
      color: #666666;
      margin-left: 60px;
    }
  }
}
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .icon {
    width: 60px;
    height: 50px;
    font-size: 25px;
    line-height: 50px;
    text-align: center;
    color: #fff;
  }
  .detail {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .price {
      font-size: 25px;
      margin-bottom: 5px;
      line-height: 30px;
      height: 30px;
    }
    .name {
      font-size: 14px;
      color: #999;
      text-align: center;
    }
  }
  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
}
.flexBox {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .el-card {
    width: 48%;
  }
}
</style>
