import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Layout } from "antd";
import Header from "@components/Header";
import KanbanModal from "@components/Kanban/modal";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setModalData } from "@store/modals";
import { TodoItemProps } from "@store/todos";
import KanbanColumns from "./columns";

export default function MainPage() {
  const dispatch = useDispatch();

  const handleOnAddTodo = () => {
    dispatch(
      setModalData({ prop: "kanban", data: { type: "easy", status: "todo", description: "", id: "", title: "" } })
    );
  };

  const handleOnModalClose = () => {
    dispatch(setModalData({ prop: "kanban", data: undefined }));
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
            onClick={handleOnAddTodo}
          >
            ایجاد تسک
          </Button>
        </div>
        <KanbanColumns />
        <KanbanModal onClose={handleOnModalClose} />
      </div>
    </Layout>
  );
}
