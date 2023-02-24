import { useDispatch } from "react-redux";
import { useSelector } from "@store/utils";
import { changeTheme } from "@store/userInterface";
import { Button, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const { theme } = useSelector((store) => store.userInterface);

  const isLight = theme === "light";
  const helperText = `تغییر به حالت ${isLight ? "تاریک" : "روشن"}`;

  return (
    <Tooltip title={helperText}>
      <Button
        size="large"
        ghost={isLight}
        type={isLight ? "primary" : "text"}
        className="flex items-center text-lg"
        aria-label={helperText}
        onClick={() => dispatch(changeTheme(isLight ? "dark" : "light"))}
      >
        <FontAwesomeIcon icon={isLight ? faSun : faMoon} />
      </Button>
    </Tooltip>
  );
}
