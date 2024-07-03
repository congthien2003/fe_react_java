import { getAuthToken, request, setAuthToken } from "../util/ApiFunction";
import { jwtDecode } from "jwt-decode";

export const login = async function (username, password) {
	const respone = await request("POST", "/auth/login", {
		username,
		password,
	});
	if (respone.status === 200) {
		setAuthToken(respone.data.token);
		return respone.data.token;
	} else {
		return null;
	}
};

export const register = async function (username, email, password, phone) {
	const role = "USER";
	const respone = await request("POST", "/auth/register", {
		username,
		email,
		phone,
		password,
		role,
	});
	if (respone.status === 200) {
		return respone.data.token;
	} else {
		return null;
	}
};

export const logout = function () {
	window.sessionStorage.removeItem("token");
};
// export const restorePasswordByMail = async function (email) {
// 	const respone = await request("POST", "products/restore", {
// 		email,
// 	});
// 	if (respone.status === 200) {
// 		setAuthToken(respone.data);
// 		return respone.data;
// 	} else {
// 		return null;
// 	}
// };

export const parseToken = () => {
	try {
		const token = getAuthToken();
		const decoded = jwtDecode(token);
		const id = decoded.id;
		const role = decoded.role;
		const username = decoded.sub;

		return { id, role, username };
	} catch (error) {
		console.error("Invalid token:", error);
		return null;
	}
};

