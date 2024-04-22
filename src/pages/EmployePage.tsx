import { useDispatch } from "react-redux";
import Header from "../components/common/Header";
import { useAppSelector } from "../hooks/useRedux";
import { useEffect } from "react";
import { asyncGetEmployee } from "../states/employee/action";
import TableMain from "../components/TableMain";

const EmployePage = () => {
  const { employee = [] } = useAppSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetEmployee());
  }, [dispatch]);

  const dataTableHeader = [
    { name: "No" },
    { name: "Name" },
    { name: "Role" },
    { name: "No_Telp" },
    { name: "Jenis_kelamin" },
    { name: "Kota" },
  ];
  return (
    <div>
      <>
        <Header title="Employee" />
        <main>
          <TableMain
            headers={dataTableHeader}
            body={employee.employee.map((item: any, index: number) => ({
              ...item,
              no: index + 1,
            }))}
          />
        </main>
      </>
    </div>
  );
};

export default EmployePage;
