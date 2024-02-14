import React from 'react'
import { FaArrowLeft } from "react-icons/fa6";
import { MdMessage } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { RxExit } from "react-icons/rx";
import { MdBlock } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChat } from '../../../slice/currentChat';

const ChatUserInfo = ({ setUserInof, userData , setGroupInfo}) => {
  const {user} = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setCurrentChat(userData))
    setUserInof(false)
    setGroupInfo(false)
  }

  return (
    <div className='w-full h-full border border-black flex items-center justify-center transition-all '>
      {
        !userData ?
          <p>loading...</p>
          : <div className='w-full h-full bg-slate-700 overflow-y-auto'>
            <div className='w-full h-[110px] bg-slate-400 flex  items-end justify-start py-4 '>
              <div className='flex flex-row gap-6 items-center justify-start  w-full pl-6 text-slate-100'>
                <p onClick={() => setUserInof(false)}
                  className='text-xl cursor-pointer'><FaArrowLeft /></p>
                <p className='text-xl font-semibold'>Chat informmation</p>
              </div>
            </div>
            {/* image */}
            <div className='flex items-center justify-center py-7 flex-col '>
              <img
                src={userData.image}
                className='w-[200px] h-[200px] rounded-full'
              />
              <p className='text-xl text-white'>{userData.name}</p>
              <p className=' text-white'>{userData.email}</p>

             {
              user._id !== userData._id &&
              <div className='flex flex-col items-center justify-center gap-1 text-green-600 pt-2'>
              <p onClick={handleClick}
              className='text-xl p-3 cursor-pointer rounded-full hover:bg-slate-500'><MdMessage /></p>
              <p>Message</p>
            </div>
             }
            </div>
            <div className='flex flex-col gap-2 px-4'>
              <p className='text-green-300'>About</p>
              <p className='text-xl text-white'>{userData.about ? userData.about : "User is not set About !!"}</p>
            </div>

            <div className='flex flex-col   my-6'>
              <div className='cursor-pointer flex items-center justify-start  flex-row gap-4  hover:bg-slate-300 text-red-500 py-3 px-5'>
                <p className='text-xl font-semibold '>{<MdBlock />}</p>
                <p className='text-lg'>Block {userData.name}</p>
              </div>
              <div className='cursor-pointer flex items-center justify-start  flex-row gap-4  hover:bg-slate-300 text-red-500 py-3 px-5'>
                <p className='text-xl font-semibold '><MdDelete /></p>
                <p className='text-lg'>{userData.name}</p>
              </div>
            </div>
          </div>
      }
    </div>
  )
}

export default ChatUserInfo
