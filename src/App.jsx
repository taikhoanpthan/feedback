import { ConfigProvider } from "antd";
import { Toaster } from "react-hot-toast";

import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1677ff",
          borderRadius: 10,
          colorBgLayout: "#f5f7fa",
          fontFamily: "Inter, sans-serif",
        },
      }}
    >
      <AppRoutes />

      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </ConfigProvider>
  );
}

export default App;