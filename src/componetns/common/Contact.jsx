import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom'
import { setCurrentChat } from '../../slice/currentChat';

const Contact = ({ userData ,socket}) => {
  const {user} = useSelector((state) => state.user);
  const {chat} = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const [notification,setNotification] = useState([]);

  const [resentMsz,setResentMsz] = useState();
 
  let notiArray = [];
  

  
  socket.on("msg-recive", (data) => {
   
    if(data.senderId !== user._id ){
      if(data.senderId ===  userData._id && typeof(data.chatId) === "string"){      
          notiArray = [...notification]
          notiArray.push(data);
          setNotification(notiArray);
          setResentMsz(data)
        }
      
      }    
  })

 // console.log(userData)

  const  handleChat = ()  =>{
    dispatch(setCurrentChat(userData))
    setNotification([])
    notiArray = []
  }
  
  console.log("rendering contact compone")


  useEffect(() => {
   if(chat && resentMsz){
   if(chat._id === resentMsz.senderId){
    setNotification([])
    notiArray = []
   }
   }
  },[resentMsz])

  return (
    <div onClick={handleChat}
      className='border border-black w-full flex flex-row justify-between p-2 cursor-pointer'>
      {
        !userData.isGroup ?
          
            <div
              className='flex flex-row justify-between w-full  '>
              <div className='flex flex-row gap-3'>
              <div>
                <img className='w-[50px] h-[50px] rounded-full'
                  src={userData.image} />
              </div>
              <div className='flex flex-col gap-1 pt-y'>
                <p>{userData.name}</p>
                <p>{userData.email}</p>
              </div>
              </div>
             {
              notification.length > 0 && <div>
                {  
              <div className='h-full flex  items-center'>
               {
                chat ? notification[0].senderId !== chat._id ? <div className='w-[20px] items-center justify-center flex h-[20px] rounded-full bg-green-700 text-white'>
                { notification.length}
               </div> : ''
                 : 
                <div className='w-[20px] items-center justify-center flex h-[20px] rounded-full bg-green-700 text-white'>
                { notification.length}
               </div>
               }
              </div>
             }
              </div>
             }
            </div>
  
          : <div>
           
            <div
              className='flex flex-row justify-between '>
              <div className='flex flex-row gap-3 '>
              <div>
                <img className='w-[50px] h-[50px] rounded-full'
                  src={userData.groupImg} />
              </div>
              <div className='flex flex-col gap-1 pt-y'>
                <p>{userData.groupName}</p>
                <p>Group</p>
              </div>
              </div>
              

            </div>
          </div>
          
      }
    </div>
  )
}

export default Contact
