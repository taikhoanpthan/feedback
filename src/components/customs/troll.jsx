import { Button, Card, Divider, message } from "antd";
import { SmileOutlined, CoffeeOutlined, HeartFilled } from "@ant-design/icons";
import BottomNavigation from "./BottomNavigation";
import { useNavigate } from "react-router-dom";

const Commission = () => {
  const navigate = useNavigate();
  const handleDonate = () => {
    sessionStorage.setItem("vipFeedback", "true");
    message.success("chuyển khỏan thành công! hihi");
    setTimeout(() => {
      navigate("/");
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-100 flex items-center justify-center p-6">
      <Card
        className="w-full max-w-md rounded-3xl shadow-2xl"
        styles={{
          body: {
            padding: 32,
          },
        }}
      >
        <div className="text-center">
          <CoffeeOutlined className="text-5xl text-red-500" />

          <h1 className="mt-4 text-3xl font-bold">VIP Feedback</h1>

          <p className="mt-2 text-gray-500">
            Chuyển khoản 50.000đ để nhận feedback
          </p>

          <Divider />

          {/* Fake QR */}

          <div className="flex justify-center">
            <div className="w-60 h-60 rounded-2xl border-4 border-dashed border-red-300 bg-white flex flex-col items-center justify-center">
              <div className="text-7xl">📱</div>

              <div className="mt-3 text-lg font-semibold">QR Code</div>

              <div className="text-sm text-gray-400">
                (Chỉ mang tính minh họa)
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-red-50 p-4">
            <p className="font-semibold text-red-600">
              💸 Nội dung chuyển khoản
            </p>

            <p className="mt-2 font-mono text-lg">FEEDBACK50K</p>
          </div>

          <Button
            type="primary"
            size="large"
            block
            className="mt-6 h-12"
            onClick={handleDonate}
          >
            Chuyển khoản 50.000đ
          </Button>

          <Divider />
        </div>
      </Card>
      <BottomNavigation />
    </div>
  );
};

export default Commission;
