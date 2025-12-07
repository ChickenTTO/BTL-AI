import React from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import "./webCam.css";

const WebCam = () => {
  const navigate = useNavigate();

  return (
    <div className="webCam">
      <div className="cam">
        <h1>Timekeeping camera</h1>
        <div className="Webcam">
          <Webcam audio={false} screenshotFormat="image/jpeg" width={350} />
        </div>
      </div>

      <div className="bt-login">
        <div style={{ marginTop: "20px" }}>
          <button onClick={() => navigate("/login")}>
            Login with account Addmin
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebCam;
