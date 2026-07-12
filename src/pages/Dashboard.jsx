import { useEffect, useState } from "react";
import { Layout, message } from "antd";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import dayjs from "dayjs";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import BottomNavigation from "../components/customs/BottomNavigation";

import FilterBar from "../components/feedback/FilterBar";
import FeedbackTable from "../components/feedback/FeedbackTable";
import FeedbackModal from "../components/feedback/FeedbackModal";
import FeedbackDrawer from "../components/feedback/FeedbackDrawer";

import {
  getAllFeedback,
  deleteFeedback,
} from "../components/services/feedbackService";

const { Content } = Layout;

const Dashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [editingFeedback, setEditingFeedback] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);

      const data = await getAllFeedback();

      data.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));

      setFeedbacks(data);
    } catch (error) {
      console.error(error);
      message.error("Không thể tải dữ liệu!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleAdd = () => {
    setEditingFeedback(null);
    setOpenModal(true);
  };

  const handleView = (record) => {
    setSelectedFeedback(record);
    setOpenDrawer(true);
  };

  const handleEdit = (record) => {
    setEditingFeedback(record);
    setOpenModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteFeedback(id);

      message.success("Xóa thành công!");

      fetchFeedbacks();
    } catch (error) {
      console.error(error);
      message.error("Xóa thất bại!");
    }
  };

  const filteredFeedbacks = feedbacks.filter((item) => {
    const keyword = searchText.trim().toLowerCase();

    const matchSearch =
      item.tableNumber?.toLowerCase().includes(keyword) ||
      item.meal?.toLowerCase().includes(keyword) ||
      item.feedback?.toLowerCase().includes(keyword);

    const matchDate =
      !selectedDate || dayjs(item.dateTime).isSame(selectedDate, "day");

    return matchSearch && matchDate;
  });

  const handleExport = async () => {
    const exportData = selectedDate
      ? feedbacks.filter((item) =>
          dayjs(item.dateTime).isSame(selectedDate, "day"),
        )
      : filteredFeedbacks;

    if (!exportData.length) {
      message.warning("Không có dữ liệu để xuất!");
      return;
    }

    const workbook = new ExcelJS.Workbook();

    workbook.creator = "YAKIUO ISHIKAWA SAIGON";
    workbook.created = new Date();

    const worksheet = workbook.addWorksheet("Feedback Report");

    worksheet.mergeCells("A1:E1");

    const title = worksheet.getCell("A1");

    title.value = "YAKIUO ISHIKAWA SAIGON";

    title.font = {
      size: 18,
      bold: true,
      color: { argb: "FFFFFFFF" },
    };

    title.alignment = {
      horizontal: "center",
      vertical: "middle",
    };

    title.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "B91C1C" },
    };

    worksheet.getRow(1).height = 30;

    worksheet.mergeCells("A2:E2");
    worksheet.getCell("A2").value = "Customer Feedback Report";
    worksheet.getCell("A2").font = {
      size: 13,
      bold: true,
    };
    worksheet.getCell("A2").alignment = {
      horizontal: "center",
    };

    worksheet.mergeCells("A3:E3");
    worksheet.getCell("A3").value = `Ngày xuất: ${dayjs().format(
      "DD/MM/YYYY HH:mm:ss",
    )}`;

    worksheet.columns = [
      { header: "STT", key: "stt", width: 8 },
      { header: "Ngày", key: "date", width: 24 },
      { header: "Số bàn", key: "table", width: 12 },
      { header: "Khách ăn gì", key: "meal", width: 28 },
      { header: "Feedback", key: "feedback", width: 60 },
    ];

    const headerRow = worksheet.getRow(5);

    headerRow.values = ["STT", "Ngày", "Số bàn", "Khách ăn gì", "Feedback"];

    headerRow.eachCell((cell) => {
      cell.font = {
        bold: true,
        color: { argb: "FFFFFFFF" },
      };

      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "111827" },
      };

      cell.alignment = {
        horizontal: "center",
        vertical: "middle",
      };

      cell.border = {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      };
    });

    exportData.forEach((item, index) => {
      const row = worksheet.addRow({
        stt: index + 1,
        date: dayjs(item.dateTime).format("DD/MM/YYYY HH:mm"),
        table: item.tableNumber,
        meal: item.meal,
        feedback: item.feedback,
      });

      row.eachCell((cell, col) => {
        cell.border = {
          top: { style: "thin" },
          bottom: { style: "thin" },
          left: { style: "thin" },
          right: { style: "thin" },
        };

        cell.alignment =
          col <= 3
            ? {
                horizontal: "center",
                vertical: "middle",
              }
            : {
                horizontal: "left",
                vertical: "middle",
                wrapText: true,
              };
      });
    });

    worksheet.views = [
      {
        state: "frozen",
        ySplit: 5,
      },
    ];

    const buffer = await workbook.xlsx.writeBuffer();

    saveAs(
      new Blob([buffer]),
      selectedDate
        ? `Feedback_${selectedDate.format("DD-MM-YYYY")}.xlsx`
        : `Feedback_All_${dayjs().format("YYYYMMDD_HHmmss")}.xlsx`,
    );

    message.success("Xuất Excel thành công!");
  };

  return (
    <>
      <Layout className="min-h-screen">
        {/* Sidebar: Tablet + Desktop
        <div className="hidden md:block">
          <Sidebar />
        </div> */}

        <Layout className="min-w-0">
          <Navbar />

          <Content
            className="bg-slate-100 p-4 md:p-6 pb-24 md:pb-6 overflow-x-auto"
            style={{
              paddingTop: "calc(64px + env(safe-area-inset-top) + 40px)",
            }}
          >
            <FilterBar
              searchText={searchText}
              onSearch={setSearchText}
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              onAdd={handleAdd}
              onExport={handleExport}
            />

            <FeedbackTable
              data={filteredFeedbacks}
              loading={loading}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

            <FeedbackModal
              open={openModal}
              onClose={() => setOpenModal(false)}
              editingFeedback={editingFeedback}
              onSuccess={fetchFeedbacks}
            />

            <FeedbackDrawer
              open={openDrawer}
              onClose={() => setOpenDrawer(false)}
              feedback={selectedFeedback}
            />
          </Content>
        </Layout>
      </Layout>

      {/* Bottom Navigation: Mobile */}
      <div className="md:hidden">
        <BottomNavigation />
      </div>
    </>
  );
};

export default Dashboard;
