import { async } from '@firebase/util';
import React from 'react';
import { useAuthState, useSendEmailVerification } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RequireAuth = ({children}) => {
	const [user, loading] = useAuthState(auth);
	const location = useLocation();
	const [sendEmailVerification, sending, error] = useSendEmailVerification(
		auth
	  );
	// console.log(children);
	if(loading){
		return <Loading></Loading>
	}
	if(!user){
		return <Navigate to='/login' state={{from:location}} replace></Navigate>;
	}
	if(user.providerData[0]?.providerId === 'password' && !user.emailVerified){
		return <div className='text-center mt-5'>
			<h3 className='text-danger'>Your Email is not verified</h3>
			<h3 className='text-danger'>Please Verify your email address, </h3>
			<h5 style={{color:'green'}}>An email is sended in {user.email}</h5>
			<button className='btn btn-primary my-3' onClick={async () => {
				await sendEmailVerification();
				toast("Email sended!");
			}}>Send Verification Email Again</button>

		<ToastContainer />
		</div>
	}

	return children;
};

export default RequireAuth;