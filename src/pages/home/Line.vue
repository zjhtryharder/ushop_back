<template>
  <div>
    <div id="hline"></div>
  </div>
</template>

<script>
//1,先引进echarts
import * as echarts from "echarts";
export default {
  data() {
    return {
      option: {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "line",
            symbol: "triangle",
            symbolSize: 20,
            lineStyle: {
              color: "#5470C6",
              width: 4,
              type: "dashed",
            },
            itemStyle: {
              borderWidth: 3,
              borderColor: "#EE6666",
              color: "yellow",
            },
          },
        ],
      },
    };
  },
  created() {},
  mounted() {
    //2，获取dom元素
    let hline = document.querySelector("#hline");
    //3，初始化
    let instance = echarts.init(hline);
    //4,设置配置对象
    instance.setOption(this.option);
  },
  methods: {},
  components: {
    echarts,
  },
};
</script>
<style scoped>
#hline {
  height: 400px;
  margin-bottom: 20px;
  border-radius: 10px;
  background-color: #fff;
}
</style>