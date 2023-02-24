import { Col, Row } from "antd";
import { useDispatch } from "react-redux";
import { useSelector } from "@store/utils";
import { DragEndEvent } from "@dnd-kit/core";
import { faBarsProgress, faCheck, faList } from "@fortawesome/free-solid-svg-icons";
import { reorderTodo, TodoItemProps, TodosStatus } from "@store/todos";
import KanbanColumn from "@components/Kanban/column";
import DragAndDropContext from "@components/Sortable/context";

export default function KanbanColumns() {
  const dispatch = useDispatch();
  const { todos } = useSelector((store) => store);

  const allItems = [...todos.todo, ...todos.inProgress, ...todos.done];
  const dndItems = allItems.map(({ id }, index) => id || index);

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      const fromStatus: TodosStatus = active?.data?.current?.status;
      const toStatus: TodosStatus = over?.data?.current?.status;
      const oldIndex = todos?.[fromStatus].findIndex(({ id }: TodoItemProps) => active.id === id);
      const toIndex = todos?.[toStatus].findIndex(({ id }: TodoItemProps) => over?.id === id);

      dispatch(reorderTodo({ fromIndex: oldIndex, toIndex: toIndex, fromStatus, toStatus }));
    }
  };

  return (
    <DragAndDropContext items={dndItems} onDragEnd={handleDragEnd}>
      <Row gutter={[20, 20]} className="mt-12">
        <Col span={24} lg={8}>
          <KanbanColumn title="در انتظار" icon={faList} color="blue" status="todo" items={todos.todo} />
        </Col>
        <Col span={24} lg={8}>
          <KanbanColumn
            title="در حال انجام"
            icon={faBarsProgress}
            color="orange"
            status="inProgress"
            items={todos.inProgress}
          />
        </Col>
        <Col span={24} lg={8}>
          <KanbanColumn title="به پایان رسیده" icon={faCheck} color="green" status="done" items={todos.done} />
        </Col>
      </Row>
    </DragAndDropContext>
  );
}
