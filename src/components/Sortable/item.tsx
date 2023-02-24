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
      transform.scaleX = 1.1;
      transform.scaleY = 1.1;
    } else {
      transform.scaleX = 1;
      transform.scaleY = 1;
    }
  }

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.75 : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} className="group relative">
      <Button
        type="default"
        size="small"
        {...listeners}
        className="absolute inset-y-0 -right-4 z-10 my-auto flex h-10 items-center opacity-0 group-focus-within:opacity-90 group-hover:opacity-90"
      >
        <FontAwesomeIcon icon={faGripVertical} />
      </Button>
      {children}
    </div>
  );
}
