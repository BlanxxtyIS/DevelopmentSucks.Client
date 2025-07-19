import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault(); //отключает перезагрузку страницы при отправке формы
        setLoading(true);
        setError(null);
        setSuccess(false);
    
    try {
        //const response = await fetch('http://localhost:8080/api/auth/register', {
        const response = await fetch('https://localhost/api/auth/register', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, email, password}),
            redirect: 'follow'
    });

    if (!response.ok) {
        const data = await response.json();
        throw  new Error(data.message || 'Ошибка регистрации');
    }

    const data = await response.json();
    setSuccess(true);
    console.log("Успешная регистрация",  data);

    navigate('/login');

    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
}


  return (
    <div style={{ maxWidth: 400, margin: '50px auto', padding: 20, border: '1px solid #ccc' }}>
        <h2>Регистрация</h2>
        <form onSubmit={handleSubmit}>
            <div style={{marginBottom: 10}}>
                <label>Username</label><br/>
                <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                    style={{width:'100%', padding:8}}
                />
            </div>

            <div style={{marginBottom: 10}}>
                <label>Email</label><br/>
                <input
                    type='text'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    style={{width:'100%', padding:8}}
                />
            </div>

            <div style={{marginBottom: 10}}>
                <label>Password</label><br />
                <input
                    type='text'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    style={{width:'100%', padding:8}}
                />
            </div>

            <button type='submit' disabled={loading} style={{padding: '10px 20px'}}>
                {loading ? 'Загрузка...' : 'Зарегистрироваться'}
            </button>

            {error && <div style={{marginTop: 10, color: 'red'}}>{error}</div>}
            {success && <div style={{marginTop: 10, color: 'green'}}>{success}</div>}
        </form>
    </div>
  );
}