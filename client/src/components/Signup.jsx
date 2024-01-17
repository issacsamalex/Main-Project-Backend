
import React, { useRef, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { FaRegUser } from "react-icons/fa";
import { TbMail } from "react-icons/tb";
import { TbPasswordUser } from "react-icons/tb";
import { TbInfoCircle } from "react-icons/tb";
import { TbCircleCheckFilled } from "react-icons/tb";
import { IoIosCloseCircle } from "react-icons/io";
import '../styles/loginpage.css'
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
// import axios from 'axios'
import CustomCTA from './customComponents/CustomCTA';
import axios from '../axiosinterceptor'


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Signup = () => {

  const navigate = useNavigate()

  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');

useEffect(() => {
  userRef.current.focus();
}, [])

useEffect(() => {
  setValidName(USER_REGEX.test(username));
}, [username])

useEffect(() => {
  setValidEmail(EMAIL_REGEX.test(email))
}, [email])

useEffect(()=>{
  setValidPassword(PWD_REGEX.test(password))
}, [password])

useEffect(() => {
  setErrMsg('');
}, [username, password])


const handleSubmit = async () => {
  const v1 = USER_REGEX.test(username);
  const v2 = EMAIL_REGEX.test(email);
  const v3 = PWD_REGEX.test(password);
  if(!v1 || !v2 || !v3){
    setErrMsg('Invalid Entry');
    return;
  }
  try {
    const response = await axios.post('/api/v1/auth/signup', {username, email, password}).then((response)=> {
      toast.success(response.data.message, {position:"top-right"})
      navigate('/login')
    })
    setUsername('');
    setEmail('');
    setPassword('');
  } catch (error) {
    if(!error?.response){
      setErrMsg('No Server Response')
    } else if(error.response?.status === 400){
      setErrMsg('You did not meet the pass criteria in the exit exam')
    } else if (error.response?.status === 409){
      setErrMsg('Username already exists')
    } else {
      setErrMsg('Registration Failed')
    }
    errRef.current.focus();
  }
}

  return (
    <>
    <div className='container'>
      <div className="header">
        <div className="text">
          Sign Up
        </div>
        <div className="underline"></div>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
      </div>
      <div className="inputs">
        <div className="input">
          <FaRegUser className={validName ? "hide" : "logo"} />
          <TbCircleCheckFilled className={validName ? "valid" : "hide"} />
          
        <TextField
        id="outlined-basic" 
        label="Username" 
        variant="outlined" 
        fullWidth
        ref={userRef}
        autoComplete='off'
        onChange={(event)=> setUsername(event.target.value)}
        value={username}
        required
        onFocus={()=> setUserFocus(true)}
        onBlur={()=> setUserFocus(false)}
         />
         <IoIosCloseCircle className={validName || !username ? "hide" : "invalid"} />
        </div>
        <p id="uidnote" className={userFocus && username && !validName ? "instructions" : "offscreen"}>
                            <TbInfoCircle /> <br/>
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
         </p>

        <div className="input">
        
        <TbMail className={validEmail ? "hide" : "logo"} />
        <TbCircleCheckFilled className={validEmail ? "valid" : "hide"} />
          
        <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        fullWidth
        onChange={(event)=> setEmail(event.target.value)}
        value={email}
        required
        onFocus={()=> setEmailFocus(true)}
        onBlur={()=> setEmailFocus(false)}
        />
        <IoIosCloseCircle className={validEmail || !email ? "hide" : "invalid"} />
        </div>

        <div className="input">
        
        <TbPasswordUser className={validPassword? "hide" : "logo"} />
        <TbCircleCheckFilled className={validPassword ? "valid" : "hide"} />
          
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          fullWidth
          onChange={(event)=> setPassword(event.target.value)}
          value={password}
          required
          onFocus={()=> setPasswordFocus(true)}
          onBlur={()=> setPasswordFocus(false)}
        />
        <IoIosCloseCircle className={validPassword || !password ? "hide" : "invalid"} />
        </div>
        <p id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                            <TbInfoCircle /> <br/>
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span>!</span> <span>@</span> <span>#</span> <span>$</span> <span>%</span>
        </p>
                       

      </div>
      <div className="login-link">
        Already a user?  <Link to={'/login'} style={{ textDecoration: "none"}}><span>Login</span></Link>
      </div>
      <div className="submit-container">
        <CustomCTA
        backgroundColor="#134987"
        color="#fff"
        buttonText="Sign up" 
        onclick={handleSubmit}
        />
      </div>
    </div>
    </>
  )
}

export default Signup

