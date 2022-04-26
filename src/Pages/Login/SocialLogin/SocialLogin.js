import React from "react";
import google from "../../../images/social/Google__G__Logo.svg.png";
import facbook from "../../../images/social/1024px-Facebook_Logo_(2019).png";
import github from "../../../images/social/github_PNG40.png";
import { useSignInWithGithub, useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";
import useToken from "../../../hooks/useToken";

const SocialLogin = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [signInWithGithub, user1, loading1, error1] = useSignInWithGithub(auth);
  const [token] = useToken(user || user1);
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from.pathname || '/';


  let errorElement;

  if(loading || loading1){
    return <Loading></Loading>
  }

  if (error || error1) {
	errorElement =<div>
     <p className="text-danger">Error: {error?.message} {error1?.message}</p>
    </div>
  }

  if (token) {
    navigate(from, {replace:true});
  }

  return (
    <div>
      <div className="d-flex align-items-center">
        <div style={{ height: "1px" }} className="bg-primary w-50"></div>
        <p className="mt-2 px-3">or</p>
        <div style={{ height: "1px" }} className="bg-primary w-50"></div>
      </div>
	  {
		  errorElement
	  }
      <div className="">
        <button onClick={ () => signInWithGoogle()} className="btn btn-light border border-3 d-block mx-auto w-50 p-2">
          <img height={30} src={google} alt="" />
          <span className="px-2">Google Sign In</span>
        </button>
        <button className="btn btn-light border border-3 d-block mx-auto w-50 p-2 my-3">
          <img height={30} src={facbook} alt="" />
          <span className="px-2">Google Sign In</span>
        </button>
        <button onClick={ () => signInWithGithub()}  className="btn btn-light border border-3 d-block mx-auto w-50 p-2">
          <img className="text-white" height={30} src={github} alt="" />
          <span className="px-2">Google Sign In</span>
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
