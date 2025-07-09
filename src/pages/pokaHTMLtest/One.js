import { useNavigate } from "react-router-dom";
import CoursesList from "../components/CoursesList";
import { useEffect, useState } from "react";

export default function One() {
    const [lessons, setLessons] = useState([]);
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [order, setOrder] = useState('');
    const [content, setContent] = useState('');
    const [chapterId, setChapterId] = useState('');
    const [responseMessage, setResponseMessage] = useState(''); // <-- для вывода ответа
    const accessToken = localStorage.getItem('accessToken');
    useEffect(() => {
        GetAllLessons();
    }, []);

    async function GetAllLessons(e) {
        try {
        const response = await fetch('https://localhost:7056/api/lessons', {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Не удалось загрузить уроки');
        }

        const data = await response.json();
        setLessons(data);
        } catch (error) {
            console.error('Ошибка при загруке уроков:', error.message);
            setResponseMessage('Ошибка при загрузке уроков');
        }
    }
    
    async function AddLesson(e) {
        e.preventDefault();

        try {
            const response = await fetch('https://localhost:7056/api/lessons', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    title, 
                    order: Number(order), 
                    content, 
                    chapterId: chapterId}),
                redirect: 'follow'
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Ошибка в response');
            }

            const result = await response.json();
            setResponseMessage(`✅ Успех: урок "${result.title}" создан с id: ${result.id || 'неизвестен'}`);

            setTitle('');
            setOrder('');
            setContent('');
            setChapterId('');

            GetAllLessons();
        } catch (error) {
            console.log(error.message);
            setResponseMessage(`❌ ${error.message}`);
        }
    }

    async function EditLesson(e) {
        e.preventDefault();
        console.log('EditLesson called');
        try {
            const response = await fetch('https://localhost:7056/api/lessons', {
                method: 'PUT',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id,
                    title, 
                    order: Number(order), 
                    content, 
                    chapterId: chapterId}),
                redirect: 'follow'
            });

            if (response.status === 204) {
                setResponseMessage(`✅ Успех: урок обновлён`);
            } else if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Ошибка при обновлении');
            }

            setTitle('');
            setOrder('');
            setContent('');
            setChapterId('');

            GetAllLessons();
        } catch (error) {
            console.log(error.message);
            setResponseMessage(`❌ ${error.message}`)
        }
    }

    return (
        <div style={{ padding: '20px' }}>
            <hr />
            <h1>📘 LESSONS</h1>
            <div>
                <h3>All Lessons ({lessons.length})</h3>
                {lessons.length === 0 ? (
                    <p>Нет уроков</p>
                ) : (
                    <ul>
                        {lessons.map((lesson) => (
                            <li key={lesson.id}>
                                <strong>{lesson.id} - {lesson.title}</strong> (#{lesson.order}) — {lesson.content} - {lesson.chapterId}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <hr/>

            <div>
                <h3>Add Lesson</h3>
                <form onSubmit={AddLesson}>
                    <div>
                        <label>Title</label><br/>
                        <input
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>Order</label><br />
                        <input 
                            type="number"
                            value={order}
                            onChange={e => setOrder(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>Content</label><br/>
                        <input
                        type="text"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        required
                    />
                    </div>

                    <div>
                        <label>ChapterId</label><br/>
                        <input
                        type="text"
                        value={chapterId}
                        onChange={e => setChapterId(e.target.value)}
                        required
                    />
                    </div>
                    <br />
                    <button type="submit" style={{padding: '10px 20px'}}>
                        Added
                    </button>
                </form>
            </div>
            
            <hr/>

            <div>
                <h3>EDIT LESSON</h3>
                <form onSubmit={EditLesson}>
                    <div>
                        <label>LessonID</label><br/>
                        <input
                            type="text"
                            value={id}
                            onChange={e => setId(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>Title</label><br/>
                        <input 
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>Order</label><br />
                        <input 
                            type="number"
                            value={order}
                            onChange={e => setOrder(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>Content</label><br/>
                        <input
                        type="text"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        required
                    />
                    </div>

                    <div>
                        <label>ChapterId</label><br/>
                        <input
                        type="text"
                        value={chapterId}
                        onChange={e => setChapterId(e.target.value)}
                        required
                    />
                    </div>
                    
                    <br/>
                    <button type="submit" style={{padding: '10px 20px'}}>EDIT</button>
                </form>
            </div>

            <p>{responseMessage}</p>
        </div>      
    )
}