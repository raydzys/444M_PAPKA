import React, { useState } from 'react';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }
    // Отправка данных на сервер
    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert('Регистрация успешна');
        window.location.href = '/login';
      } else {
        alert('Ошибка регистрации');
      }
    })
    .catch((error) => {
      console.error(error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Пароль" />
      <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Подтверждение пароля" />
      <button type="submit">Регистрация</button>
    </form>
  );
};


function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.post('/login', { email, password });
        // Успешный логин
      } catch (error) {
        setError(error.message);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <button type="submit">Логин</button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
    );
  }

