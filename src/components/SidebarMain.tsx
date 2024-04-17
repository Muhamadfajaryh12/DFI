import { useState } from "react";
// import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { asyncLogout } from "../states/authentication/action";
// import { Dispatch } from "redux";
import { RiProductHuntLine, RiDashboardFill } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import {
  MdOutlineCategory,
  MdLocationSearching,
  MdLogout,
} from "react-icons/md";

interface dataItem {
  title: string;
  icon: JSX.Element | string;
  link?: string;
  child?: dataItem[];
}

const SidebarMain = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState<string[]>([]);
  const data: dataItem[] = [
    {
      title: "Dashboard",
      icon: <RiDashboardFill />,
      link: "/dashboard",
    },
    {
      title: "Employee",
      icon: <FiUsers />,
      link: "/employee",
    },
    {
      title: "Category",
      icon: <MdOutlineCategory />,
      link: "/category",
    },
    {
      title: "Product",
      icon: <RiProductHuntLine />,
      child: [
        {
          title: "Master Product",
          icon: "pi pi-home",
          link: "/master_product",
        },
        {
          title: "Item Product",
          icon: "pi pi-home",
          link: "/master_product",
        },
        {
          title: "Task Product",
          icon: "pi pi-home",
          link: "/master_product",
        },
        {
          title: "Patrol Product",
          icon: "pi pi-home",
          link: "/master_product",
        },
      ],
    },
    {
      title: "Location",
      icon: <MdLocationSearching />,
      child: [
        {
          title: "Master Location",
          icon: "pi pi-home",
          link: "/master_location",
        },
        {
          title: "Item Location",
          icon: "pi pi-home",
          link: "/master_location",
        },
        {
          title: "Task Location",
          icon: "pi pi-home",
          link: "/master_location",
        },
        {
          title: "Patrol Location",
          icon: "pi pi-home",
          link: "/master_location",
        },
      ],
    },
  ];

  const toggle = () => {
    setVisible(!visible);
    setOpen([]);
  };

  const openGroup = (title: string) => {
    if (open.includes(title)) {
      setOpen(open.filter((id) => id !== title));
    } else {
      setOpen([...open, title]);
    }
  };
  const onLogout = async (dispatch: any) => {
    await dispatch(asyncLogout());
    navigate("/");
  };
  return (
    <div
      className={`card flex flex-col justify-content-center ${
        visible == false ? "w-72" : "w-14"
      } min-h-screen shadow-md`}
    >
      <div className="p-3">
        <div className="flex justify-between items-center">
          {visible == false ? (
            <h5 className="font-semibold text-sm">Daesang Food Indonesia</h5>
          ) : (
            ""
          )}
          <button className=" p-2 rounded-md" onClick={toggle}>
            <span className="pi pi-bars"></span>
          </button>
        </div>
        <ul className={`list-none   ${visible == false ? "p-3" : "px-0"} m-0`}>
          {data.map((item) => (
            <li className="p-2" key={item.title}>
              {item.link != null ? (
                <Link
                  className="hover:text-blue-400 font-medium flex items-center"
                  to={item?.link}
                >
                  {item.icon}
                  <span>{visible == false ? item.title : ""}</span>
                </Link>
              ) : (
                <ul>
                  <li
                    key={item.title}
                    className="flex justify-between items-center"
                    onClick={() => openGroup(item.title)}
                  >
                    <div className="font-medium">
                      <span className={item?.icon + " mr-2"}></span>
                      <span>{visible == false ? item.title : ""}</span>
                    </div>
                    {visible == false ? (
                      <span className="pi pi-chevron-down"></span>
                    ) : (
                      ""
                    )}
                  </li>
                  {item?.child?.map((items) => (
                    <li
                      key={items.title}
                      className={`p-3 ${
                        open.includes(item.title) ? "block" : "hidden"
                      } `}
                    >
                      <Link
                        className="hover:text-blue-400 font-medium flex items-center"
                        to={items?.link ? items.link : "/"}
                      >
                        <span className={items?.icon + " mr-2"}></span>
                        <span>{visible == false ? items.title : ""}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <li className="p-2">
            <button
              type="button"
              className="font-medium flex items-center "
              onClick={onLogout}
            >
              <MdLogout />
              <span>{visible == false ? "Logout" : ""}</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarMain;
