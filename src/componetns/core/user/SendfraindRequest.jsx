import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { RxCross1 } from "react-icons/rx";
import { sendFraindRequest } from '../../../service/operations/user';
import SubmmitButton from '../../common/SubmmitButton';

const SendfraindRequest = ({setFraindRequest}) => {
    const [email,setEmail] = useState();
    const {user} = useSelector((state) => state.user);

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const data = {
            email : email,
            userId : user._id
        }
        await sendFraindRequest(data)
    }
  return (
   <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
    <form onSubmit={handleSubmit}
   className='w-[25%] min-w-[300px] absolute bg-slate-400 border border-black p-4 rounded-md flex flex-col gap-2'>
   <div className='flex w-full justify-end'> 
   <p onClick={() => setFraindRequest(false)}
   className='text-xl font-semibold p-2 cursor-pointer'><RxCross1/></p></div>
    <p className='text-xl font-semibold'>Send Fraind Request to your Frainds</p>
    <label className='w-full '>
        <p>Enter email</p>
        <input
        name='email'
        type='text'
        required
        onChange={(e) => setEmail(e.target.value)}
         className='w-full  border border-black outline-none p-2 rounded-md text-xl '
        />
    </label>
   <button>
   <SubmmitButton text={"Send Request"}/>
   </button>
   </form>
   </div>
  )
}

export default SendfraindRequest
