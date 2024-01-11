import { createSlice } from "@reduxjs/toolkit";

const iniState = [
  {
    id: "6ddca37b-8f02-43de-9ea1-81837c743026",
    task: "DoCleanup",
    assignedTo: "Ankur",
    status: "Open",
  },
];

const userSlice = createSlice({
  name: "Tasks",
  initialState: iniState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    editTask: (state, action) => {
      const { id, task, assignedTo, status } = action.payload;
      const pUser = state.find((user) => user.id === id);
      if (pUser) {
        pUser.task = task;
        pUser.assignedTo = assignedTo;
        pUser.status = status;
      }
    },
    taskDelete: (state, action) => {
      const { id } = action.payload;
      const pUser = state.find((user) => user.id === id);
      if (pUser) {
        return state.filter((f) => f.id !== id);
      }
    },
  },
});
export const { addTask, editTask, taskDelete } = userSlice.actions;
export default userSlice.reducer;
