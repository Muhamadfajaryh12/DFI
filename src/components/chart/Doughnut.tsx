import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

const Doughnut = (props: any) => {
  const { datas } = props;
  ChartJS.register(ArcElement, Tooltip, Legend);
  const data = {
    labels: datas?.data?.map((item: any) => item?.product?.product_name),
    datasets: [
      {
        label: "Total",
        data: datas?.data?.map((item: any) => item?.total_count),
        backgroundColor: [
          "rgba(255, 99, 132 )",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192)",
          "rgba(153, 102, 255)",
          "rgba(255, 159, 64)",
        ],
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };
  // @ts-ignore
  return <Pie data={data} options={options} width={100} height={100} />;
};

export default Doughnut;
