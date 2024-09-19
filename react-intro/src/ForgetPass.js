import { Link } from 'react-router-dom';
import './App.css';
import { useId } from 'react';

const Forgetpass = () => {
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
      <div></div>
    </>
  );
}
export default Forgetpass;