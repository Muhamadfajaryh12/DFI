import { useDispatch, useSelector } from "react-redux";
import TableMain from "../../components/TableMain";
import Header from "../../components/common/Header";
import { useEffect, useState } from "react";
import {
  asyncDeleteMasterLocation,
  asyncGetMasterLocation,
  asyncStoreMasterLocation,
  asyncUpdateMasterLocation,
} from "../../states/location/master/action";
import { useAppSelector } from "../../hooks/useRedux";
import Input from "../../components/form/Input";
import { useForm } from "react-hook-form";
import Selected from "../../components/form/Selected";
import axios from "axios";
const MasterLocationPage = () => {
  const dispatch = useDispatch();
  const { master_location = [] } = useAppSelector((state) => state);
  const [itemId, setId] = useState(null);
  const [datas, setDatas] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm();

  useEffect(() => {
    dispatch(asyncGetMasterLocation());
  }, [dispatch]);
  useEffect(() => {
    const getDetail = async (id: number) => {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/locations/master/${id}`
      );
      const {
        data: { data },
      } = response;
      setValue("id_master_location", data.id);
      setValue("name_master_location", data.location_name);
      setValue("no_referensi_master_location", data.no_referensi);
      setValue("check_allow_master_location", data.check_allow);
      return setDatas(data);
    };

    if (itemId) {
      getDetail(itemId);
    }
  }, [itemId]);
  const dataSelected = [
    { id: "Quality Control" },
    { id: "Maintenance" },
    { id: "Security" },
  ];

  const dataTableHeader = [
    { name: "No" },
    { name: "Location_Name" },
    { name: "No_Referensi" },
    { name: "Location_Code" },
  ];

  const storeMasterLocation = async (dispatch: any, data: any) => {
    return await dispatch(
      asyncStoreMasterLocation({
        location_name: data.name_master_location,
        check_allow: data.check_allow_master_location,
        no_referensi: data.no_referensi_master_location,
      })
    );
  };

  const updateMasterLocation = async (dispatch: any, data: any) => {
    return await dispatch(
      asyncUpdateMasterLocation({
        id: data.id_master_location,
        location_name: data.name_master_location,
        check_allow: data.check_allow_master_location,
        no_referensi: data.no_referensi_master_location,
      })
    );
  };

  const deleteMasterLocation = async (dispatch: any, data: any) => {
    return await dispatch(asyncDeleteMasterLocation(data.id_master_location));
  };

  const onStore = async (data: any, e: any) => {
    e.preventDefault();
    const response = await storeMasterLocation(dispatch, data);
    if (response.status === true) {
      reset();
    }
  };

  const onUpdate = async (data: any, e: any) => {
    e.preventDefault();
    await updateMasterLocation(dispatch, data);
  };

  const onDelete = async (data: any, e: any) => {
    e.preventDefault();
    await deleteMasterLocation(dispatch, data);
  };

  const layoutModalStore = () => {
    return (
      <>
        <form onSubmit={handleSubmit(onStore)}>
          <Input
            type="text"
            label="Location Name"
            name="name_master_location"
            register={register}
            error={errors.name_master_location}
            required={true}
          />
          <Input
            type="text"
            label="No Referensi"
            name="no_referensi_master_location"
            register={register}
            error={errors.no_referensi_master_location}
            required={true}
          />
          <Selected
            label="Check Allow"
            control={control}
            name="check_allow_master_location"
            error={errors.check_allow_master_location}
            require={true}
            data={dataSelected}
          />
          <button
            type="submit"
            className="p-2 bg-blue-400 hover:bg-blue-500 text-white rounded-md m-2"
          >
            Submit
          </button>
        </form>
      </>
    );
  };
  const layoutModalDetail = (data: any) => {
    return (
      <>
        <div className="flex justify-evenly items-center">
          <div className="">
            <div className="grid grid-cols-6 gap-4">
              <label className="col-span-1">Name</label>
              <p className="col-span-1">:</p>
              <h6 className="col-span-1">{data?.location_name}</h6>
            </div>
            <div className="grid grid-cols-6 gap-4">
              <label className="col-span-1">Check Allow</label>
              <p className="col-span-1">:</p>
              <h6 className="col-span-1">{data?.check_allow}</h6>
            </div>
            <div className="grid grid-cols-6 gap-4">
              <label className="col-span-1">No Referensi</label>
              <p className="col-span-1">:</p>
              <h6 className="col-span-1">{data?.no_referensi}</h6>
            </div>
          </div>
          <div className="text-center w-40">
            <label className="font-bold">QR Code</label>
            <img
              src={`http://127.0.0.1:8000/storage/${data?.foto_qr}`}
              alt=""
            />
            <p className="p-2 mt-1 bg-green-500 text-white">
              {data?.location_code}
            </p>
          </div>
        </div>
      </>
    );
  };
  const layoutModalUpdate = () => {
    return (
      <>
        <form onSubmit={handleSubmit(onUpdate)}>
          <Input type="hidden" name="id_master_location" register={register} />
          <Input
            type="text"
            label="Location Name"
            name="name_master_location"
            register={register}
            error={errors.name_master_location}
            required={true}
          />
          <Input
            type="text"
            label="No Referensi"
            name="no_referensi_master_location"
            register={register}
            error={errors.no_referensi_master_location}
            required={true}
          />
          <Selected
            label="Check Allow"
            control={control}
            name="check_allow_master_location"
            error={errors.check_allow_master_location}
            require={true}
            data={dataSelected}
          />
          <button
            type="submit"
            className="p-2 bg-blue-400 hover:bg-blue-500 text-white rounded-md m-2"
          >
            Submit
          </button>
        </form>
      </>
    );
  };
  const layoutModalDelete = () => {
    return (
      <>
        <form className="text-center" onSubmit={handleSubmit(onDelete)}>
          <h4 className="font-bold">Are you sure delete this item?</h4>
          <Input type="hidden" name="id_master_location" register={register} />
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
  return (
    <>
      <Header title="Master Location" />
      <main className="p-2">
        <TableMain
          headers={dataTableHeader}
          body={master_location?.master_location?.map(
            (item: any, index: number) => ({
              ...item,
              no: index + 1,
            })
          )}
          contentModal={{
            store: layoutModalStore(),
            update: layoutModalUpdate(),
            delete: layoutModalDelete(),
            detail: layoutModalDetail(datas),
          }}
          itemId={setId}
        />
      </main>
    </>
  );
};

export default MasterLocationPage;
