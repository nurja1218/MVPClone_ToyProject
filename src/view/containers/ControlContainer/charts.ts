// ##############################
// // // javascript library for creating charts
// #############################

 var Chartist = require("chartist");

// ##############################
// // // variables used to create animation on charts
// #############################

export const chartOption = (props: any) => {
  const delays = 10;
  const durations = 20;
  const delays2 = 10;
  const durations2 = 10;

  console.log(props);

  const lineChart = {
    data: {
      labels: ["M", "T", "W", "T", "F", "S", "S", "M", "T", "W", "T", "F", "S", "S", "M", "T", "W", "T", "F", "S", "S", "M", "T", "W", "T", "F", "S", "S"],
      series: [[12, 17, 7, 17, 23, 18, 38, 12, 17, 7, 17, 23, 18, 38, 12, 17, 7, 17, 23, 18, 38, 12, 17, 7, 17, 23, 18, 38]],
    },
    options: {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0,
      }),
      low: 0,
      high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    // for animation
    animation: {
      draw: function (data: any) {
        if (data.type === "line" || data.type === "area") {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path
                .clone()
                .scale(1, 0)
                .translate(0, data.chartRect.height())
                .stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint,
            },
          });
        } else if (data.type === "point") {
          data.element.animate({
            opacity: {
              begin: (data.index + 1) * delays,
              dur: durations,
              from: 0,
              to: 1,
              easing: "ease",
            },
          });
        }
      },
    },
  };
  const barChart = {
    data: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]],
    },
    options: {
      axisX: {
        showGrid: false,
      },
      low: 0,
      high: 1000,
      chartPadding: {
        top: 0,
        right: 5,
        bottom: 0,
        left: 0,
      },
    },
    responsiveOptions: [
      [
        "screen and (max-width: 640px)",
        {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value: any) {
              return value[0];
            },
          },
        },
      ],
    ],
    animation: {
      draw: function (data: any) {
        if (data.type === "bar") {
          data.element.animate({
            opacity: {
              begin: (data.index + 1) * delays2,
              dur: durations2,
              from: 0,
              to: 1,
              easing: "ease",
            },
          });
        }
      },
    },
  };
  const pieChart = {
    data: {
      labels: [
        "윌로그",
        "종근당",
        "블루엠텍",
        "BLT",
        "현대자동차",
        "얀센",
      ],
      series: [10, 20, 30, 10, 20, 50],
    },
    options: {
        labelInterpolationFnc: function (value: any) {
        return value[0]
      }
    },
    // responsiveOptions: [
    //   ['screen and (min-width: 640px)', {
    //     chartPadding: 10,
    //     labelOffset: 100,
    //     labelDirection: 'explode',
    //     labelInterpolationFnc: function(value: any) {
    //       return value;
    //     }
    //   }],
    //   ['screen and (min-width: 1024px)', {
    //     labelOffset: 80,
    //     chartPadding: 20
    //   }]
    // ],
    // animation: {
    //   draw: function (data: any) {
    //     if(data.type === 'slice') {
    //       var pathLength = data.element._node.getTotalLength();
      
    //       data.element.attr({
    //         'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
    //       });
      
    //       var animationDefinition = {
    //         'stroke-dashoffset': {
    //           id: 'anim' + data.index,
    //           dur: 1000,
    //           from: -pathLength + 'px',
    //           to:  '0px',
    //           easing: Chartist.Svg.Easing.easeOutQuint,
    //           fill: 'freeze'
    //         }
    //       };
      
    //       // if(data.index !== 0) {
    //       //   animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
    //       // }
      
    //       data.element.attr({
    //         'stroke-dashoffset': -pathLength + 'px'
    //       });
      
    //       data.element.animate(animationDefinition, false);
    //     }
    //   },
    // },
  };
  return { lineChart, barChart, pieChart }
}

