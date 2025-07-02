import React from 'react';
import { FcGoogle } from "react-icons/fc";
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import app from '../firebase'
// import { json } from 'express';
import { useNavigate } from 'react-router-dom';

const Oauth = () => {

    const navigate = useNavigate();

    const clickHandler = async(e)=>{
        // e.prevetDefault();
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider()

        try{
            provider.setCustomParameters({prompt:'select_account'})
            const Googleres = await signInWithPopup(auth,provider);
            console.log(Googleres);

            const res = await fetch('http://localhost:4000/api/auth/google' , {
                method:'post',
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify({
                    name:Googleres.user.displayName,
                    email:Googleres.user.email,
                    photo:Googleres.user.photoURL
                })
             }

            )
                 if (res.ok) {
            const data = await res.json();
            console.log("Server Response:", data);

            // Handle user data
            if (data.success) {
                console.log("User Data:", data.user);
                navigate('/');
            }
        } else {
            console.error("Failed to sign in:", await res.json());
        }

        }
        catch(error){
            console.log(error);
        }
    }
  return (
    <div className="flex justify-center items-center mt-4">
      <button 
        type="button" 
        onClick={clickHandler}
        className="flex items-center justify-center gap-2 w-full max-w-sm px-4 py-2 border-2 border-gray-300 rounded-lg shadow-md bg-white text-gray-700 hover:bg-gray-100 hover:shadow-lg focus:outline-none transition-all duration-300 ease-in-out"
      >
        <FcGoogle className="text-2xl" />
        <span className="font-medium">Continue with Google</span>
      </button>
    </div>
  );
}

export default Oauth;
