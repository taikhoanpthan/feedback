import {
  DashboardOutlined,
  MessageOutlined,
  FileExcelOutlined,
  HeartOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menus = [
    {
      key: "/",
      icon: <DashboardOutlined />,
      label: "Home",
    },
    {
      key: "/commission",
      icon: <MessageOutlined />,
      label: "Commission",
    },
    {
      key: "/troll",
      icon: <HeartOutlined />,
      label: "Donate",
    },
    {
      key: "/settings",
      icon: <SettingOutlined />,
      label: "Settings",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t shadow-lg lg:hidden flex justify-around items-center z-50">
      {menus.map((item) => (
        <button
          key={item.key}
          onClick={() => navigate(item.key)}
          className={`flex flex-col items-center text-xs ${
            location.pathname === item.key ? "text-blue-600" : "text-gray-500"
          }`}
        >
          <span className="text-xl">{item.icon}</span>
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default BottomNavigation;
