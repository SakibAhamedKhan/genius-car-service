import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import './Register.css'
import auth from '../../../firebase.init';
import SocialLogin from '../SocialLogin/SocialLogin';
import { async } from '@firebase/util';
import Loading from '../../Shared/Loading/Loading';
import useToken from '../../../hooks/useToken';

const Register = () => {
	const [agree, setAgree] = useState(false);
	const [
		createUserWithEmailAndPassword,
		user,
		loading,
		error,
	  ] = useCreateUserWithEmailAndPassword(auth, {sendEmailVerification:true});
	const [updateProfile, updating, updateError] = useUpdateProfile(auth);
	const [token] = useToken(user);

	const navigate = useNavigate();
	const location = useLocation();

	const navigateLogin = () => {
		navigate('/login');
	}

	if(loading || updating){
		return <Loading></Loading>
	  }

	if(token){
		navigate('/home');
	}

	const handleRegister = async (event) => {
		event.preventDefault();
		const name = event.target.name.value;
		const email = event.target.email.value;
		const password = event.target.password.value;
		// const agree = event.target.terms.checked;
		// if(agree){
		await createUserWithEmailAndPassword(email,password);
		await updateProfile({ displayName: name });
        console.log('Updated profile');
		
		// }
	}
	return (
		<div className='register-form'>
			<h2 className='mb-4 text-center text-primary'>Please Register</h2>
			<form onSubmit={handleRegister}>
				<input type="text" name="name" id="" placeholder='Your Name' />
				<input type="email" name="email" id="" placeholder='Email Address' />
				<input type="password" name='password' placeholder='Password' />
				<input onClick={() => setAgree(!agree)} className='' type="checkbox" name="terms" id="terms" />
				{/* <label className={agree? 'text-primary mx-3 my-3' : 'text-danger mx-3 my-3'} htmlFor="terms">Accept Genius Car Terms and Conditions</label> */}
				<label className={`mx-3 my-3 ${agree? 'text-primary':'text-danger'}`} htmlFor="terms">Accept Genius Car Terms and Conditions</label>
				<input
				disabled = {!agree} 
				className='btn btn-primary' 
				type="submit" value="Register" />
			</form>
			<p className="my-2">Already have an account? <span className="text-primary" role="button" onClick={navigateLogin}>Plesae Login</span></p>
			<SocialLogin></SocialLogin>
		</div>
	);
};

export default Register;