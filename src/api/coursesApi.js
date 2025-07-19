import { json } from "react-router-dom";

//const BASE_URL = 'http://localhost:8080/api/courses';
const BASE_URL = 'https://localhost/api/courses';

export async function getAllCourses(token) {
    const response = await fetch(BASE_URL, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Ошибка при загрузке курсов');
    } 

    return response.json();
}

export async function addCourse(course, token) {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        body: JSON.stringify(course),
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Ошибка при добавлении курса');
    }

    return response.json();
}

export async function editCourse(course, token) {
    const response = await fetch(BASE_URL, {
        method: 'PUT',
        body: JSON.stringify(course),
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Ошибка при редактировании курса');
    }
    return;
}

export async function deleteCourse(id, token) {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Ошибка при удалении курса');
    }

    return;
}