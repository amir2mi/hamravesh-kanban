import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TodosStateProps {
  description?: string;
  id?: number | string;
  status: "todo" | "inProgress" | "done";
  title: string;
  type: "easy" | "hard";
}

interface reorderTodoProps {
  from: TodosStateProps["id"];
  to: TodosStateProps["id"];
}

const initialState: TodosStateProps[] = [
  {
    description: "",
    id: 1677202023628,
    status: "todo",
    title: "سراب ردپای تو",
    type: "easy",
  },
  {
    description: "من به بن‌بست نرسیدم، راهمو کج کردم",
    id: 1677210000000,
    status: "todo",
    title: "آب را گل نکنیم",
    type: "hard",
  },
  {
    description: "",
    id: 1677202023628,
    status: "inProgress",
    title: "تست کانبان هستم",
    type: "easy",
  },
  {
    description: "",
    id: 1677210000000,
    status: "todo",
    title: "یاد من کن،‌ گاه گاهی",
    type: "hard",
  },
  {
    description: "",
    id: 1677202023628,
    status: "done",
    title: "با دو چشم اشک‌باری، یاد من کن",
    type: "easy",
  },
  {
    description: "من به بن‌بست نرسیدم، راهمو کج کردم",
    id: 1677204845018,
    status: "done",
    title: "خانه بر دوشم",
    type: "easy",
  },
  {
    description: "",
    id: 1677204845018,
    status: "inProgress",
    title: "ستاره، ستاره ای به شب نداره",
    type: "easy",
  },
  {
    description: "",
    id: 1677202023628,
    status: "inProgress",
    title: "نظامی | خمسه | لیلی و مجنون | بخش ۱۲ - عاشق شدن لیلی و مجنون به یکدیگر",
    type: "easy",
  },
  {
    description: "",
    id: 1677202023628,
    status: "done",
    title: "نظامی | خمسه | لیلی و مجنون | بخش ۴۱ - غزل خواندن مجنون نزد لیلی",
    type: "easy",
  },
  {
    description: "لیلی امید شهر بیقراره",
    id: 1677204845018,
    status: "done",
    title: "زمستون به روی شب موندگاره...",
    type: "hard",
  },
  {
    description:
      "انگشت کش سخن سرایان این قصه چنین برد به پایان کان سوخته خرمن زمانه شد خرمنی از سرشک دانه دستاس فلک شکست خردش چون خرد شکست باز بردش",
    id: 1677204845018,
    status: "done",
    title:
      "جامی | هفت اورنگ | لیلی و مجنون | بخش ۳۱ - ملاقات کردن مجنون با شبان لیلی و خبر یافتن که مردان قبیله لیلی به غارت بیرون رفته‌اند و پیش لیلی رفتن وی",
    type: "hard",
  },
];

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TodosStateProps>) => {
      const todo = action.payload;
      todo.id = Date.now();
      state.push(todo);
    },
    editTodo: (state, action: PayloadAction<TodosStateProps>) => {
      const filteredState = state.filter((todo) => (todo.id === action.payload.id ? action.payload : todo));
      return filteredState;
    },
    reorderTodo: (state, action: PayloadAction<reorderTodoProps>) => {
      // state = state.filter((todo) => (todo.id === action.payload.id ? action.payload : todo));
    },
    removeTodo: (state, action: PayloadAction<TodosStateProps["id"]>) => {
      const filteredState = state.filter((todo) => todo.id !== action.payload);
      return filteredState;
    },
  },
});

const { reducer, actions } = todosSlice;

export default reducer;
export const { addTodo, editTodo, reorderTodo, removeTodo } = actions;
