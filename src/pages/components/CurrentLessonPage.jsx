import React, {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as lessonsApi from "../../api/lessonsApi";

export default function CurrentLessonPage() {
    const [lessons, setLessons] = useState([]);
    const {order} = useParams();
    const [currentOrder, setCurrentOrder] = useState(Number(order) || 0);

    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        async function  loadLessons() {
            try {
                const data = await lessonsApi.getAllLessons(token);
                setLessons(data);
            } catch (err) {
                console.log('Ошибка при загрузке');
            }
        }

        loadLessons();
    }, [token]);

    useEffect(() => {
        // Обновлять currentOrder, если меняется параметр в URL
        setCurrentOrder(Number(order) || 0);
    }, [order]);

    if (lessons.length === 0) return <p>Уроков пока нет</p>;
    if (currentOrder < 0 || currentOrder >= lessons.length) {
        return <p>Урок не найден</p>;
    }

    const currentLesson = lessons[currentOrder];

    return (
        <div>
            <h1>{currentLesson?.title}</h1>
            <div dangerouslySetInnerHTML={{__html: currentLesson.content}} />
            <p><em>Глава ID: {currentLesson.id}</em></p>

            <div style={{marginTop: "1rem"}}>
                <button 
                    className='customButton'
                    onClick={() => setCurrentOrder((prev) => prev - 1)}
                    disabled={currentOrder === 0}
                >
                    ⬅️ Назад
                </button>

                <button
                    className='customButton'
                    onClick={() => setCurrentOrder((next) => next + 1)}
                    disabled={currentOrder === lessons.length - 1}
                    style={{ marginLeft: "1rem" }}
                > 
                    Далее ➡️
                </button>
            </div>
        </div>
    )
}
