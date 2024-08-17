import { apiCall } from "../api";


export const adminLoginService = async (data) => await apiCall.post('admin/log-admin', data)


export const adminlogoutService = async () => await apiCall.put('admin/logout-admin')
export const validateAdminService = async () => await apiCall.get('admin/validate-admin')