import React, { useEffect, useState } from "react";
import "./capNhatThongTinNV.css"; // File này import file CSS
import {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../../../api/employee";
import { useNavigate } from "react-router-dom";

function CapNhatThongTinNV() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    id: "",
    username: "",
    password: "",
    fullName: "",
    gender: "MALE",
    dateBirth: "",
    phoneNumber: "",
    email: "",
    departmentId: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await getAllEmployees();
      if (res.status === "SUCCESS") setEmployees(res.data);
      else setError(res.message || "Không lấy được danh sách nhân viên");
    } catch (err) {
      console.error(err);
      setError("Lỗi khi gọi API hoặc chưa đăng nhập!");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const resetForm = () => {
    setForm({
      id: "",
      username: "",
      password: "",
      fullName: "",
      gender: "MALE",
      dateBirth: "",
      phoneNumber: "",
      email: "",
      departmentId: "",
    });
    setImageFile(null);
    setEditing(false);
    // Xóa file đã chọn khỏi input (nếu cần)
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        username: form.username,
        password: form.password,
        fullName: form.fullName,
        gender: form.gender,
        dateBirth: form.dateBirth || null,
        phoneNumber: form.phoneNumber,
        email: form.email,
        departmentId: form.departmentId,
      };

      console.log("📤 Gửi dữ liệu:", payload);

      let res;
      if (editing) {
        res = await updateEmployee(form.id, payload, imageFile);
        alert(res.message || "Cập nhật thành công!");
      } else {
        res = await createEmployee(payload, imageFile);
        alert(res.message || "Thêm nhân viên thành công!");
      }

      resetForm();
      fetchEmployees();
    } catch (err) {
      console.error("❌ Lỗi khi thêm/cập nhật:", err.response?.data || err);
      const message =
        err.response?.data?.message ||
        "Lỗi khi thêm hoặc cập nhật nhân viên (400 hoặc 500)";
      alert(message);
    }
  };

  const handleEdit = (emp) => {
    setForm({
      id: emp.id,
      username: emp.username,
      fullName: emp.fullName || "",
      gender: emp.gender || "MALE",
      dateBirth: emp.dateBirth ? emp.dateBirth.split("T")[0] : "", // Định dạng lại date
      phoneNumber: emp.phoneNumber || "",
      email: emp.email,
      departmentId: emp.departmentId || "",
      password: "",
    });
    setEditing(true);
    window.scrollTo(0, 0); // Cuộn lên đầu trang để sửa
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa nhân viên này không?")) {
      try {
        const res = await deleteEmployee(id);
        alert(res.message || "Xóa thành công!");
        fetchEmployees();
      } catch (err) {
        console.error(err);
        alert("Lỗi khi xóa nhân viên!");
      }
    }
  };

  return (
    <div className="employee-manager-container">
      {/* 1. KHU VỰC FORM THÊM/SỬA */}
      <div className="form-card">
        <h3>{editing ? "Cập nhật thông tin" : "Thêm nhân viên mới"}</h3>
        <form className="employee-form" onSubmit={handleSubmit}>
          {/* Hàng 1 */}
          <div className="form-group">
            <label htmlFor="username">Tên đăng nhập *</label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Tên đăng nhập"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              Mật khẩu {editing ? "(Bỏ trống nếu không đổi)" : "*"}
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Mật khẩu"
              value={form.password}
              onChange={handleChange}
              required={!editing}
            />
          </div>

          {/* Hàng 2 */}
          <div className="form-group">
            <label htmlFor="fullName">Họ và tên</label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              placeholder="Họ và tên"
              value={form.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Giới tính</label>
            <select
              id="gender"
              name="gender"
              value={form.gender}
              onChange={handleChange}
            >
              <option value="MALE">Nam</option>
              <option value="FEMALE">Nữ</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="dateBirth">Ngày sinh</label>
            <input
              id="dateBirth"
              type="date"
              name="dateBirth"
              value={form.dateBirth}
              onChange={handleChange}
            />
          </div>

          {/* Hàng 3 */}
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Số điện thoại *</label>
            <input
              id="phoneNumber"
              type="tel"
              name="phoneNumber"
              placeholder="Số điện thoại (10 số)"
              value={form.phoneNumber}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
            />
          </div>
          <div className="form-group">
            <label htmlFor="departmentId">Mã phòng ban *</label>
            <input
              id="departmentId"
              type="text"
              name="departmentId"
              placeholder="Mã phòng ban"
              value={form.departmentId}
              onChange={handleChange}
              required
            />
          </div>

          {/* Hàng 4 - Input ảnh */}
          <div className="form-group form-group-full">
            <label htmlFor="image">Ảnh đại diện</label>
            <input
              id="image"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          {/* Hàng 5 - Nút bấm */}
          <div className="button-group">
            {editing && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={resetForm}
              >
                Hủy
              </button>
            )}
            <button type="submit" className="btn btn-primary">
              {editing ? "Cập nhật" : "Thêm mới"}
            </button>
          </div>
        </form>
      </div>

      {/* 2. KHU VỰC DANH SÁCH */}
      <div className="list-card">
        <h3>Danh sách nhân viên</h3>

        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        <div className="table-responsive">
          {employees.length > 0 ? (
            <table className="employee-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên đăng nhập</th>
                  <th>Họ và tên</th>
                  <th>Giới tính</th>
                  <th>Email</th>
                  <th>Phòng ban</th>
                  <th>Số điện thoại</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.id}</td>
                    <td>{emp.username}</td>
                    <td>{emp.fullName}</td>
                    <td>{emp.gender === "MALE" ? "Nam" : "Nữ"}</td>
                    <td>{emp.email}</td>
                    <td>{emp.departmentId}</td>
                    <td>{emp.phoneNumber}</td>
                    <td className="actions">
                      <button
                        className="btn btn-edit"
                        onClick={() => handleEdit(emp)}
                      >
                        Sửa
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDelete(emp.id)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            !error && <p style={{ textAlign: "center" }}>Đang tải dữ liệu...</p>
          )}
        </div>

        <div className="back-button-container">
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/loginManager")}
          >
            Quay lại
          </button>
        </div>
      </div>
    </div>
  );
}

export default CapNhatThongTinNV;
