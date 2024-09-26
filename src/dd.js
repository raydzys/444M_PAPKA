import { Link } from 'react-router-dom';
import './App.css';
import { useId } from 'react';

function Form() {
  return (
    <>
    <hr />
    
      <label>
        Login: 
         <input  type="login" name="user_login" />
      </label>
      <br></br><br></br>
      <label>
        Password: 
         <input  type="password" name="user_password" />
      </label>
      <br></br><br></br>
      <label>
        Email: 
         <input  type="email" name="user_email" />
      </label>
      <hr />
      
    </>
  );
}
export default Form;