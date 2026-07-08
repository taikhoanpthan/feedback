import { Avatar, Badge } from "antd";
import {
  MessageOutlined,
  UserOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-slate-900 via-slate-800 to-red-900 shadow-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:px-8 md:py-4">

        {/* Logo */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 via-red-600 to-red-700 shadow-lg shadow-red-500/30">
            <MessageOutlined className="text-2xl text-white" />
          </div>

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
                text={
                  <span className="text-xs text-green-300">
                    Online
                  </span>
                }
              />
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">

          <div className="hidden md:flex flex-col items-end">
            <span className="text-sm font-semibold text-white">
              Restaurant Manager
            </span>

            <span className="text-xs text-slate-300">
              Feedback Dashboard
            </span>
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