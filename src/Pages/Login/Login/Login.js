import React, { useRef } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import auth from "../../../firebase.init";
import Loading from "../../Shared/Loading/Loading";
import SocialLogin from "../SocialLogin/SocialLogin";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import useToken from "../../../hooks/useToken";

const Login = () => {
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from.pathname || '/';

  let errorElement;
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);
  const [token] = useToken(user);

  if(loading || sending){
		return <Loading></Loading>
	}

  if (error) {
    errorElement =<div>
       <p className="text-danger">Error: {error?.message}</p>
      </div>
  }

  if(token){

    navigate(from, {replace:true});
  }

  const handleSubmit = async event => {
	  event.preventDefault();
	  const email = emailRef.current.value;
	  const password = passwordRef.current.value;

	  await signInWithEmailAndPassword(email, password);
    
    
  }

  const navigateRegister = event => {
	navigate('/register');
  }

  const resetPassword = async() => {
    const email = emailRef.current.value;
    if(email){
      await sendPasswordResetEmail(email);
      toast('Sent email');
    } else{
      toast('Please enter your email address');
    }
  }

  return (
    <div className="container w-50 mx-auto">
      <h2 className="text-primary text-center my-4">Please Login</h2>
      <Form onSubmit={handleSubmit}>
        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className="mb-3"
        >
          <Form.Control ref={emailRef} type="email" placeholder="name@example.com" required/>
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
          <Form.Control ref={passwordRef} type="password" placeholder="Password" required />
        </FloatingLabel>
        <Button className="w-100 py-2 fs-5" variant="primary" type="submit">
          Login
        </Button>
      </Form>
      {
        errorElement
      }
	  <p className="my-3">New to Genius Car? <span className="text-primary" role="button" onClick={navigateRegister}>Plesae Register</span></p>
	  <p className="my-3">Forget password? <span className="text-primary" role="button" onClick={resetPassword}>Reset Password</span></p>
    <SocialLogin></SocialLogin>
    
    </div>
  );
};

export default Login;
