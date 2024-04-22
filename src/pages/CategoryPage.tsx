import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  asyncDeleteCategory,
  asyncGetCategory,
  asyncStoreCategory,
  asyncUpdateCategory,
} from "../states/category/action";
import TableMain from "../components/TableMain";
import Input from "../components/form/Input";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAppSelector } from "../hooks/useRedux";
import Header from "../components/common/Header";

type FormInputs = {
  id_category: null;
  name_category: string;
};

const CategoryPage = () => {
  const { categorys = [] } = useAppSelector((state) => state);
  const dispatch = useDispatch();
  const [itemId, setId] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormInputs>({
    defaultValues: {
      id_category: itemId,
    },
  });

  useEffect(() => {
    const getDetail = async (id: number) => {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/categories/${id}`
      );
      const {
        data: { data },
      } = response;
      setValue("id_category", data.id);
      setValue("name_category", data.name);
    };

    if (itemId) {
      getDetail(itemId);
    }
  }, [itemId, setValue]);

  const getCategory = (dispatch: any) => {
    dispatch(asyncGetCategory());
  };
  useEffect(() => {
    getCategory(dispatch);
  }, [dispatch]);

  const header = [
    {
      name: "No",
    },
    {
      name: "Name",
    },
    {
      name: "Slug",
    },
  ];

  const storeCategory = async (dispatch: any, data: any) => {
    return await dispatch(asyncStoreCategory(data.name_category));
  };

  const updateCategory = async (dispatch: any, data: any) => {
    return await dispatch(
      asyncUpdateCategory({
        id: data.id_category,
        name: data.name_category,
      })
    );
  };

  const deleteCategory = async (dispatch: any, data: any) => {
    return await dispatch(
      asyncDeleteCategory({
        id: data.id_category,
      })
    );
  };
  const onStore = async (data: any, e: any) => {
    e.preventDefault();
    const response = await storeCategory(dispatch, data);
    if (response.status === true) {
      reset();
    }
  };

  const onUpdate = (data: any, e: any) => {
    e.preventDefault();
    updateCategory(dispatch, data);
  };

  const onDelete = (data: any, e: any) => {
    e.preventDefault();
    deleteCategory(dispatch, data);
  };

  const layoutModalStore = () => {
    return (
      <form onSubmit={handleSubmit(onStore)}>
        <Input
          label="Name"
          type="text"
          name="name_category"
          register={register}
          required={true}
          error={errors.name_category}
        ></Input>
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
        <Input
          label="Name"
          type="text"
          name="name_category"
          register={register}
          required={true}
          error={errors.name_category}
        ></Input>
        <Input type="hidden" name="id_category" register={register} />

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
        <form onSubmit={handleSubmit(onDelete)} className="text-center">
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
    <div>
      <Header title="Category" />
      <main>
        <TableMain
          headers={header}
          body={categorys.categorys.map((item: any, index: number) => ({
            ...item,
            no: index + 1,
          }))}
          contentModal={{
            store: layoutModalStore(),
            update: layoutModalUpdate(),
            delete: layoutModalDelete(),
          }}
          itemId={setId}
        />
      </main>
    </div>
  );
};

export default CategoryPage;
