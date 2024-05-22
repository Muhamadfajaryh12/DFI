import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Header from "../../components/common/Header";
import Input from "../../components/form/Input";
import {
  asyncDeleteItemLocation,
  asyncGetItemLocation,
  asyncStoreItemLocation,
  asyncUpdateItemLocation,
} from "../../states/location/item/action";
import TableMain from "../../components/TableMain";
import { useAppSelector } from "../../hooks/useRedux";
import axios from "axios";
import { ToastSuccess } from "../../components/common/MessageToast";

const ItemLocationPage = (props: any) => {
  const { setTitle } = props;

  const dispatch = useDispatch();
  const [itemId, setId] = useState(null);
  const [datas, setDatas] = useState([]);
  const { item_location = [] } = useAppSelector((state) => state.item_location);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const dataTableHeader = [{ name: "No" }, { name: "Item Name" }];
  const getItemLocation = (dispatch: any) => {
    dispatch(asyncGetItemLocation());
  };

  useEffect(() => {
    setTitle("Item Location");
  });

  useEffect(() => {
    getItemLocation(dispatch);
  }, [dispatch]);

  useEffect(() => {
    const getDetail = async (id: number) => {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/locations/item/${id}`
      );
      const {
        data: { data },
      } = response;
      setValue("id_item_location", data.id);
      setValue("name_item_location", data.item_name);
      console.log(data);
      return setDatas(data);
    };

    if (itemId) {
      getDetail(itemId);
    }
  }, [itemId]);

  const storeItemLocation = async (dispatch: any, data: any) => {
    const response: any = await dispatch(
      asyncStoreItemLocation({
        item_name: data.name_item_location,
      })
    );
    if (response.status) {
      ToastSuccess(response.message);
      reset();
    }
  };

  const updateItemLocation = async (dispatch: any, data: any) => {
    const response: any = await dispatch(
      asyncUpdateItemLocation({
        id: data.id_item_location,
        item_name: data.name_item_location,
      })
    );
    if (response.status) {
      ToastSuccess(response.message);
    }
  };

  const deleteItemLocation = async (dispatch: any, data: any) => {
    const response: any = await dispatch(
      asyncDeleteItemLocation(data.id_item_location)
    );
    if (response.status) {
      ToastSuccess(response.message);
    }
  };

  const onStore = async (data: any, e: any) => {
    e.preventDefault();
    await storeItemLocation(dispatch, data);
  };
  const onUpdate = async (data: any, e: any) => {
    e.preventDefault();
    console.log(data);
    await updateItemLocation(dispatch, data);
  };
  const onDelete = async (data: any, e: any) => {
    e.preventDefault();
    await deleteItemLocation(dispatch, data);
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
          </div>
        </div>
      </>
    );
  };

  const layoutModalStore = () => {
    return (
      <>
        <form onSubmit={handleSubmit(onStore)}>
          <Input
            type="text"
            label="Name Item"
            name="name_item_location"
            register={register}
            error={errors.name_item_location}
            required={true}
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
  const layoutModalUpdate = () => {
    return (
      <>
        <form onSubmit={handleSubmit(onUpdate)}>
          <Input type="hidden" name="id_item_location" register={register} />
          <Input
            type="text"
            label="Name Item"
            name="name_item_location"
            register={register}
            error={errors.name_item_location}
            required={true}
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
          <Input type="hidden" name="id_item_location" register={register} />
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
  const dataFormat = item_location.map((item: any, index: number) => ({
    no: index + 1,
    "item name": item?.item_name,
    id: item?.id,
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
              detail: layoutModalDetail(datas),
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

export default ItemLocationPage;
