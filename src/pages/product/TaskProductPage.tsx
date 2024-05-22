import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Header from "../../components/common/Header";
import Selected from "../../components/form/Selected";
import Input from "../../components/form/Input";
import TextArea from "../../components/form/TextArea";
import {
  asyncDeleteTaskProduct,
  asyncGetTaskProduct,
  asyncStoreTaskProduct,
  asyncUpdateTaskProduct,
} from "../../states/product/task/action";
import { useAppSelector } from "../../hooks/useRedux";
import TableMain from "../../components/TableMain";
import axios from "axios";
import { ToastSuccess } from "../../components/common/MessageToast";

const TaskProductPage = (props: any) => {
  const { setTitle } = props;

  const dispatch = useDispatch();
  const [itemId, setId] = useState(null);
  const [datas, setDatas] = useState([]);
  const { task_product = [] } = useAppSelector((state) => state.task_product);
  const [dataMaster, setDataMaster] = useState([]);
  const [dataItem, setDataItem] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    control,
  } = useForm();

  const dataTableHeader = [
    { name: "No" },
    { name: "Location Name" },
    { name: "Item Name" },
    { name: "Task Type" },
    { name: "STD Value" },
  ];

  const dataTaskType = [
    { id: "Visual", name: "Visual" },
    { id: "Quality", name: "Quality" },
  ];
  const getTaskProduct = (dispatch: any) => {
    dispatch(asyncGetTaskProduct());
  };
  useEffect(() => {
    getTaskProduct(dispatch);
  }, [dispatch]);

  useEffect(() => {
    const getDetail = async (id: number) => {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/products/task/${id}`
      );
      const {
        data: { data },
      } = response;
      setValue("id_task_product", data.id);
      setValue("task_type_task_product", data.task_type);
      setValue("id_master_product", data.id_master_product);
      setValue("id_item_product", data.id_item_product);
      setValue("remark_task_product", data.remark);
      setValue("std_value_task_product", data.std_value);
      setValue("min_spec_task_product", data.min_spec);
      setValue("max_spec_task_product", data.max_spec);
      return setDatas(data);
    };

    if (itemId) {
      getDetail(itemId);
    }
  }, [itemId]);

  useEffect(() => {
    setTitle("Task Product");
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const masterResponse = await axios.get(
          `http://127.0.0.1:8000/api/products/master`
        );
        const masterData = masterResponse.data.data;
        setDataMaster(masterData);

        const itemResponse = await axios.get(
          `http://127.0.0.1:8000/api/products/item`
        );
        const itemData = itemResponse.data.data;
        setDataItem(itemData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const storeTaskProduct = async (dispatch: any, data: any) => {
    const response: any = await dispatch(
      asyncStoreTaskProduct({
        task_type: data.task_type_product,
        id_master_product: data.id_master_product,
        id_item_product: data.id_item_product,
        remark: data.remark_task_product,
        std_value: data.std_value_task_product,
        min_spec: data.min_spec_task_product,
        max_spec: data.max_spec_task_product,
      })
    );
    if (response.status) {
      ToastSuccess(response.message);
    }
  };

  const updateTaskProduct = async (dispatch: any, data: any) => {
    const response: any = await dispatch(
      asyncUpdateTaskProduct({
        id: data.id_task_product,
        task_type: data.task_type_product,
        id_master_product: data.id_master_product,
        id_item_product: data.id_item_product,
        remark: data.remark_task_product,
        std_value: data.std_value_task_product,
        min_spec: data.min_spec_task_product,
        max_spec: data.max_spec_task_product,
      })
    );
    if (response.status) {
      ToastSuccess(response.message);
    }
  };

  const deleteTaskProduct = async (dispatch: any, data: any) => {
    const response: any = await dispatch(
      asyncDeleteTaskProduct(data.id_task_product)
    );
    if (response.status) {
      ToastSuccess(response.message);
    }
  };

  const onStore = async (data: any, e: any) => {
    e.preventDefault();
    await storeTaskProduct(dispatch, data);
  };

  const onUpdate = async (data: any, e: any) => {
    e.preventDefault();
    await updateTaskProduct(dispatch, data);
  };

  const onDelete = async (data: any, e: any) => {
    e.preventDefault();
    await deleteTaskProduct(dispatch, data);
  };

  const layoutModalStore = () => {
    return (
      <form onSubmit={handleSubmit(onStore)}>
        <Selected
          name="task_type_product"
          label="Task Type"
          control={control}
          error={errors.task_type_product}
          require={true}
          data={dataTaskType}
        />
        <Selected
          name="id_master_product"
          label="Master Product"
          control={control}
          error={errors.id_master_product}
          require={true}
          data={dataMaster}
        />

        <Selected
          name="id_item_product"
          label="Item Product"
          control={control}
          error={errors.id_item_product}
          require={true}
          data={dataItem}
        />

        <Input
          type="text"
          name="std_value_task_product"
          label="STD Value"
          register={register}
          required={true}
          error={errors.std_value_task_product}
        />

        <Input
          type="text"
          name="min_spec_task_product"
          label="Min SPEC"
          register={register}
          required={true}
          error={errors.min_spec_task_product}
        />

        <Input
          type="text"
          name="max_spec_task_product"
          label="Max SPEC"
          register={register}
          required={true}
          error={errors.max_spec_task_product}
        />

        <TextArea
          name="remark_task_product"
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
    );
  };
  const layoutModalDetail = (datas: any) => {
    return (
      <>
        <div className="flex items-center justify-evenly">
          <div className="">
            <div className="grid grid-cols-4 gap-4">
              <label className="col-span-1">Product Name</label>
              <p className="col-span-1">:</p>
              <h6 className="col-span-1">{datas?.product?.product_name}</h6>
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
              <label className="col-span-1">Min SPEC</label>
              <p className="col-span-1">:</p>
              <h6 className="col-span-1">{datas?.min_spec}</h6>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <label className="col-span-1">Max SPEC</label>
              <p className="col-span-1">:</p>
              <h6 className="col-span-1">{datas?.max_spec}</h6>
            </div>
            {/* <div className="grid grid-cols-6 gap-4">
              <label className="col-span-1">Category</label>
              <p className="col-span-1">:</p>
              <h6 className="col-span-1">{datas?.product?.category}</h6>
            </div> */}
            <div className="grid grid-cols-4 gap-4">
              <label className="col-span-1">Type</label>
              <p className="col-span-1">:</p>
              <h6 className="col-span-1">{datas?.task_type}</h6>
            </div>
          </div>
          <div className="text-center w-40">
            <label className="font-bold">Barcode</label>
            <img
              src={`http://127.0.0.1:8000/storage/${datas?.product?.foto_barcode}`}
              alt=""
            />
            <p className="p-2 mt-1 bg-green-500 text-white">
              {datas?.product?.barcode}
            </p>
          </div>
        </div>{" "}
      </>
    );
  };
  const layoutModalUpdate = () => {
    return (
      <>
        <form onSubmit={handleSubmit(onUpdate)}>
          <Input type="hidden" name="id_task_product" register={register} />

          <Selected
            name="task_type_product"
            label="Task Type"
            control={control}
            error={errors.task_type_product}
            require={true}
            data={dataTaskType}
          />
          <Selected
            name="id_master_product"
            label="Master Product"
            control={control}
            error={errors.id_master_product}
            require={true}
            data={dataMaster}
          />

          <Selected
            name="id_item_product"
            label="Item Product"
            control={control}
            error={errors.id_item_product}
            require={true}
            data={dataItem}
          />

          <Input
            type="text"
            name="std_value_task_product"
            label="STD Value"
            register={register}
            required={true}
            error={errors.std_value_task_product}
          />

          <Input
            type="text"
            name="min_spec_task_product"
            label="Min SPEC"
            register={register}
            required={true}
            error={errors.min_spec_task_product}
          />

          <Input
            type="text"
            name="max_spec_task_product"
            label="Max SPEC"
            register={register}
            required={true}
            error={errors.max_spec_task_product}
          />

          <TextArea
            name="remark_task_product"
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
          <Input type="hidden" name="id_task_product" register={register} />

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
  const dataFormat = task_product?.map((item: any, index: number) => ({
    no: index + 1,
    "location name": item?.product?.product_name,
    "item name": item?.item?.item_name,
    "task type": item?.task_type,
    "std value": item?.std_value,
    id: item.id,
  }));
  console.log(task_product);
  return (
    <>
      <div className="h-screen m-2 p-2">
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
          />
        </main>
      </div>
    </>
  );
};

export default TaskProductPage;
