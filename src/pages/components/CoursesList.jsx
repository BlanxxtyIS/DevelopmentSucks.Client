import React, {useState} from 'react';

export default function CoursesList() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    async function loadCourses(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        const accessToken = localStorage.getItem('accessToken'); // вне функции

        try {
            const response = await fetch('https://localhost:7056/api/courses', {
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                let errorMessage = 'Ошибка загркузки Курсов';
                if (response.status == 401) {
                    const refreshed = await tryRefreshToken();
                    if (refreshed?.accessToken) {
                        localStorage.setItem('accessToken', refreshed.accessToken);
                        return await loadCourses(e);
                    } else {
                        errorMessage = 'Не удалось обновить токен. Перенапралвение на вход';
                        throw new Error('Не удалось обновить токен. Перенапралвение на вход');
                    }
                }
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorMessage;
                } catch {

                }
                throw new Error(errorMessage);
            }

            const data = await response.json();
            setCourses(data);
            setSuccess(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function tryRefreshToken() {
    try {
        const response = await fetch('https://localhost:7056/api/auth/refresh', {
            method: 'POST',
            credentials: 'include' // Важно для отправки cookie
        });

        if (!response.ok) {
            throw new Error(`Ошибка при обновлении токена: ${response.statusText}`);
        }

        const data = await response.json();
        // Сохраняем новый access token
        localStorage.setItem('accessToken', data.accessToken);
        
        return data;
    } catch (error) {
        console.error('Ошибка обновления токена:', error);
        // Здесь можно добавить логику очистки токенов и перенаправления на страницу входа
        return null;
    }
    }

    return (
        <div>
            <p>Hello World</p>
            <button onClick={loadCourses}>{loading ? 'Загрузка...' : 'Загрузить курсы'} </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>Курсы успешно загружены</p>}
            <p>Courses</p>
            <ul>
                {courses.map(course => 
                    <li key={course.id}>{course.id} -- {course.title}</li>
                )}
            </ul>
        </div>
    )
}