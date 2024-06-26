var dataArray; // 声明为全局变量

(function () {
  var filePath = "../data/qunar_freetrip.csv";

  $.ajax({
    type: "GET",
    url: filePath,
    dataType: "text",
    success: function (data) {
      processData(data);
      func1();
      func2();
      func5();
      func6();
      func7();
    },
    error: function (xhr, status, error) {
      console.error("Error reading CSV file:", error);
    },
  });

  function processData(csvData) {
    dataArray = []; // 在处理函数中初始化全局变量
    var allTextLines = csvData.split(/\r\n|\n/);
    var headers = allTextLines[0].split(",");
    for (var i = 0; i < headers.length; i++) {
      headers[i] = headers[i].replace(" ", "");
    }

    for (var i = 1; i < allTextLines.length; i++) {
      var data = allTextLines[i].split(",");
      if (data.length == headers.length) {
        var entry = {};
        for (var j = 0; j < headers.length; j++) {
          entry[headers[j]] = data[j];
        }
        dataArray.push(entry);
      }
    }
  }

  // 柱状图模块1
  function func1() {
    var data = {};
    const NAME = "目的地";
    for (var i = 0; i < dataArray.length; i++) {
      var entry = dataArray[i];
      var key = entry[NAME];
      if (!data[key]) {
        data[key] = 1;
      } else {
        data[key]++;
      }
    }
    // console.log(data);

    // 将 data 对象转换为数组并排序
    var sortedData = Object.entries(data).sort(function (a, b) {
      return b[1] - a[1]; // 按值（出现次数）降序排序
    });

    // 获取前 5 个元素
    var top5 = sortedData.slice(0, 5);
    var top5X = top5.map(function (item) {
      return item[0];
    });
    var top5Y = top5.map(function (item) {
      return item[1];
    });
    // console.log(top5X, top5Y);
    // console.log(top5);
    // 1实例化对象
    let myChart = echarts.init(document.querySelector(".bar .chart"));
    // 2. 指定配置项和数据
    let option = {
      color: ["#2f89cf"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      // 修改图表的大小
      grid: {
        left: "0%",
        top: "10px",
        right: "0%",
        bottom: "4%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: top5X,
          axisTick: {
            alignWithLabel: true,
          },
          // 修改刻度标签 相关样式
          axisLabel: {
            color: "rgba(255,255,255,.6) ",
            fontSize: "12",
          },
          // 不显示x坐标轴的样式
          axisLine: {
            show: false,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          // 修改刻度标签 相关样式
          axisLabel: {
            color: "rgba(255,255,255,.6) ",
            fontSize: 12,
          },
          // y轴的线条改为了 2像素
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255,.1)",
              width: 2,
            },
          },
          // y轴分割线的颜色
          splitLine: {
            lineStyle: {
              color: "rgba(255,255,255,.1)",
            },
          },
        },
      ],
      series: [
        {
          name: "目的地",
          type: "bar",
          barWidth: "35%",
          data: top5Y,
          itemStyle: {
            // 修改柱子圆角
            barBorderRadius: 5,
          },
        },
      ],
    };
    // 3. 把配置项给实例对象
    myChart.setOption(option);
    // 4. 让图表跟随屏幕自动的去适应
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }
  // 柱状图2
  function func2() {
    var data = {};
    const NAME = "出发地";
    for (var i = 0; i < dataArray.length; i++) {
      var entry = dataArray[i];
      var key = entry[NAME];
      if (!data[key]) {
        data[key] = 1;
      } else {
        data[key]++;
      }
    }
    // console.log(data);

    // 将 data 对象转换为数组并排序
    var sortedData = Object.entries(data).sort(function (a, b) {
      return b[1] - a[1]; // 按值（出现次数）降序排序
    });
    var sum = dataArray.length;
    // 获取前 5 个元素
    var top5 = sortedData.slice(0, 5);
    var top5X = top5.map(function (item) {
      return item[0];
    });
    var top5Y = top5.map(function (item) {
      return item[1];
    });

    var newData = [];
    for (var i = 0; i < top5Y.length; i++) {
      newData.push(((top5Y[i] / sum) * 1000).toFixed(2));
    }
    console.log(newData);
    var myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];
    // 1. 实例化对象
    var myChart = echarts.init(document.querySelector(".bar2 .chart"));
    // 2. 指定配置和数据
    var option = {
      grid: {
        top: "10%",
        left: "22%",
        bottom: "10%",
        // containLabel: true
      },
      // 不显示x轴的相关信息
      xAxis: {
        show: false,
      },
      yAxis: [
        {
          type: "category",
          inverse: true,
          data: top5X,
          // 不显示y轴的线
          axisLine: {
            show: false,
          },
          // 不显示刻度
          axisTick: {
            show: false,
          },
          // 把刻度标签里面的文字颜色设置为白色
          axisLabel: {
            color: "#fff",
          },
        },
        {
          data: top5Y,
          inverse: true,
          // 不显示y轴的线
          axisLine: {
            show: false,
          },
          // 不显示刻度
          axisTick: {
            show: false,
          },
          // 把刻度标签里面的文字颜色设置为白色
          axisLabel: {
            color: "#fff",
          },
        },
      ],
      series: [
        {
          name: "条",
          type: "bar",
          data: newData,
          yAxisIndex: 0,
          // 修改第一组柱子的圆角
          itemStyle: {
            barBorderRadius: 20,
            // 此时的color 可以修改柱子的颜色
            color: function (params) {
              // params 传进来的是柱子对象
              // console.log(params);
              // dataIndex 是当前柱子的索引号
              return myColor[params.dataIndex];
            },
          },
          // 柱子之间的距离
          barCategoryGap: 50,
          //柱子的宽度
          barWidth: 10,
          // 显示柱子内的文字
          label: {
            show: true,
            position: "inside",
            // {c} 会自动的解析为 数据  data里面的数据
            formatter: "{c}‰",
          },
        },
        {
          name: "框",
          type: "bar",
          barCategoryGap: 50,
          barWidth: 15,
          yAxisIndex: 1,
          data: [100, 100, 100, 100, 100],
          itemStyle: {
            color: "none",
            borderColor: "#00c1de",
            borderWidth: 3,
            barBorderRadius: 15,
          },
        },
      ],
    };

    // 3. 把配置给实例对象
    myChart.setOption(option);
    // 4. 让图表跟随屏幕自动的去适应
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }
  // 饼形图1
  function func5() {
    var data = {};
    const NAME = "价格";
    const qujians = [
      { low: 0, high: 1000 },
      { low: 1000, high: 2000 },
      { low: 2000, high: 3000 },
      { low: 3000, high: 5000 },
      { low: 5000, high: Infinity },
    ];
    var formatter = function (params) {
      return params.high !== Infinity
        ? `${params.low}-${params.high}`
        : `${params.low}-`;
    };
    // qujians={low:区间左端点,high:区间右端点} 
    // [low,high)左闭右开区间
    for (var i = 0; i < dataArray.length; i++) {
      var entry = dataArray[i];
      var value = entry[NAME];
      for (var j = 0; j < qujians.length; j++) {
        var q = qujians[j];
        if (value !== undefined) {
          if (value >= q.low && value < q.high) {
            var key = formatter(qujians[j]);
            if (!data[key]) {
              data[key] = 1;
            } else {
              data[key]++;
            }
            break;
          }
        }
      }
    }
    // console.log(data);
    var dataX = Object.keys(data); // 获取对象 data 的所有键
    var dataY = Object.values(data); // 获取对象 data 的所有值

    // console.log(dataX, dataY);
    var newData = [];
    for (var i = 0; i < qujians.length; i++) {
      newData.push({ name: dataX[i], value: dataY[i] });
    }
    // 1. 实例化对象
    var myChart = echarts.init(document.querySelector(".pie .chart"));
    // 2.指定配置

    var option = {
      color: ["#065aab", "#066eab", "#0682ab", "#0696ab", "#06a0ab"],
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)",
      },

      legend: {
        bottom: "0%",
        // 修改小图标的大小
        itemWidth: 10,
        itemHeight: 10,
        // 修改图例组件的文字为 12px
        textStyle: {
          color: "rgba(255,255,255,.5)",
          fontSize: "12",
        },
      },
      series: [
        {
          name: "价格分布",
          type: "pie",
          // 这个radius可以修改饼形图的大小
          // radius 第一个值是内圆的半径 第二个值是外圆的半径
          radius: ["40%", "60%"],
          center: ["50%", "45%"],
          avoidLabelOverlap: false,
          // 图形上的文字
          label: {
            show: false,
            position: "center",
          },
          // 链接文字和图形的线是否显示
          labelLine: {
            show: false,
          },
          data: newData,
        },
      ],
    };

    // 3. 把配置给实例对象
    myChart.setOption(option);
    // 4. 让图表跟随屏幕自动的去适应
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }

  // 饼形图2 地区分布模块
  function func6() {
    var data = {};
    const NAME = "目的地";
    for (var i = 0; i < dataArray.length; i++) {
      var entry = dataArray[i];
      var key = entry[NAME];
      if (!data[key]) {
        data[key] = 1;
      } else {
        data[key]++;
      }
    }
    // console.log(data);

    // 将 data 对象转换为数组并排序
    var sortedData = Object.entries(data).sort(function (a, b) {
      return b[1] - a[1]; // 按值（出现次数）降序排序
    });

    // 获取前 10 个元素
    var top10 = sortedData.slice(0, 10);
    var top10X = top10.map(function (item) {
      return item[0];
    });
    var top10Y = top10.map(function (item) {
      return item[1];
    });
    // console.log(top10X, top10Y);
    var newdata = [];
    for (var i = 0; i < 10; i++) {
      newdata.push({ name: top10X[i], value: top10Y[i] });
    }
    console.log(newdata);

    var myChart = echarts.init(document.querySelector(".pie2 .chart"));
    var option = {
      color: [
        "#006cff",
        "#60cda0",
        "#ed8884",
        "#ff9f7f",
        "#0096ff",
        "#9fe6b8",
        "#32c5e9",
        "#1d9dff",
      ],
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        bottom: "0%",
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
          color: "rgba(255,255,255,.5)",
          fontSize: "12",
        },
      },
      series: [
        {
          name: "目的地地区分布",
          type: "pie",
          radius: ["10%", "70%"],
          center: ["50%", "50%"],
          roseType: "radius",
          // 图形的文字标签
          label: {
            fontSize: 10,
          },
          // 链接图形和文字的线条
          labelLine: {
            // length 链接图形的线条
            length: 6,
            // length2 链接文字的线条
            length2: 8,
          },
          data: newdata,
        },
      ],
    };
    myChart.setOption(option);
    // 监听浏览器缩放，图表对象调用缩放resize函数
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }
  // 模拟飞行路线模块地图模块
  function func7() {
    var myChart = echarts.init(document.querySelector(".map .chart"));
    var geoCoordMap = {
      上海: [121.4648, 31.2891],
      东莞: [113.8953, 22.901],
      东营: [118.7073, 37.5513],
      中山: [113.4229, 22.478],
      临汾: [111.4783, 36.1615],
      临沂: [118.3118, 35.2936],
      丹东: [124.541, 40.4242],
      丽水: [119.5642, 28.1854],
      乌鲁木齐: [87.9236, 43.5883],
      佛山: [112.8955, 23.1097],
      保定: [115.0488, 39.0948],
      兰州: [103.5901, 36.3043],
      包头: [110.3467, 41.4899],
      北京: [116.4551, 40.2539],
      北海: [109.314, 21.6211],
      南京: [118.8062, 31.9208],
      南宁: [108.479, 23.1152],
      南昌: [116.0046, 28.6633],
      南通: [121.1023, 32.1625],
      厦门: [118.1689, 24.6478],
      台州: [121.1353, 28.6688],
      合肥: [117.29, 32.0581],
      呼和浩特: [111.4124, 40.4901],
      咸阳: [108.4131, 34.8706],
      哈尔滨: [127.9688, 45.368],
      唐山: [118.4766, 39.6826],
      嘉兴: [120.9155, 30.6354],
      大同: [113.7854, 39.8035],
      大连: [122.2229, 39.4409],
      天津: [117.4219, 39.4189],
      太原: [112.3352, 37.9413],
      威海: [121.9482, 37.1393],
      宁波: [121.5967, 29.6466],
      宝鸡: [107.1826, 34.3433],
      宿迁: [118.5535, 33.7775],
      常州: [119.4543, 31.5582],
      广州: [113.5107, 23.2196],
      廊坊: [116.521, 39.0509],
      延安: [109.1052, 36.4252],
      张家口: [115.1477, 40.8527],
      徐州: [117.5208, 34.3268],
      德州: [116.6858, 37.2107],
      惠州: [114.6204, 23.1647],
      成都: [103.9526, 30.7617],
      扬州: [119.4653, 32.8162],
      承德: [117.5757, 41.4075],
      拉萨: [91.1865, 30.1465],
      无锡: [120.3442, 31.5527],
      日照: [119.2786, 35.5023],
      昆明: [102.9199, 25.4663],
      杭州: [119.5313, 29.8773],
      枣庄: [117.323, 34.8926],
      柳州: [109.3799, 24.9774],
      株洲: [113.5327, 27.0319],
      武汉: [114.3896, 30.6628],
      汕头: [117.1692, 23.3405],
      江门: [112.6318, 22.1484],
      沈阳: [123.1238, 42.1216],
      沧州: [116.8286, 38.2104],
      河源: [114.917, 23.9722],
      泉州: [118.3228, 25.1147],
      泰安: [117.0264, 36.0516],
      泰州: [120.0586, 32.5525],
      济南: [117.1582, 36.8701],
      济宁: [116.8286, 35.3375],
      海口: [110.3893, 19.8516],
      淄博: [118.0371, 36.6064],
      淮安: [118.927, 33.4039],
      深圳: [114.5435, 22.5439],
      清远: [112.9175, 24.3292],
      温州: [120.498, 27.8119],
      渭南: [109.7864, 35.0299],
      湖州: [119.8608, 30.7782],
      湘潭: [112.5439, 27.7075],
      滨州: [117.8174, 37.4963],
      潍坊: [119.0918, 36.524],
      烟台: [120.7397, 37.5128],
      玉溪: [101.9312, 23.8898],
      珠海: [113.7305, 22.1155],
      盐城: [120.2234, 33.5577],
      盘锦: [121.9482, 41.0449],
      石家庄: [114.4995, 38.1006],
      福州: [119.4543, 25.9222],
      秦皇岛: [119.2126, 40.0232],
      绍兴: [120.564, 29.7565],
      聊城: [115.9167, 36.4032],
      肇庆: [112.1265, 23.5822],
      舟山: [122.2559, 30.2234],
      苏州: [120.6519, 31.3989],
      莱芜: [117.6526, 36.2714],
      菏泽: [115.6201, 35.2057],
      营口: [122.4316, 40.4297],
      葫芦岛: [120.1575, 40.578],
      衡水: [115.8838, 37.7161],
      衢州: [118.6853, 28.8666],
      西宁: [101.4038, 36.8207],
      西安: [109.1162, 34.2004],
      贵阳: [106.6992, 26.7682],
      连云港: [119.1248, 34.552],
      邢台: [114.8071, 37.2821],
      邯郸: [114.4775, 36.535],
      郑州: [113.4668, 34.6234],
      鄂尔多斯: [108.9734, 39.2487],
      重庆: [107.7539, 30.1904],
      金华: [120.0037, 29.1028],
      铜川: [109.0393, 35.1947],
      银川: [106.3586, 38.1775],
      镇江: [119.4763, 31.9702],
      长春: [125.8154, 44.2584],
      长沙: [113.0823, 28.2568],
      长治: [112.8625, 36.4746],
      阳泉: [113.4778, 38.0951],
      青岛: [120.4651, 36.3373],
      韶关: [113.7964, 24.7028],
    };
    const KEY1 = "去程方式";
    const KEY2 = "出发地";
    const KEY3 = "目的地";
    const VALUE1 = "直飞";
    var objkeys = Object.keys(geoCoordMap);
    // console.log(objkeys);
    var data = {};
    // {"出发地":[{name:"出发地"},{name:"到达地",value:"旅行方案数"}}]
    for (var i = 0; i < dataArray.length; i++) {
      var entries = dataArray[i];
      if (entries[KEY1] === VALUE1) {
        if (
          objkeys.indexOf(entries[KEY2]) != -1 &&
          objkeys.indexOf(entries[KEY3]) != -1
        ) {
          var pos1 = entries[KEY2];
          var pos2 = entries[KEY3];
          if (data[pos1]) {
            var flag = false;
            for (var j = 0; j < data[pos1].length; j++) {
              var entries1 = data[pos1][j];

              if (pos2 === entries1[1].name) {
                flag = true;
                entries1[1].value++;
                break;
              }
            }
            if (!flag) {
              data[pos1].push([{ name: pos1 }, { name: pos2, value: 1 }]);
            }
          } else {
            data[pos1] = [];
            data[pos1].push([{ name: pos1 }, { name: pos2, value: 1 }]);
          }
        }
      }
    }
    console.log(data);

    var newSeries = [];
    var dataKeys = Object.keys(data);

    for (var i = 0; i < dataKeys.length; i++) {
      var entries = data[dataKeys[i]];
      newSeries.push([dataKeys[i], entries]);
    }
    console.log(newSeries);

    var planePath =
      "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z";
    // var planePath = 'arrow';
    var convertData = function (data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];

        var fromCoord = geoCoordMap[dataItem[0].name];
        var toCoord = geoCoordMap[dataItem[1].name];
        if (fromCoord && toCoord) {
          res.push({
            fromName: dataItem[0].name,
            toName: dataItem[1].name,
            coords: [fromCoord, toCoord],
            value: dataItem[1].value,
          });
        }
      }
      return res;
    };

    var color = ["#a6c84c", "#ffa022", "#46bee9"]; //航线的颜色
    var series = [];
    newSeries.forEach(function (item, i) {
      series.push(
        {
          name: item[0] + " Top3",
          type: "lines",
          zlevel: 1,
          effect: {
            show: true,
            period: 6,
            trailLength: 0.7,
            color: "red", //arrow箭头的颜色
            symbolSize: 3,
          },
          lineStyle: {
            normal: {
              color: color[i],
              width: 0,
              curveness: 0.2,
            },
          },
          data: convertData(item[1]),
        },
        {
          name: item[0] + " Top3",
          type: "lines",
          zlevel: 2,
          symbol: ["none", "arrow"],
          symbolSize: 10,
          effect: {
            show: true,
            period: 6,
            trailLength: 0,
            symbol: planePath,
            symbolSize: 15,
          },
          lineStyle: {
            normal: {
              color: color[i],
              width: 1,
              opacity: 0.6,
              curveness: 0.2,
            },
          },
          data: convertData(item[1]),
        },
        {
          name: item[0] + " Top3",
          type: "effectScatter",
          coordinateSystem: "geo",
          zlevel: 2,
          rippleEffect: {
            brushType: "stroke",
          },
          label: {
            normal: {
              show: true,
              position: "right",
              formatter: "{b}",
            },
          },
          symbolSize: function (val) {
            return val[2] / 8;
          },
          itemStyle: {
            normal: {
              color: color[i],
            },
            emphasis: {
              areaColor: "#2B91B7",
            },
          },
          data: item[1].map(function (dataItem) {
            return {
              name: dataItem[1].name,
              value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value]),
            };
          }),
        }
      );
    });
    var option = {
      tooltip: {
        trigger: "item",
        formatter: function (params, ticket, callback) {
          if (params.seriesType == "effectScatter") {
            return "线路：" + params.data.name + "" + params.data.value[2];
          } else if (params.seriesType == "lines") {
            return (
              params.data.fromName +
              ">" +
              params.data.toName +
              "<br />" +
              "方案数:"+params.data.value
            );
          } else {
            return params.name;
          }
        },
      },
      legend: {
        show:false,
      },
      geo: {
        map: "china",
        label: {
          emphasis: {
            show: true,
            color: "#fff",
          },
        },
        // 把中国地图放大了1.2倍
        zoom: 1.2,
        roam: true,
        itemStyle: {
          normal: {
            // 地图省份的背景颜色
            areaColor: "rgba(20, 41, 87,0.6)",
            borderColor: "#195BB9",
            borderWidth: 1,
          },
          emphasis: {
            areaColor: "#2B91B7",
          },
        },
      },
      series: series,
    };
    myChart.setOption(option);
    // 监听浏览器缩放，图表对象调用缩放resize函数
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }
})();
