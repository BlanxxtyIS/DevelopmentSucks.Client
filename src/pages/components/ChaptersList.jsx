import React, { useState } from 'react';

export default function ChaptersList() {
    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const accessToken = localStorage.getItem('accessToken');

    async function loadChapters(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch('https://localhost:7056/api/chapters', { 
                method: 'GET', 
                mode: 'cors' ,
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                let errorMessage = 'Ошибка загркузки Глав';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorMessage;
                } catch {

                }
                throw new Error(errorMessage);
            }
            
            const data = await response.json();
            setChapters(data);
            setSuccess(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <button onClick={loadChapters}>{loading ? 'Загрузка...' : 'Загрузить главы'}</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>Главы успешно загружены</p>}
            <ul>
                {chapters.map(chapter => (
                    <li key={chapter.id}>{chapter.id} — {chapter.title}</li>
                ))}
            </ul>
        </div>
    );
}