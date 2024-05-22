import Doughnut from "../components/chart/Doughnut";
import VerticalBar from "../components/chart/VerticalBar";
import StackedBar from "../components/chart/StackedBar";
import Header from "../components/common/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import Selected from "../components/form/Selected";
import { useForm } from "react-hook-form";
import Input from "../components/form/Input";
import { Button } from "primereact/button";
import { jsPDF } from "jspdf";

const DashboardPage = (props: any) => {
  const { setTitle } = props;

  const [dataEmployee, setDataEmployee] = useState([]);
  const [dataPatrolStatus, setDataPatrolStatus] = useState([]);
  const [dataMastered, setDataMastered] = useState([]);
  const [dataPatrol, setDataPatrol] = useState([]);
  const [dataMasterProduct, setDataMasterProduct] = useState([]);
  const { register, control, handleSubmit } = useForm();
  const downloadPDF = () => {
    const doc = new jsPDF();
    const chartCanvases = document.querySelectorAll("canvas");

    chartCanvases.forEach((canvas, index) => {
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      doc.addImage(imgData, "JPEG", 15, 40 + index * 150, 180, 120);
      if (index < chartCanvases.length - 1) {
        doc.addPage();
      }
    });

    doc.save("stackedBarCharts.pdf");
  };
  useEffect(() => {
    const getDataEmployee = async () => {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/user/employee"
      );
      setDataEmployee(response?.data);
    };

    const getDataPatrol = async () => {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/products/patrol/status",
        null
      );
      setDataPatrolStatus(response?.data);
    };

    const getDataMastered = async () => {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/products/patrol/mastered"
      );
      setDataMastered(response?.data);
    };

    const getPatrol = async () => {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/products/patrol"
      );
      setDataPatrol(response?.data.data);
    };

    const getMasterProduct = async () => {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/products/master"
      );
      setDataMasterProduct(response?.data.data);
    };

    setTitle("Dashboard");
    getMasterProduct();
    getDataEmployee();
    getPatrol();
    getDataPatrol();
    getDataMastered();
  }, []);

  const onFilter = async (datas: any) => {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/products/patrol/status",
      {
        id_master_product: datas.id_master_product,
        start_date: datas.start_date,
        end_date: datas.end_date,
      }
    );
    console.log("test", response);
    setDataPatrolStatus(response?.data);
  };
  const content = () => {
    return (
      <>
        <div>
          <form onSubmit={handleSubmit(onFilter)}>
            <div className="flex flex-wrap justify-start items-center">
              <div className="w-40 mx-2">
                <Selected
                  label="Filter Product"
                  name="id_master_product"
                  control={control}
                  data={dataMasterProduct}
                />
              </div>
              <div className="w-40 mx-2">
                <Input
                  label="Start Date"
                  type="date"
                  name="start_date"
                  register={register}
                />
              </div>
              <div className="w-40 mx-2">
                <Input
                  label="End Date"
                  type="date"
                  name="end_date"
                  register={register}
                />
              </div>
              <button
                type="submit"
                className="p-3 m-2 text-white font-bold bg-blue-500 w-full md:w-40 rounded-md"
              >
                Filter
              </button>
            </div>
          </form>
          <div className="flex justify-end m-2">
            <Button
              label="PDF"
              icon="pi pi-file-pdf"
              className="p-button-danger m-0 w-full md:w-40 "
              data-pr-tooltip="PDF"
              onClick={downloadPDF}
            />
          </div>
          <div className="flex flex-wrap justify-center lg:flex-nowrap lg:justify-between">
            <div className="w-96 h-80 rounded-md shadow-lg m-2 flex flex-col justify-center items-center bg-white">
              <Doughnut datas={dataMastered} />
            </div>
            <div className="h-80 overflow-auto shadow-lg rounded-md m-2 p-2 w-full bg-white">
              <h5 className="text-center font-semibold">Activity</h5>
              <table className="table-auto w-full border border-neutral-200">
                <thead>
                  <tr>
                    <th className="border border-neutral-200">No</th>
                    <th className="border border-neutral-200">Date</th>
                    <th className="border border-neutral-200">Product</th>
                    <th className="border border-neutral-200">Item</th>
                    <th className="border border-neutral-200">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {dataPatrol?.map((item: any, index) => (
                    <tr className="border-2">
                      <td className="text-center">{index + 1}</td>
                      <td>{new Date(item?.created_at).toLocaleDateString()}</td>
                      <td>{item?.product.product_name}</td>
                      <td>{item?.item.item_name}</td>
                      <td>
                        {item?.patrol_status == "OK" ? (
                          <div className="bg-green-400 text-center">
                            {item?.patrol_status}
                          </div>
                        ) : (
                          <div className="bg-red-400 text-center">
                            {item?.patrol_status}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-white rounded-md shadow-md p-4 m-2">
            <h5 className="text-center font-semibold">
              Data Patrol with Status
            </h5>

            <StackedBar datas={dataPatrolStatus} />
          </div>
          <div className="bg-white rounded-md shadow-md p-4 m-2">
            <h5 className="text-center font-semibold">Data Employee</h5>
            <VerticalBar datas={dataEmployee} />
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <div className="p-2 m-2">
        <main>{content()}</main>
      </div>
    </>
  );
};

export default DashboardPage;
