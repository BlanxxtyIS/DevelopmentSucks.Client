import { useEffect, useState } from "react";
import * as chaptersApi from '../../../api/chaptersApi'

export default function ChapterPage() {
    const [chapters, setChapters] = useState([]);
    const [editingChapter, setEditingChapter] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        order: null,
        courseId: ''
    });

    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        loadChapters();
    }, []);

    async function loadChapters() {
        try {
            const data = await chaptersApi.getAllChapters(token);
            setChapters(data);
        } catch (err) {
            console.error('Ошибка загркузки главы:', err.message);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault(); //Не перезагружает страницу
        try {
            if (editingChapter) {
                await chaptersApi.editChapter({...formData, id: editingChapter.id}, token);
            } else {
                await chaptersApi.addChapter(formData, token);
            }

            await loadChapters();
            setFormData({title:'', order: null, courseId:''});
            setEditingChapter(null);
        } catch (err) {
            console.log('Ошибка при сохранении главы:', err.message);
        }
    }

    async function handleEdit(chapter) {
        setEditingChapter(chapter);
        setFormData({
            title: chapter.title,
            order: chapter.order,
            courseId: chapter.courseId
        });
    }

    async function hanldeDelete(id) {
        if (!window.confirm('Удалить эту главу?')) return;
        try {
            await chaptersApi.deleteChapter(id, token);
            await loadChapters();
        } catch (err) {
            console.error('Ошибка удаления главы:', err.message);
        }
    }

    return (
        <div>
            <h1>📘 Главы</h1>

            <form onSubmit={handleSubmit}>
                <h2>{editingChapter ? 'Редактировать главу' : 'Добавить новую главу'}</h2>

                <input
                    type="text"
                    placeholder="Название главы"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                /> <br />

                <input 
                    type="number"
                    placeholder="Номер главы"
                    value={formData.order}
                    onChange={(e) => setFormData({...formData, order: e.target.value})}
                    required
                /> <br />

                <input
                    type="text"
                    placeholder="Id курса"
                    value={formData.courseId}
                    onChange={(e) => setFormData({...formData, courseId: e.target.value})}
                    required
                /> <br />

                <button 
                    className='customButton'
                    type="submit">
                    {editingChapter ? 'Сохранить изменения' : 'Добавить'}
                </button>
                {editingChapter && (
                    <button 
                        className='customButton'
                        type="button" onClick={() => {
                            setEditingChapter(null);
                            setFormData({title: '', order: null, courseId: ''});
                        }}>
                        Отмена
                </button>
                )}
            </form>

            <br />
            <h2>Список глав ({chapters.length})</h2>
            {chapters.length === 0 ? (
                <p>Нет глав</p>
            ) : (
                <ul>
                    {chapters.map((chapter) => (
                        <li key={chapter.id}>
                            <string>{chapter.id} ---- {chapter.title}</string>
                            <button 
                                className='customButton' 
                                onClick={() => handleEdit(chapter)}>✏️ Редактировать</button>
                            <button 
                                className='customButton' 
                                onClick={() => hanldeDelete(chapter.id)}>🗑️ Удалить</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}