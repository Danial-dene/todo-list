import {
  Table,
  Tag,
  Checkbox,
  Button,
  Form,
  Input,
  FormInstance,
  Modal,
  Radio,
  Card,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import React, { useState, useRef } from "react";
import _, { values } from "lodash";

const TodoComp: React.FC<any> = () => {
  const formRef = useRef<FormInstance>(null);

  const [record, setRecord] = useState(undefined);
  const [visible, setVisible] = useState(false);
  const [addModal, setaddModal] = useState(false);
  const [editData, setEditData] = useState(undefined);
  const [data, setData] = useState([
    {
      id: 1,
      text: "Playing dota",
      completed: true,
      createdAt: moment().format("l"),
    },
    {
      id: 2,
      text: "Playing dota 2",
      completed: false,
      createdAt: moment().format("l"),
    },
  ]);

  const onAdd = (value: any) => {
    localStorage.setItem("text", JSON.stringify(value));

    const saved = localStorage.getItem("text") || "";
    const initialValue = JSON.parse(saved);

    const number = Number(Math.random());
    const newData = {
      id: number,
      text: initialValue.task,
      completed: false,
      createdAt: moment().format("l"),
    };

    setData((pre) => {
      return [...pre, newData];
    });
  };

  const onDelete = (data: any) => {
    Modal.confirm({
      title: "Are you sure want to delete?",
      okType: "danger",
      okText: "Yes",
      onOk: () => {
        setData((d) => {
          return d.filter((task) => task.id !== data.id);
        });
      },
    });
  };

  const showModal = (data: any) => {
    setVisible(true);
    setRecord(data);
    //console.log({ ...data });
  };

  const onEdit = (data: any) => {};

  const onClose = () => {
    setVisible(false);
    setRecord(undefined);
  };

  const columns = () => [
    /* { title: "#", dataIndex: "id", render: (index: any) => index + 1 }, */
    {
      title: "Task",
      dataIndex: "text",
      align: "center" as const,
      className: "text-white-600/100",
    },
    {
      title: "Status",
      dataIndex: "completed",
      align: "center" as const,
      render: (completed: boolean) => {
        return (
          <div className="inline-flex">
            <Tag
              className="flex-none w-22"
              color={completed ? "#168d1c" : "#d9b202"}
              /* icon={completed ? <CheckCircleOutlined /> : <WarningOutlined />} */
            >
              {completed ? "Completed" : "Incomplete"}
            </Tag>
          </div>
        );
      },
    },
    {
      title: "Created/Updated at",
      dataIndex: "createdAt",
      align: "center" as const,
    },
    {
      title: "Actions",
      align: "center" as const,
      render: (data: any) => {
        return (
          <div className="grid grid-cols-2 gap-4 place-content-center h-5">
            {/* <Checkbox
              onClick={() => onChange(data)}
              className="flex-initial w-30"
            /> */}
            <Button
              shape="round"
              size="small"
              onClick={() => onDelete(data)}
              type="primary"
              /* icon={<DeleteOutlined />} */
              danger
            >
              Delete
            </Button>
            <Button
              onClick={() => showModal(data)}
              shape="round"
              size="small"
              type="primary"
            >
              Edit
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Modal
        visible={addModal}
        destroyOnClose
        closable={false}
        onCancel={() => onClose()}
        title="Edit task"
        okText="Save"
      >
        {" "}
        <Form onFinish={(values) => onAdd(values)} ref={formRef}>
          {/*  <Form.Item
        name="task"
        rules={[{ required: true, message: "Please input a task!" }]}
      >
        <Input
          type="text"
          placeholder="Enter new task"
          style={{ width: "70%", margin: "auto" }}
        />
      </Form.Item> */}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="small"
              shape="circle"
              style={{
                marginLeft: "700px",
                backgroundColor: " #082783",
                borderColor: "white",
              }}
              icon={<PlusOutlined />}
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        destroyOnClose
        visible={visible}
        closable={false}
        onCancel={() => onClose()}
        title="Edit task"
        okText="Save"
        onOk={() => {
          setData((data: any) => {
            return data.map((oneData: any) => {
              const id = _.get(record, "id");
              const task = _.get(record, "text");

              setVisible(false);
              if (oneData.id === id) {
                return editData;
              } else {
                return oneData;
              }
            });
          });
        }}
      >
        <Form onFinish={(values) => onEdit(values)}>
          <Form.Item name="task">
            <Input
              type="text"
              onChange={(e) =>
                setEditData((pre: any) => {
                  return { ...pre, text: e.target.value };
                })
              }
            />
          </Form.Item>

          <Form.Item name="completed">
            <Radio.Group
              onChange={(e) =>
                setEditData((pre: any) => {
                  return { ...pre, completed: e.target.value };
                })
              }
            >
              <Radio value={true}>Complete</Radio>
              <Radio value={false}>Incomplete</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>

      <Card title="To-do List" style={{ backgroundColor: "#e3e4e8" }}>
        <Form onFinish={(values) => onAdd(values)} ref={formRef}>
          {/*  <Form.Item
            name="task"
            rules={[{ required: true, message: "Please input a task!" }]}
          >
            <Input
              type="text"
              placeholder="Enter new task"
              style={{ width: "70%", margin: "auto" }}
            />
          </Form.Item> */}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="small"
              shape="circle"
              style={{
                marginLeft: "700px",
                backgroundColor: " #082783",
                borderColor: "white",
              }}
              icon={<PlusOutlined />}
            />
          </Form.Item>
        </Form>

        <Table
          dataSource={data}
          columns={columns()}
          className="w-2/4 m-auto"
          bordered
        />
      </Card>

      {/*  <ToDoForm /> */}
    </div>
  );
};

export default TodoComp;
