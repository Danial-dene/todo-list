import { Form, Input, Button, Checkbox } from "antd";
import React, { useState } from "react";

const ToDoForm = () => {
  const [text, setText] = useState("");

  const onFinish = (values: any) => {
    setText(values);
    localStorage.setItem("text", JSON.stringify(values));

    const saved = localStorage.getItem("text") || "";
    const initialValue = JSON.parse(saved);
    console.log(initialValue);
    return initialValue || "";
  };

  const onFinishFailed = (errorInfo: any) => {};

  return (
    <Form
      style={{ width: "50%", margin: "auto" }}
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Text"
        name="text"
        rules={[
          {
            required: true,
            message: "Please input your a text!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ToDoForm;
