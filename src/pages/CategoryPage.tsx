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

type FormInputs = {
  id_category: null;
  name_category: string;
};

const CategoryPage = (props: any) => {
  const { setTitle } = props;
  const { categorys = [] } = useAppSelector((state) => state);
  const dispatch = useDispatch();
  const [itemId, setId] = useState(null);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [datas, setDatas] = useState([]);

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
      return setDatas(data);
    };

    if (itemId) {
      getDetail(itemId);
    }
  }, [itemId, setValue]);

  useEffect(() => {
    setTitle("Category");
  }, []);

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
  const layoutModalDetail = (data: any) => {
    console.log(data);
    return (
      <>
        <div className="flex justify-center lg:justify-between items-center flex-wrap">
          <div>
            <div className="grid grid-cols-2 gap-1 text-sm sm:text-lg">
              <label>Category</label>
              <h6>: {data?.name}</h6>
            </div>
            <div className="grid grid-cols-2 gap-1 text-sm sm:text-lg">
              <label>Slug</label>
              <h6>: {data?.slug}</h6>
            </div>
            <div className="grid grid-cols-2 gap-1 text-sm sm:text-lg">
              <label>Tanggal</label>
              <h6>: {new Date(data?.created_at).toLocaleDateString()}</h6>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="p-2 m-2">
      <main>
        <TableMain
          headers={header}
          body={categorys?.categorys?.map((item: any, index: number) => ({
            ...item,
            no: index + 1,
          }))}
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
  );
};

export default CategoryPage;
