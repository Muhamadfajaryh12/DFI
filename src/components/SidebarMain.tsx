import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { asyncLogout } from "../states/authentication/action";
import { RiProductHuntLine, RiDashboardFill } from "react-icons/ri";
import { MdOutlineCategory, MdLogout, MdLocationCity } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { FaTableList } from "react-icons/fa6";

interface dataItem {
  title: string;
  icon: JSX.Element | string;
  link?: string;
  child?: dataItem[];
}

const SidebarMain = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState<string[]>([]);
  const data: dataItem[] = [
    {
      title: "Dashboard",
      icon: <RiDashboardFill className="mr-2" />,
      link: "/dashboard",
    },
    {
      title: "Employee",
      icon: <FaUserFriends className="mr-2" />,
      link: "/employee",
    },
    {
      title: "Category",
      icon: <MdOutlineCategory className="mr-2" />,
      link: "/category",
    },
    {
      title: "Product",
      icon: <RiProductHuntLine className="mr-2" />,
      child: [
        {
          title: "Master Product",
          icon: <FaTableList className="mr-2" />,
          link: "/product/master",
        },
        {
          title: "Item Product",
          icon: <FaTableList className="mr-2" />,
          link: "/product/item",
        },
        {
          title: "Task Product",
          icon: <FaTableList className="mr-2" />,
          link: "/product/task",
        },
        {
          title: "Patrol Product",
          icon: <FaTableList className="mr-2" />,
          link: "/product/patrol",
        },
      ],
    },
    {
      title: "Location",
      icon: <MdLocationCity className="mr-2" />,
      child: [
        {
          title: "Master Location",
          icon: <FaTableList className="mr-2" />,
          link: "/location/master",
        },
        {
          title: "Item Location",
          icon: <FaTableList className="mr-2" />,
          link: "/location/item",
        },
        {
          title: "Task Location",
          icon: <FaTableList className="mr-2" />,
          link: "/location/task",
        },
        {
          title: "Patrol Location",
          icon: <FaTableList className="mr-2" />,
          link: "/location/patrol",
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
    <aside
      className={`card flex flex-col justify-content-center ${
        visible == false ? "w-72" : "w-14"
      }  shadow-lg`}
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
        <ul className={`list-none   ${visible == false ? "p-2" : "px-0"} m-0`}>
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
                    <div className="font-medium flex items-center">
                      {item.icon}
                      <span>{visible == false ? item.title : ""}</span>
                    </div>
                    {visible == false ? (
                      open.includes(item.title) ? (
                        <IoIosArrowBack />
                      ) : (
                        <IoIosArrowDown />
                      )
                    ) : (
                      ""
                    )}
                  </li>
                  {item?.child?.map((items) => (
                    <li
                      key={items.title}
                      className={`p-2 ${
                        open.includes(item.title) ? "block" : "hidden"
                      } `}
                    >
                      <Link
                        className="hover:text-blue-400 font-medium flex items-center"
                        to={items?.link ? items.link : "/"}
                      >
                        {items.icon}
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
              onClick={() => onLogout(dispatch)}
            >
              <MdLogout className="mr-2" />
              <span>{visible == false ? "Logout" : ""}</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SidebarMain;
