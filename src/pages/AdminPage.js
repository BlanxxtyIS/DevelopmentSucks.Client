import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CoursesList from './components/CoursesList';
import LessonPage from './components/LessonPage';
import CoursesPage from './components/CoursesPage';
import ChapterPage from './components/ChapterPage';

export default function AdminPage() {
    return (
        <div>
            <h1>Панель администратора</h1>

            <div>
                <p>Обновить токен</p>
            </div>

            <CoursesPage />
            <hr/>
            <CoursesList />
            <hr />
            <ChapterPage />
            <hr />
            <LessonPage />
        </div>
    )
}