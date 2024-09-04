const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: localStorage.getItem("token") || null,
		},
		actions: {
			signup: async (email, password) => {
				try {
					const response = await fetch(`https://automatic-guacamole-x7xgqjjpwvphp76v-3001.app.github.dev/api/signup`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ email, password }),
					});
					
					if (response.ok) {
						alert("User registered successfully!");
					} else {
						alert("Error signing up");
					}
				} catch (error) {
					console.error("Error during signup:", error);
				}
			},
			login: async (email, password) => {
				try {
					const response = await fetch(`https://automatic-guacamole-x7xgqjjpwvphp76v-3001.app.github.dev/api/login`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ email, password }),
					});

					if (response.ok) {
						const data = await response.json();
						localStorage.setItem("token", data.token); 
						setStore({ token: data.token });
						alert("Login successful!");
					} else {
						alert("Invalid login credentials");
					}
				} catch (error) {
					console.error("Error during login:", error);
				}
			},
			logout: () => {
				localStorage.removeItem("token");
				setStore({ token: null });
				alert("Logged out successfully!");
			}
		}
	};
};

export default getState;
