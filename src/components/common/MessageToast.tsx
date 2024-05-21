import { AiFillWarning } from "react-icons/ai";
import { IoIosDoneAll } from "react-icons/io";
import { toast } from "react-toastify";

export const ToastSuccess = (message: any) => {
  toast.success(message, {
    className: "bg-green-600 text-white font-semibold",
    style: {
      fontSize: "12px",
    },
    icon: (
      <div className="text-green-600">
        <IoIosDoneAll size={25} />
      </div>
    ),
  });
};

export const ToastError = (message: any) => {
  toast.error(message, {
    className: "text-white bg-red-600 font-semibold ",
    style: { fontSize: "12px" },
    icon: (
      <div className="text-red-600">
        <AiFillWarning size={20} />
      </div>
    ),
  });
};
