import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
	const navigate = useNavigate()
	return (
		<header className="absolute inset-x-0 top-0 z-50 bg-white text-black">
			<nav className="container mx-auto flex items-center justify-between p-6 lg:px-8" aria-label="Global">
				<div className='flex gap-2 sm:gap-7 md:gap-10 justify-center items-center'>
					<img src="/logo.png" alt="logo" className='aspect-square w-10 md:w-15' />
					<a href="#" className="font-serif text-sm sm:text-xl md:text-2xl font-bold text-stone-900">Flow Chat</a>
				</div>
				<div className="flex items-center gap-2 sm:gap-5 md:gap-6">
					<div onClick={() => { navigate('/login') }} className="cursor-pointer text-xs md:text-sm font-semibold leading-6 text-stone-700 hover:text-stone-900">Log in</div>
					<div onClick={() => { navigate('/sign-up') }} className="cursor-pointer rounded-full bg-blue-800 px-3 md:px-5 py-1 md:py-2.5 text-xs md:text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline-offset-2 focus-visible:outline-emerald-800">
						Sign Up
					</div>
				</div>
			</nav>
		</header>
	)
}

export default Navbar