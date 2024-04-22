import { Card } from "primereact/card";
import { Carousel } from "primereact/carousel";
import MessageToast from "../components/common/MessageToast";
import { asyncLogin } from "../states/authentication/action";
import { useForm } from "react-hook-form";
import Input from "../components/form/Input";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/useRedux";
import { BiLock, BiUser } from "react-icons/bi";
import LogoDFI from "../assets/logo-daesang.svg";
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
      title: "Create a happy future through healthy foods and seasonings.",
    },
    {
      title: "As leading the manufacturer of culinary product in Indonesia",
    },
  ];

  const inlineTextTemplate = (data: any) => {
    return <h1 className="text-center">{data.title}</h1>;
  };

  return (
    <>
      <div className="flex justify-center h-full items-center">
        <Card className="w-3/4 ">
          <div className="flex justify-evenly items-center">
            <div className=" w-96 flex flex-col items-center justify-center">
              <div className="p-2 w-80 h-80">
                <img src={LogoDFI} alt="" />
              </div>
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
                <Input
                  label={"Username"}
                  placeholder={"Input Username"}
                  type={"text"}
                  name={"username"}
                  register={register}
                  error={errors.username}
                  required={true}
                  icon={<BiUser className="text-white p-1" size={30} />}
                />

                <Input
                  label={"Password"}
                  placeholder={"Password"}
                  name={"password"}
                  type={"password"}
                  register={register}
                  error={errors.password}
                  required={true}
                  icon={<BiLock className="text-white p-1" size={30} />}
                />
                <button
                  type="submit"
                  className="bg-blue-400 hover:bg-cyan-600 p-2 mt-4 text-white w-full rounded-md"
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
