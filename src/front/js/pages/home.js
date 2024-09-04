import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Signup } from "../component/signup.jsx";  
import { Login } from "../component/login.jsx";    
import { Private } from "../component/private.jsx"; 
import { Logout } from "../component/logout.jsx";
 
export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container d-flex justify-content-center align-items-center vh-100">
		  <div className="row w-100">
			<div className="col-md-6 mx-auto shadow-lg p-5 bg-white rounded">
			  {store.token ? (
				<>
				  <h2 className="mb-4">Welcome Back!</h2>
				  <Private />
				  <Logout />
				</>
			  ) : (
				<>
				  <h2 className="text-center mb-4">Access Your Account</h2>
				  <div className="mb-4">
					<Signup />
				  </div>
				  <div className="text-center">
					<p>Already have an account?</p>
					<Login />
				  </div>
				</>
			  )}
			</div>
		  </div>
		</div>
	  );
};
