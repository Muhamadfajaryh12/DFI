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

const ItemLocationPage = () => {
  const dispatch = useDispatch();
  const [itemId, setId] = useState(null);
  const [datas, setDatas] = useState([]);
  const { item_location = [] } = useAppSelector((state) => state);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const dataTableHeader = [{ name: "No" }, { name: "Item_Name" }];

  useEffect(() => {
    dispatch(asyncGetItemLocation());
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
      console.log(data);
      return setDatas(data);
    };

    if (itemId) {
      getDetail(itemId);
    }
  }, [itemId]);

  const storeItemLocation = async (dispatch: any, data: any) => {
    return await dispatch(
      asyncStoreItemLocation({
        item_name: data.name_item_location,
      })
    );
  };

  const updateItemLocation = async (dispatch: any, data: any) => {
    return await dispatch(
      asyncUpdateItemLocation({
        id: data.id_item_location,
        item_name: data.name_item_location,
      })
    );
  };

  const deleteItemLocation = async (dispatch: any, data: any) => {
    return await dispatch(asyncDeleteItemLocation(data.id_item_location));
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
  return (
    <>
      <Header title="Item Location" />
      <main className="p-2">
        <TableMain
          headers={dataTableHeader}
          body={item_location?.item_location?.map(
            (item: any, index: number) => ({
              ...item,
              no: index + 1,
            })
          )}
          contentModal={{
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

export default ItemLocationPage;
