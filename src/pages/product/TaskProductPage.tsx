import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const TaskProductPage = () => {
  const dispatch = useDispatch();
  const [itemId, setId] = useState(null);
  const [datas, setDatas] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm();

  const layoutModalStore = () => {};
  const layoutModalUpdate = () => {};
  const layoutModalDelete = () => {};
  return <div>TaskProductPage</div>;
};

export default TaskProductPage;
