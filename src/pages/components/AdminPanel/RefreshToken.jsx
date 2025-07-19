import React, {useState} from 'react';
import '../../../styles/styles.css'

export default function RefreshToken() {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    async function loadCourses(e) {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        const accessToken = localStorage.getItem('accessToken'); // вне функции
    }

    async function tryRefreshToken() {
        try {
            //const response = await fetch('http://localhost:8080/api/auth/refresh', {
            const response = await fetch('https://localhost/api/auth/refresh', {
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
            <button className='customButton' onClick={tryRefreshToken}>Обновить токен</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>Токен успешно обновлен</p>}
        </div>
    )
}
