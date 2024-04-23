import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const PatrolProductPage = () => {
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
  return <div>PatrolProductPage</div>;
};

export default PatrolProductPage;
