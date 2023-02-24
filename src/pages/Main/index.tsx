import Header from "@components/Header";
import KanbanModal from "@components/Kanban/modal";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TodoItemProps } from "@store/todos";
import { Button, Layout } from "antd";
import { useState } from "react";
import KanbanColumns from "./columns";

export default function MainPage() {
  const [modalItem, setModalItem] = useState<TodoItemProps | undefined>();

  const handleOnModalClose = () => {
    setModalItem(undefined);
  };

  return (
    <Layout className="min-h-[100vh] overflow-x-hidden">
      <Header />
      <div className="container mx-auto mb-4 px-4">
        <div className="item-center mt-10 flex justify-between">
          <h2 className="m-0 text-3xl font-bold">لیست تسک‌ها</h2>
          <Button
            type="primary"
            size="large"
            className="flex items-center"
            icon={<FontAwesomeIcon icon={faPlus} className="ml-2" />}
            onClick={() => setModalItem({ type: "easy", status: "todo", description: "", id: "", title: "" })}
          >
            ایجاد تسک
          </Button>
        </div>
        <KanbanColumns />
        <KanbanModal onClose={handleOnModalClose} item={modalItem} />
      </div>
    </Layout>
  );
}
