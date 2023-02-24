import { SortableItem } from "@components/Sortable/item";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TodoItemProps, TodosStatus } from "@store/todos";
import { Badge, Card } from "antd";
import KanbanCard from "./card";

interface KanbanColumnProps {
  color: string;
  icon: IconProp;
  items: TodoItemProps[];
  status: TodosStatus;
  title: string;
}

export default function KanbanColumn({ color, icon, items, status, title }: KanbanColumnProps) {
  return (
    <Badge.Ribbon text={items?.length} color={color}>
      <Card>
        <div className="mb-6 flex items-center justify-between">
          <h3 className="m-0 text-2xl font-bold">{title}</h3>
          <FontAwesomeIcon icon={icon} className="text-2xl opacity-30" />
        </div>
        <div className="relative z-10 flex flex-col gap-4">
          {items.map((item, index) => (
            <SortableItem id={item?.id || index} key={item?.id || index} status={status}>
              <KanbanCard item={item} />
            </SortableItem>
          ))}
        </div>
      </Card>
    </Badge.Ribbon>
  );
}
