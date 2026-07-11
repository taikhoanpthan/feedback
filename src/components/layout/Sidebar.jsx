import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  MessageOutlined,
  FileExcelOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider
      width={250}
      className="min-h-screen shadow-md"
      style={{
        background: "#001529",
        paddingTop: 12,
      }}
    >
      <div className="h-[72px] flex items-center justify-center border-b border-slate-700">
        <div className="text-center">
          <h2 className="text-white text-xl font-bold">
            Feedback
          </h2>

          <p className="text-slate-400 text-xs">
            Management
          </p>
        </div>
      </div>

      <Menu
        mode="inline"
        theme="dark"
        defaultSelectedKeys={["1"]}
        items={[
          {
            key: "1",
            icon: <DashboardOutlined />,
            label: "Dashboard",
          },
          {
            key: "2",
            icon: <MessageOutlined />,
            label: "Feedback",
          },
          {
            key: "3",
            icon: <FileExcelOutlined />,
            label: "Export Excel",
          },
          {
            key: "4",
            icon: <SettingOutlined />,
            label: "Settings",
          },
        ]}
      />
    </Sider>
  );
};

export default Sidebar;