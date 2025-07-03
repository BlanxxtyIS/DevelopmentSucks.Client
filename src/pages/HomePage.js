import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    return (
        <div>
        <h1>Happy Hacking!</h1>
        <p>{accessToken} AND {refreshToken}</p>
        </div>
    )
}