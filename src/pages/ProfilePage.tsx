import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { asyncGetProfile } from "../states/users/action";
import LayoutMain from "../templates/LayoutMain";
import { FileUpload } from "primereact/fileupload";
import Input from "../components/form/Input";
import { useForm } from "react-hook-form";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useAppSelector } from "../hooks/useRedux";

const ProfilePage = () => {
  const [visible, setVisible] = useState(false);
  const { user = [] } = useAppSelector((state) => state);
  const dispatch = useDispatch();

  const getProfile = (dispatch: any) => {
    dispatch(asyncGetProfile());
  };
  useEffect(() => {
    getProfile(dispatch);
  }, [dispatch]);

  const {
    register,
    // handleSubmit,
    // formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name,
      no_telp: user?.no_telp,
      role: user?.role,
    },
  });

  const content = () => {
    return (
      <>
        <img></img>
        <FileUpload
          mode="basic"
          name="demo[]"
          accept="image/*"
          maxFileSize={1000000}
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
        <Input
          label="Position"
          type="text"
          name="role"
          register={register}
          required={true}
          disabled={true}
        />
        <button className="p-2 bg-blue-400 hover:bg-blue-500 rounded-md text-white">
          Save Changes
        </button>
        <Button
          label="Change Password"
          className="mx-2"
          onClick={() => setVisible(true)}
        />

        <Dialog
          header="Change Password"
          visible={visible}
          style={{ width: "50vw" }}
          onHide={() => setVisible(false)}
        >
          <form action="">
            <Input
              label="Old Password"
              type="password"
              name="old_password"
              register={register}
              required={true}
            />
            <Input
              label="New Password"
              type="password"
              name="new_password"
              register={register}
              required={true}
            />
            <div className="flex w-full justify-center">
              <button className="bg-blue-400 w-20 p-2 text-white hover:bg-blue-500 rounded-md m-2">
                Submit
              </button>
            </div>
          </form>
        </Dialog>
      </>
    );
  };

  return (
    <>
      <LayoutMain title="Profile" content={content()} />
    </>
  );
};

export default ProfilePage;
