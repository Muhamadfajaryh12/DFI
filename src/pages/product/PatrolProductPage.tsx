import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Input from "../../components/form/Input";
import Selected from "../../components/form/Selected";
import Radio from "../../components/form/Radio";
import TextArea from "../../components/form/TextArea";
import {
  asyncDeletePatrolProduct,
  asyncGetPatrolProduct,
  asyncStorePatrolProduct,
  asyncUpdatePatrolProduct,
} from "../../states/product/patrol/action";
import { useAppSelector } from "../../hooks/useRedux";
import axios from "axios";
import TableMain from "../../components/TableMain";
import { ToastSuccess } from "../../components/common/MessageToast";

const PatrolProductPage = (props: any) => {
  const { setTitle } = props;

  const dispatch = useDispatch();
  const { patrol_product = [] } = useAppSelector(
    (state) => state.patrol_product
  );
  console.log(patrol_product);
  const [datas, setDatas] = useState([]);
  const [dataMaster, setDataMaster] = useState([]);
  const [dataItem, setDataItem] = useState([]);
  const { user = [] } = useAppSelector((state) => state);
  const [itemId, setId] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    control,
  } = useForm();
  setValue("patrol_by", user?.role);
  setValue("id_user", user?.id);
  const dataTableHeader = [
    { name: "No" },
    { name: "Product Name" },
    { name: "Item Name" },
    { name: "Patrol Status" },
    { name: "Check By" },
  ];

  useEffect(() => {
    setTitle("Patrol Product");
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

  const getPatrolProduct = (dispatch: any) => {
    dispatch(asyncGetPatrolProduct());
  };

  useEffect(() => {
    getPatrolProduct(dispatch);
  }, [dispatch]);
  const dataRadio = [
    { name: "patrol_status", value: "OK" },
    { name: "patrol_status", value: "NOT OK" },
  ];

  useEffect(() => {
    const getDetail = async (id: number) => {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/products/patrol/${id}`
      );
      const {
        data: { data },
      } = response;
      setValue("id_patrol_product", data.id);
      setValue("patrol_by", data.patrol_by);
      setValue("patrol_value", data.patrol_value);
      setValue("patrol_status", data.patrol_status);
      setValue("remark", data.remark);
      setValue("id_item_product", data.id_item_product);
      setValue("id_master_product", data.id_master_product);
      setValue("id_user", data.id_user);
      setValue("id_patrol_product", data.id);
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

  const storePatrolProduct = async (dispatch: any, data: any) => {
    const response: any = await dispatch(
      asyncStorePatrolProduct({
        patrol_type: data.patrol_by,
        patrol_value: data.patrol_value,
        patrol_status: data.patrol_status,
        remark: data.remark,
        id_item_product: data.id_item_product,
        id_master_product: data.id_master_product,
        id_user: data.id_user,
      })
    );
    if (response.status) {
      ToastSuccess(response.message);
      reset();
    }
  };

  const updatePatrolProduct = async (dispatch: any, data: any) => {
    const response: any = await dispatch(
      asyncUpdatePatrolProduct({
        id: data.id_patrol_product,
        patrol_type: data.patrol_by,
        patrol_value: data.patrol_value,
        patrol_status: data.patrol_status,
        remark: data.remark,
        id_item_product: data.id_item_product,
        id_master_product: data.id_master_product,
        id_user: data.id_user,
      })
    );
    if (response.status) {
      ToastSuccess(response.message);
    }
  };

  const deletePatrolProduct = async (dispatch: any, data: any) => {
    const response: any = await dispatch(
      asyncDeletePatrolProduct(data.id_patrol_product)
    );
    if (response.status) {
      ToastSuccess(response.message);
    }
  };

  const onStore = async (data: any, e: any) => {
    e.preventDefault();
    await storePatrolProduct(dispatch, data);
  };

  const onUpdate = async (data: any, e: any) => {
    e.preventDefault();
    await updatePatrolProduct(dispatch, data);
  };

  const onDelete = async (data: any, e: any) => {
    e.preventDefault();
    await deletePatrolProduct(dispatch, data);
  };

  const layoutModalStore = () => {
    return (
      <>
        <form onSubmit={handleSubmit(onStore)}>
          <Input type="hidden" name="id_user" register={register} />
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

  const layoutModalUpdate = () => {
    return (
      <>
        <form onSubmit={handleSubmit(onUpdate)}>
          <Input type="hidden" name="id_patrol_product" register={register} />
          <Input type="hidden" name="id_user" register={register} />
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
          <Input type="hidden" name="id_patrol_product" register={register} />
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
  const layoutModalDetail = (datas: any) => {
    return (
      <>
        <div className="flex justify-center lg:justify-between items-center flex-wrap">
          <div className="">
            <div className="grid grid-cols-2 gap-1 text-xs sm:text-sm">
              <label>Product Name</label>
              <h6>: {datas?.product?.product_name}</h6>
            </div>
            <div className="grid grid-cols-2 gap-1 text-xs sm:text-sm">
              <label>Item Name</label>
              <h6>: {datas?.item?.item_name}</h6>
            </div>
            <div className="grid grid-cols-2 gap-1 text-xs sm:text-sm">
              <label>Patrol Value</label>
              <h6>: {datas?.patrol_value}</h6>
            </div>
            <div className="grid grid-cols-2 gap-1 text-xs sm:text-sm">
              <label>Patrol By</label>
              <h6>: {datas?.patrol_type}</h6>
            </div>
            <div className="grid grid-cols-2 gap-1 text-xs sm:text-sm">
              <label>Remark</label>
              <h6>: {datas?.remark}</h6>
            </div>
            <div className="grid grid-cols-2 gap-1 text-xs sm:text-sm">
              <label>Patrol Date</label>
              <h6>: {new Date(datas?.created_at).toLocaleDateString()}</h6>
            </div>
            <div className="grid grid-cols-2 gap-1 text-xs sm:text-sm">
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
            <label className="font-bold">Barcode</label>
            <img
              src={`http://127.0.0.1:8000/storage/${datas?.product?.foto_barcode}`}
              alt=""
            />
            <p className="p-2 mt-1 bg-green-500 text-white">
              {datas?.product?.barcode}
            </p>
          </div>
        </div>
      </>
    );
  };
  const dataFormat = patrol_product?.map((item: any, index: number) => ({
    no: index + 1,
    "product name": item?.product?.product_name,
    "item name": item?.item?.item_name,
    "patrol status": item?.patrol_status,
    "check by": item?.user?.name,
    id: item?.id,
  }));
  return (
    <>
      <div className="p-2 m-2 h-screen">
        <main className="p-2">
          <TableMain
            headers={dataTableHeader}
            body={dataFormat}
            contentModal={{
              store: layoutModalStore(),
              update: layoutModalUpdate(),
              detail: layoutModalDetail(datas),
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

export default PatrolProductPage;
