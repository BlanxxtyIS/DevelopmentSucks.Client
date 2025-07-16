import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Sidebar from "../Slidebar/Slidebar";
import * as lessonsApi from "../../../api/lessonsApi";
import "./Layout.css";
import { useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const [lessons, setLessons] = useState([]);
  const [user, setUser] = useState(null);

  const handleLogin = () => setUser({ name: "UserName" });
  const handleLogout = () => setUser(null);

  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    async function loadLessons() {
      try {
        const data = await lessonsApi.getAllLessons(token);
        setLessons(data);
      } catch (err) {
        console.log('Ошибка при загрузке');
      }
  }
  loadLessons();
  }, [token]);


  return (
    <>
      <Header user={token} onLogin={handleLogin} onLogout={handleLogout} />
      <Sidebar lessons={lessons} />
      <main className="layout-content">
        {children}
      </main>
    </>
  );
}
