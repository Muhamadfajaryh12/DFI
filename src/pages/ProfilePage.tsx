import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { asyncGetProfile, asyncUpdateProfile } from "../states/users/action";
import Input from "../components/form/Input";
import { useForm } from "react-hook-form";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useAppSelector } from "../hooks/useRedux";
import Header from "../components/common/Header";
import Selected from "../components/form/Selected";
import userProfile from "../assets/user_profile.png";
import { ToastError, ToastSuccess } from "../components/common/MessageToast";
import axios from "axios";
const ProfilePage = (props: any) => {
  const { toggle } = props;
  const [visible, setVisible] = useState(false);
  const { user = [] } = useAppSelector((state) => state);
  const [previewImage, setPreviewImage] = useState<any>(null);

  const dispatch = useDispatch();

  const getProfile = (dispatch: any) => {
    dispatch(asyncGetProfile());
  };
  useEffect(() => {
    getProfile(dispatch);
  }, [dispatch]);

  const genderData = [
    { id: "Laki-Laki", name: "Laki-Laki" },
    { id: "Perempuan", name: "Perempuan" },
  ];

  const cityData = [
    { id: "Jakarta", name: "Jakarta" },
    { id: "Bandung", name: "Bandung" },
    { id: "Surabaya", name: "Surabaya" },
    { id: "Karawang", name: "Karawang" },
  ];
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    defaultValues: {
      name: user?.name,
      no_telp: user?.no_telp,
      role: user?.role,
      city: user?.kota,
      gender: user?.jenis_kelamin,
      id_user: user?.id,
    },
  });

  useEffect(() => {
    setValue("name", user?.name);
    setValue("no_telp", user?.no_telp);
    setValue("role", user?.role);
    setValue("city", user?.kota);
    setValue("gender", user?.jenis_kelamin);
    setValue("id_user", user?.id);
  }, [user, setValue]);
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateProfile = (dispatch: any, formData: any) => {
    dispatch(asyncUpdateProfile(formData));
  };
  const onUpdate = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append("id", data.id_user);
      formData.append("name", data.name);
      formData.append("no_telp", data.no_telp);
      formData.append("jenis_kelamin", data.gender);
      formData.append("kota", data.city);
      if (data.image[0]) {
        formData.append("image", data.image[0]);
      }
      const response: any = await updateProfile(dispatch, formData);
      console.log(response);
      if (response.status) {
        ToastSuccess(response.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const getChangePassword = async (data: any) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/user/pwd/${data.id_user}`,
        {
          password: data.old_password,
          password_new: data.new_password,
        }
      );
      ToastSuccess(response.data.message);
    } catch (error: any) {
      ToastError(error.response.data.message);
    }
  };
  return (
    <>
      <div className="p-2 m-2 h-screen">
        <Header title="Profile" toggle={toggle} />
        <main>
          <form onSubmit={handleSubmit(onUpdate)} encType="multipart/form-data">
            <div className="w-40 mx-auto flex flex-col items-center">
              <img
                src={
                  previewImage
                    ? previewImage
                    : user?.foto != null
                    ? `http://127.0.0.1:8000/storage/${user?.foto}`
                    : userProfile
                }
                alt=""
                className="w-40 h-40 mb-2"
              />
              <label className="cursor-pointer bg-blue-200 p-2 rounded-md font-medium text-blue-500 hover:text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                <span>Upload File</span>
                <input
                  id="file-upload"
                  name="image"
                  onChange={handleFileChange}
                  type="file"
                  className="sr-only"
                />
              </label>
            </div>
            <Input
              type="hidden"
              name="id_user"
              register={register}
              required={true}
            />
            <Input
              label="Name"
              type="text"
              name="name"
              register={register}
              required={true}
            />

            <Input
              label="Number Handphone"
              type="text"
              name="no_telp"
              register={register}
              required={true}
            />
            <div className="flex flex-nowrap">
              <div className="w-1/3">
                <Input
                  label="Position"
                  type="text"
                  name="role"
                  register={register}
                  required={true}
                  disabled={true}
                />
              </div>
              <div className="w-1/3 mx-2">
                <Selected
                  label="City"
                  control={control}
                  name="city"
                  error={errors.city}
                  require={true}
                  data={cityData}
                />
              </div>
              <div className="w-1/3">
                <Selected
                  label="Gender"
                  control={control}
                  name="gender"
                  error={errors.gender}
                  require={true}
                  data={genderData}
                />
              </div>
            </div>

            <div className="flex justify-center items-center mt-10">
              <button
                type="submit"
                className="p-2 m-2 h-11 bg-blue-400 hover:bg-blue-500 rounded-md text-white"
              >
                Save Changes
              </button>
              <Button
                label="Change Password"
                className="m-2 p-2 h-11 bg-gray-500 border-0"
                size="small"
                onClick={() => setVisible(true)}
              />
            </div>
          </form>
          <Dialog
            header="Change Password"
            visible={visible}
            style={{ width: "50vw" }}
            onHide={() => setVisible(false)}
          >
            <form onSubmit={handleSubmit(getChangePassword)}>
              <Input
                type="hidden"
                name="id_user"
                register={register}
                required={true}
              />
              <Input
                label="Old Password"
                type="password"
                name="old_password"
                register={register}
                required={true}
                error={errors.old_password}
              />
              <Input
                label="New Password"
                type="password"
                name="new_password"
                register={register}
                required={true}
                error={errors.new_password}
              />
              <div className="flex w-full justify-center">
                <button className="bg-blue-400 w-20 p-2 text-white hover:bg-blue-500 rounded-md m-2">
                  Submit
                </button>
              </div>
            </form>
          </Dialog>
        </main>
      </div>
    </>
  );
};

export default ProfilePage;
