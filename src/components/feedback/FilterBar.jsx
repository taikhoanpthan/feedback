import {
  Button,
  DatePicker,
  Input,
} from "antd";
import {
  DownloadOutlined,
  PlusOutlined,
  SearchOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

const { Search } = Input;

const FilterBar = ({
  searchText,
  onSearch,
  selectedDate,
  onDateChange,
  onAdd,
  onExport,
}) => {
  return (
    <div className="mb-6 rounded-3xl bg-white p-4 md:p-6 shadow-lg border border-slate-100">

      {/* Header */}
      <div className="mb-5">
        <h2 className="text-xl font-bold text-slate-800">
          Customer Feedback
        </h2>

        <p className="text-sm text-slate-500">
          Tìm kiếm, lọc và quản lý phản hồi khách hàng
        </p>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">

        {/* Search + Date */}
        <div className="flex flex-col md:flex-row gap-3 flex-1">

          <Search
            allowClear
            size="large"
            value={searchText}
            placeholder="Tìm số bàn, món ăn hoặc feedback..."
            prefix={<SearchOutlined />}
            onChange={(e) => onSearch(e.target.value)}
            className="flex-1"
          />

          <DatePicker
            size="large"
            value={selectedDate}
            onChange={onDateChange}
            format="DD/MM/YYYY"
            allowClear
            suffixIcon={<CalendarOutlined />}
            placeholder="Chọn ngày"
            className="w-full md:w-52"
          />
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3 lg:flex">

          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={onAdd}
            className="!h-11 !rounded-xl !bg-gradient-to-r !from-red-500 !to-red-700 border-0 shadow-md"
          >
            Thêm
          </Button>

          <Button
            icon={<DownloadOutlined />}
            size="large"
            onClick={onExport}
            className="!h-11 !rounded-xl"
          >
            Excel
          </Button>

        </div>

      </div>
    </div>
  );
};

export default FilterBar;