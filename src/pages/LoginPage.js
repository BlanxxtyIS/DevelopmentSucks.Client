import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      //const response = await fetch('http://localhost:8080/api/auth/login', {
        const response = await fetch('https://localhost/api/auth/login', {
        method: 'POST',
        mode: 'cors', // явно указываем режим CORS
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', //позволяет браузеру автоматически отправлять и принимать куки между клиентом и сервером
        body: JSON.stringify({ username, password })
    });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Ошибка авторизации');
      }

      const data = await response.json();

      // Сохраняем accessToken в localStorage
      localStorage.setItem('accessToken', data.accessToken);

      setSuccess(true);
      console.log('Успешный логин', data);

      navigate('/');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', padding: 20, border: '1px solid #ccc' }}>
      <h2>Вход!</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>Username</label><br />
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Пароль</label><br />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </div>

        <button type="submit" disabled={loading} style={{ padding: '10px 20px' }}>
          {loading ? 'Загрузка...' : 'Войти'}
        </button>

        {error && <div style={{ marginTop: 10, color: 'red' }}>{error}</div>}
        {success && <div style={{ marginTop: 10, color: 'green' }}>Успешный вход!</div>}
      </form>
    </div>
  );
}
