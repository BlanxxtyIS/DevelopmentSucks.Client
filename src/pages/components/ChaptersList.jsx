import React, { useState } from 'react';

export default function ChaptersList() {
    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

        async function loadChapters(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch('http://localhost:5231/api/chapters', { method: 'GET', mode: 'cors' });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Ошибка загрузки Глав');
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