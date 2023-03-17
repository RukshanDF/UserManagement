import { Button, Col, Row, Table } from "antd";
import { memo, useEffect, useState } from "react";
import { getUsers } from "./UsersApi";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";
const User = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers(setUsers);
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      filters: [
        ...new Map(
          users
            .map((data) => {
              return {
                text: data.name,
                value: data.name,
              };
            })
            .map((m) => [m.value, m])
        ).values(),
      ],
      onFilter: (value, record) => record.name.indexOf(value) === 0,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
      filters: users.map((data) => {
        return {
          text: data.email,
          value: data.email,
        };
      }),
      onFilter: (value, record) => record.email.indexOf(value) === 0,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      filters: [
        ...new Map(
          users
            .map((data) => {
              return {
                text: data.status,
                value: data.status,
              };
            })
            .map((m) => [m.value, m])
        ).values(),
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
      title: "Created Date",
      dataIndex: "date",
      key: "date",
      render: (e, f) => moment(f.date).format("MMMM Do YYYY, h:mm:ss a"),
      sorter: (a, b) => a.date.localeCompare(b.date),
      filters: [
        ...new Map(
          users
            .map((data) => {
              return {
                text: moment(data.date).format("MMMM Do YYYY"),
                value: moment(data.date).format("MMMM Do YYYY"),
              };
            })
            .map((m) => [m.value, m])
        ).values(),
      ],
      onFilter: (value, record) =>
        moment(record.date).format("MMMM Do YYYY").indexOf(value) === 0,
    },
    {
      title: "",
      dataIndex: "edit",
      key: "edit",
      render: (e, f) => (
        <Button onClick={() => navigate(`edit_user/${f._id}`)}>Edit</Button>
      ),
    },
  ];
  return (
    <>
      <Row justify="start">
        <Col>
          <span className="font_head">Users</span>
        </Col>
      </Row>
      <Row gutter={[24, 24]} className="md-1" justify="end">
        <Col>
          <Button type="primary" onClick={() => navigate("/add_user")}>
            Add User
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            dataSource={users}
            columns={columns}
            loading={!users[0]}
            rowKey="_id"
            scroll={{ x: 340 }}
          />
        </Col>
      </Row>
    </>
  );
};

export default memo(User);
