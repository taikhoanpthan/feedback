import { ConfigProvider, message } from "antd";
import { Toaster } from "react-hot-toast";

import AppRoutes from "./routes/AppRoutes";

// Cấu hình vị trí hiển thị của Ant Design Message
message.config({
  top: 80, // Điều chỉnh theo ý muốn (80-100px khá đẹp trên iPhone)
  duration: 2,
  maxCount: 3,
});

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
        toastOptions={{
          duration: 2000,
        }}
      />
    </ConfigProvider>
  );
}

export default App;