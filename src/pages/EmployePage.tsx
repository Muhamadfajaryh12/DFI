import { useDispatch } from "react-redux";
import Header from "../components/common/Header";
import { useAppSelector } from "../hooks/useRedux";
import { useEffect, useState } from "react";
import {
  asyncDeleteEmployee,
  asyncGetEmployee,
  asyncStoreEmployee,
  asyncUpdateEmployee,
} from "../states/employee/action";
import TableMain from "../components/TableMain";
import { useForm } from "react-hook-form";
import Input from "../components/form/Input";
import Selected from "../components/form/Selected";
import axios from "axios";
import userProfile from "../assets/user_profile.png";
import { ToastError, ToastSuccess } from "../components/common/MessageToast";

const EmployePage = (props: any) => {
  const { toggle } = props;
  const { employee = [] } = useAppSelector((state) => state.employee);

  const [itemId, setId] = useState(null);
  const [datas, setDatas] = useState([]);

  const dispatch = useDispatch();
  const getEmployee = (dispatch: any) => {
    dispatch(asyncGetEmployee());
  };
  useEffect(() => {
    getEmployee(dispatch);
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    reset,
  } = useForm();

  useEffect(() => {
    const getDetail = async (id: number) => {
      const response = await axios.get(`http://127.0.0.1:8000/api/user/${id}`);
      const {
        data: { data },
      } = response;
      setValue("id_employee", data.id);
      setValue("name_employee", data.name);
      setValue("no_telp_employee", data.no_telp);
      setValue("gender", data.jenis_kelamin);
      setValue("city", data.kota);
      setValue("role", data.role);
      return setDatas(data);
    };
    if (itemId) {
      getDetail(itemId);
    }
  }, [itemId]);

  const dataTableHeader = [
    { name: "No" },
    { name: "Name" },
    { name: "Position" },
    { name: "Handphone" },
    { name: "Gender" },
    { name: "City" },
  ];
  const genderData = [
    { id: "Laki-Laki", name: "Laki-Laki" },
    { id: "Perempuan", name: "Perempuan" },
  ];

  const cityData = [
    { id: "Jakarta", name: "Jakarta" },
    { id: "Bandung", name: "Bandung" },
    { id: "Surabaya", name: "Surabaya" },
    { id: "Karawang", name: "Karawang" },
  ];

  const roleData = [
    { id: "Quality Control", name: "Quality Control" },
    { id: "Maintenance", name: "Maintenance" },
    { id: "Admin", name: "Admin" },
  ];

  const storeEmployee = async (dispatch: any, data: any) => {
    const response: any = await dispatch(
      asyncStoreEmployee({
        username: data.username_employee,
        name: data.name_employee,
        password: data.username_employee,
        jenis_kelamin: data.gender,
        kota: data.city,
        no_telp: data.no_telp_employee,
        role: data.role,
      })
    );
    if (response.status) {
      ToastSuccess(response.message);
      reset();
    }
  };

  const updateEmployee = async (dispatch: any, data: any) => {
    const response: any = await dispatch(
      asyncUpdateEmployee({
        id: data.id_employee,
        name: data.name_employee,
        jenis_kelamin: data.gender,
        kota: data.city,
        no_telp: data.no_telp_employee,
        role: data.role,
      })
    );
    if (response.status) {
      ToastSuccess(response.message);
    }
  };

  const deleteEmployee = async (dispatch: any, data: any) => {
    const response: any = await dispatch(asyncDeleteEmployee(data.id_employee));
    if (response.status) {
      ToastSuccess(response.message);
    }
  };

  const onStore = async (data: any, e: any) => {
    e.preventDefault();
    await storeEmployee(dispatch, data);
  };

  const onUpdate = async (data: any, e: any) => {
    e.preventDefault();
    await updateEmployee(dispatch, data);
  };
  const onDelete = async (data: any, e: any) => {
    e.preventDefault();
    await deleteEmployee(dispatch, data);
  };

  const layoutModalStore = () => {
    return (
      <>
        <form onSubmit={handleSubmit(onStore)}>
          <Input
            label="Username"
            type="text"
            name="username_employee"
            register={register}
            required={true}
            error={errors.username_employee}
          />
          <Input
            label="Name"
            type="text"
            name="name_employee"
            register={register}
            required={true}
            error={errors.name_employee}
          />
          <Input
            label="Number Telphone"
            type="number"
            name="no_telp_employee"
            register={register}
            required={true}
            error={errors.no_telp_employee}
          />
          <Selected
            label="Gender"
            control={control}
            name="gender"
            error={errors.gender}
            require={true}
            data={genderData}
          />
          <Selected
            label="City"
            control={control}
            name="city"
            error={errors.city}
            require={true}
            data={cityData}
          />
          <Selected
            label="Role"
            control={control}
            name="role"
            error={errors.role}
            require={true}
            data={roleData}
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className="p-2 bg-blue-400 hover:bg-blue-500 text-white rounded-md m-2 w-40"
            >
              Submit
            </button>
          </div>
        </form>
      </>
    );
  };

  const layoutModalDetail = (data: any) => {
    return (
      <>
        <div className="flex justify-evenly items-center">
          <div className="">
            <div className="grid grid-cols-3 gap-4">
              <label className="col-span-1">Name</label>
              <p className="col-span-1">:</p>
              <h6 className="col-span-1">{data?.name}</h6>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <label className="col-span-1">Gender</label>
              <p className="col-span-1">:</p>
              <h6 className="col-span-1">{data?.jenis_kelamin}</h6>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <label className="col-span-1">City</label>
              <p className="col-span-1">:</p>
              <h6 className="col-span-1">{data?.kota}</h6>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <label className="col-span-1">Number Telephone</label>
              <p className="col-span-1">:</p>
              <h6 className="col-span-1">{data?.no_telp}</h6>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <label className="col-span-1">Position</label>
              <p className="col-span-1">:</p>
              <h6 className="col-span-1">{data?.role}</h6>
            </div>
          </div>
          <img
            className="w-40"
            src={
              data.foto != null
                ? `http://127.0.0.1:8000/storage/${data?.foto}`
                : userProfile
            }
            alt=""
          />
        </div>
      </>
    );
  };

  const layoutModalUpdate = () => {
    return (
      <>
        <form onSubmit={handleSubmit(onUpdate)}>
          <Input type="hidden" name="id_employee" register={register} />
          <Input
            label="Name"
            type="text"
            name="name_employee"
            register={register}
            required={true}
            error={errors.name_employee}
          />
          <Input
            label="Number Telphone"
            type="number"
            name="no_telp_employee"
            register={register}
            required={true}
            error={errors.no_telp_employee}
          />
          <Selected
            label="Gender"
            control={control}
            name="gender"
            error={errors.gender}
            require={true}
            data={genderData}
          />
          <Selected
            label="City"
            control={control}
            name="city"
            error={errors.city}
            require={true}
            data={cityData}
          />
          <Selected
            label="Role"
            control={control}
            name="role"
            error={errors.role}
            require={true}
            data={roleData}
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className="p-2 bg-blue-400 hover:bg-blue-500 text-white rounded-md m-2 w-40"
            >
              Submit
            </button>
          </div>
        </form>
      </>
    );
  };

  const layoutModalDelete = () => {
    return (
      <>
        <form className="text-center" onSubmit={handleSubmit(onDelete)}>
          <Input type="hidden" name="id_employee" register={register} />

          <h4 className="font-bold">Are you sure delete this item?</h4>
          <button
            type="submit"
            className="p-2 my-2 rounded-md bg-red-400 hover:bg-red-500 text-white"
          >
            Confirm
          </button>
        </form>
      </>
    );
  };

  const dataFormat = employee.map((item: any, index: number) => ({
    no: index + 1,
    name: item?.name,
    position: item?.role,
    handphone: item?.no_telp,
    gender: item?.jenis_kelamin,
    city: item?.kota,
    id: item?.id,
  }));
  return (
    <div className="p-2 m-2">
      <>
        <Header title="Employee" toggle={toggle} />
        <main>
          <TableMain
            headers={dataTableHeader}
            body={dataFormat}
            contentModal={{
              store: layoutModalStore(),
              detail: layoutModalDetail(datas),
              update: layoutModalUpdate(),
              delete: layoutModalDelete(),
            }}
            itemId={setId}
          />
        </main>
      </>
    </div>
  );
};

export default EmployePage;
