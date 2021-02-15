// import './App.scss';
import './App.css';
import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import worldCapital from './worldCapital.json';
// import axios from 'axios';
window.echarts = echarts;

const data = [
  {
    // ItemStyle 中设置每一个数据项的颜色
    name: 'United States',
    value: 43
  },
  {
    name: 'Japan',
    value: 17 // 注意项与项之间的逗号
  },
  {
    name: 'France',
    value: 7
  },
  {
    name: 'Italy',
    value: 6
  },
  {
    name: 'Canada',
    value: 5
  },
  {
    name: 'United Kingdom',
    value: 4
  },
  {
    name: 'Spain',
    value: 4
  },
  {
    name: 'Holland',
    value: 4
  },
  {
    name: 'Belgium',
    value: 3
  },
  {
    name: 'Germany',
    value: 2
  },
  {
    name: 'Austria',
    value: 2
  },
  {
    name: 'Switzerland',
    value: 1
  },
  {
    name: 'Poland',
    value: 1
  },
  {
    name: 'Chile',
    value: 1
  }
];

const convertData = function (data) {
  var res = [];
  for (var i = 0; i < data.length; i++) {
    var geoCoord = worldCapital[data[i].name];
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value)
      });
    }
  }
  return res;
};
const createElement = ({ type = 'script', attrs }) => {
  return new Promise((resolve, reject) => {
    let element = document.createElement(type);
    attrs &&
      attrs.forEach((item) => {
        element.setAttribute(item[0], item[1]);
      });

    element.addEventListener('load', () => {
      resolve(element);
      // document.body.removeChild(element);
    });
    element.addEventListener('error', (e) => {
      reject(e);
    });
    // document.body.appendChild(element);
    document.body.appendChild(element);
    // resolve();
  });
};

function App() {
  useEffect(() => {
    (async () => {
      await createElement({
        attrs: [
          ['type', 'text/javascript'],
          ['src', 'https://assets.pyecharts.org/assets/maps/world.js']
        ]
      });

      const myChart = echarts.init(mapDom.current, 'white');
      const option_container = {
        // 默认的颜色数组 （如果不明确设置每个数据项的颜色，则会采用默认的数组
        // 此处的颜色为十六进制表示，也可以使用rgb来表示。简单地理解就是一串字符就代表一个颜色，挑选喜欢的颜色可以自行搜索颜色
        // color: ['#ac6767', '#1d953f', '#6950a1', '#918597'],
        color: ['#FF7626'],
        geo: {
          show: true,
          map: 'world',
          roam: true
        },
        series: [
          {
            name: 'pm2.5',
            type: 'scatter',
            symbol: 'pin',
            coordinateSystem: 'geo',
            data: convertData(data),
            encode: {
              value: 2
            },
            symbolSize: function (val) {
              return val[2];
            },
            label: {
              show: true,
              formatter: '{@[2]}',
              position: 'inside'
            },
            itemStyle: {
              color: '#FF7626'
            },
            emphasis: {
              label: {
                show: true
              }
            },
            tooltip: {
              formatter: ({ name, value }) => {
                return `${name}: ${value[2] || 0}`;
              }
            }
          },
          {
            type: 'map',
            geoIndex: 0,
            name: 'test',
            label: {
              show: false,
              position: 'top',
              margin: 8
            },
            mapType: 'world',
            data,
            roam: false,
            zoom: 1,
            // 去除各个国家上的小红点
            showLegendSymbol: false,
            tooltip: {
              formatter: ({ name, value }) => {
                return `${name}: ${value || 0}`;
              }
            }
          }
        ],
        // visualMap: {
        //   min: 800,
        //   max: 50000,
        //   text: ['High', 'Low'],
        //   realtime: false,
        //   calculable: true,
        //   inRange: {
        //     color: ['lightskyblue', 'yellow', 'orangered']
        //   }
        // },
        // 鼠标悬浮，单击产生的效果（在网页上可以动态显示）
        tooltip: {
          show: true,
          trigger: 'item',
          triggerOn: 'mousemove|click',
          formatter: '{c}',
          textStyle: {
            fontSize: 14,
            color: '#fff'
          },

          backgroundColor: '#999',
          borderWidth: 0
        }
      };
      myChart.setOption(option_container);
    })();
  }, []);
  const mapDom = useRef();
  return (
    <div className='App'>
      这里是世界地图
      <div ref={mapDom} style={{ width: 680, height: 440 }}></div>
    </div>
  );
}

export default App;
