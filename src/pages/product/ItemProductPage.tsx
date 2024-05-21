import { useEffect, useState } from "react";
import TableMain from "../../components/TableMain";
import Header from "../../components/common/Header";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {
  asyncDeleteItemProduct,
  asyncGetItemProduct,
  asyncStoreItemProduct,
  asyncUpdateItemProduct,
} from "../../states/product/item/action";
import { asyncGetCategory } from "../../states/category/action";
import axios from "axios";
import Selected from "../../components/form/Selected";
import Input from "../../components/form/Input";
import { useAppSelector } from "../../hooks/useRedux";
import { ToastSuccess } from "../../components/common/MessageToast";

const ItemProductPage = (props: any) => {
  const { toggle } = props;

  const dispatch = useDispatch();
  const [itemId, setId] = useState(null);
  const [datas, setDatas] = useState([]);
  const { item_product = [] } = useAppSelector((state) => state.item_product);
  const { categorys = [] } = useAppSelector((state) => state);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm();

  const dataTableHeader = [
    { name: "No" },
    { name: "Item Name" },
    { name: "Item Value" },
  ];
  const getItemProduct = (dispatch: any) => {
    dispatch(asyncGetItemProduct());
  };
  const getCategory = (dispatch: any) => {
    dispatch(asyncGetCategory());
  };
  useEffect(() => {
    getItemProduct(dispatch);
    getCategory(dispatch);
  }, [dispatch]);

  useEffect(() => {
    const getDetail = async (id: number) => {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/products/item/${id}`
      );
      const {
        data: { data },
      } = response;
      setValue("name_item_product", data.item_name);
      setValue("value_item_product", data.item_value);
      setValue("category", data.category_id);
      setValue("id_item_product", data.id);
      return setDatas(data);
    };

    if (itemId) {
      getDetail(itemId);
    }
  }, [itemId]);

  const storeItemProduct = async (dispatch: any, data: any) => {
    const response: any = await dispatch(
      asyncStoreItemProduct({
        item_name: data.name_item_product,
        item_value: data.value_item_product,
        category_id: data.category,
      })
    );
    if (response.status) {
      ToastSuccess(response.message);
      reset();
    }
  };

  const updateItemProduct = async (dispatch: any, data: any) => {
    const response: any = await dispatch(
      asyncUpdateItemProduct({
        id: data.id_item_product,
        item_name: data.name_item_product,
        item_value: data.value_item_product,
        category_id: data.category,
      })
    );
    if (response.status) {
      ToastSuccess(response.message);
    }
  };

  const deleteItemProduct = async (dispatch: any, data: any) => {
    const response: any = await dispatch(
      asyncDeleteItemProduct(data.id_item_product)
    );
    if (response.status) {
      ToastSuccess(response.message);
    }
  };

  const onStore = async (data: any, e: any) => {
    e.preventDefault();
    storeItemProduct(dispatch, data);
  };
  const onUpdate = (data: any, e: any) => {
    e.preventDefault();
    updateItemProduct(dispatch, data);
  };

  const onDelete = (data: any, e: any) => {
    e.preventDefault();
    deleteItemProduct(dispatch, data);
  };

  const layoutModalDetail = (data: any) => {
    return (
      <>
        <div className="flex justify-evenly items-center">
          <div className="">
            <div className="grid grid-cols-4 gap-2">
              <label className="col-span-1">Item Name</label>
              <p className="">:</p>
              <h6 className="">{data?.item_name}</h6>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <label className="col-span-1">Item Value</label>
              <p className="">:</p>
              <h6 className="">{data?.item_value}</h6>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <label className="col-span-1">Category</label>
              <p className="">:</p>
              <h6 className="">{data?.category?.name}</h6>
            </div>
          </div>
        </div>
      </>
    );
  };
  const layoutModalStore = () => {
    return (
      <form onSubmit={handleSubmit(onStore)}>
        <Input
          label="Name Item"
          type="text"
          name="name_item_product"
          register={register}
          required={true}
          error={errors.name_item_product}
        />

        <Input
          label="Value"
          type="text"
          name="value_item_product"
          register={register}
          required={true}
          error={errors.value_item_product}
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
        <Input type="hidden" name="id_item_product" register={register} />

        <Input
          label="Item Product"
          type="text"
          name="name_item_product"
          register={register}
          required={true}
          error={errors.name_item_product}
        />
        <Input
          label="Item Value"
          type="text"
          name="value_item_product"
          register={register}
          required={true}
          error={errors.value_item_product}
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
          <Input type="hidden" name="id_item_product" register={register} />

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
  const dataFormat = item_product.map((item: any, index: number) => ({
    no: index + 1,
    "item name": item?.item_name,
    "item value": item?.item_value,
    id: item?.id,
  }));
  return (
    <>
      <div className="h-screen p-2 m-2">
        <Header title="Item Product" toggle={toggle} />
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
          />
        </main>
      </div>
    </>
  );
};

export default ItemProductPage;
