import { useEffect, useMemo, useState } from "react";
import {
  Layout,
  Typography,
  Input,
  Row,
  Col,
  Spin,
  Empty,
  message,
  Button,
  Modal,
  Form,
} from "antd";

import { SearchOutlined, PlusOutlined } from "@ant-design/icons";

import Navbar from "../components/layout/Navbar";
import BottomNavigation from "../components/customs/BottomNavigation";

import EmployeeCard from "../components/commission/EmployeeCard";
import EmployeeGallery from "../components/commission/EmployeeGallery";
import UploadImage from "../components/commission/UploadImage";

import { getImages, deleteImage } from "../components/services/imageService";

import {
  getSections,
  createSection,
} from "../components/services/sectionManagementService";

const { Content } = Layout;
const { Title, Text } = Typography;

const Commission = () => {
  const [loading, setLoading] = useState(false);

  const [images, setImages] = useState([]);

  const [sections, setSections] = useState([]);

  const [search, setSearch] = useState("");

  const [selectedFolder, setSelectedFolder] = useState(null);

  const [openUpload, setOpenUpload] = useState(false);

  const [openSectionModal, setOpenSectionModal] = useState(false);

  const [form] = Form.useForm();

  const fetchImages = async () => {
    try {
      setLoading(true);

      const data = await getImages();

      setImages(data);
    } catch (err) {
      console.log(err);

      message.error("Không thể tải ảnh.");
    } finally {
      setLoading(false);
    }
  };

  const fetchSections = async () => {
    try {
      const data = await getSections();

      setSections(data);
    } catch (err) {
      console.log(err);

      message.error("Không thể tải nhân viên.");
    }
  };

  useEffect(() => {
    fetchImages();
    fetchSections();
  }, []);

  const folders = useMemo(() => {
    return sections.map((section) => ({
      id: section.id,
      name: section.name,
      count: images.filter((item) => item.folder === section.name).length,
    }));
  }, [sections, images]);

  const filteredFolders = folders.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  const folderImages = images.filter((item) => item.folder === selectedFolder);

  const handleDelete = async (id) => {
    try {
      await deleteImage(id);

      message.success("Đã xóa ảnh");

      fetchImages();
    } catch (err) {
      console.log(err);

      message.error("Xóa thất bại");
    }
  };

  const handleCreateSection = async (values) => {
    try {
      await createSection({
        name: values.name,
      });

      message.success("Đã thêm nhân viên");

      form.resetFields();

      setOpenSectionModal(false);

      fetchSections();
    } catch (err) {
      console.log(err);

      message.error("Không thể tạo nhân viên.");
    }
  };

  return (
    <>
      <Layout className="min-h-screen">
        <Layout>
          <Navbar />

          <Content
            className="bg-slate-100 p-4 md:p-6 pb-24"
            style={{
              paddingTop: "calc(64px + env(safe-area-inset-top) + 40px)",
            }}
          >
            {" "}
            {!selectedFolder ? (
              <>
                {/* Header */}

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                  {/* <div>
                    <Title level={2} className="!mb-1">
                      Commission Gallery
                    </Title>

                    <Text type="secondary">
                      Quản lý hình ảnh đánh giá của nhân viên
                    </Text>
                  </div> */}

                  {/* <Button
                    type="primary"
                    size="large"
                    icon={<PlusOutlined />}
                    onClick={() => setOpenSectionModal(true)}
                  >
                    Thêm nhân viên
                  </Button> */}
                </div>

                {/* Search */}

                <Input
                  allowClear
                  size="large"
                  prefix={<SearchOutlined />}
                  placeholder="Tìm nhân viên..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="mb-8"
                />

                {/* Folder */}

                {loading ? (
                  <div className="flex justify-center py-24">
                    <Spin size="large" />
                  </div>
                ) : filteredFolders.length === 0 ? (
                  <Empty description="Chưa có nhân viên" />
                ) : (
                  <Row gutter={[20, 20]}>
                    {filteredFolders.map((section) => (
                      <Col
                        xs={24}
                        sm={12}
                        md={8}
                        lg={6}
                        xl={6}
                        key={section.id}
                      >
                        <EmployeeCard
                          name={section.name}
                          count={section.count}
                          onClick={() => setSelectedFolder(section.name)}
                        />
                      </Col>
                    ))}
                  </Row>
                )}
              </>
            ) : (
              <EmployeeGallery
                folder={selectedFolder}
                images={folderImages}
                loading={loading}
                onBack={() => setSelectedFolder(null)}
                onUpload={() => setOpenUpload(true)}
                onDelete={handleDelete}
              />
            )}
            <UploadImage
              open={openUpload}
              folder={selectedFolder}
              onClose={() => setOpenUpload(false)}
              onSuccess={fetchImages}
            />
            <Modal
              open={openSectionModal}
              title="Thêm nhân viên"
              footer={null}
              destroyOnClose
              onCancel={() => {
                form.resetFields();
                setOpenSectionModal(false);
              }}
            >
              <Form
                form={form}
                layout="vertical"
                onFinish={handleCreateSection}
              >
                <Form.Item
                  label="Tên nhân viên"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Nhập tên nhân viên",
                    },
                  ]}
                >
                  <Input placeholder="Ví dụ: Mỹ" />
                </Form.Item>

                <Button htmlType="submit" type="primary" block>
                  Tạo nhân viên
                </Button>
              </Form>
            </Modal>{" "}
          </Content>
        </Layout>
      </Layout>

      {/* Bottom Navigation */}
      <div>
        <BottomNavigation />
      </div>
    </>
  );
};

export default Commission;
