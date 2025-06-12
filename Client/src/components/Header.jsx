import { Navbar } from 'flowbite-react'
import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'



const Header = () => {

  const navigate = useNavigate();

  const signInHandler = (e)=>{
      e.preventDefault();
      navigate('/sign-in')
  }

   const signUpHandler = (e)=>{
      e.preventDefault();
      navigate('/sign-up')
  }
      
  
  return (

      <Navbar className='border-b-2 dark:text-white flex justify-between '>
        <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
          <span className='bg-gradient-to-br from-blue-800 to-black-900 border rounded px-1 py-1'>Thought's</span>Dairy
        </Link>
        
        <form className='flex '>   
          <input
          type='text'
          placeholder='Search Anything.....'
          name='Search'
          className='text-blue-900 font-bold'
          />
          <label
            htmlFor='Search'
          />
         <button
          type="submit"
          className="rounded-sm bg-gradient-to-r from-blue-800 to-blue-950 px-6 py-2 text-white hover:from-blue-700 hover:to-blue-900"
         >
          Search
         </button>

         </form>

          <div className='flex gap-5 justify-between'>

          <Link to='/'>Home</Link>
         <Link to='/about'>About</Link>
         <Link to='/project'>Projects</Link>

         </div>

         <div >

          <div className='flex gap-5 mr-5'>
            <button className='from-blue-800 to-black-900 border rounded px-1 py-1 hover:bg-gray-600' onClick={signUpHandler}>SignUp</button>
            <button className='from-blue-800 to-black-900 border rounded px-1 py-1 hover:bg-gray-600' onClick={signInHandler}>SignIn</button>
            
          </div>

         </div>

         

      </Navbar>
   
  
  )
}

export default Header