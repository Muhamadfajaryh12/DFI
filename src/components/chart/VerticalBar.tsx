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
const VerticalBar = (props: any) => {
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
    labels: datas?.map((item: any) => item.city),
    datasets: [
      {
        label: "MALE",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        data: datas?.map((item: any) => item.laki_laki),
      },
      {
        label: "FEMALE",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        data: datas?.map((item: any) => item.perempuan),
      },
    ],
  };

  const options = {
    // responsive: true,
    // maintainAspectRatio: false,
    // scales: {
    //   x: {
    //     stacked: true,
    //   },
    //   y: {
    //     stacked: true,
    //   },
    // },
  };

  return <Bar data={data} options={options} />;
};

export default VerticalBar;
