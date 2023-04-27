import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

function CurrencyChart({ data }) {
  const totalDuration = 150;
  const delayBetweenPoints = totalDuration / data.datasets.length;
  const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: false,
    },
    animation: {
      x: {
        type: 'number',
        easing: 'linear',
        duration: delayBetweenPoints,
      },
    },
    scales: {
      x: {
        border: {
          display: true,
        },
        grid: {
          display: true,
          drawOnChartArea: true,
          drawTicks: true,
        },
        ticks: {
          callback: function (val, index) {
            return index % 4 === 0 ? data.labels[val] : '';
          }
        }
      },
      y: {
        border: {
          display: false,
        },
        grid: {
          color: '#545659'
        }
      }
    }
  };

  return (
    <Line options={options} data={data} />
  );
}

export default CurrencyChart;