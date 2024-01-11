import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../Store/Reducers";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./Style.css";

const statusArr = ["Open", "Close"];
function EditTask() {
  const tasks = useSelector((state) => state.tasks);
  const { id } = useParams();
  const isEditing = id ? true : false;

  const getUsersFromLocalStorage = () => {
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    return existingUsers.map((user) => user.username);
  };

  const navigate = useNavigate();

  const userNamesArray = getUsersFromLocalStorage();

  const initialUser = isEditing
    ? tasks.find((task) => task.id === id)
    : {
        task: "",
        assignedTo: "Select User",
        status: "Open",
      };

  const dispatch = useDispatch();

  const [task, setTask] = useState(initialUser.task);
  const [assignedTo, setAssignedTo] = useState(initialUser.assignedTo);
  const [status, setStatus] = useState(initialUser.status);

  const handleSubmit = (e) => {
    e.preventDefault();
    let myuuid = uuidv4();
    if (isEditing) {
      dispatch(
        editTask({
          id: id,
          task,
          assignedTo,
          status,
        })
      );
      navigate("/dashboard");
    } else {
      dispatch(
        addTask({
          id: myuuid,
          task,
          assignedTo,
          status,
        })
      );
      setTask("");
      setAssignedTo("");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Manage Task</h2>
        <p>
          {isEditing ? "Edit Task :" : "Add Task"}
          <input
            type="text"
            name="Task Name"
            required
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <select
            required
            placeHolder="Select User"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          >
            <option value="" selected>
              Select User
            </option>
            {userNamesArray.map((user, index) => (
              <option key={index}>{user}</option>
            ))}
          </select>
          <select
		    placeHolder="Select Status"
            value={status}
            required
            onChange={(e) => setStatus(e.target.value)}
          >
            {statusArr.map((status, index) => (
              <option key={index}>{status}</option>
            ))}
          </select>
          <button type="submit">Save</button>
        </p>
      </form>
    </>
  );
}

export default EditTask;
