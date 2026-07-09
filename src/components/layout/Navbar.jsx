import { Avatar, Badge, Button, Tooltip } from "antd";
import { UserOutlined, ReloadOutlined } from "@ant-design/icons";
import logo from "../../assets/fb.png";

const Navbar = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900 via-slate-800 to-red-900 backdrop-blur-xl shadow-xl"
      style={{
        paddingTop: "env(safe-area-inset-top)",
        paddingLeft: "max(16px, env(safe-area-inset-left))",
        paddingRight: "max(16px, env(safe-area-inset-right))",
      }}
    >
      <div className="mx-auto flex min-h-[84px] max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8">
        {/* Left */}
        <div className="flex min-w-0 items-center gap-4">
          <img
            src={logo}
            alt="YAKIUO"
            className="h-14 w-14 shrink-0 rounded-2xl shadow-lg"
          />

          <div className="min-w-0">
            <h1 className="truncate text-xl font-bold tracking-wide text-white md:text-3xl">
              YAKIUO ISHIKAWA
            </h1>

            <div className="mt-1 flex items-center gap-2">
              <p className="hidden text-sm text-slate-300 sm:block">
                Customer Feedback Management System
              </p>

              <Badge
                status="success"
                text={
                  <span className="text-xs font-medium text-green-300">
                    Online
                  </span>
                }
              />
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <Tooltip title="Làm mới">
            <Button
              type="text"
              shape="circle"
              size="large"
              icon={<ReloadOutlined className="text-xl text-white" />}
              onClick={handleReload}
              className="h-11 w-11 hover:!bg-white/15"
            />
          </Tooltip>

          <div className="hidden md:flex flex-col items-end">
            <span className="text-base font-semibold text-white">
              Restaurant Manager
            </span>

            <span className="text-sm text-slate-300">
              Feedback Dashboard
            </span>
          </div>

          <Avatar
            size={52}
            icon={<UserOutlined />}
            className="border-2 border-white bg-gradient-to-br from-red-500 to-red-700 shadow-lg shadow-red-500/30"
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;