import React, {
	useEffect,
} from "react";
import "./App.css";
import Header from "./Component/Header";
import Home from "./Component/Home";
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";
import Checkout from "./Component/Checkout";
import Login from "./Component/Login";
import Payment from "./Component/Payment";

// import Orders from "./Orders";
import { auth } from "./Component/Firebase";
import { useStateValue } from "./Component/StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise =
	loadStripe(
		"pk_test_51JP4PZLSf9Xjqxp5htziDBGC0iauGCzA2cPw0LEU1B0cipDuS7z6kNwIZH4f9V9oUz2u1jdH6fthi4rBw9OjipbD005kWAiUzg"
	);
function App() {
	const [
		{},
		dispatch,
	] =
		useStateValue();

	useEffect(() => {
		// will only run once when the app component loads...

		auth.onAuthStateChanged(
			(
				authUser
			) => {
				console.log(
					"THE USER IS >>> ",
					authUser
				);

				if (
					authUser
				) {
					// the user just logged in / the user was logged in
					dispatch(
						{
							type: "SET_USER",
							user: authUser,
						}
					);
				} else {
					// the user is logged out
					dispatch(
						{
							type: "SET_USER",
							user: null,
						}
					);
				}
			}
		);
	}, []);
	return (
		//BEM convantion
		<Router>
			<Header />
			<div className="App">
				<Switch>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/checkout">
						<Checkout />
					</Route>
					<Route path="/payment">
						<Elements
							stripe={
								promise
							}
						>
							<Payment />
						</Elements>
					</Route>
					<Route path="/">
						<Home />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
