import React from "react";
import "./Slidebar.css";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ lessons }) {

    const navigate = useNavigate();

  return (
    <nav className="sidebar">
      <ul>
        {lessons.map(item => (
          <li key={item.id}>
            <button
                onClick={() => navigate(`/lessons/${item.order}`)}
                className="slidebar-link"
            >{item.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}