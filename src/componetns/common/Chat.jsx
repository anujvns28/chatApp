import React, { useEffect, useRef, useState } from 'react'
import { IoVideocam } from "react-icons/io5";
import { IoSearchSharp } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux'
import SubmmitButton from './SubmmitButton';
import EmojiPicker from 'emoji-picker-react';
import { BsEmojiGrin } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import ChatInfo from '../core/chat/ChatInfo';
import { fetchGroupMsz, fetchOneToOneMsz, sendGroupMsz, sendOnetoOneMsz } from '../../service/operations/chat';
import { fetchUserInformaion } from '../../service/operations/user';




const Chat = ({socket,setNotiLength }) => {
  const { chat } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const [time, setTime] = useState(true);

  const [msz, setMsz] = useState("");
  const [showEmoji, setShowemoji] = useState()
  const [emoji, setEmoji] = useState('');
  const [userData, setUserData] = useState();
  const [chats, setChats] = useState();
  const [showMess, setshoMess] = useState(false);
  const [socketMess, setSocketMess] = useState();
  const [chatInfo, setChatInof] = useState(false);
  const [blockedUser, setBlockedUser] = useState([]);
  const [chatFeture, setChatFeture] = useState(false);
  const dispatch = useDispatch();
  const chatFetureRef = useRef();
  const scrollRef = useRef();

  // handle emoji
  const handleEmoji = (event) => {
    setEmoji(event.emoji)
  }

  let groupMember
  if (chat) {
    if (chat.isGroup) {
      groupMember = [...chat.members]
      groupMember.push(chat._id)
    }
  }


  window.addEventListener("click", (e) => {
    if (e.target !== chatFetureRef.current) {
      setChatFeture(false)
    } else {
      return
    }
  })

  const fetchUserData = async () => {
    const userInformation = await fetchUserInformaion(user._id, dispatch);
    if (userInformation) {
      setUserData(userInformation.data.data)
      let blockUser = [];
      userInformation.data.data.block.map((user) => blockUser.push(user.user));
      setBlockedUser(blockUser);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, [chat])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  // fatchig chats
  const fetchChat = async () => {
    console.log("fetching chat... ji  s")
    if (chat) {
      const data = {
        chat: !chat.isGroup ? chat._id : chat._id,
        userId: user._id
      }

      // group chat
      if (chat.isGroup) {
        const result = await fetchGroupMsz(data);
        if (result) {
          setChats(result.data.chats)
        }
      } else {
        const result = await fetchOneToOneMsz(data);
        if (result) {
          setChats(result.data.chats)
        }
      }
    }
  }

  useEffect(() => {
    fetchChat()
  }, [chat, showMess])


  // send message
  const handleSubmit = async (e) => {
    e.preventDefault();
    // send msz => group
    if (chat.isGroup) {
      const data = {
        msz: msz,
        groupMem: groupMember,
        userId: user._id,
        groupId : chat._id
      }
      await sendGroupMsz(data)
    }

    // send msz => one to one
    if (!chat.isGroup) {
      const data = {
        msz: msz,
        chatId: chat._id,
        userId: user._id
      }
      await sendOnetoOneMsz(data)
    }

    // socket 
    let socketGroupData
    if (chat.isGroup) {
      socketGroupData = {
        members: [...chat.members],
        groupId: chat._id
      }
    }
    const socketData = {
      msz: msz,
      chatId: chat.isGroup ? socketGroupData : chat._id,
      senderId: user._id
    }
    socket.emit("msz", socketData)

    setMsz("")
    setshoMess((prev) => !prev)
  }

  
   if(chats){
    socket.on("msg-recive", (data) => {
      setSocketMess(data);
    })
   }
  

  const fetchMszIo = () => {
    if (socketMess) {
      if (!chat.isGroup && socketMess.chatId.groupId === undefined) {
        if (socketMess.chatId === chat._id || socketMess.senderId === chat._id) {
          const messages = [...chats]
          messages.push(socketMess)
          setChats(messages)
        }
      } else {
        if (socketMess.chatId.groupId === chat._id) {
          const messages = [...chats]
          messages.push(socketMess)
          setChats(messages)
        }
      }
    }
  }

  useEffect(() => {
    fetchMszIo();
  }, [socketMess])


  useEffect(() => {
    let message = msz
    message = message + emoji
    setMsz(message)
  }, [emoji])



  return (
    <div className='w-full h-full '>

      {
        !chat ? <div
          className='h-full w-full flex items-center justify-center text-xl font-semibold'>You Have not Seleced any chat</div>
          : <div className='w-full h-full flex '>
            <div className={`${chatInfo ? "w-[60%]" : "w-full"}  border h-full  border-black flex flex-col gap-1`}>
              <div
                className='h-[70px] w-full mb-2 bg-slate-200 flex flex-row justify-between p-2 '>
                <div onClick={() => setChatInof(true)}
                  className='flex flex-row gap-2 w-[80%] cursor-pointer'>
                  <div>
                    <img className='w-[50px] h-[50px] rounded-full'
                      src={!chat.isGroup ? chat.image : chat.groupImg}
                    />

                  </div>
                  <div className='flex flex-col gap-2  justify-center'>
                    <p className=''>{!chat.isGroup ? chat.name : chat.groupName}</p>
                    
                  </div>

                </div>

                <div className='flex flex-row gap-7 items-center justify-center text-xl px-3'>
                  <p className='cursor-pointer'><IoVideocam /></p>
                  <p className='cursor-pointer'><IoSearchSharp /></p>
                  <p ref={chatFetureRef}
                    onClick={() => setChatFeture(true)}
                    className='cursor-pointer relative'><BsThreeDotsVertical pointerEvents="none" /></p>
                  {
                    chatFeture && <div className=' top-[10%]  z-50 absolute w-[130px] py-3 px-2 cursor-pointer bg-slate-400 rounded-md flex flex-col  text-sm'>
                      <p onClick={() => setChatInof(true)}
                        className='flex px-2 py-1 hover:bg-slate-500 rounded-md'>Chat info</p>
                      {/* add fetures */}
                    </div>
                  }
                </div>
              </div>

              <div className='h-[88%] w-full  flex flex-col justify-between  '>
                {/* chats */}
                {
                  chat.isGroup ?
                    <div className='w-full  h-[87%] overflow-auto  sticky top-3'>
                      {
                        !chats ? <div className='flex h-full items-center justify-center font-semibold text-xl'>
                          <p>loading...</p>
                        </div>
                          : <div className='flex flex-col gap-4'>
                            {
                              chats.map((item, index) => {
                                return <div ref={scrollRef}
                                  key={index}
                                  className={`scrollbar-h-* scrollbar scrollbar-track-gray-100 text-black px-2 w-full flex ${item.senderId._id == user._id ? "justify-end" : "justify-start"}`}>
                                  <div className='flex flex-row gap-2 max-w-[70%]'>
                                    {item.senderId._id != user._id &&  <p><img className=' rounded-full w-[30px] h-[30px]'
                                      src={item.senderId.image} />
                                    </p>}
                                 
                                    <div className={`${item.senderId._id === user._id ? "bg-green-500 w-fit  text-black" : "bg-slate-800 w-fit "}
                              p-2 rounded-md w-full`}>
                                      {item.senderId._id != user._id && <p className='text-green-500 w-full'>{item.senderId.name}</p>}
                                      <p className={`${item.senderId._id === user._id ? "bg-green-500 w-fit  text-black" : " w-fit items-center flex text-white"}
                               rounded-md max-w-[90%] leading-tight `}>
                                        {item.msz}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              })
                            }
                          </div>
                      }
                    </div>

                    : <div className='w-full  h-[87%] overflow-auto  sticky top-3'>
                      {
                        !chats ? <div className='flex h-full items-center justify-center font-semibold text-xl'>
                          <p>loading...</p>
                        </div>
                          : <div className='flex flex-col gap-4'>
                            {
                              chats.map((item, index) => {
                                return <div ref={scrollRef}
                                  key={index}
                                  className={`scrollbar-h-* scrollbar  scrollbar-track-gray-100 text-black px-2 w-full flex ${item.senderId == user._id ? "justify-end" : "justify-start"}`}>
                                  <p className={`${item.senderId === user._id ? "bg-green-500 w-fit  text-black" : "bg-slate-500 w-fit items-center flex"}
                            p-2 rounded-md max-w-[70%]`}>
                                    {item.msz}
                                  </p>

                                </div>
                              })
                            }
                          </div>
                      }
                    </div>
                }

                {/* inputs */}
                {
                  !chat.isGroup ?
                    !blockedUser.includes(chat._id) ?
                      <div className='h-[60px]  w-full  bg-slate-200 flex flex-row justify-between p-2'>
                        <form onSubmit={handleSubmit}
                          className='w-full flex flex-row gap-2 relative'>
                          <div className='flex w-full border border-black rounded-md'>

                            <div className='flex h-full items-center justify-center text-2xl
                    font-semibold px-3 rounded-l-md bg-white'>
                              <p onClick={() => setShowemoji(!showEmoji)}
                                className='cursor-pointer'>{showEmoji ? <RxCross1 /> : <BsEmojiGrin />}</p>
                            </div >

                            <input
                              required
                              placeholder='Type a message'
                              onChange={(e) => setMsz(e.target.value)}
                              value={msz}
                              className='w-full  outline-none p-2 rounded-r-md text-xl  placeholder'
                            />
                          </div>
                          <button>
                            <SubmmitButton text={"Send"} />
                          </button>

                          <div
                            className={`${showEmoji ? "visible " : "invisible"} absolute -top-[480px] left-6`}>
                            <EmojiPicker onEmojiClick={handleEmoji}  />
                          </div>
                        </form>
                      </div>
                      : <div className='h-[60px]  w-full  bg-slate-200 flex flex-row justify-center items-center p-2'>
                        <p>You can not send message to block contact</p>
                      </div>

                    : <div className='h-[60px]  w-full  bg-slate-200 flex flex-row justify-between p-2'>
                      <form onSubmit={handleSubmit}
                        className='w-full flex flex-row gap-2 relative'>
                        <div className='flex w-full border border-black rounded-md'>

                          <div className='flex h-full items-center justify-center text-2xl
                  font-semibold px-3 rounded-l-md bg-white'>
                            <p onClick={() => setShowemoji(!showEmoji)}
                              className='cursor-pointer'>{showEmoji ? <RxCross1 /> : <BsEmojiGrin />}</p>
                          </div >

                          <input
                            required
                            placeholder='Type a message'
                            onChange={(e) => setMsz(e.target.value)}
                            value={msz}
                            className='w-full  outline-none p-2 rounded-r-md text-xl  placeholder'
                          />
                        </div>
                        <button>
                          <SubmmitButton text={"Send"} />
                        </button>

                        <div
                          className={`${showEmoji ? "visible " : "invisible"} absolute -top-[480px] left-6`}>
                          <EmojiPicker onEmojiClick={handleEmoji} />
                        </div>
                      </form>
                    </div>
                }

              </div>
            </div>

            {/* chat info */}
            {
              chatInfo &&
              <div className='w-[40%] min-w-[280px] h-full  px-2'>
                <ChatInfo
                  setChatInof={setChatInof}
                  fetchUserData={fetchUserData}
                />
              </div>
            }

          </div>
      }
    </div>
  )
}

export default Chat
