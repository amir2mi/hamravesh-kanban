import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "antd";

export function SortableItem({ children, id, status }: any) {
  const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
    id,
    data: { status },
  });

  if (transform) {
    if (isDragging) {
      transform.scaleX = 0.85;
      transform.scaleY = 0.85;
    } else {
      transform.scaleX = 1;
      transform.scaleY = 1;
    }
  }

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <Button {...listeners}>
        <FontAwesomeIcon icon={faGripVertical} />
      </Button>
      {children}
    </div>
  );
}
