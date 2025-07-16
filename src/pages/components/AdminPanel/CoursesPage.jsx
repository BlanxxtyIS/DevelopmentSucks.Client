import { useEffect, useState } from "react";
import * as coursesApi from '../../../api/coursesApi'

export default function CoursesPage() {
    const [courses, setCourses] = useState([]);
    const [edititngCourse, setEditingCourse] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });

    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        loadCourses();
    }, []);
    
    async function loadCourses() {
        try {
            const data = await coursesApi.getAllCourses(token);
            setCourses(data);
        } catch (err) {
            console.error('Ошибка загрузки курсов:', err.message);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (edititngCourse) {
                await coursesApi.editCourse({...formData, id: edititngCourse.id}, token);
            } else {
                await coursesApi.addCourse(formData, token);
            }

            await loadCourses();
            setFormData({title:'', description: ''});
            setEditingCourse(null);
        } catch (err) {
            console.log('Ошибка при сохранении урока:', err.message);
        }
    }

    async function handleEdit(course) {
        setEditingCourse(course);
        setFormData({
            title: course.title,
            description: course.description
        });
    }

    async function handleDelete(id) {
       if (!window.confirm('Удалить этот курс?')) return;
       try {
            await coursesApi.deleteCourse(id, token);
            await loadCourses();
       } catch (err) {
            console.error('Ошибка удаления курса:', err.message);
       }
    }

    return (
        <div>
            <h1>📘 Курcы</h1>

            <form onSubmit={handleSubmit}>
                <h2>{edititngCourse ? 'Редактировакть курс' : 'Добавить новый курс'}</h2>

                <input
                    type="text"
                    placeholder="Название курса"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                /> <br />

                <textarea
                    placeholder="Описание курса"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                /> <br/>

                <button className='customButton' type="submit">
                    {edititngCourse ? 'Сохранить изменения' : 'Добавить'}
                </button>
                {edititngCourse && (
                    <button className='customButton' type="button" onClick={() => {
                        setEditingCourse(null);
                        setFormData({title: '', description: ''});
                    }}>
                        Отмена
                    </button>
                )}
            </form>
            
            <br/>

            <h2>Список курсов ({courses.length})</h2>
            {courses.length === 0 ? (
                <p>Нет курсов</p>
            ) : (
                <ul>
                    {courses.map((course) => (
                        <li key={course.id}>
                            <strong>id : {course.id} ||| {course.title}</strong> (#{course.description})<br />
                            <button className='customButton' onClick={() => handleEdit(course)}>✏️ Редактировать</button>
                            <button className='customButton' onClick={() => handleDelete(course.id)}>🗑️ Удалить</button>
                        </li>
                    ))}
                </ul>
             )}
        </div>
    )
}