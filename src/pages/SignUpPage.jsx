import React,{useState , useEffect , useContext} from 'react'
import { SignedIn, SignedOut, SignInButton, SignUp , SignUpButton, UserButton , useSignUp} from '@clerk/clerk-react';
import {AppContext} from '../context/GlobalContext'

const SignUpPage = () => {
	return (
		<div className='bg-slate-50 flex justify-center items-center w-[100vw] h-[100vh]'>
			 <SignUp signInUrl="/login" forceRedirectUrl="/dashboard?newUser=true"/>
		</div>
	)
}

export default SignUpPage