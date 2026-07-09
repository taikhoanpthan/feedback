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
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 lg:hidden w-[94%] max-w-md">
      <div
        className="
          relative
          flex
          justify-around
          items-center
          rounded-full
          border border-white/40
          bg-white/55
          backdrop-blur-3xl
          shadow-[0_20px_60px_rgba(0,0,0,.15)]
          p-2
          overflow-hidden
        "
      >
        {menus.map((item) => {
          const active = location.pathname === item.key;

          return (
            <button
              key={item.key}
              onClick={() => navigate(item.key)}
              className="relative flex-1 flex justify-center py-1"
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
                whileTap={{
                  scale: 0.9,
                }}
                animate={{
                  y: active ? -2 : 0,
                  scale: active ? 1.08 : 1,
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
                  gap-1
                  px-4
                  py-2
                  ${
                    active
                      ? "text-blue-600"
                      : "text-slate-500"
                  }
                `}
              >
                <span className="text-[22px]">
                  {item.icon}
                </span>

                <span className="text-[11px] font-medium">
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