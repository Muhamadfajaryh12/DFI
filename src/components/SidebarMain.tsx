import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { asyncLogout } from "../states/authentication/action";
import { RiProductHuntLine, RiDashboardFill } from "react-icons/ri";
import { MdOutlineCategory, MdLogout, MdLocationCity } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { FiMinus } from "react-icons/fi";
import { asyncGetProfile } from "../states/users/action";
import { useAppSelector } from "../hooks/useRedux";
import imageProfile from "../assets/user_profile.png";
import AuthenticationAPI from "../API/AuthenticationAPI";
interface dataItem {
  title: string;
  icon: JSX.Element | string;
  role?: string;
  link?: string;
  child?: dataItem[];
}
const SidebarMain = (props: any) => {
  const { visible, setVisible } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user = [] } = useAppSelector((state) => state);
  const getProfile = (dispatch: any) => {
    dispatch(asyncGetProfile());
  };
  useEffect(() => {
    getProfile(dispatch);
  }, [dispatch]);

  useEffect(() => {
    const handleLogout = async () => {
      const response: any = await AuthenticationAPI.logout();
      if (response?.response?.status == 500) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("id");
        localStorage.removeItem("role");
        navigate("/");
      }
    };

    handleLogout();
  }, [dispatch, navigate]);

  const [open, setOpen] = useState<string[]>([]);
  const data: dataItem[] = [
    {
      title: "Dashboard",
      icon: (
        <RiDashboardFill
          className={visible == false ? "mr-2" : "mr-2 sm:m-0"}
        />
      ),
      link: "/",
      role: "ALL",
    },
    {
      title: "Employee",
      icon: (
        <FaUserFriends className={visible == false ? "mr-2" : "mr-2 sm:m-0"} />
      ),
      link: "/employee",
      role: "Admin",
    },
    {
      title: "Category",
      icon: (
        <MdOutlineCategory
          className={visible == false ? "mr-2" : "mr-2 sm:m-0"}
        />
      ),
      link: "/category",
      role: "Admin",
    },
    {
      title: "Product",
      role: "Quality Control",
      icon: (
        <RiProductHuntLine
          className={visible == false ? "mr-2" : "mr-2 sm:m-0"}
        />
      ),
      child: [
        {
          title: "Master Product",
          icon: (
            <FiMinus className={visible == false ? "mr-2" : "mr-2 sm:m-0"} />
          ),
          link: "/product/master",
        },
        {
          title: "Item Product",
          icon: (
            <FiMinus className={visible == false ? "mr-2" : "mr-2 sm:m-0"} />
          ),
          link: "/product/item",
        },
        {
          title: "Task Product",
          icon: (
            <FiMinus className={visible == false ? "mr-2" : "mr-2 sm:m-0"} />
          ),
          link: "/product/task",
        },
        {
          title: "Patrol Product",
          icon: (
            <FiMinus className={visible == false ? "mr-2" : "mr-2 sm:m-0"} />
          ),
          link: "/product/patrol",
        },
      ],
    },
    {
      title: "Location",
      role: "Quality Control",
      icon: (
        <MdLocationCity className={visible == false ? "mr-2" : "mr-2 sm:m-0"} />
      ),
      child: [
        {
          title: "Master Location",
          icon: (
            <FiMinus className={visible == false ? "mr-2" : "mr-2 sm:m-0"} />
          ),
          link: "/location/master",
        },
        {
          title: "Item Location",
          icon: (
            <FiMinus className={visible == false ? "mr-2" : "mr-2 sm:m-0"} />
          ),
          link: "/location/item",
        },
        {
          title: "Task Location",
          icon: (
            <FiMinus className={visible == false ? "mr-2" : "mr-2 sm:m-0"} />
          ),
          link: "/location/task",
        },
        {
          title: "Patrol Location",
          icon: (
            <FiMinus className={visible == false ? "mr-2" : "mr-2 sm:m-0"} />
          ),
          link: "/location/patrol",
        },
      ],
    },
  ];
  const filteredData = data.filter(
    (item) => item.role === user?.role || item.role === "ALL"
  );

  const openGroup = (title: string) => {
    if (open.includes(title)) {
      setOpen(open.filter((id) => id !== title));
    } else {
      setOpen([...open, title]);
    }
  };

  useEffect(() => {
    if (visible) {
      setOpen([]);
    }
  }, [visible]);
  console.log(visible);
  const onLogout = async (dispatch: any) => {
    await dispatch(asyncLogout());
    navigate("/");
  };
  return (
    <aside
      className={`card flex flex-col justify-content-center sm:relative bg-white ${
        visible == false
          ? "hidden sm:block sm:w-72"
          : "block absolute w-72 h-screen sm:w-14"
      } shadow-lg z-50 sm:z-auto transition-all duration-300`}
    >
      <div className="p-3">
        <div
          className={`flex justify-between items-center ${
            visible == false ? "block" : " block sm:hidden"
          }`}
        >
          <h5 className="font-semibold text-sm my-2">Daesang Food Indonesia</h5>
          <button
            className=" p-2 rounded-md sm:hidden block"
            onClick={() => setVisible(false)}
          >
            <span className="pi pi-bars"></span>
          </button>
        </div>
        <div className="border-2 rounded-md bg-gray-200 p-2">
          <Link to="profile" className="flex items-center justify-evenly">
            <img
              className={`rounded-full
                ${visible == false ? "w-14 h-14 " : " w-14 h-8 "}`}
              src={
                user?.foto != null
                  ? `http://127.0.0.1:8000/storage/${user?.foto}`
                  : imageProfile
              }
              alt=""
            />
            <div className="">
              <h6 className={visible == false ? "block" : "block sm:hidden"}>
                {user?.name}
              </h6>
              <p
                className={`text-xs ${
                  visible == false ? "block" : "block sm:hidden"
                }`}
              >
                {user?.role}
              </p>
            </div>
          </Link>
        </div>
        <ul className={`list-none ${visible == false ? "p-2" : "px-0"} m-0`}>
          {filteredData.map((item) => (
            <li className="p-2" key={item.title}>
              {item.link != null ? (
                <Link
                  className="hover:text-blue-400 font-medium flex items-center"
                  to={item?.link}
                >
                  {item.icon}
                  <span
                    className={visible == false ? "block" : "block sm:hidden"}
                  >
                    {item.title}
                  </span>
                </Link>
              ) : (
                <ul>
                  <li
                    key={item.title}
                    className="flex  justify-between items-center"
                    onClick={() => openGroup(item.title)}
                  >
                    <div className="font-medium flex items-center">
                      {item.icon}
                      <span
                        className={
                          visible == false ? "block" : "block sm:hidden"
                        }
                      >
                        {item.title}
                      </span>
                    </div>
                    {visible == false ? (
                      open.includes(item.title) ? (
                        <IoIosArrowDown />
                      ) : (
                        <IoIosArrowBack />
                      )
                    ) : (
                      ""
                    )}
                  </li>
                  {item?.child?.map((items) => (
                    <li
                      key={items.title}
                      className={`p-2 my-1 ${
                        open.includes(item.title) ? "block" : "hidden"
                      } `}
                    >
                      <Link
                        className="hover:text-blue-400 font-medium flex items-center"
                        to={items?.link ? items.link : "/"}
                      >
                        {items.icon}
                        <span>{items.title}</span>
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
              <MdLogout className={visible == false ? "mr-2" : "mr-2 sm:m-0"} />
              <span className={visible == false ? "block" : "block sm:hidden"}>
                Logout
              </span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SidebarMain;
