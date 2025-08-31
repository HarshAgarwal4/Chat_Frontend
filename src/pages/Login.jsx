import React from 'react'
import { SignedIn, SignedOut, SignInButton, SignIn , SignUpButton, UserButton } from '@clerk/clerk-react';

const LoginPage = () => {
	return (
		<div className='bg-slate-50 flex justify-center items-center w-[100vw] h-[100vh]'>
			<SignIn signUpUrl='/sign-up' signUpForceRedirectUrl={'/dashboard?newUser=true'} forceRedirectUrl={'/dashboard'} />
		</div>
	)
}

export default LoginPage