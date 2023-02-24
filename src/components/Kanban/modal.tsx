import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Input, Modal, Select, Switch } from "antd";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addTodo, editTodo } from "@store/todos";
import type { TodoItemProps } from "@store/todos";

interface KanbanModalProps {
  children?: React.ReactNode;
  onClose?: () => void;
  open?: boolean;
  item?: TodoItemProps;
}

export default function KanbanModal({ children, item, onClose }: KanbanModalProps) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const type = Form.useWatch("type", form);

  // it should be shown when it has data
  const open = item && Object.keys(item).length > 0;
  // it should be shown when it has data

  const isEdit = item?.title?.length;

  const actionLabel = isEdit ? "ویرایش" : "ایجاد";

  const types = [
    { value: "easy", label: "آسان" },
    { value: "hard", label: "دشوار" },
  ];

  const handleOnClose = () => {
    form.resetFields();
    onClose?.();
  };

  const handleOnFinish = (todo: TodoItemProps) => {
    if (isEdit) {
      dispatch(editTodo(todo));
    } else {
      todo.id = Date.now();
      todo.status = "todo";
      dispatch(addTodo(todo));
    }
    handleOnClose();
  };

  useEffect(() => {
    form.setFieldsValue(item);
  }, [open]);

  return (
    <Modal title={`${actionLabel} تسک`} open={open} footer={false} onOk={handleOnClose} onCancel={handleOnClose}>
      <Form
        form={form}
        name="basic"
        initialValues={{ type: "easy" }}
        onFinish={handleOnFinish}
        autoComplete="off"
        layout="vertical"
      >
        <div className="mt-4 flex justify-between gap-4">
          <Form.Item name="title" label="عنوان" rules={[{ required: true }]} className="w-full">
            <Input
              size="large"
              placeholder="ایجاد کش سمت سرور"
              prefix={<FontAwesomeIcon icon={faPen} className="ml-2" />}
            />
          </Form.Item>
          <Form.Item name="type" label="نوع" rules={[{ required: true }]}>
            <Select size="large" className="w-32" options={types} />
          </Form.Item>
        </div>
        <Form.Item
          name="description"
          label="توضیحات"
          tooltip={type !== "hard" && "توضیحات تنها برای تسک‌های نوع دشوار در دسترس است"}
        >
          <Input.TextArea
            size="large"
            maxLength={120}
            disabled={type !== "hard"}
            showCount={type === "hard"}
            placeholder="مختصر توضیحی در مورد تسک"
          />
        </Form.Item>

        <div className="mt-8 flex items-center justify-end gap-4">
          <Form.Item className="m-0">
            <Button htmlType="reset">پاکسازی اطلاعات</Button>
          </Form.Item>
          <Form.Item className="m-0">
            <Button type="primary" htmlType="submit">
              {actionLabel}
            </Button>
          </Form.Item>
        </div>

        {children}
      </Form>
    </Modal>
  );
}
