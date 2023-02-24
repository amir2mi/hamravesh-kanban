import Header from "@components/Header";
import { Badge, Button, Card, Col, Layout, Row } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsProgress, faCheck, faList, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "@store/utils";
import KanbanCard from "@components/Kanban/card";
import { useMemo, useState } from "react";
import KanbanModal from "@components/Kanban/modal";
import type { TodosStateProps } from "@store/todos";

export default function MainPage() {
  const { todos } = useSelector((store) => store);

  const [modalItem, setModalItem] = useState<TodosStateProps | undefined>();

  const todoItems = useMemo(() => todos.filter((item) => item.status === "todo"), [todos]);
  const inProgressItems = useMemo(() => todos.filter((item) => item.status === "inProgress"), [todos]);
  const doneItems = useMemo(() => todos.filter((item) => item.status === "done"), [todos]);

  const handleOnItemEdit = (item: TodosStateProps) => {
    setModalItem(item);
  };

  const handleOnModalClose = () => {
    setModalItem(undefined);
  };

  return (
    <Layout className="min-h-[100vh]">
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
        <Row gutter={[20, 20]} className="mt-12">
          <Col span={24} lg={8}>
            <Badge.Ribbon text={todoItems?.length} color="blue">
              <Card className="sticky top-0">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="m-0 text-2xl font-bold">در انتظار</h3>
                  <FontAwesomeIcon icon={faList} className="text-2xl opacity-30" />
                </div>
                <div className="flex flex-col gap-4">
                  {todoItems.map((item, index) => (
                    <KanbanCard {...item} key={String(index) + item.id} onEdit={handleOnItemEdit} />
                  ))}
                </div>
              </Card>
            </Badge.Ribbon>
          </Col>
          <Col span={24} lg={8}>
            <Badge.Ribbon text={inProgressItems?.length} color="orange">
              <Card>
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="m-0 text-2xl font-bold">در حال انجام</h3>
                  <FontAwesomeIcon icon={faBarsProgress} className="text-2xl opacity-30" />
                </div>

                <div className="flex flex-col gap-4">
                  {inProgressItems.map((item, index) => (
                    <KanbanCard {...item} key={String(index) + item.id} onEdit={handleOnItemEdit} />
                  ))}
                </div>
              </Card>
            </Badge.Ribbon>
          </Col>
          <Col span={24} lg={8}>
            <Badge.Ribbon text={doneItems?.length} color="green">
              <Card>
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="m-0 text-2xl font-bold">به پایان رسیده</h3>
                  <FontAwesomeIcon icon={faCheck} className="text-2xl opacity-30" />
                </div>
                <div className="flex flex-col gap-4">
                  {doneItems.map((item, index) => (
                    <KanbanCard key={String(index) + item.id} {...item} onEdit={handleOnItemEdit} />
                  ))}
                </div>
              </Card>
            </Badge.Ribbon>
          </Col>
        </Row>
        <KanbanModal onClose={handleOnModalClose} item={modalItem} />
      </div>
    </Layout>
  );
}
