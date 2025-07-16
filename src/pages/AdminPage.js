import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RefreshToken from './components/AdminPanel/RefreshToken';
import LessonPage from './components/AdminPanel/LessonPage';
import CoursesPage from './components/AdminPanel/CoursesPage';
import ChapterPage from './components/AdminPanel/ChapterPage';

export default function AdminPage() {
    return (
        <div>
            <h1>Панель администратора</h1>

            <div>
                <p>Обновить токен</p>       
                 <RefreshToken />
            </div>

            <hr/>
            <CoursesPage />
            <hr />
            <ChapterPage />
            <hr />
            <LessonPage />
        </div>
    )
}