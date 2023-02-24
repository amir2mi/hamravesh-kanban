import { useDispatch } from "react-redux";
import { useSelector } from "@store/utils";
import { changeTheme } from "@store/userInterface";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const { theme } = useSelector((store) => store.userInterface);

  return (
    <Button
      size="large"
      type="primary"
      className="text-xl"
      aria-label={`تغییر به حالت ${theme === "light" ? "تاریک" : "روشن"}`}
      onClick={() => dispatch(changeTheme(theme === "light" ? "dark" : "light"))}
    >
      <FontAwesomeIcon icon={theme === "light" ? faSun : faMoon} />
    </Button>
  );
}
