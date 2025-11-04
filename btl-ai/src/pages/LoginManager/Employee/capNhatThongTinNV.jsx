import React, { useEffect, useState } from "react";
import "./capNhatThongTinNV.css";
import { getAllEmployees } from "../../../api/employee";

function CapNhatThongTinNV() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");

  // gọi API khi component load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllEmployees();
        if (res.status === "SUCCESS") {
          setEmployees(res.data);
        } else {
          setError(res.message || "Không lấy được danh sách nhân viên");
        }
      } catch (err) {
        console.error(err);
        setError("Lỗi khi gọi API hoặc chưa đăng nhập!");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="manager-child">
      <div className="backgroud">
        <div className="box">
          <h2 style={{ textAlign: "center", marginTop: "20px" }}>
            Danh sách nhân viên
          </h2>

          {error && (
            <p style={{ color: "red", textAlign: "center" }}>{error}</p>
          )}

          {/* Hiển thị danh sách nhân viên */}
          <div className="list">
            {employees.length > 0 ? (
              <table className="employee-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tên đăng nhập</th>
                    <th>Email</th>
                    <th>Vai trò</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp, index) => (
                    <tr key={index}>
                      <td>{emp.id}</td>
                      <td>{emp.username}</td>
                      <td>{emp.email}</td>
                      <td>{emp.role || emp.authorities?.[0]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              !error && (
                <p style={{ textAlign: "center" }}>Đang tải dữ liệu...</p>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CapNhatThongTinNV;
