import { Layout } from "antd";
import ThemeToggle from "@components/ThemeToggle";

export default function Header() {
  return (
    <Layout.Header className="flex items-center justify-between bg-white shadow-sm dark:bg-primary">
      <div className="flex items-center">
        <div className="flex h-10 w-10 rounded-full bg-primary bg-opacity-10 p-2 dark:bg-white dark:bg-opacity-20">
          <img src="logo.svg" alt="Hamravesh Kanban" className="h-full w-full dark:brightness-0 dark:invert" />
        </div>
        <h1 className="hidden md:block m-0 pr-3 text-primary dark:text-white">تخته کانبان هم‌روش</h1>
      </div>
      <ThemeToggle />
    </Layout.Header>
  );
}
