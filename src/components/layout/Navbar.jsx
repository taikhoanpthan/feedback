import { Avatar, Badge, Button, Tooltip } from "antd";
import {
  MessageOutlined,
  UserOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import logo from "../../assets/fb.png";
const Navbar = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-slate-900 via-slate-800 to-red-900 shadow-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:px-8 md:py-4">
        {/* Logo */}
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={logo}
            alt="YAKIUO"
            className="w-12 h-12 rounded-2xl shadow-lg"
          />

          <div className="min-w-0">
            <h1 className="truncate text-lg md:text-2xl font-bold tracking-wide text-white">
              YAKIUO ISHIKAWA
            </h1>

            <div className="flex items-center gap-2">
              <p className="hidden sm:block text-xs md:text-sm text-slate-300">
                Customer Feedback
              </p>

              <Badge
                status="success"
                text={<span className="text-xs text-green-300">Online</span>}
              />
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Reload */}
          <Tooltip title="Tải lại dữ liệu">
            <Button
              type="text"
              shape="circle"
              size="large"
              icon={<ReloadOutlined className="text-white text-lg" />}
              onClick={handleReload}
              className="hover:!bg-white/15 transition-all duration-300"
            />
          </Tooltip>

          <div className="hidden md:flex flex-col items-end">
            <span className="text-sm font-semibold text-white">
              Restaurant Manager
            </span>

            <span className="text-xs text-slate-300">Feedback Dashboard</span>
          </div>

          <Avatar
            size={46}
            icon={<UserOutlined />}
            className="bg-gradient-to-br from-red-500 to-red-700 shadow-lg shadow-red-500/30 border-2 border-white"
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
