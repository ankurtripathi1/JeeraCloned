import React from 'react'
import { useNavigate } from "react-router-dom";
import "./Style.css"; 

function Home() {
	const navigate = useNavigate();
  return (
	<div>
		<h1>Home Page</h1>
		<h2>If you are already a user use Login or Register to use the app</h2>
		<button onClick={() =>navigate("/login")}>Login</button>
		<button onClick={() => navigate("/register")}>Registration</button>

	</div>
  )
}

export default Home