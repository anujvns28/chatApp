import React, { useState } from 'react'
import { loginUser } from '../service/operations/auth';
import { useDispatch } from 'react-redux';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link, useNavigate } from 'react-router-dom';
import chatImg from "../assets/chatImage.png"
import { toast } from 'react-toastify';

const UpdatePassword = () => {
  const [formData,setFormData] = useState();
  const dispatch = useDispatch();
  const [shoPassword,setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>{
   setFormData((prev) => ({
    ...prev,
    [e.target.name] : e.target.value
   }))
  }

  const handelSubmit = (e) => {
    e.preventDefault();
   if(formData.password !== formData.confirmPassword){
    toast.error("Password not match");
   }
  }
  return (
    <div className='flex w-full h-screen  items-center justify-center flex-col gap-2 '>
      
     <form className='flex flex-col relative justify-center bg-slate-300 text-sm border border-black p-3 rounded-xl min-w-[330px] min-h-[450px] w-[30%]'
     onSubmit={handelSubmit}>
      <div className='flex w-full items-center justify-center'>
      <img className='w-[200px]  h-[200px] flex items-center justify-center absolute -top-28' src={chatImg}/>
      </div>
      <p className='text-xl font-semibold text-center pt-2'>Welcome!</p>
      <p className='text-2xl text- font-semibold text-center py-2'>Let'sChat.com</p>
     <label>
     <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
      >Password <sup className='text-pink-200'>*</sup></p>
      <input
      placeholder='Enter Password'
      type='text'
      required
      name='password'
      onChange={handleChange}
      className='w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none
    border-b border-pure-greys-300'
      />
     </label>

     <label>
     <p className="mb-1  leading-[1.375rem] text-richblack-5"
      >Confirm Password <sup className='text-pink-200'>*</sup></p>
      <input
      placeholder='Confirm Password'
      type={shoPassword ? "text" : "password"}
      required
      name='confirmPassword'
      onChange={handleChange}
      className='w-full  rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none
    border-b border-pure-greys-300'
      />
     </label>

     <span  className="absolute text-2xl text-pure-greys-200 right-6 translate-y-6 cursor-pointer"
     onClick={() => setShowPassword(!shoPassword)}>
    {shoPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
    </span>


        <button
        type="submit"
        className="mt-6 rounded-[8px] bg-yellow-400 hover:bg-yellow-500 py-[8px] px-[12px] font-medium text-richblack-900"
      >
        Change Password
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

export default UpdatePassword
