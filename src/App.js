import "./styles.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import { app, db } from "./firebaseConfig";
import Home from "./components/Home";
import Editor from "./components/Editor";

export default function App() {
  return (
    <>
      <div className="app">
        <h1>Google Docs Clone</h1>
        <Routes>
          <Route path="/" element={<Login />} />\
          <Route path="/home" element={<Home db={db} />} />
          <Route path="/editor/:id" element={<Editor db={db} />} />
        </Routes>
      </div>
    </>
  );
}
