const ctx = document.getElementById("myChart").getContext("2d");

const DATA_COUNT = 5;
const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

const data = {
  labels: ["Sales", "Profit", "Progress", "Customers", "Orders"],
  datasets: [
    {
      label: "Our Statistics: ",
      data: Array.from(
        { length: DATA_COUNT },
        () =>
          Math.floor(Math.random() * (NUMBER_CFG.max - NUMBER_CFG.min + 1)) +
          NUMBER_CFG.min
      ),
      backgroundColor: ["#FF6384", "#FF9F40", "#FFCD56", "#4BC0C0", "#36A2EB"],
    },
  ],
};

const config = {
  type: "pie",
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Our Statistics",
      },
    },
  },
};

new Chart(ctx, config);

const chartContext = document.getElementById("myChart2").getContext("2d");

const dataCount = 7;
const numberConfig = { count: dataCount, min: -100, max: 100 };

const UtilFunctions = {
  generateMonths: ({ count }) => {
    const monthsArray = [
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
    return monthsArray.slice(0, count);
  },
  generateNumbers: ({ count, min, max }) => {
    const randomNumbers = [];
    for (let i = 0; i < count; i++) {
      randomNumbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return randomNumbers;
  },
  makeTransparent: (color, opacity) => {
    // Function to make a color transparent (placeholder)
    return color; // Placeholder return
  },
  CHART_COLORS: {
    red: "rgba(255, 99, 132, 1)",
    blue: "rgba(54, 162, 235, 1)",
    // Add more colors if needed
  },
};

const generatedLabels = UtilFunctions.generateMonths({ count: 7 });
const chartData = {
  labels: generatedLabels,
  datasets: [
    {
      label: "Investment",
      data: UtilFunctions.generateNumbers(numberConfig),
      borderColor: UtilFunctions.CHART_COLORS.red,
      backgroundColor: UtilFunctions.makeTransparent(
        UtilFunctions.CHART_COLORS.red,
        0.5
      ),
      yAxisID: "y",
    },
    {
      label: "Profit",
      data: UtilFunctions.generateNumbers(numberConfig),
      borderColor: UtilFunctions.CHART_COLORS.blue,
      backgroundColor: UtilFunctions.makeTransparent(
        UtilFunctions.CHART_COLORS.blue,
        0.5
      ),
      yAxisID: "y1",
    },
  ],
};

const chartActions = [
  {
    name: "Randomize",
    handler(chart) {
      chart.data.datasets.forEach((dataset) => {
        dataset.data = UtilFunctions.generateNumbers({
          count: chart.data.labels.length,
          min: -100,
          max: 100,
        });
      });
      chart.update();
    },
  },
];

const chartConfig = {
  type: "line",
  data: chartData,
  options: {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Sales Statistics",
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  },
};

new Chart(chartContext, chartConfig);
