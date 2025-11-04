import axios from "axios";

// ✅ Nếu chạy bằng CRA thì phải dùng process.env.REACT_APP_...
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api/v1",
  headers: { "Content-Type": "application/json" },
});

// ✅ Hàm set access token cho tất cả request
export function setAccessToken(token) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}

// ✅ Interceptor: thêm accessToken vào mọi request nếu có
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Interceptor: xử lý khi accessToken hết hạn (401)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = sessionStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const refreshRes = await axios.post(
            "http://localhost:8080/api/v1/auth/refresh",
            { refreshToken },
            { headers: { "Content-Type": "application/json" } }
          );

          if (refreshRes.data.status === "SUCCESS") {
            const newAccessToken = refreshRes.data.data;

            // ✅ Lưu token mới và gắn vào header
            sessionStorage.setItem("accessToken", newAccessToken);
            setAccessToken(newAccessToken);

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return api(originalRequest); // gửi lại request gốc
          }
        } catch (refreshErr) {
          console.error("⚠️ Refresh token thất bại:", refreshErr);
          sessionStorage.clear();
          window.location.href = "/login";
        }
      } else {
        sessionStorage.clear();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
