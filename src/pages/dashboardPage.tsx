import Doughnut from "../components/chart/Doughnut";
import VerticalBar from "../components/chart/VerticalBar";
import StackedBar from "../components/chart/StackedBar";
import { useEffect, useState } from "react";
import axios from "axios";
import Selected from "../components/form/Selected";
import { useForm } from "react-hook-form";
import Input from "../components/form/Input";
import { Button } from "primereact/button";

const DashboardPage = (props: any) => {
  const { setTitle } = props;

  const [dataEmployee, setDataEmployee] = useState([]);
  const [dataPatrolStatus, setDataPatrolStatus] = useState([]);
  const [dataMastered, setDataMastered] = useState([]);
  const [dataPatrol, setDataPatrol] = useState([]);
  const [dataMasterProduct, setDataMasterProduct] = useState([]);
  const { register, control, handleSubmit } = useForm();
  const downloadPDF = () => {
    import("jspdf").then((jspdfModule) => {
      const jsPDF = jspdfModule.default;
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF();
        const table = document.querySelector("table");
        console.log(table);
        if (table) {
          // @ts-ignore
          doc.autoTable({ html: table });
        }
        doc.save("export_" + new Date().getTime() + ".pdf");
      });
    });
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
      const response = await axios.post(
        "http://127.0.0.1:8000/api/products/patrol/mastered",
        null
      );
      console.log(response);
      setDataMastered(response?.data);
    };

    const getPatrol = async () => {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/products/patrol/all",
        null
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

    const response_patrol = await axios.post(
      "http://127.0.0.1:8000/api/products/patrol/all",
      {
        id_master_product: datas.id_master_product,
        start_date: datas.start_date,
        end_date: datas.end_date,
      }
    );

    const response_patrol_mastered = await axios.post(
      "http://127.0.0.1:8000/api/products/patrol/mastered",
      {
        id_master_product: datas.id_master_product,
        start_date: datas.start_date,
        end_date: datas.end_date,
      }
    );

    setDataMastered(response_patrol_mastered?.data);

    setDataPatrol(response_patrol?.data.data);

    setDataPatrolStatus(response?.data);
  };

  const content = () => {
    return (
      <>
        <div>
          <form onSubmit={handleSubmit(onFilter)}>
            <div className="flex flex-wrap  justify-center sm:justify-start items-end">
              <div className="w-full sm:w-40 mx-2">
                <Selected
                  label="Filter Product"
                  name="id_master_product"
                  control={control}
                  data={dataMasterProduct}
                />
              </div>
              <div className="w-full sm:w-40 mx-2">
                <Input
                  label="Start Date"
                  type="date"
                  name="start_date"
                  register={register}
                />
              </div>
              <div className="w-full sm:w-40 mx-2">
                <Input
                  label="End Date"
                  type="date"
                  name="end_date"
                  register={register}
                />
              </div>
              <button
                type="submit"
                className="p-3 m-2 md:m-0 text-white font-bold bg-blue-500 w-full md:w-40 rounded-md"
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
            <div className="h-80 overflow-auto shadow-lg rounded-md m-2 w-full bg-white">
              <h5 className="text-center font-semibold bg-gray-100">
                Activity
              </h5>
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
                  {dataPatrol.slice(0, 10)?.map((item: any, index: number) => (
                    <tr className="border-2" key={index}>
                      <td className="text-center">{index + 1}</td>
                      <td>
                        {new Date(item?.created_at).toLocaleDateString(
                          "en-GB",
                          { day: "2-digit", month: "2-digit", year: "numeric" }
                        )}
                      </td>
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
          <div className="bg-white rounded-md shadow-md m-2">
            <h5 className="text-center font-semibold bg-gray-100 p-2">
              Data Patrol with Status
            </h5>
            <div
              style={{
                overflow: "auto",
                maxWidth: "1400px",
              }}
            >
              <div
                style={{
                  width: "1600px",
                  minHeight: "400px",
                }}
              >
                <StackedBar datas={dataPatrolStatus} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-md shadow-md m-2">
            <h5 className="text-center font-semibold bg-gray-100 p-2">
              Data Employeed
            </h5>
            <div
              style={{
                overflow: "auto",
                maxWidth: "1400px",
              }}
            >
              <div
                style={{
                  width: "1600px",
                  minHeight: "400px",
                }}
              >
                <VerticalBar datas={dataEmployee} />
              </div>
            </div>
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
