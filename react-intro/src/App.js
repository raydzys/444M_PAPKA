import logo from './logo.svg';
import './App.css';
import { Link } from "react-router-dom";
import { useId } from 'react';

const AuthButtons = () => {
  const handleRegister = () => {
    console.log('Регистрация');
  };

  const handlelLogin = () => {
    console.log('Авторизация');
  };

  return (
    <div>

    <button onClick={handleRegister}>Регистрация</button>
                 
    <button onClick={handlelLogin}>Авторизация</button>
    </div>
   
  );


  
  
};




export default AuthButtons;
