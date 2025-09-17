import logo from './logo.svg';
import './App.css';
import Login from './pages/Login/login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from './pages/signUp/signUp';
import WebCam from './pages/webCam/webCam';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<WebCam />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
