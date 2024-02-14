import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSignupData } from '../slice/user';
import { toast } from 'react-toastify';
import { createAccount } from '../service/operations/auth';
import chatImg from "../assets/chatImage.png"


const VeryfiEmail = () => {
  const [otp, setOtp] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { signupData } = useSelector((state) => state.user);

  const isSignuData = () => {
    if (!signupData) {
      navigate("/signup")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp) {
      const data = {
        ...signupData,
        otp: otp
      }
      createAccount(data,navigate)
    } else {
      toast.error('otp not filled')
    }
  }


  useEffect(() => {
  isSignuData();
  },[])

  return (
    <div className='w-screen h-screen flex flex-col items-center ' >
      <div className='flex w-full items-center justify-center pt-8 '>
      <img className='w-[200px]  h-[200px] flex items-center justify-center ' src={chatImg}/>
      </div>
      <div className='text-black min-w-[300px] w-[25%] border border-black rounded-md p-3'>
        <p className='text-xl font-semibold text-center pb-5'>Email Varfication</p>
        <form>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderInput={(props) => (
              <input
                {...props}
                placeholder="-"
                style={{

                }}
                className="w-[48px] lg:w-[60px] text-black  border border-solid border-black rounded-[0.5rem] text-xl text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
              />
            )}
            containerStyle={{
              justifyContent: "space-between",
              gap: "0 6px",
            }}
          />
          <button
            onClick={handleSubmit}
            className="mt-6 rounded-[8px] bg-yellow-400 w-full hover:bg-yellow-500 py-[8px] px-[12px] font-medium text-richblack-900"
          >
            Verify
          </button>
        </form>
      </div>

    </div>
  )
}

export default VeryfiEmail
