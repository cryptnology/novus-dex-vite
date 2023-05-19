export const options: ApexCharts.ApexOptions = {
  chart: {
    animations: { enabled: true },
    toolbar: { show: false },
    width: "100px",
  },
  tooltip: {
    fillSeriesColor: true,
    followCursor: true,
    enabled: true,
    theme: undefined,
    style: {
      fontSize: "12px",
      fontFamily: undefined,
    },
    x: {
      show: false,
      format: "dd MMM",
      formatter: undefined,
    },
    y: {
      title: {
        formatter: undefined,
      },
    },
    marker: {
      show: false,
    },
    items: {
      display: "flex",
    },
    fixed: {
      enabled: false,
      position: "topRight",
      offsetX: 0,
      offsetY: 0,
    },
  },
  grid: {
    show: true,
    borderColor: "#767F92",
    strokeDashArray: 0,
  },
  plotOptions: {
    candlestick: {
      colors: {
        upward: "#02A34A",
        downward: "#EF4444",
      },
    },
  },
  xaxis: {
    type: "datetime",
    labels: {
      show: true,
      style: {
        colors: "#767F92",
        fontSize: "14px",
      },
    },
  },
  yaxis: {
    labels: {
      show: true,
      minWidth: 0,
      maxWidth: 160,
      style: {
        colors: "#767F92",
        fontSize: "14px",
      },
      offsetX: 0,
      offsetY: 0,
      rotate: 0,
    },
  },
};
