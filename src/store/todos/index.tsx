import { arrayMove } from "@dnd-kit/sortable";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const mockData = {
  todo: [
    {
      description: "",
      id: 1577827861000,
      title: "سراب ردپای تو",
      type: "easy",
      status: "todo",
    },
    {
      description: "من به بن‌بست نرسیدم، راهمو کج کردم",
      id: 1065887513000,
      title: "آب را گل نکنیم",
      type: "hard",
      status: "todo",
    },
    {
      description: "",
      id: 1085415396000,
      title: "تست کانبان هستم",
      type: "easy",
      status: "todo",
    },
    {
      description: "",
      id: 1161569583000,
      title: "یاد من کن،‌ گاه گاهی",
      type: "hard",
      status: "todo",
    },
  ],
  inProgress: [
    {
      description: "",
      id: 1366021476000,
      title: "با دو چشم اشک‌باری، یاد من کن",
      type: "easy",
      status: "inProgress",
    },
    {
      description: "من به بن‌بست نرسیدم، راهمو کج کردم",
      id: 958181155000,
      title: "خانه بر دوشم",
      type: "easy",
      status: "inProgress",
    },
    {
      description: "",
      id: 1887345009000,
      title: "ستاره، ستاره ای به شب نداره",
      type: "hard",
      status: "inProgress",
    },
    {
      description: "",
      id: 1226994526000,
      title: "نظامی | خمسه | لیلی و مجنون | بخش ۱۲ - عاشق شدن لیلی و مجنون به یکدیگر",
      type: "easy",
      status: "inProgress",
    },
  ],
  done: [
    {
      description: "",
      id: 1633788030000,
      title: "نظامی | خمسه | لیلی و مجنون | بخش ۴۱ - غزل خواندن مجنون نزد لیلی",
      type: "easy",
      status: "done",
    },
    {
      description: "لیلی امید شهر بیقراره",
      id: 1539376918000,
      title: "زمستون به روی شب موندگاره...",
      type: "hard",
      status: "done",
    },
    {
      description:
        "انگشت کش سخن سرایان این قصه چنین برد به پایان کان سوخته خرمن زمانه شد خرمنی از سرشک دانه دستاس فلک شکست خردش چون خرد شکست باز بردش",
      id: 1231037251000,
      title:
        "جامی | هفت اورنگ | لیلی و مجنون | بخش ۳۱ - ملاقات کردن مجنون با شبان لیلی و خبر یافتن که مردان قبیله لیلی به غارت بیرون رفته‌اند و پیش لیلی رفتن وی",
      type: "hard",
      status: "done",
    },
  ],
};

export type TodosStatus = "todo" | "inProgress" | "done";

export interface TodoItemProps {
  description?: string;
  id?: number | string;
  title?: string;
  type?: "easy" | "hard" | string;
  status?: TodosStatus;
}

interface ReorderTodoProps {
  fromIndex: number;
  toIndex: number;
  fromStatus: TodosStatus;
  toStatus: TodosStatus;
}

interface ModifyTodoProps {
  todo: TodoItemProps;
  status: TodosStatus;
}

interface RemoveTodoProps {
  id: TodoItemProps["id"];
  status: TodosStatus;
}

interface TodosStateProps {
  todo: TodoItemProps[];
  inProgress: TodoItemProps[];
  done: TodoItemProps[];
}

const initialState: TodosStateProps = mockData as TodosStateProps;
console.log(mockData);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<ModifyTodoProps>) => {
      const { todo, status } = action.payload;

      todo.id = Date.now();
      todo.status = status;
      state[status].unshift(todo);
    },
    editTodo: (state, action: PayloadAction<ModifyTodoProps>) => {
      const { todo, status } = action.payload;
      state[status] = state[status].map((thisTodo) => (thisTodo.id === todo.id ? todo : thisTodo));
    },
    removeTodo: (state, action: PayloadAction<RemoveTodoProps>) => {
      const { id, status } = action.payload;
      state[status] = state[status].filter((todo) => todo.id !== id);
    },
    reorderTodo: (state, action: PayloadAction<ReorderTodoProps>) => {
      const { fromIndex, toIndex, fromStatus, toStatus } = action.payload;

      // should check if reorder was between different statuses or in the same column
      if (fromStatus === toStatus) {
        state[fromStatus] = arrayMove(state[fromStatus], fromIndex, toIndex);
      } else {
        const itemToMove = state[fromStatus][fromIndex];
        // remove from current status
        state[fromStatus] = state[fromStatus].filter(({ id }) => id !== itemToMove.id);
        // add current to target status at given index
        itemToMove.status = toStatus;
        state[toStatus].splice(toIndex, 0, itemToMove);
      }
    },
  },
});

const { reducer, actions } = todosSlice;

export default reducer;
export const { addTodo, editTodo, reorderTodo, removeTodo } = actions;
