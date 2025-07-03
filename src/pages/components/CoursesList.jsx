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

        try {
            const response = await fetch('http://localhost:5231/api/courses', {
                method: 'GET',
                mode: 'cors',
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Ошибка загрузки Курсов');
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