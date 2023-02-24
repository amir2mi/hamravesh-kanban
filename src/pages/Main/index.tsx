import Header from "@components/Header";
import KanbanCard from "@components/Kanban/card";
import KanbanModal from "@components/Kanban/modal";
import { faBarsProgress, faCheck, faList, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { reorderTodo, TodoItemProps } from "@store/todos";
import { useSelector } from "@store/utils";
import { Badge, Button, Card, Col, Layout, Row, theme } from "antd";
import { useState } from "react";

import { SortableItem } from "@components/Sortable/item";
import { useDispatch } from "react-redux";
import DragAndDropContext from "@components/Sortable/context";

export default function MainPage() {
  const { useToken } = theme;
  const dispatch = useDispatch();
  const { todos } = useSelector((store) => store);
  const { token } = useToken();

  const [modalItem, setModalItem] = useState<TodoItemProps | undefined>();

  const handleOnItemEdit = (item: TodoItemProps) => {
    setModalItem(item);
  };

  const handleOnModalClose = () => {
    setModalItem(undefined);
  };

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      const fromStatus = active.data.current.status;
      const toStatus = over.data.current.status;
      const oldIndex = todos?.[fromStatus].findIndex(({ id }) => active.id === id);
      const toIndex = todos?.[toStatus].findIndex(({ id }) => over.id === id);
      dispatch(reorderTodo({ fromIndex: oldIndex, toIndex: toIndex, fromStatus, toStatus }));
    }
  }

  const allItems = [...todos.todo, ...todos.inProgress, ...todos.done];

  return (
    <Layout className="min-h-[100vh] overflow-x-hidden">
      <Header />
      <div className="container mx-auto px-4">
        <div className="item-center mt-10 flex justify-between">
          <h2 className="m-0 text-3xl font-bold">لیست تسک‌ها</h2>
          <Button
            type="primary"
            size="large"
            className="flex items-center"
            icon={<FontAwesomeIcon icon={faPlus} className="ml-2" />}
            onClick={() => setModalItem({ type: "easy" })}
          >
            ایجاد تسک
          </Button>
        </div>
        <DragAndDropContext items={allItems.map(({ id }, index) => id || index)} onDragEnd={handleDragEnd}>
          <Row gutter={[20, 20]} className="mt-12">
            <Col span={24} lg={8}>
              <Badge.Ribbon text={todos.todo?.length} color="blue">
                <Card>
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="m-0 text-2xl font-bold">در انتظار</h3>
                    <FontAwesomeIcon icon={faList} className="text-2xl opacity-30" />
                  </div>
                  <div className="relative z-10 flex flex-col gap-4">
                    {todos.todo.map((item, index) => (
                      <SortableItem id={item?.id || index} key={item?.id || index} status="todo">
                        <KanbanCard {...item} background={token.colorInfoBg} onEdit={handleOnItemEdit} />
                      </SortableItem>
                    ))}
                  </div>
                </Card>
              </Badge.Ribbon>
            </Col>
            <Col span={24} lg={8}>
              <Badge.Ribbon text={todos.inProgress?.length} color="orange">
                <Card>
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="m-0 text-2xl font-bold">در حال انجام</h3>
                    <FontAwesomeIcon icon={faBarsProgress} className="text-2xl opacity-30" />
                  </div>

                  <div className="relative z-10 flex flex-col gap-4">
                    {todos.inProgress.map((item, index) => (
                      <SortableItem id={item?.id || index} key={item?.id || index} status="inProgress">
                        <KanbanCard {...item} background={token.colorWarningBg} onEdit={handleOnItemEdit} />
                      </SortableItem>
                    ))}
                  </div>
                </Card>
              </Badge.Ribbon>
            </Col>
            <Col span={24} lg={8}>
              <Badge.Ribbon text={todos.done?.length} color="green">
                <Card>
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="m-0 text-2xl font-bold">به پایان رسیده</h3>
                    <FontAwesomeIcon icon={faCheck} className="text-2xl opacity-30" />
                  </div>
                  <div className="relative z-10 flex flex-col gap-4">
                    {todos.done.map((item, index) => (
                      <SortableItem id={item?.id || index} key={item?.id || index} status="done">
                        <KanbanCard {...item} background={token.colorSuccessBg} onEdit={handleOnItemEdit} />
                      </SortableItem>
                    ))}
                  </div>
                </Card>
              </Badge.Ribbon>
            </Col>
          </Row>
        </DragAndDropContext>

        <KanbanModal onClose={handleOnModalClose} item={modalItem} />
      </div>
    </Layout>
  );
}
