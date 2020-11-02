const axios = require("axios");

// Set new default font family and font color to mimic Bootstrap's default styling
(Chart.defaults.global.defaultFontFamily = "Nunito"),
  '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = "#858796";

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + "").replace(",", "").replace(" ", "");
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = typeof thousands_sep === "undefined" ? "," : thousands_sep,
    dec = typeof dec_point === "undefined" ? "." : dec_point,
    s = "",
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return "" + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || "").length < prec) {
    s[1] = s[1] || "";
    s[1] += new Array(prec - s[1].length + 1).join("0");
  }
  return s.join(dec);
}

function getmyplan() {
  axios.get(`https://lfamarket-api.herokuapp.com/api/getmyplan/${user.id}`).then((res) => {
    if (res.status == 200) {
      if (res.data) {
        
        // Area Chart Example
        var ctx = document.getElementById("myAreaChart");
        var myLineChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: dateRange(
              new Date(res.data.startDate),
              new Date(res.data.endDate)
            ),
            datasets: [
              {
                label: "Earnings",
                lineTension: 0.3,
                backgroundColor: "rgba(78, 115, 223, 0.05)",
                borderColor: "rgba(78, 115, 223, 1)",
                pointRadius: 3,
                pointBackgroundColor: "rgba(78, 115, 223, 1)",
                pointBorderColor: "rgba(78, 115, 223, 1)",
                pointHoverRadius: 3,
                pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
                pointHoverBorderColor: "rgba(78, 115, 223, 1)",
                pointHitRadius: 10,
                pointBorderWidth: 2,
                data: handlePlans(res.data.plan),
              },
            ],
          },
          options: {
            maintainAspectRatio: false,
            layout: {
              padding: {
                left: 10,
                right: 25,
                top: 25,
                bottom: 0,
              },
            },
            scales: {
              xAxes: [
                {
                  time: {
                    unit: "date",
                  },
                  gridLines: {
                    display: false,
                    drawBorder: false,
                  },
                  ticks: {
                    maxTicksLimit: 7,
                  },
                },
              ],
              yAxes: [
                {
                  ticks: {
                    maxTicksLimit: 5,
                    padding: 10,
                    // Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                      return "R" + number_format(value);
                    },
                  },
                  gridLines: {
                    color: "rgb(234, 236, 244)",
                    zeroLineColor: "rgb(234, 236, 244)",
                    drawBorder: false,
                    borderDash: [2],
                    zeroLineBorderDash: [2],
                  },
                },
              ],
            },
            legend: {
              display: false,
            },
            tooltips: {
              backgroundColor: "rgb(255,255,255)",
              bodyFontColor: "#858796",
              titleMarginBottom: 10,
              titleFontColor: "#6e707e",
              titleFontSize: 14,
              borderColor: "#dddfeb",
              borderWidth: 1,
              xPadding: 15,
              yPadding: 15,
              displayColors: false,
              intersect: false,
              mode: "index",
              caretPadding: 10,
              callbacks: {
                label: function (tooltipItem, chart) {
                  var datasetLabel =
                    chart.datasets[tooltipItem.datasetIndex].label || "";
                  return (
                    datasetLabel + ": R" + number_format(tooltipItem.yLabel)
                  );
                },
              },
            },
          },
        });
      }
    }
  });
}
function dateRange(startDate, endDate) {
  var start = startDate.toISOString().split("-");
  var end = endDate.toISOString().split("-");
  var startYear = parseInt(start[0]);
  var endYear = parseInt(end[0]);
  var dates = [];

  for (var i = startYear; i <= endYear; i++) {
    var endMonth = i != endYear ? 11 : parseInt(end[1]) - 1;
    var startMon = i === startYear ? parseInt(start[1]) - 1 : 0;
    for (var j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j + 1) {
      var month = j + 1;
      var displayMonth = month < 10 ? "0" + month : month;
      dates.push([i, displayMonth, "01"].join("-"));
    }
  }
  var months = [
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
  ];
  return dates.map((item) => months[new Date(item).getMonth()]);
}
function handlePlans(val) {
  switch (val) {
    case "one":
      return handleTap(1, 8800);
      break;

    case "two":
      return handleTap(2, 14800);
      break;
    case "four":
      return handleTap(4, 37800);
      break;
    case "six":
      return handleTap(6, 78800);
      break;
    case "eight":
      return handleTap(8, 123800);
      break;
    case "twelve":
      return handleTap(12, 181800);
      break;

    default:
      break;
  }
}
function handleTap(month, capital) {
  var arr = [];
  for (let index = 0; index <= month; index++) {
    arr.push(Math.round((capital / month) * index));
  }
  return arr;
}

getmyplan();
