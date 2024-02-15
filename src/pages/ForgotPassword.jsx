import React, { useState } from 'react'
import { loginUser } from '../service/operations/auth';
import { useDispatch } from 'react-redux';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link, useNavigate } from 'react-router-dom';
import chatImg from "../assets/chatImage.png"
import { passwordRestLink } from '../service/operations/user';

const ForgotPassword = () => {
  const [formData,setFormData] = useState();
  const dispatch = useDispatch();
  const [step,setStape] = useState(1);
  const navigate = useNavigate();

  const handleChange = (e) =>{
   setFormData((prev) => ({
    ...prev,
    [e.target.name] : e.target.value
   }))
  }

  const handelSubmit = async(e) => {
    e.preventDefault();
    await passwordRestLink(formData.email,setStape);
  }
  return (
    <div className='flex w-full h-screen  items-center justify-center flex-col gap-2 '>
      
     <form className='flex flex-col relative justify-center bg-slate-300 text-sm border border-black p-3 rounded-xl min-w-[330px] min-h-[450px] w-[30%]'
     onSubmit={handelSubmit}>
      <div className='flex w-full items-center justify-center'>
      <img className='w-[200px]  h-[200px] flex items-center justify-center absolute -top-28' src={chatImg}/>
      </div>
     {
        step === 1 ?
        <div>
             <p className='text-2xl font-semibold  pt-2'>Reset your password</p>
         <p className=' text- font-semibold  py-2'>Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery</p>
        </div>
        : <div>
             <p className='text-2xl font-semibold  pt-2'>Check Email</p>
             <div>
             <p className=' text-xl font-semibold '>We have sent the reset email to</p>
             <p className='text-2xl font-semibold'>{formData.email}</p>
             </div>
        </div>
     }
     {
        step === 1 && 
        <label>
     <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
      >Email Address <sup className='text-pink-200'>*</sup></p>
      <input
      placeholder='Enter Email'
      type='email'
      required
      name='email'
      onChange={handleChange}
      className='w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none
    border-b border-pure-greys-300'
      />
     </label>
     }

        <button
        type="submit"
        className="mt-6 rounded-[8px] bg-yellow-400 hover:bg-yellow-500 py-[8px] px-[12px] font-medium text-richblack-900"
      >
        {step === 1 ? "Submit" : "Resend email"}
      </button>

      <button
      onClick={()=>navigate("/login")}
        className="mt-3 rounded-[8px] bg-yellow-400 hover:bg-yellow-500 py-[8px] px-[12px] font-medium text-richblack-900"
      >
        Login
      </button>
      
     </form>
    </div>
  )
}

export default ForgotPassword
