import {
  DashboardOutlined,
  MessageOutlined,
  HeartOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

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

export default function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className="
        fixed
        bottom-6
        left-1/2
        -translate-x-1/2
        z-50
        w-[92%]
        sm:max-w-md
        md:max-w-lg
        lg:max-w-xl
        xl:max-w-2xl
      "
    >
      <div
        className="
          relative
          flex
          items-center
          justify-around
          rounded-full
          border
          border-white/40
          bg-white/55
          backdrop-blur-3xl
          shadow-[0_20px_60px_rgba(0,0,0,.15)]
          p-1.5
          overflow-hidden
        "
      >
        {menus.map((item) => {
          const active = location.pathname === item.key;

          return (
            <button
              key={item.key}
              onClick={() => navigate(item.key)}
              className="relative flex flex-1 justify-center py-0.5"
            >
              {active && (
                <motion.div
                  layoutId="liquid"
                  transition={{
                    type: "spring",
                    stiffness: 420,
                    damping: 28,
                    mass: 0.8,
                  }}
                  className="
                    absolute
                    inset-0
                    rounded-full
                    bg-white
                    shadow-[0_8px_25px_rgba(59,130,246,.18)]
                  "
                />
              )}

              <motion.div
                whileTap={{ scale: 0.92 }}
                animate={{
                  y: active ? -1 : 0,
                  scale: active ? 1.05 : 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 22,
                }}
                className={`
                  relative
                  z-10
                  flex
                  flex-col
                  items-center
                  gap-0.5
                  px-4
                  py-1
                  ${
                    active
                      ? "text-blue-600"
                      : "text-slate-500 hover:text-slate-700"
                  }
                `}
              >
                <span className="text-[20px] leading-none">
                  {item.icon}
                </span>

                <span className="text-[10px] font-medium leading-none">
                  {item.label}
                </span>
              </motion.div>
            </button>
          );
        })}
      </div>
    </div>
  );
}