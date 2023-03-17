import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import { memo } from "react";
import { OpportunityStatus } from "../../utils/Status";
const AddOpportunity = ({
  isModalOpen,
  setIsModalOpen,
  handleUserOpportunity,
}) => {
  const handleOk = (values) => {
    handleUserOpportunity(values);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Add Opportunity"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose={true}
      >
        <Row>
          <Col span={24}>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              onFinish={handleOk}
              autoComplete="off"
            >
              <Form.Item
                label="Opportunity"
                name="opportunity"
                rules={[
                  { required: true, message: "Please input Opportunity!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Status"
                name="status"
                rules={[
                  { required: true, message: "Please input Opportunity!" },
                ]}
              >
                <Select style={{ width: "100%" }} placeholder="select status">
                  {OpportunityStatus.map((data) => (
                    <Select.Option value={data} key={data}>
                      {data}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default memo(AddOpportunity);
