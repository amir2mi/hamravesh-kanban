import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Input, Modal, Select } from "antd";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addTodo, editTodo } from "@store/todos";
import type { TodoItemProps } from "@store/todos";
import { useSelector } from "@store/utils";

interface KanbanModalProps {
  children?: React.ReactNode;
  onClose?: () => void;
  open?: boolean;
}

export default function KanbanModal({ children, onClose }: KanbanModalProps) {
  const dispatch = useDispatch();
  const { kanban: item } = useSelector((store) => store.modals);
  const [form] = Form.useForm();
  const type = Form.useWatch("type", form);

  const isEdit = String(item?.id)?.length > 0;
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
      item?.status && dispatch(editTodo({ todo: { ...item, ...todo }, status: item.status }));
    } else {
      dispatch(addTodo({ todo, status: "todo" }));
    }
    handleOnClose();
  };

  useEffect(() => {
    form.setFieldsValue(item);
  }, [item]);

  return (
    <Modal title={`${actionLabel} تسک`} open={!!item} footer={false} onOk={handleOnClose} onCancel={handleOnClose}>
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

        <div className="mt-8 flex items-center justify-end gap-2">
          <Form.Item className="m-0">
            <Button htmlType="reset">پاکسازی</Button>
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
