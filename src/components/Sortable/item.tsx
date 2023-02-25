import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "antd";
import clsx from "clsx";

interface SortableItemProps {
  children?: React.ReactNode;
  className?: string;
  disableMovement?: boolean;
  hideButton?: boolean;
  id: any;
  status?: any;
}

export function SortableItem({ children, className, disableMovement, id, status, hideButton }: SortableItemProps) {
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
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={clsx("group relative", disableMovement && "transform-none", className)}
    >
      {!hideButton && (
        <Button
          type="default"
          size="small"
          {...listeners}
          className="touch-none absolute inset-y-0 -right-4 z-10 my-auto flex h-10 items-center opacity-0 group-focus-within:opacity-90 group-hover:opacity-90"
        >
          <FontAwesomeIcon icon={faGripVertical} />
        </Button>
      )}
      {children}
    </div>
  );
}
