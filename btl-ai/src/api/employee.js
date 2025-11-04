import api from "./http";

export async function getAllEmployees() {
  const token = sessionStorage.getItem("accessToken"); // lấy token đã lưu sau login
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  const res = await api.get("/accounts");
  return res.data; // backend trả về { status, message, data }
}
