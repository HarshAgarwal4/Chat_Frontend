import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton , useAuth } from '@clerk/clerk-react';
import { Link , useNavigate } from 'react-router-dom';
import {useEffect} from 'react'
import LoadingPage from '../components/Loading'
import Navbar from '../components/Navbar'

const Home = () => {
  const navigate = useNavigate()
  const {isSignedIn , isLoaded} = useAuth()

   useEffect(() => {
    if (isLoaded && isSignedIn) {
      navigate("/dashboard");
    }
  }, [isSignedIn, isLoaded]);
  
  if(!isLoaded) return (<LoadingPage />)

  return (
    <>
    <Navbar />
    <div>
       <div className="relative px-6 pt-32 pb-16 sm:pt-48 sm:pb-24 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
                <h1 className="font-serif text-5xl font-bold tracking-tight text-stone-900 sm:text-7xl">
                    Your Space to Connect.
                </h1>
                <p className="mt-6 text-lg leading-8 text-stone-600">
                    Serene is where communities, friends, and teams come together. 
                    Share ideas, build connections, and enjoy conversations—all in 
                    one simple, powerful chat app.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <div onClick={() => {navigate('/login')}} className="cursor-pointer rounded-full bg-blue-800 px-8 py-3 text-base font-semibold text-white shadow-lg hover:bg-blue-700 focus-visible:outline-offset-2 focus-visible:outline-emerald-800 transition-transform hover:-translate-y-1">
                        Join the community
                    </div>
                    <a href="#" className="text-base font-semibold leading-6 text-stone-800">Explore more <span aria-hidden="true">→</span></a>
                </div>
            </div>          
        </div>
    </div>
     <div className="bg-white py-24 sm:py-16">
          <div className="container mx-auto max-w-7xl px-6 lg:px-8">
              <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
                  <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                      <dt className="text-base leading-7 text-stone-600">Talk Freely</dt>
                      <dd className="order-first text-3xl font-semibold tracking-tight text-blue-800 sm:text-4xl">
                          Open Chats
                      </dd>
                  </div>
                  <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                      <dt className="text-base leading-7 text-stone-600">Find Your People</dt>
                      <dd className="order-first text-3xl font-semibold tracking-tight text-blue-800 sm:text-4xl">
                          Private & Public Groups
                      </dd>
                  </div>
                  <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                      <dt className="text-base leading-7 text-stone-600">Stay Updated</dt>
                      <dd className="order-first text-3xl font-semibold tracking-tight text-blue-800 sm:text-4xl">
                          Real-Time Alerts
                      </dd>
                  </div>
              </dl>
          </div>
      </div>    
    </>
  );
};

export default Home;
