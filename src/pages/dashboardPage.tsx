import LayoutMain from "../templates/LayoutMain";
import Doughnut from "../components/chart/Doughnut";
import VerticalBar from "../components/chart/VerticalBar";
import StackedBar from "../components/chart/StackedBar";
import Header from "../components/common/Header";

const DashboardPage = () => {
  const content = () => {
    return (
      <>
        <div>
          <div className="w-96 h-72 rounded-md shadow-lg flex flex-col justify-center items-center">
            <h5 className="text-center font-semibold">Activity Today</h5>
            <Doughnut />
          </div>
          <div className="bg-white rounded-md shadow-md p-4 mt-2">
            <StackedBar />
          </div>
          <div className="bg-white rounded-md shadow-md p-4 mt-2">
            <VerticalBar />
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <Header title="Dashboard" />
      <article>{content()} </article>
    </>
  );
};

export default DashboardPage;
