import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CoursesList from './components/CoursesList';
import ChaptersList from './components/ChaptersList';

export default function AdminPage() {
    return (
        <div>
            <h1>Панель администратора</h1>
            <CoursesList />
            <hr />
            <ChaptersList />
        </div>
    )
}