/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  List,
  Modal,
  Row,
  Select,
} from "antd";
import { memo, useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist";
import { OpportunityStatus, Status } from "../../utils/Status";
import { MesContextHolder } from "../Context";
import AddOpportunity from "./AddOpportunity";
import {
  AddOpportunityToUser,
  addUser,
  getUserById,
  removeOpportunity,
  removeUser,
  updateOpportunity,
  updateUser,
} from "./UsersApi";

const AddEditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const messageApi = useContext(MesContextHolder);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(false);
  const [modal, contextHolderM] = Modal.useModal();
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (id) {
      getUserElm();
    }
  }, []);

  const getUserElm = () => {
    setUser(false);
    getUserById(id, setUser, messageApi, setIsLoading);
  };

  const onFinish = (values) => {
    id
      ? updateUser(
          { ...values, _id: id },
          setIsLoading,
          messageApi,
          navigateToTable
        )
      : addUser(values, setIsLoading, messageApi, navigateToTable);
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };

  const handleDelete = () => {
    modal.confirm({
      title: "Confirm",
      content: "Are you sure you want to delete?",
      okText: "Yes",
      cancelText: "Cancel",
      onOk: () => removeUser(user, setIsLoading, messageApi, navigateToTable),
    });
  };

  const handleRemoveUser = (opportunity) => {
    modal.confirm({
      title: "Confirm",
      content: "Are you sure you want to remove this opportunity from User?",
      okText: "Yes",
      cancelText: "Cancel",
      onOk: () =>
        removeOpportunity(
          { id, opportunity },
          setIsLoading,
          messageApi,
          getUserElm
        ),
    });
  };

  const handleChangeStatus = (opportunity, status) => {
    modal.confirm({
      title: "Confirm",
      content: `Are you sure you want to change this opportunity status to ${opportunity}?`,
      okText: "Yes",
      cancelText: "Cancel",
      onOk: () =>
        updateOpportunity(
          { id, opportunity, status },
          setIsLoading,
          messageApi,
          getUserElm
        ),
    });
  };

  const handleUserOpportunity = useCallback((values) => {
    if (id) {
      AddOpportunityToUser(
        { ...values, _id: id },
        setIsLoading,
        messageApi,
        getUserElm
      );
    } else {
      messageApi.open({
        type: "warning",
        content: "User should create before adding opportunity",
      });
    }
  }, []);

  const navigateToTable = () => navigate("/");
  return (
    <>
      <AddOpportunity
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleUserOpportunity={handleUserOpportunity}
      />
      {contextHolderM}
      <Row justify="space-between" className="md-1">
        <Col>
          <span className="font_head">{id ? "Edit User" : "Add User"}</span>
        </Col>
        {id && (
          <Col span={8}>
            <Button
              type="primary"
              danger
              onClick={handleDelete}
              loading={isLoading}
            >
              Delete
            </Button>
          </Col>
        )}
      </Row>
      <Divider />
      <Row align={"middle"}>
        <Col span={24}>
          {((id && user) || !id) && (
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={user}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              disabled={isLoading}
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please input name!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                disabled
                rules={[
                  { required: true, message: "Please input email!" },
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                ]}
              >
                <Input disabled={id} />
              </Form.Item>

              <Form.Item
                label="Status"
                name="status"
                rules={[{ required: true, message: "Please input status!" }]}
              >
                <Select style={{ width: "100%" }} placeholder="select status">
                  {Status.map((data) => (
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
          )}
        </Col>
      </Row>
      <Divider />
      {id && (
        <>
          <Row justify="space-between" className="md-1">
            <Col>
              <span className="font_head">Opportunities List</span>
            </Col>

            <Col span={8}>
              <Button
                type="primary"
                onClick={() => setIsModalOpen(true)}
                loading={isLoading}
              >
                Add Opportunity
              </Button>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <List
                grid={{ gutter: 8, column: 1 }}
                dataSource={user.opportunities}
                renderItem={(item) => (
                  <>
                    <List.Item>
                      <Row className="d-flex">
                        <Col span={8} className="pd-5 lh pl">
                          {item.opportunity}
                        </Col>
                        <Col span={8} className="pd-5">
                          <Select
                            style={{ width: "100%" }}
                            placeholder="select status"
                            value={item.status}
                            onChange={(e) =>
                              handleChangeStatus(item.opportunity, e)
                            }
                          >
                            {OpportunityStatus.map((data) => (
                              <Select.Option key={data}>{data}</Select.Option>
                            ))}
                          </Select>
                        </Col>
                        <Col
                          className="pd-5 text_button lh pl"
                          span={8}
                          onClick={() => handleRemoveUser(item.opportunity)}
                        >
                          Remove
                        </Col>
                      </Row>
                    </List.Item>
                  </>
                )}
              />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default memo(AddEditUser);
