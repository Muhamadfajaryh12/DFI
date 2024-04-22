import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/useRedux";
import { useEffect, useState } from "react";
import {
  asyncDeleteMasterProduct,
  asyncGetMasterProduct,
  asyncStoreMasterProduct,
  asyncUpdateMasterProduct,
} from "../../states/product/master/action";
import Header from "../../components/common/Header";
import TableMain from "../../components/TableMain";
import { useForm } from "react-hook-form";
import Input from "../../components/form/Input";
import Selected from "../../components/form/Selected";
import axios from "axios";
import { asyncGetCategory } from "../../states/category/action";

const MasterProductPage = () => {
  const dispatch = useDispatch();
  const [itemId, setId] = useState(null);
  const [datas, setDatas] = useState([]);
  const { master_product = [] } = useAppSelector((state) => state);
  const { categorys = [] } = useAppSelector((state) => state);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm();

  useEffect(() => {
    dispatch(asyncGetMasterProduct());
    dispatch(asyncGetCategory());
  }, [dispatch]);

  const dataTableHeader = [
    { name: "No" },
    { name: "Name" },
    { name: "Barcode" },
  ];

  useEffect(() => {
    const getDetail = async (id: number) => {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/products/master/${id}`
      );
      const {
        data: { data },
      } = response;
      setValue("id_master_product", data.id);
      return setDatas(data);
    };

    if (itemId) {
      getDetail(itemId);
    }
  }, [itemId]);

  const storeMasterProduct = async (dispatch: any, data: any) => {
    return await dispatch(
      asyncStoreMasterProduct({
        product_name: data.name_master_product,
        barcode: data.barcode_master_product,
        category_id: data.category,
      })
    );
  };

  const updateMasterProduct = async (dispatch: any, data: any) => {
    return await dispatch(
      asyncUpdateMasterProduct({
        id: data.id_master_product,
        product_name: data.name_master_product,
        barcode: data.barcode_master_product,
        category_id: data.category,
      })
    );
  };

  const deleteMasterProduct = async (dispatch: any, data: any) => {
    return await dispatch(asyncDeleteMasterProduct(data.id_master_product));
  };

  const onStore = async (data: any, e: any) => {
    e.preventDefault();
    const response = await storeMasterProduct(dispatch, data);
    if (response.status === true) {
      reset();
    }
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
        <div className="flex justify-evenly items-center">
          <div className="">
            <div className="grid grid-cols-6 gap-4">
              <label className="col-span-1">Name</label>
              <p className="col-span-1">:</p>
              <h6 className="col-span-1">{data?.product_name}</h6>
            </div>
            <div className="grid grid-cols-6 gap-4">
              <label className="col-span-1">Category</label>
              <p className="col-span-1">:</p>
              <h6 className="col-span-1">{data?.category?.name}</h6>
            </div>
            <div className="grid grid-cols-6 gap-4">
              <label className="col-span-1">Slug</label>
              <p className="col-span-1">:</p>
              <h6 className="col-span-1">{data?.slug}</h6>
            </div>
          </div>
          <div className="text-center w-40">
            <label className="font-bold">Barcode</label>
            <img
              src={`http://127.0.0.1:8000/storage/${data?.foto_barcode}`}
              alt=""
            />
            <p className="p-2 mt-1 bg-green-300">{data?.barcode}</p>
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
          data={categorys.categorys}
        />

        <button
          type="submit"
          className="p-2 bg-blue-400 hover:bg-blue-500 text-white rounded-md m-2"
        >
          Submit
        </button>
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
          data={categorys.categorys}
        />

        <button
          type="submit"
          className="p-2 bg-blue-400 hover:bg-blue-500 text-white rounded-md m-2"
        >
          Submit
        </button>
      </form>
    );
  };

  const layoutModalDelete = () => {
    return (
      <>
        <form className="text-center" onSubmit={handleSubmit(onDelete)}>
          <Input type="hidden" name="id_master_product" register={register} />

          <h4 className="font-bold">Are you sure delete this item?</h4>
          <Input type="hidden" name="id_category" register={register} />
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
      <Header title="Master Product" />
      <main>
        <TableMain
          headers={dataTableHeader}
          body={master_product?.master_product?.map(
            (item: any, index: number) => ({
              ...item,
              no: index + 1,
            })
          )}
          contentModal={{
            detail: layoutModalDetail(datas),
            store: layoutModalStore(),
            update: layoutModalUpdate(),
            delete: layoutModalDelete(),
          }}
          itemId={setId}
        />
      </main>
    </>
  );
};

export default MasterProductPage;
