import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/useRedux";
import { useEffect, useState } from "react";
import {
  asyncDeleteMasterProduct,
  asyncGetMasterProduct,
  asyncStoreMasterProduct,
  asyncUpdateMasterProduct,
} from "../../states/product/master/action";
import TableMain from "../../components/TableMain";
import { useForm } from "react-hook-form";
import Input from "../../components/form/Input";
import Selected from "../../components/form/Selected";
import axios from "axios";
import { ToastSuccess } from "../../components/common/MessageToast";
import CategoryAPI from "../../API/CategoryAPI";

const MasterProductPage = (props: any) => {
  const { setTitle } = props;

  const dispatch = useDispatch();
  const [itemId, setId] = useState(null);
  const [datas, setDatas] = useState([]);
  const [category, setCategory] = useState([]);
  const { master_product = [] } = useAppSelector(
    (state) => state.master_product
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm();

  useEffect(() => {
    setTitle("Master Product");
    const getCategory = async () => {
      const response: any = await CategoryAPI.getCategory();
      setCategory(response?.data);
    };
    getCategory();
  }, []);

  const getMasterProduct = (dispatch: any) => {
    dispatch(asyncGetMasterProduct());
  };

  useEffect(() => {
    getMasterProduct(dispatch);
  }, [dispatch]);

  useEffect(() => {
    const getDetail = async (id: number) => {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/products/master/${id}`
      );
      const {
        data: { data },
      } = response;
      setValue("id_master_product", data.id);
      setValue("name_master_product", data.product_name);
      setValue("barcode_master_product", data.barcode);
      setValue("category", data.category_id);
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

  const storeMasterProduct = async (dispatch: any, data: any) => {
    const response: any = await dispatch(
      asyncStoreMasterProduct({
        product_name: data.name_master_product,
        barcode: data.barcode_master_product,
        category_id: data.category,
      })
    );
    if (response.status) {
      ToastSuccess(response.message);
      reset();
    }
  };

  const updateMasterProduct = async (dispatch: any, data: any) => {
    const response: any = await dispatch(
      asyncUpdateMasterProduct({
        id: data.id_master_product,
        product_name: data.name_master_product,
        barcode: data.barcode_master_product,
        category_id: data.category,
      })
    );
    if (response.status) {
      ToastSuccess(response.message);
    }
  };

  const deleteMasterProduct = async (dispatch: any, data: any) => {
    const response: any = await dispatch(
      asyncDeleteMasterProduct(data.id_master_product)
    );
    if (response.status) {
      ToastSuccess(response.message);
    }
  };

  const onStore = async (data: any, e: any) => {
    e.preventDefault();
    storeMasterProduct(dispatch, data);
  };
  const onUpdate = (data: any, e: any) => {
    e.preventDefault();
    updateMasterProduct(dispatch, data);
  };

  const onDelete = (data: any, e: any) => {
    e.preventDefault();
    deleteMasterProduct(dispatch, data);
  };

  const layoutModalDetail = (data: any) => {
    return (
      <>
        <div className="flex justify-center lg:justify-between items-center flex-wrap">
          <div>
            <div className="grid grid-cols-2 gap-1 text-xs sm:text-sm">
              <label>Name</label>
              <h6>: {data?.product_name}</h6>
            </div>
            <div className="grid grid-cols-2 gap-1 text-xs sm:text-sm">
              <label>Category</label>
              <h6>: {data?.category?.name}</h6>
            </div>
            <div className="grid grid-cols-2 gap-1 text-xs sm:text-sm">
              <label>Slug</label>
              <h6>: {data?.slug}</h6>
            </div>
          </div>
          <div className="text-center w-40">
            <label className="font-bold">Barcode</label>
            <img
              src={`http://127.0.0.1:8000/storage/${data?.foto_barcode}`}
              alt=""
            />
            <p className="p-2 mt-1 bg-green-500 text-white">{data?.barcode}</p>
          </div>
        </div>
      </>
    );
  };

  const layoutModalStore = () => {
    return (
      <form onSubmit={handleSubmit(onStore)}>
        <Input
          label="Name Product"
          type="text"
          name="name_master_product"
          register={register}
          required={true}
          error={errors.name_master_product}
        />

        <Input
          label="Barcode"
          type="number"
          name="barcode_master_product"
          register={register}
          required={true}
          error={errors.barcode_master_product}
        />

        <Selected
          label="Category"
          control={control}
          name="category"
          error={errors.category}
          require={true}
          data={category}
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

  const layoutModalUpdate = () => {
    return (
      <form onSubmit={handleSubmit(onUpdate)}>
        <Input type="hidden" name="id_master_product" register={register} />

        <Input
          label="Name Product"
          type="text"
          name="name_master_product"
          register={register}
          required={true}
          error={errors.name_master_product}
        />
        <Input
          label="Barcode"
          type="number"
          name="barcode_master_product"
          register={register}
          required={true}
          error={errors.barcode_master_product}
        />
        <Selected
          label="Category"
          control={control}
          name="category"
          error={errors.category}
          require={true}
          data={category}
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

  const layoutModalDelete = () => {
    return (
      <>
        <form className="text-center" onSubmit={handleSubmit(onDelete)}>
          <Input type="hidden" name="id_master_product" register={register} />

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
  const dataFormat = master_product.map((item: any, index: number) => ({
    no: index + 1,
    name: item?.product_name,
    barcode: item?.foto_barcode,
    id: item?.id,
  }));

  const dataTableHeader = [
    { name: "No" },
    { name: "Name" },
    { name: "Barcode" },
  ];

  return (
    <>
      <div className="h-screen p-2 m-2">
        <main className="p-2">
          <TableMain
            headers={dataTableHeader}
            body={dataFormat}
            contentModal={{
              detail: layoutModalDetail(datas),
              store: layoutModalStore(),
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

export default MasterProductPage;
