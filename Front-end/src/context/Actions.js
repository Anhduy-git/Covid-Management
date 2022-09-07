export const LoginStart = (userCredentials) => ({
	type: "LOGIN_START",
});

export const LoginSuccessAdmin = (user, token) => ({
	type: "LOGIN_SUCCESS_ADMIN",
	payload: user,
	token: token
});
export const LoginSuccessManager = (user, token) => ({
	type: "LOGIN_SUCCESS_MANAGER",
	payload: user,
	token: token
});
export const LoginSuccessUser = (user, token) => ({
	type: "LOGIN_SUCCESS_USER",
	payload: user,
	token: token
});

export const LoginFailure = () => ({
	type: "LOGIN_FAILURE",
});

export const Logout = () => ({
	type: "LOGOUT",
});

