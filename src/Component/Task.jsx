import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { taskDelete } from "../Store/Reducers";
import Pagination from "react-js-pagination";
import "./Task.css"; 

function Task({ user }) {
  const dispatch = useDispatch();
  const [activePage, setActivePage] = useState(1);
  const tasksPerPage = 3; 
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const handleDelete = (id) => {
    dispatch(taskDelete({ id: id }));
  };

  const tasks = useSelector((state) =>
    user.role === "Admin"
      ? state.tasks
      : state.tasks.filter((x) => x.assignedTo === user.email)
  );

  const indexOfLastTask = activePage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  return (
    <div>
		<h1>Task List</h1>
      <thead>
        <tr>
          <th>TaskName</th>
          <th>AssignedTo</th>
          <th>Status</th>

          <th>Edit</th>
		  {
			user.role === "admin" ? <th>Delete</th> : null
		  }
          
        </tr>
      </thead>
      <tbody>
        {currentTasks.map((task, index) => (
          <tr key={index}>
		  <td>{task.task}</td>
		  <td>{task.assignedTo}</td>
		  <td>{task.status}</td>
		  <td>
			<Link to={`/edit-task/${task.id}`}>Edit</Link>
			{user.role === "admin" ? <button onClick={() => handleDelete(task.id)}>Delete</button> : null}
		  </td>
		</tr>
        ))}
      </tbody>
      <Pagination
        activePage={activePage}
        itemsCountPerPage={tasksPerPage}
        totalItemsCount={tasks.length}
        pageRangeDisplayed={3} 
        onChange={handlePageChange}
		innerClass="pagination"
        itemClass="page-item" 
        linkClass="page-link" 
      />
    </div>
  );
}

export default Task;

