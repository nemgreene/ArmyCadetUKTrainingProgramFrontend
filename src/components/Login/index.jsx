import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { IconContext } from "react-icons";
import { IoIosArrowDown} from "react-icons/io";

const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};
	// fetch user, token
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("test");
		try {
			const url = "http://kgtrainingserver.herokuapp.com/users/login";
			//const url = "http://localhost:3000/users/login";
			console.log("data",data);
			axios.post(url, data)
			.then((res) => {
				//const { data: res } = await axios.post(url, data);				
				console.log ("message",res.data);				
				if (res.data.token !== "" && res.data.token !== undefined) {	
					console.log("token:", res.data.token)				
					localStorage.setItem("token", res.data.token);
					window.location = "/";
				}
			}).catch((error) => {
				
				setError(error.response.data.message);
			})						
		} catch (error) {
			console.log("error", error);
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
					<IconContext.Provider value={{size:"70" 
					}}>
						<div className={styles.arrow}>
						<IoIosArrowDown />
						</div>
						</IconContext.Provider>
						<h1>Login to Your Account</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Sign In
						</button>
					</form>
				</div>
				<div className={styles.left}>
				<div className={styles.form_container}>
				<IconContext.Provider value={{size:"70" 
					}}>
						<div className={styles.arrow}>
						<IoIosArrowDown />
						</div>
						</IconContext.Provider>
					<h1>New Here ?</h1>
					<Link to="/signup" className={styles.green_btn}>
						
							Sign Up
						
					</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;