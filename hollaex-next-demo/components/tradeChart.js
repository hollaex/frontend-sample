import React, { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts, { chart } from "highcharts";

const DEFAULT_CHART_OPTIONS = {
  tooltip: {
    enabled: true,
  },
  title: {
    text: null,
  },
  legend: {
    enabled: false,
  },
  chart: {
    // styledMode: true,
  },
  xAxis: {
    visible: true,
    minorTickInterval: "auto",
    labels: {
      enabled: false,
    },
    minPadding: 0.05,
    maxPadding: 0.05,
  },
  yAxis: {
    visible: true,
    minorTickInterval: "auto",
    tickAmount: 10,
    labels: {
      enabled: false,
    },
    title: false,
  },
  plotOptions: {
    series: {
	  color: '#00FF00', 
      negativeColor: '#FF0000',
      marker: {
        enabled: false,
        states: {
          hover: {
            enabled: false,
          },
        },
	  
      },
    },
  },

  pane: {
    size: "100%",
  },
};

export const TradeChart = ({ chartData, isArea }) => {
  const [finalChartData, setFinalChartData] = useState([]);

  useEffect(() => {
    if (!chartData || chartData.length === 0) {
      console.warn("Empty chart data provided");
      return;
    }

    // Initialize threshold with the first data point value
    let threshold = chartData[0];

    const updatedChartData = chartData.map((point, index) => {
      if (index > 0) {
        // Update threshold to be the previous point's value
        threshold = chartData[index - 1];
      }

      return {
        y: point,
        marker: {
          enabled: index === chartData.length - 1,
        },
        // Set the threshold for each point
        threshold: threshold,
      };
    });

    setFinalChartData(updatedChartData);
  }, [chartData]);

  
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={{
        ...DEFAULT_CHART_OPTIONS,
        series: [
          {
            name: "price",
            data: finalChartData || [],
            threshold: finalChartData[0],
            type: isArea ? "area" : "line",
          },
        ],
      }}
      containerProps={{
        style: { height: "100%", width: "100%" },
      }}
    />
  );
};
