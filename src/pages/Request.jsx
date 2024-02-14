import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import Login  from "./Login"
import SubmmitButton from '../componetns/common/SubmmitButton';
import { acceptRequest, fetchAcceptRequestData } from '../service/operations/user';
import chatImg from "../assets/chatImage.png"


const Request = () => {
  const {token} = useSelector((state) => state.user);
  const {user} = useSelector((state) => state.user);
  const [userId,setUserId] = useState();
  const [senderData,setSenderData] = useState();
  const navigate = useNavigate();
  const params = useParams()
  const dispatch = useDispatch();
  
  
  const isUser = async() =>{
    
    if(user){
      setUserId(user._id) 
    const data = await fetchAcceptRequestData(params.token)
    setSenderData(data.data.data)
    }
  }


  const accRequest = () => {
    const data = {
      userId : userId,
      token :  params.token
    }
   const result =  acceptRequest(data,navigate,dispatch)
  }

  useEffect(() =>{
  isUser()
  },[user])

  

  return (
    <div className='overflow-hidden h-screen flex items-center justify-center '>
     {
      token ? 
      <div className=' flex flex-col  w-[25%] items-center justify-center  min-w-[340px] border border-black rounded-md py-5'>
         <div className='flex w-full items-center justify-center'>
      <img className='w-[200px]  h-[200px] flex items-center justify-center ' src={chatImg}/>
      </div>
      <div className='w-full flex items-start px-4'><p className='text-start'>User Information</p></div>
      {
        senderData ? 
        <div className='flex w-[90%] flex-row gap-3 items-center justify-center border border-black rounded-md'>
          <img className='w-[100px] rounded-full h-[100px] flex items-center justify-center ' src={senderData.image}/>
         <div>
         <p className='text-xl font-semibold'>{senderData.name}</p>
         <p>{senderData.email}</p>
         </div>
        </div> 
        : "loading..."
      }

     
      <p className='text-2xl text- font-semibold text-center py-1'>Let'sChat.com</p>
        <SubmmitButton text={"Accept"} handleTask={accRequest} />
      </div> 
      : <div><Login/></div>
     }
    </div>
  )
}

export default Request
