import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Header from "../../components/common/Header";
import Input from "../../components/form/Input";
import Selected from "../../components/form/Selected";
import TableMain from "../../components/TableMain";
import { useAppSelector } from "../../hooks/useRedux";
import {
  asyncDeleteTaskLocation,
  asyncGetTaskLocation,
  asyncStoreTaskLocation,
  asyncUpdateTaskLocation,
} from "../../states/location/task/action";
import axios from "axios";
import { MasterLocationType } from "../../types/location/MasterLocationType";
import { ItemLocationType } from "../../types/location/ItemLocationType";
import { ToastSuccess } from "../../components/common/MessageToast";
const TaskLocationPage = (props: any) => {
  const { toggle } = props;

  const dispatch = useDispatch();
  const [itemId, setId] = useState(null);
  const [datas, setDatas] = useState([]);
  const { master_location = [] } = useAppSelector(
    (state) => state.master_location
  );
  const { item_location = [] } = useAppSelector((state) => state.item_location);
  const { task_location = [] } = useAppSelector((state) => state.task_location);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm();

  const getTaskLocation = (dispatch: any) => {
    dispatch(asyncGetTaskLocation());
  };
  useEffect(() => {
    getTaskLocation(dispatch);
  }, [dispatch]);

  useEffect(() => {
    const getDetail = async (id: number) => {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/locations/task/${id}`
      );
      const {
        data: { data },
      } = response;
      setValue("id_task_location", data.id);
      setValue("task_type_task_location", data.task_type);
      setValue("id_master_location", data.id_master_location);
      setValue("id_item_location", data.id_item_location);
      setValue("remark_task_location", data.remark);
      setValue("std_value_task_location", data.std_value);
      return setDatas(data);
    };

    if (itemId) {
      getDetail(itemId);
    }
  }, [itemId]);

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

  const dataTableHeader = [
    { name: "No" },
    { name: "Location Name" },
    { name: "Item Name" },
    { name: "Task Type" },
    { name: "STD Value" },
  ];

  const dataTaskType = [
    { id: "Inspection", name: "Inspection" },
    { id: "Performance Testing", name: "Performance Testing" },
  ];

  const storeTaskLocation = async (dispatch: any, data: any) => {
    const response: any = await dispatch(
      asyncStoreTaskLocation({
        task_type: data.task_type_task_location,
        id_master_location: data.id_master_location,
        id_item_location: data.id_item_location,
        remark: data.remark_task_location,
        std_value: data.std_value_task_location,
      })
    );
    if (response.status) {
      ToastSuccess(response.message);
      reset();
    }
  };

  const updateTaskLocation = async (dispatch: any, data: any) => {
    const response: any = await dispatch(
      asyncUpdateTaskLocation({
        id: data.id_task_location,
        task_type: data.task_type_task_location,
        id_master_location: data.id_master_location,
        id_item_location: data.id_item_location,
        remark: data.remark_task_location,
        std_value: data.std_value_task_location,
      })
    );
    if (response.status) {
      ToastSuccess(response.message);
    }
  };

  const deleteTaskLocation = async (dispatch: any, data: any) => {
    const response: any = await dispatch(
      asyncDeleteTaskLocation(data.id_task_location)
    );
    if (response.status) {
      ToastSuccess(response.message);
    }
  };

  const onStore = async (data: any, e: any) => {
    e.preventDefault();
    await storeTaskLocation(dispatch, data);
  };

  const onUpdate = async (data: any, e: any) => {
    e.preventDefault();
    await updateTaskLocation(dispatch, data);
  };

  const onDelete = async (data: any, e: any) => {
    e.preventDefault();
    await deleteTaskLocation(dispatch, data);
  };

  const layoutModalStore = () => {
    return (
      <>
        <form onSubmit={handleSubmit(onStore)}>
          <Selected
            name="task_type_task_location"
            label="Task Type"
            control={control}
            error={errors.task_type_task_location}
            require={true}
            data={dataTaskType}
          />
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
            name="std_value_task_location"
            label="STD Value"
            register={register}
            required={true}
            error={errors.std_value_task_location}
          />

          <Input
            type="text"
            name="remark_task_location"
            label="Remark"
            register={register}
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
  const layoutModalDetail = (datas: any) => {
    return (
      <>
        <div className="flex items-center">
          <div className="">
            <div className="grid grid-cols-4 gap-4">
              <label className="col-span-1">Location Name</label>
              <p className="col-span-1">:</p>
              <h6 className="col-span-1">{datas?.master?.location_name}</h6>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <label className="col-span-1">Item Name</label>
              <p className="col-span-1">:</p>
              <h6 className="col-span-1">{datas?.item?.item_name}</h6>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <label className="col-span-1">STD Value</label>
              <p className="col-span-1">:</p>
              <h6 className="col-span-1">{datas?.std_value}</h6>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <label className="col-span-1">Remark</label>
              <p className="col-span-1">:</p>
              <h6 className="col-span-1">{datas?.remark}</h6>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <label className="col-span-1">No Referensi</label>
              <p className="col-span-1">:</p>
              <h6 className="col-span-1">{datas?.master?.no_referensi}</h6>
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
          <Input type="hidden" name="id_task_location" register={register} />
          <Selected
            name="task_type_task_location"
            label="Task Type"
            control={control}
            error={errors.task_type_task_location}
            require={true}
            data={dataTaskType}
          />
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
            name="std_value_task_location"
            label="STD Value"
            register={register}
            required={true}
            error={errors.std_value_task_location}
          />

          <Input
            type="text"
            name="remark_task_location"
            label="Remark"
            register={register}
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
          <Input type="hidden" name="id_task_location" register={register} />

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
  const dataFormat = task_location?.map((item: any, index: number) => ({
    no: index + 1,
    "location name": item.master.location_name,
    "item name": item.item.item_name,
    "task type": item.task_type,
    "std value": item.std_value,
    id: item.id,
  }));
  return (
    <>
      <div className="p-2 m-2 h-screen">
        <Header title="Task Location" toggle={toggle} />
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
      </div>
    </>
  );
};

export default TaskLocationPage;
