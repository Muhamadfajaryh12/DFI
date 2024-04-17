import { Card } from "primereact/card";
import { Carousel } from "primereact/carousel";
import MessageToast from "../components/common/MessageToast";
import { asyncLogin } from "../states/authentication/action";
import { useForm } from "react-hook-form";
import Input from "../components/form/Input";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/useRedux";

// type FormInputs = {
//   username: string;
//   password: string;
// };

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onLogin = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const response: any = await dispatch(asyncLogin({ username, password }));
    if (response.status == true) {
      navigate("/dashboard");
    } else {
      MessageToast();
    }
  };

  const onSubmit = (data: any) => {
    console.log(data);
    onLogin(data);
  };

  const dataText = [
    {
      title:
        "loremLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in risus ut dolor pretium vehicula.",
    },
    {
      title:
        "Aliquam auctor felis ac est pulvinar, vitae feugiat libero bibendum",
    },
  ];

  const inlineTextTemplate = (data: any) => {
    return <h1 className="text-center">{data.title}</h1>;
  };

  return (
    <>
      <div className="flex justify-center h-screen items-center">
        <Card className="w-3/4 w-full">
          <div className="flex justify-evenly items-center">
            <div className=" w-96 flex flex-col items-center justify-center">
              <div className="bg-gray-300 w-80 h-80"></div>
              <Carousel
                value={dataText}
                numVisible={1}
                numScroll={1}
                orientation="horizontal"
                itemTemplate={inlineTextTemplate}
              ></Carousel>
            </div>
            <div className="w-1/2">
              <h2 className="font-semibold text-4xl">Sign In</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-inputgroup flex-1 my-6">
                  <span className="p-inputgroup-addon bg-cyan-400">
                    <i className="pi pi-user text-white"></i>
                  </span>
                  <Input
                    label={"Username"}
                    placeholder={"Input Username"}
                    type={"text"}
                    name={"username"}
                    register={register}
                    error={errors.username}
                    required={true}
                  />
                </div>
                <div className="p-inputgroup flex-1 my-6">
                  <span className="p-inputgroup-addon bg-cyan-400">
                    <i className="pi pi-lock text-white"></i>
                  </span>
                  <Input
                    label={"Password"}
                    placeholder={"Password"}
                    name={"password"}
                    type={"password"}
                    register={register}
                    error={errors.password}
                    required={true}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-cyan-400 hover:bg-cyan-600 p-2 text-white w-full rounded-md"
                >
                  Submit
                </button>
              </form>
              <MessageToast />
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default LoginPage;
