import React, { useEffect, useState } from 'react';
import * as lessonsApi from '../../../api/lessonsApi';

export default function LessonPage() {
    const [lessons, setLessons] = useState([]);
    const [editingLesson, setEditingLesson] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        order: 1,
        chapterId: ''
    });

    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        loadLessons();
    }, []);

    async function loadLessons() {
        try {
            const data = await lessonsApi.getAllLessons(token);
            setLessons(data);
        } catch (err) {
            console.error('Ошибка загрузки уроков:', err.message);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (editingLesson) {
                await lessonsApi.editLesson({ ...formData, id: editingLesson.id });
            } else {
                await lessonsApi.addLesson(formData);
            }
            await loadLessons();
            setFormData({ title: '', content: '', order: 1, chapterId: '' });
            setEditingLesson(null);
        } catch (err) {
            console.error('Ошибка при сохранении урока:', err.message);
        }
    }

    async function handleEdit(lesson) {
        setEditingLesson(lesson);
        setFormData({
            title: lesson.title,
            content: lesson.content,
            order: lesson.order,
            chapterId: lesson.chapterId
        });
        try {
            await loadLessons();
        } catch (err) {
            console.error('Ошибка обновления урока:', err.message);
        }
    }

    async function handleDelete(id) {
        if (!window.confirm('Удалить этот урок?')) return;
        try {
            await lessonsApi.deleteLesson(id);
            await loadLessons();
        } catch (err) {
            console.error('Ошибка удаления урока:', err.message);
        }
    }

    return (
        <div>
            <h1>📘 Уроки</h1>

            <form onSubmit={handleSubmit}>
                <h2>{editingLesson ? 'Редактировать урок' : 'Добавить новый урок'}</h2>

                <input
                    type="text"
                    placeholder="Название"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                />
                <br />
                <textarea
                    placeholder="Содержимое"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    required
                />
                <br />
                <input
                    type="number"
                    placeholder="Порядок"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    required
                />
                <br />
                <input
                    type="text"
                    placeholder="ID главы"
                    value={formData.chapterId}
                    onChange={(e) => setFormData({ ...formData, chapterId: e.target.value })}
                    required
                />
                <br />
                <button 
                    className='customButton'
                    type="submit">
                        {editingLesson ? 'Сохранить изменения' : 'Добавить'}
                </button>
                {editingLesson && (
                    <button 
                        className='customButton'
                        type="button" onClick={() => {
                            setEditingLesson(null);
                            setFormData({ title: '', content: '', order: 1, chapterId: '' });
                    }}>
                        Отмена
                    </button>
                )}
            </form>

            <br />

            <h2>Список уроков ({lessons.length})</h2>
            {lessons.length === 0 ? (
                <p>Нет уроков</p>
            ) : (
                <ul>
                    {lessons.map((lesson) => (
                        <li key={lesson.id}>
                            <strong>{lesson.title}</strong> (#{lesson.order})<br />
                            {lesson.content}<br />
                            <em>Глава ID: {lesson.chapterId}</em>
                            <button 
                                className='customButton'
                                onClick={() => handleEdit(lesson)}>✏️ Редактировать</button>
                            <button 
                                className='customButton'
                                onClick={() => handleDelete(lesson.id)}>🗑️ Удалить</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}