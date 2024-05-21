import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
const StackedBar = (props: any) => {
  const { datas } = props;
  console.log(props);
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const data = {
    labels: datas?.data?.map((item: any) => item.item.item_name),
    datasets: [
      {
        label: "OK",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        stack: "Stack 1",
        data: datas?.data?.map((item: any) => item.ok_count),
      },
      {
        label: "Not OK",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        stack: "Stack 1",
        data: datas?.data?.map((item: any) => item.not_ok_count),
      },
    ],
  };

  const options = {
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default StackedBar;
