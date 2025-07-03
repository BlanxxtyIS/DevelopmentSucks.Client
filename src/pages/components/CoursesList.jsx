import React, {useState} from 'react';

export default function CoursesList() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const accessToken = localStorage.getItem('accessToken');

    async function loadCourses(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch('https://localhost:7056/api/courses', {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                let errorMessage = 'Ошибка загркузки Курсов';
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