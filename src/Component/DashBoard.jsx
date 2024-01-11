import React from "react";
import Task from "./Task";
import EditTask from "./EditTask";

const Dashboard = ({ user, onLogout }) => {


  if (!user || !user.username) {
    return <p>Loading...</p>;
  }
  return (
    <>
	  <h1>DashBoard</h1>
      <h2>Welcome, {user.username}!</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      {user.role === "Admin" ? (
        // Additional content for admin users
        <div>
          <h2>Admin Dashboard</h2>
		  <EditTask />
          <Task user={user} />
        </div>
      ) : (
        // Additional content for regular users
        <div>
          <h2>User Dashboard</h2>
          <Task user={user}/>
        </div>
      )}

      <button onClick={onLogout}>Logout</button>
    </>
  );
};

export default Dashboard;
