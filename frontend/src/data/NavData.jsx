import { FaHome } from "react-icons/fa";
import { MdExplore } from "react-icons/md";
import { IoMdNotifications, IoIosColorPalette } from "react-icons/io";
import { BsMessenger } from "react-icons/bs";
import { TbSquarePlus } from "react-icons/tb";
 import { FaSearch } from "react-icons/fa";
import profile from '../socialmedia/avatar/avatar2.jpg'




export const NavData = [
  {
    _id: 1,
    target: "/home",
    name: "Home",
    icon: <FaHome />,
    active: true,
  },
  {
    _id: 6,
    target: "#",
    name: "Search",
    icon: <FaSearch />,
    active: false,
  },
  {
    _id: 2,
    target: "/explore",
    name: "Explore",
    icon: <MdExplore />,
    active: false,
  },
  {
    _id: 3,
    target: "#",
    name: "Notfication",
    icon: <IoMdNotifications />,
    active: false,
  },
  {
    _id: 4,
    target: "/message",
    name: "Message",
    icon: <BsMessenger />,
    active: false,
  },
  {
    _id: 5,
    target: "#",
    name: "Create",
    icon: <TbSquarePlus />,
    active: false,
  },

  {
    _id: 7,
    target: "/profile/zoya",
    name: "Profile",
    icon: (
      <img
        src={profile}
        alt=""
      />
    ),
    active: false,
  },
  {
    _id: 8,
    target: "#",
    name: "Theme",
    icon: <IoIosColorPalette />,
    active: false,
  },
];
