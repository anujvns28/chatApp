import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaArrowLeft } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { RxExit } from "react-icons/rx";
import { MdBlock } from "react-icons/md";
import { existFromGroup, fetchCommonGroup, fetchGroupInfo } from '../../../service/operations/group';
import { blockContact, deletContact, unblockContact } from '../../../service/operations/user';
import { MdPersonAdd } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { setCurrentChat } from '../../../slice/currentChat';
import Modal from '../../common/Modal';
import GroupMembers from '../group/GroupMembers';
import SelectUser from '../group/SelectUser';
import ChangeImg from '../common/ChangeImg';
import EditGroupInfo from '../group/EditGroupInfo';
import ChatUserInfo from './ChatUserInfo';


const ChatInfo = ({
    setChatInof,
}) => {
    const { user } = useSelector((state) => state.user);
    const { chat } = useSelector((state) => state.chat);
    const [groupInfo, setGroupInfo] = useState();
    const [userInfo, setUserInof] = useState();
    const [commonGroup, setCommonGroup] = useState();
    const [modalData, setModalData] = useState();
    const [isYouBlocked, setIsYouBlocked] = useState(false);
    const [isBlockedByYou, setIsBlockedByYou] = useState(false);
    const [selectUser, setSelectUser] = useState(false);
    const [editGroupInfo, setEditGroupInfo] = useState(false);
    const [editGroupImg, setEditGroupImg] = useState(false);
    const [admins, setAdmins] = useState([]);

    const dispatch = useDispatch();
    
    
    const checkBlockStatus = () => {
        console.log("calling chae block")
        setIsBlockedByYou(false);
        setIsYouBlocked(false)
        user.block.map((user) => {
            if (user.user == chat._id && user.isYouBlock == true) {
                setIsYouBlocked(true)
            }
            else if (user.user == chat._id && user.isYouBlock == false) {
                setIsBlockedByYou(true)
            }
        })
    }

    const fetchGroupInformation = async () => {
        const result = await fetchGroupInfo(chat._id);
        if (result) {
            setGroupInfo(result.data);
            const adminArray = []
            result.data.data.admin.map((mem) => {
                adminArray.push(mem._id)
            })
            setAdmins(adminArray)

        }
    }

    const handleCommonGroup = async () => {
        const commonGroupArray = [];
        user.group.map((group) => {
            if(group.members.includes(chat._id)){
                commonGroupArray.push(group)
            }
        })
        setCommonGroup(commonGroupArray);
    }


    // deleting user
    const handleDeleteUser = async () => {
        await deletContact({ userId: user._id, chatId: chat._id },dispatch);
        setChatInof(false)
        setModalData(null)
        dispatch(setCurrentChat(null))
    }

    // exist group
    const handleExistGroup = async () => {
        await existFromGroup({ userId: user._id, groupId: chat._id },dispatch);
        setModalData(null)
        dispatch(setCurrentChat(null))
    }

    // exist groupp modal
    const handleExistGroupModal = () => {
        const modal = {
            text1: "After existing you can not send or recive message",
            text2: chat.groupName,
            btn1: "Cancel",
            btn2: "Exist",
            handler1: () => setModalData(null),
            handler2: () => handleExistGroup()
        }
        setModalData(modal);
    }

    const handleDeletModal = () => {
        const modal = {
            text1: "Delet this user",
            text2: chat.name,
            btn1: "Cancel",
            btn2: "Delete",
            handler1: () => setModalData(null),
            handler2: () => handleDeleteUser()
        }
        setModalData(modal);
    }


    useEffect(() => {
        if (chat.isGroup) {
            fetchGroupInformation();
        }
        checkBlockStatus();
        handleCommonGroup();
    }, [chat._id])

    const handleBlock = async () => {
        const data = {
            userId: user._id,
            chatId: chat._id
        }
        await blockContact(data,dispatch)
        setModalData(null)
        setChatInof(false)
    }

    const handleBlockModal = async () => {
        const modal = {
            text1: "User won't be able to message or call you anymore",
            text2: chat.name,
            btn1: "Cancel",
            btn2: "Block",
            handler1: () => setModalData(null),
            handler2: () => handleBlock()
        }
        setModalData(modal);
        
    }

    const handleUnblock = async () => {
        const data = {
            userId: user._id,
            chatId: chat._id
        }
        await unblockContact(data,dispatch)
        setModalData(null)
        setChatInof(false)
    }

    const handleUnBlockModal = async () => {
        const modal = {
            text1: "Unblock",
            text2: chat.name,
            btn1: "Cancel",
            btn2: "Unblock",
            handler1: () => setModalData(null),
            handler2: () => handleUnblock()
        }
        setModalData(modal);
    }

    //edit group info
    const handleEditGroupInfo = (text, type, placeHolder, inputName) => {
        const data = {
            text: text,
            inputType: type,
            placeHolder: placeHolder,
            inputName: inputName
        }

        setEditGroupInfo(data);
    }

    useEffect(() => {
        checkBlockStatus();
    }, []);




    return (
        <div className='w-full h-full border bg-slate-700 border-black flex items-center p-1 justify-center transition-all '>
           {
                !chat ?
                    <p>loading...</p>
                    : <div className={`${userInfo ? "w-[0px] " : "w-full"} h-full flex flex-col  overflow-y-auto pb-10`}>
                        <div className='w-full h-[70px] mb-1 bg-slate-300 flex  items-end justify-start py-4 '>
                            <div className='flex flex-row gap-6 items-center justify-start  w-full pl-6 text-slate-100'>
                                <p onClick={() => setChatInof(false)}
                                    className='text-xl cursor-pointer'><FaArrowLeft /></p>
                                <p className='text-xl font-semibold'>Chat inoformation</p>
                            </div>
                        </div>

                        { /* image */}
                        <div className='flex items-center justify-center py-7 flex-col  border border-green-300'>
                            {
                                chat.isGroup ?
                                    <img onClick={() => setEditGroupImg(true)}
                                        src={chat.isGroup ? chat.groupImg : chat.image}
                                        className='w-[200px] h-[200px] rounded-full cursor-pointer'
                                    />
                                    : <img
                                        src={chat.isGroup ? chat.groupImg : chat.image}
                                        className='w-[200px] h-[200px] rounded-full'
                                    />
                            }
                            {editGroupImg && <ChangeImg imgUrl={chat.groupImg}
                                setEditProfileImg={setEditGroupImg}
                                admins={admins}
                            />}

                            <div className='flex flex-row gap-3 items-center'>
                                <p className='text-2xl font-semibold text-white'>{chat.isGroup ? chat.groupName : chat.name}</p>
                                {
                                    chat.isGroup && <div>
                                {
                                    admins.includes(user._id) &&
                                    <p onClick={() => handleEditGroupInfo(
                                        "Edit Group Name",
                                        "text"
                                        , "Enter Group Name",
                                        "groupName"
                                    )}
                                        className='text-2xl font-semibold text-white cursor-pointer'><MdEdit />
                                    </p>
                                }
                                    </div>
                                }
                            </div>
                            <p className='text-xl text-white'>{chat.isGroup ? `Group : ${chat.members.length}` : chat.email}</p>
                        </div>

                        <div className='w-full mt-2  p-6 border border-green-300'>
                            <p className='text-green-300'>About</p>
                            <div className='flex flex-row gap-3 items-center justify-between'>
                                {!chat.isGroup && <p className='text-xl text-white'>{chat.about ? chat.about : "You are not set About !!"}</p>}
                                {chat.isGroup && <p className='text-xl text-white'>{chat.groupDesc ? chat.groupDesc : "Group description not set yet!!"}</p>}
                               {
                                chat.isGroup && <div>
                                     {
                                    admins.includes(user._id) &&
                                    <p onClick={() => handleEditGroupInfo(
                                        "Edit Group Disprection",
                                        "text",
                                        "Enter Group Description",
                                        "groupDes"
                                    )}
                                        className='text-2xl font-semibold text-white cursor-pointer'><MdEdit />
                                    </p>
                                }
                                </div>
                               }
                            </div>

                        </div>
                        {/* common group */}
                        {
                            !chat.isGroup &&
                            <div className='border-green-300 border mt-2'>
                            {
                                commonGroup &&
                                <div>
                                    {
                                    commonGroup.length > 0 &&
                                    <div >
                                        <p className='px-4 py-2 text-white'>{commonGroup.length} Common group </p>
                                        {
                                              user.group.map((group,index) => {
                                                return  group.members.includes(chat._id)  && <div key={index} onClick={() => dispatch(setCurrentChat(group))}
                                                    className='flex flex-row items-center justify-between py-2 cursor-pointer px-5 hover:bg-slate-500'>
                                                    <div className='flex flex-row gap-3 items-center justify-start '>
                                                        <img
                                                            src={group.groupImg}
                                                            className='w-[50px] h-[50px] rounded-full'
                                                        />
                                                        <p className='text-xl text-white'>{group.groupName}</p>
                                                    </div>
                                                </div>
                                            })
                                        }
                                    </div>
                                }
                                </div>
                            }
                            </div>
                        }

                        {
                            chat.isGroup &&
                            <div className='w-full border  p-3 mt-3 border-green-300'>

                                <div onClick={() => setSelectUser(true)}
                                    className='flex flex-row gap-3  items-center py-3 cursor-pointer px-5 hover:bg-slate-500'>
                                    <p className='text-xl rounded-full p-2 text-white bg-green-500'><MdPersonAdd /></p>
                                    <p className='text-white'>Add Member</p>
                                </div>
                                {
                                    groupInfo &&
                                    groupInfo.data.members.map((member,index) => {
                                        return <div key={index} onClick={() => setUserInof(member)}> 
                                            <GroupMembers
                                                member={member}
                                                chat={chat}
                                                setUserInof={setUserInof}
                                                groupInfo={groupInfo}
                                                fetchGroupInformation = {fetchGroupInformation}
                                            />
                                        </div>
                                    })
                                }

                            </div>
                        }

                        <div className='w-full mt-2  border border-green-300'>
                            {
                                chat.isGroup ?
                                    <div onClick={handleExistGroupModal}
                                        className='cursor-pointer flex items-center justify-start  flex-row gap-4  hover:bg-slate-300 text-red-500 py-3 px-5'>
                                        <p className='text-xl font-semibold '>{<RxExit />}</p>
                                        <p className='text-lg'>Exit Group</p>
                                    </div>

                                    : <div>
                                        {
                                            isYouBlocked &&
                                            <div onClick={handleUnBlockModal}
                                                className='cursor-pointer flex items-center justify-start  flex-row gap-4  bg-green-400 hover:bg-green-500 text-red-500 py-3 px-5'>
                                                <p className='text-xl font-semibold '>{<MdBlock />}</p>
                                                <p className='text-lg'>UnBlock {chat.name}</p>
                                            </div>
                                        }

                                        {
                                            isBlockedByYou &&
                                            <div
                                                className=' flex items-center justify-start  flex-row gap-4 hover:bg-slate-300 text-red-500 py-3 px-5'>
                                                <p className='text-xl font-semibold '>{<MdBlock />}</p>
                                                <p className='text-lg'>You are blocked by user</p>
                                            </div>
                                        }

                                        {
                                            !isBlockedByYou && !isYouBlocked &&
                                            <div onClick={handleBlockModal}
                                                className='cursor-pointer flex items-center justify-start  flex-row gap-4 hover:bg-slate-300 text-red-500 py-3 px-5'>
                                                <p className='text-xl font-semibold '>{<MdBlock />}</p>
                                                <p className='text-lg'>Block {chat.name}</p>
                                            </div>
                                        }
                                    </div>

                            }
                            {
                                !chat.isGroup && <div onClick={handleDeletModal}
                                    className='cursor-pointer flex items-center justify-start  flex-row gap-4  hover:bg-slate-300 text-red-500 py-3 px-5'>
                                    <p className='text-xl font-semibold '><MdDelete /></p>
                                    <p className='text-lg'> {chat.name}</p>
                                </div>
                            }
                        </div>
                    </div>
            }
            {
                userInfo && <ChatUserInfo
                 setUserInof={setUserInof} 
                 userData={userInfo} 
                 setGroupInfo={setGroupInfo} 
                 />
            }
           
            {
                modalData && <Modal modalData={modalData} />
            }
            {
                selectUser && <SelectUser 
                setSelectUser={setSelectUser} 
                groupInfo={groupInfo.data} 
                fetchGroupInformation ={fetchGroupInformation}
                />
            }
            {
                editGroupInfo &&
                <EditGroupInfo
                    editGroupInfo={editGroupInfo}
                    setEditGroupInfo={setEditGroupInfo}
                    groupId={chat._id}
                />
            } 
        </div>
    )
}

export default ChatInfo
