import { apiCall } from "../api";

export const schoolRegisterService = async (data) => await apiCall.post('user/regsiter-school', data)


export const userLoginService = async (data) => await apiCall.post('user/log-user', data)


export const userLogoutService = async () => await apiCall.get('user/logout-user')
export const validateUser = async () => await apiCall.get('user/validate-user')