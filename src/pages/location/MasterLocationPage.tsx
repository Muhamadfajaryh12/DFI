import { useDispatch } from "react-redux";
import TableMain from "../../components/TableMain";
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
import { ToastSuccess } from "../../components/common/MessageToast";
const MasterLocationPage = (props: any) => {
  const { setTitle } = props;

  const dispatch = useDispatch();
  const { master_location = [] } = useAppSelector(
    (state) => state.master_location
  );
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
  const getMasterLocation = (dispatch: any) => {
    dispatch(asyncGetMasterLocation());
  };

  useEffect(() => {
    setTitle("Master Location");
  }, []);

  useEffect(() => {
    getMasterLocation(dispatch);
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

  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  useEffect(() => {
    if (isCreateModalOpen) {
      reset();
    }
  }, [isCreateModalOpen, reset]);

  const onOpenStoreModal = () => {
    setCreateModalOpen(true);
  };

  const onCloseStoreModal = () => {
    setCreateModalOpen(false);
  };

  const dataSelected = [
    { id: "Quality Control", name: "Quality Control" },
    { id: "Maintenance", name: "Maintenance" },
    { id: "Security", name: "Security" },
  ];

  const dataTableHeader = [
    { name: "No" },
    { name: "Location Name" },
    { name: "No Referensi" },
    { name: "Location Code" },
  ];

  const storeMasterLocation = async (dispatch: any, data: any) => {
    const response: any = await dispatch(
      asyncStoreMasterLocation({
        location_name: data.name_master_location,
        check_allow: data.check_allow_master_location,
        no_referensi: data.no_referensi_master_location,
      })
    );
    if (response.status) {
      ToastSuccess(response.message);
      reset();
    }
  };

  const updateMasterLocation = async (dispatch: any, data: any) => {
    const response: any = await dispatch(
      asyncUpdateMasterLocation({
        id: data.id_master_location,
        location_name: data.name_master_location,
        check_allow: data.check_allow_master_location,
        no_referensi: data.no_referensi_master_location,
      })
    );
    if (response.status) {
      ToastSuccess(response.message);
    }
  };

  const deleteMasterLocation = async (dispatch: any, data: any) => {
    const response: any = await dispatch(
      asyncDeleteMasterLocation(data.id_master_location)
    );
    if (response.status) {
      ToastSuccess(response.message);
    }
  };

  const onStore = async (data: any, e: any) => {
    e.preventDefault();
    await storeMasterLocation(dispatch, data);
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
        <div className="flex justify-center lg:justify-between items-center flex-wrap">
          <div className="">
            <div className="grid grid-cols-2 gap-1 text-xs sm:text-lg">
              <label>Name</label>
              <h6>: {data?.location_name}</h6>
            </div>
            <div className="grid grid-cols-2 gap-1 text-xs sm:text-lg">
              <label>Check Allow</label>
              <h6>: {data?.check_allow}</h6>
            </div>
            <div className="grid grid-cols-2 gap-1 text-xs sm:text-lg">
              <label>No Referensi</label>
              <h6>: {data?.no_referensi}</h6>
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

  const dataFormat = master_location.map((item: any, index: number) => ({
    no: index + 1,
    "location name": item.location_name,
    "no referensi": item.no_referensi,
    "location code": item.location_code,
    id: item.id,
  }));
  return (
    <>
      <div className="p-2 m-2 ">
        <main className="p-2">
          <TableMain
            headers={dataTableHeader}
            body={dataFormat}
            contentModal={{
              store: layoutModalStore(),
              update: layoutModalUpdate(),
              delete: layoutModalDelete(),
              detail: layoutModalDetail(datas),
            }}
            itemId={setId}
            onOpenStoreModal={onOpenStoreModal}
            onCloseStoreModal={onCloseStoreModal}
          />
        </main>
      </div>
    </>
  );
};

export default MasterLocationPage;
