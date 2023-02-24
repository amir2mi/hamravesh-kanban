import Header from "@components/Header";
import { timeSince } from "@utils/date";
import { Badge, Button, Card, Col, Dropdown, Layout, Row, theme } from "antd";
import type { MenuProps } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsProgress, faCheck, faList } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "@store/utils";
import KanbanCard from "@components/Kanban/card";
import { useMemo } from "react";

export default function MainPage() {
  const { todos } = useSelector((store) => store);

  const todoItems = useMemo(() => todos.filter((item) => item.status === "todo"), [todos]);
  const inProgressItems = useMemo(() => todos.filter((item) => item.status === "inProgress"), [todos]);
  const doneItems = useMemo(() => todos.filter((item) => item.status === "done"), [todos]);

  return (
    <Layout className="min-h-[100vh]">
      <Header />
      <div className="container mx-auto px-4">
        <div className="item-center flex justify-between">
          <h2></h2>
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
                    <KanbanCard key={String(index) + item.id} {...item} />
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
                    <KanbanCard key={String(index) + item.id} {...item} />
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
                    <KanbanCard key={String(index) + item.id} {...item} />
                  ))}
                </div>
              </Card>
            </Badge.Ribbon>
          </Col>
        </Row>
      </div>
    </Layout>
  );
}
