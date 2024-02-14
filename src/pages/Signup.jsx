import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSignupData } from '../slice/user';
import { useNavigate } from 'react-router-dom';
import { getOtp } from '../service/operations/auth';
import { toast } from 'react-toastify';
// import SelectImage from '../componetns/common/SelectImage';
import chatImg from "../assets/chatImage.png"
import SelectImage from '../componetns/common/SelectImage';


const Signup = () => {
  const [formData,setFormData] = useState();
  const [step,setStep] = useState(1);
  const { signupData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

    const handleChange = (e) =>{
     setFormData((prev) =>({
      ...prev,
      [e.target.name] : e.target.value
     }))
    }

  const handleSubmit = async(e) =>{
   e.preventDefault();
  if(formData.password === formData.confirmPassword){
    dispatch(setSignupData(formData))
    setStep(2)
  }else{
    // genarate toast
    toast.error("Password not matching")
  }
  }

  const getImgUrl = (url) => {
    if(url){
      const data = {
      ...signupData,
      image : url
    }
    dispatch(setSignupData(data))
    getOtp(formData.email,navigate);
    
    }else {
      toast.error("Error in Creating user")
      navigate("/signup")
    }
  }

  console.log("signup page")


  return (
    <div className='flex w-full h-screen  items-center justify-center flex-col gap-2 overflow-y-hidden '>
    {
      step == 1 ?
      <form className='flex flex-col  relative justify-center bg-slate-300 text-sm  p-3 rounded-xl min-w-[320px] w-[30%] py-4 min-h-[550px]'
      onSubmit={handleSubmit}>
        <div className='flex w-full items-center justify-center'>
      <img className='w-[200px]  h-[200px] flex items-center justify-center absolute -top-28' src={chatImg}/>
      </div>
      <p className='text-xl font-semibold text-center pt-2'>Welcome!</p>
      <p className='text-2xl text- font-semibold text-center py-2'>Let'sChat.com</p>
        {/* name */}
        <label className='w-full '>
        <p className="mb-1 text-sm leading-[1.375rem] text-richblack-5"
      >Name <sup className='text-pink-200'>*</sup></p>
            <input
            placeholder='Enter Name'
            required
            type='text'
            name= "name"
            onChange={handleChange}
            className='w-full  border border-black outline-none p-2 rounded-md text-sm '
            />
        </label>

         {/* email */}
         <label className='w-full'>
         <p className="mb-1 text-sm leading-[1.375rem] text-richblack-5"
      >Email Address <sup className='text-pink-200'>*</sup></p>
            <input
            placeholder='Enter Email'
            required
            type='email'
            name= "email"
            onChange={handleChange}
            className='w-full  border border-black outline-none p-2 rounded-md text-sm '
            />
        </label>

         {/* password*/}
         <label className='w-full'>
         <p className="mb-1 text-sm leading-[1.375rem] text-richblack-5"
      >Password <sup className='text-pink-200'>*</sup></p>
            <input
            placeholder='Enter Password'
            required
            type='text'
            name= "password"
            onChange={handleChange}
            className='w-full  border border-black outline-none p-2 rounded-md text-sm '
            />
        </label>

         {/* Confirm password */}
         <label className='w-full'>
            <p className="mb-1 text-sm leading-[1.375rem] text-richblack-5"
      >Confirm Password <sup className='text-pink-200'>*</sup></p>
            <input
            placeholder='Enter Confirm Password'
            required
            type='text'
            name= "confirmPassword"
            onChange={handleChange}
            className='w-full  border border-black outline-none p-2 rounded-md text-sm'
            />
        </label>

      
        <button
        type="submit"
        className="mt-6 rounded-[8px] bg-yellow-400 hover:bg-yellow-500 py-[8px] px-[12px] font-medium text-richblack-900"
      >
        Sign Up
      </button>

      <button
      onClick={()=>navigate("/login")}
        className="mt-3 rounded-[8px] bg-yellow-400 hover:bg-yellow-500 py-[8px] px-[12px] font-medium text-richblack-900"
      >
        Log in
      </button>
    </form>

    : <div>
          <div className='w-full h-full overflow-hidden '>
            <SelectImage text={"Get Otp"}  getImgUrl={getImgUrl}/>
          </div>
    </div>
}

{/* step 2 select image */}

    
    </div>
  )
}

export default Signup
