import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/useRedux";
import Input from "../../components/form/Input";
import { MasterLocationType } from "../../types/location/MasterLocationType";
import { ItemLocationType } from "../../types/location/ItemLocationType";
import Selected from "../../components/form/Selected";
import TableMain from "../../components/TableMain";
import Radio from "../../components/form/Radio";
import TextArea from "../../components/form/TextArea";
import {
  asyncDeletePatrolLocation,
  asyncGetPatrolLocation,
  asyncStorePatrolLocation,
  asyncUpdatePatrolLocation,
} from "../../states/location/patrol/action";
import axios from "axios";
import { ToastSuccess } from "../../components/common/MessageToast";
import ItemLocationAPI from "../../API/location/ItemLocationAPI";
import MasterLocationAPI from "../../API/location/MasterLocationAPI";
const PatrolLocationPage = (props: any) => {
  const { patrol_location = [] } = useAppSelector(
    (state) => state.patrol_location
  );
  const { setTitle } = props;
  const [item_location, set_item_location] = useState([]);
  const [master_location, set_master_location] = useState([]);
  const { user = [] } = useAppSelector((state) => state);
  const dispatch = useDispatch();
  const [itemId, setId] = useState(null);
  const [datas, setDatas] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    reset,
  } = useForm();

  setValue("patrol_by", user?.role);
  setValue("id_user", user?.id);

  useEffect(() => {
    const getItemLocation = async () => {
      const response: any = await ItemLocationAPI.getItemLocation();
      set_item_location(response?.data);
    };
    getItemLocation();
  }, []);

  useEffect(() => {
    const getMasterLocation = async () => {
      const response: any = await MasterLocationAPI.getMasterLocation();
      set_master_location(response?.data);
    };
    getMasterLocation();
  }, []);

  const getPatrolLocation = (dispatch: any) => {
    dispatch(asyncGetPatrolLocation());
  };

  useEffect(() => {
    setTitle("Patrol Location");
  }, []);

  useEffect(() => {
    getPatrolLocation(dispatch);
  }, [dispatch]);

  useEffect(() => {
    const getDetail = async (id: number) => {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/locations/patrol/${id}`
      );
      const {
        data: { data },
      } = response;
      setValue("id_patrol_location", data.id);
      setValue("patrol_by", data.patrol_by);
      setValue("patrol_value", data.patrol_value);
      setValue("patrol_status", data.patrol_status);
      setValue("remark", data.remark);
      setValue("id_item_location", data.id_item_location);
      setValue("id_master_location", data.id_master_location);
      setValue("id_user", data.id_user);
      setValue("id_patrol_location", data.id);
      setValue("patrol_date", data.created_at.split("T")[0]);
      return setDatas(data);
    };

    if (itemId) {
      getDetail(itemId);
    }
  }, [itemId]);

  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const date = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (isCreateModalOpen) {
      reset({ patrol_date: date });
    }
  }, [isCreateModalOpen, reset]);

  const onOpenStoreModal = () => {
    setCreateModalOpen(true);
  };

  const onCloseStoreModal = () => {
    setCreateModalOpen(false);
  };

  const dataSelectMasterLocation = master_location.map(
    ({ location_name, id }: MasterLocationType) => ({
      name: location_name,
      id,
    })
  );

  const dataSelectItemLocation = item_location.map(
    ({ item_name, id }: ItemLocationType) => ({
      name: item_name,
      id,
    })
  );

  const dataRadio = [
    { name: "patrol_status", value: "OK" },
    { name: "patrol_status", value: "NOT OK" },
  ];
  const dataFormat = patrol_location.map((item: any, index: number) => ({
    no: index + 1,
    "patrol date": new Date(item?.created_at).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
    "name location": item.master.location_name,
    "item location": item.item.item_name,
    status: item.patrol_status,
    id: item.id,
  }));

  const dataTableHeader = [
    { name: "No" },
    { name: "Patrol Date" },
    { name: "Name Location" },
    { name: "Item Location" },
    { name: "Status" },
  ];

  const storePatrolLocation = async (dispatch: any, data: any) => {
    const response: any = await dispatch(
      asyncStorePatrolLocation({
        patrol_type: data.patrol_by,
        patrol_value: data.patrol_value,
        patrol_status: data.patrol_status,
        remark: data.remark,
        id_item_location: data.id_item_location,
        id_master_location: data.id_master_location,
        id_user: data.id_user,
      })
    );
    if (response.status) {
      ToastSuccess(response.message);
      reset();
    }
  };

  const updatePatrolLocation = async (dispatch: any, data: any) => {
    const response: any = await dispatch(
      asyncUpdatePatrolLocation({
        id: data.id_patrol_location,
        patrol_type: data.patrol_by,
        patrol_value: data.patrol_value,
        patrol_status: data.patrol_status,
        remark: data.remark,
        id_item_location: data.id_item_location,
        id_master_location: data.id_master_location,
        id_user: data.id_user,
      })
    );
    if (response.status) {
      ToastSuccess(response.message);
    }
  };

  const deletePatrolLocation = async (dispatch: any, data: any) => {
    const response: any = await dispatch(
      asyncDeletePatrolLocation(data.id_patrol_location)
    );
    if (response.status) {
      ToastSuccess(response.message);
    }
  };

  const onStore = async (data: any, e: any) => {
    e.preventDefault();
    await storePatrolLocation(dispatch, data);
  };

  const onUpdate = async (data: any, e: any) => {
    e.preventDefault();
    await updatePatrolLocation(dispatch, data);
  };

  const onDelete = async (data: any, e: any) => {
    e.preventDefault();
    await deletePatrolLocation(dispatch, data);
  };

  const layoutModalStore = () => {
    return (
      <>
        <form onSubmit={handleSubmit(onStore)}>
          <Input type="hidden" name="id_user" register={register} />
          <Selected
            name="id_master_location"
            label="Master Location"
            control={control}
            error={errors.id_master_location}
            require={true}
            data={dataSelectMasterLocation}
          />
          <Selected
            name="id_item_location"
            label="Item Location"
            control={control}
            error={errors.id_item_location}
            require={true}
            data={dataSelectItemLocation}
          />
          <Input
            type="text"
            name="patrol_value"
            label="Patrol Value"
            register={register}
            error={errors.patrol_value}
            required={true}
          />
          <Input
            type="date"
            name="patrol_date"
            register={register}
            label="Patrol Date"
            required={true}
            disabled
          />
          <Input
            type="text"
            name="patrol_by"
            register={register}
            label="Patrol By"
            disabled
          />
          <Radio data={dataRadio} label={"Status"} register={register} />
          <TextArea name="remark" label="Remark" register={register} />
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
  const layoutModalDetail = (datas: any) => {
    return (
      <>
        <div className="flex justify-center lg:justify-between items-center flex-wrap">
          <div className="">
            <div className="grid grid-cols-2 gap-1 text-xs sm:text-lg">
              <label>Location Name</label>
              <h6>: {datas?.master?.location_name}</h6>
            </div>
            <div className="grid grid-cols-2 gap-1 text-xs sm:text-lg">
              <label>No Referensi</label>
              <h6>: {datas?.master?.no_referensi}</h6>
            </div>
            <div className="grid grid-cols-2 gap-1 text-xs sm:text-lg">
              <label>Item Name</label>
              <h6>: {datas?.item?.item_name}</h6>
            </div>
            <div className="grid grid-cols-2 gap-1 text-xs sm:text-lg">
              <label>Patrol Value</label>
              <h6>: {datas?.patrol_value}</h6>
            </div>
            <div className="grid grid-cols-2 gap-1 text-xs sm:text-lg">
              <label>Patrol By</label>
              <h6>: {datas?.patrol_type}</h6>
            </div>
            <div className="grid grid-cols-2 gap-1 text-xs sm:text-lg">
              <label>Remark</label>
              <h6>: {datas?.remark}</h6>
            </div>
            <div className="grid grid-cols-2 gap-1 text-xs sm:text-lg">
              <label>Patrol Date</label>
              <h6>
                {" "}
                :
                {new Date(datas?.created_at).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </h6>
            </div>
            <div className="grid grid-cols-2 gap-1 text-xs sm:text-lg">
              <label>Status</label>
              <h6
                className={`col-span-1 text-center rounded-lg ${
                  datas?.patrol_status == "OK" ? "bg-green-400" : "bg-red-400"
                } text-white w-20`}
              >
                {datas?.patrol_status}
              </h6>
            </div>
          </div>
          <div className="text-center w-40">
            <label className="font-bold">QR Code</label>
            <img
              src={`http://127.0.0.1:8000/storage/${datas?.master?.foto_qr}`}
              alt=""
            />
            <p className="p-2 mt-1 bg-green-500 text-white">
              {datas?.master?.location_code}
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
          <Input type="hidden" name="id_patrol_location" register={register} />
          <Input type="hidden" name="id_user" register={register} />
          <Selected
            name="id_master_location"
            label="Master Location"
            control={control}
            error={errors.id_master_location}
            require={true}
            data={dataSelectMasterLocation}
          />
          <Selected
            name="id_item_location"
            label="Item Location"
            control={control}
            error={errors.id_item_location}
            require={true}
            data={dataSelectItemLocation}
          />
          <Input
            type="text"
            name="patrol_value"
            label="Patrol Value"
            register={register}
            error={errors.patrol_value}
            required={true}
          />
          <Input
            type="date"
            name="patrol_date"
            register={register}
            label="Patrol Date"
            required={true}
            disabled
          />
          <Input
            type="text"
            name="patrol_by"
            register={register}
            label="Patrol By"
            disabled
          />
          <Radio data={dataRadio} label={"Status"} register={register} />
          <TextArea name="remark" label="Remark" register={register} />
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
          <Input type="hidden" name="id_patrol_location" register={register} />
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
      <div className="p-2 m-2">
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
            onOpenStoreModal={onOpenStoreModal}
            onCloseStoreModal={onCloseStoreModal}
          />
        </main>
      </div>
    </>
  );
};

export default PatrolLocationPage;
