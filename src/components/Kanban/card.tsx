import { timeSince } from "@utils/date";
import { Badge, Button, Card, Dropdown, theme } from "antd";
import type { MenuProps } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { removeTodo, TodosStateProps } from "@store/todos";
import { useMemo } from "react";
import { useDispatch } from "react-redux";

interface KanbanCardProps extends TodosStateProps {
  children?: React.ReactNode;
  onMenuClick?: (e: any) => void;
}

export default function KanbanCard(props: KanbanCardProps) {
  const dispatch = useDispatch();
  const { useToken } = theme;
  const { token } = useToken();

  const { description, id, title, type, status, onMenuClick } = props;

  const items: MenuProps["items"] = [
    {
      label: "ویرایش",
      key: "edit",
      icon: <FontAwesomeIcon icon={faPenToSquare} />,
    },
    {
      label: "حذف",
      key: "remove",
      icon: <FontAwesomeIcon icon={faTrash} />,
    },
  ];

  const bgToken = useMemo(() => {
    switch (status) {
      case "todo":
        return "colorInfoBg";
      case "inProgress":
        return "colorWarningBg";
      case "done":
        return "colorSuccessBg";
    }
  }, [status]);

  const handleOnClick = (button: any) => {
    console.log(button, button.key);

    if (button.key === "remove") {
      dispatch(removeTodo(id));
    }
  };

  return (
    <Card
      style={{ background: token[bgToken] }}
      bodyStyle={{ padding: 15 }}
      className="anim-slide-up-delayed group border-none"
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="flex max-w-[90%] items-center gap-2">
          <Badge
            count={"‌"}
            size="small"
            color={type === "easy" ? "#13c2c2" : "#fa541c"}
            className="scale-50 transition-transform group-focus-within:scale-90 group-hover:scale-90"
          />
          <h4 className="mb-0 truncate text-base font-bold">{title}</h4>
        </div>

        <Dropdown
          menu={{
            items,
            onClick: (button) => {
              handleOnClick(button);
              onMenuClick?.(button);
            },
          }}
          trigger={["click"]}
        >
          <Button type="ghost" className="-ml-2 text-lg">
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </Button>
        </Dropdown>
      </div>
      {description && type === "hard" && <p className="opacity-70">{description}</p>}
      <div className="flex items-center justify-between">
        <time className="text-xs opacity-70">{timeSince(id)}</time>
      </div>
    </Card>
  );
}
