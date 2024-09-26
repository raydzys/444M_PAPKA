import { Link } from 'react-router-dom';
import './App.css';
import { useId } from 'react';

const Forgetpasss = () => {
  console.log('PasswordForg');
};


function Forgetpass() {
  return (
    <>
    <hr />
      <label>
        Email: 
         <input  type="email" name="user_email" />
      </label>
      <hr />
      <div><button onClick={Forgetpasss}>Восстановление пароля</button></div>
    </>
  );
}
export default Forgetpass;