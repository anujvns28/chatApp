import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { dismissUserGroupAdmin, existFromGroup, makeUserGroupAdmin } from '../../../service/operations/group';



const GroupMembers = ({ member, groupInfo, setUserInof,fetchGroupInformation }) => {
    const { user } = useSelector((state) => state.user);
    const [openModal,setOpenModal] = useState(false);
    const [admin,setAdmin] = useState();
    const modalRef = useRef();
    const adminArray = []

    const handleAdmin = () => {
        console.log("calling...")
        groupInfo.data.admin.map((mem) => {
        adminArray.push(mem._id)
        })
        setAdmin(adminArray)
    }

    // opeing user info conainer
    const handleClick = (data) => {
        setUserInof(data);
    }

    const handleRemoveUser = async(userId) => { 
        await existFromGroup({userId:userId,groupId:groupInfo.data._id});
        fetchGroupInformation()
    }

    const handleMakeAdmin = async(userId) => {
        await makeUserGroupAdmin({userId:userId,groupId:groupInfo.data._id});
        fetchGroupInformation()
    }

    const handleDismissAdmin = async(userId) => {
        await dismissUserGroupAdmin({userId:userId,groupId:groupInfo.data._id});
        fetchGroupInformation()
    }

    window.addEventListener("click", (e) => {
        if(e.target !== modalRef.current){
         setOpenModal(false);
        }else{
            return 
        }
    })

    useEffect(() => {
        handleAdmin();
    },[groupInfo])

    

    return (
       <div>
        {
            admin &&
            <div className='flex relative flex-row items-center justify-between py-2 cursor-pointer px-2 hover:bg-slate-500'>
            <div onClick={() => handleClick(member)}
            className='flex flex-row gap-3 items-center  w-[80%] '>
                <img
                    src={member.image}
                    className='w-[50px] h-[50px] rounded-full'
                />
                <p>{member.name}</p>
            </div>

            {
                admin.includes(member._id) &&
                <div className='border border-black w-fit rounded-md p-1 text-xs text-white'>
                    Admin
                </div>
            }

            {
                admin.includes(user._id) && 
                <p className={`relative ${user._id === member._id ? "invisible" : "visible"}`}
                onClick={ () => setOpenModal(true)} ref={modalRef}>
                    <PiDotsThreeOutlineVerticalFill pointerEvents="none"/>
                </p>
            }

            {
                openModal && 
                <div className='absolute right-8 top-12 flex flex-col rounded-md p-3 z-50 bg-slate-400'>
                <div onClick={ () => handleRemoveUser(member._id)}
                className='p-2 rounded-md flex items-center hover:bg-slate-500'>Remove</div>
                {
                    admin.includes(member._id) 
                    ? <div onClick={() => handleDismissAdmin(member._id)}
                    className='p-2 rounded-md flex items-center hover:bg-slate-500'>Dismiss as Admin</div>
                    : <div onClick={() => handleMakeAdmin(member._id)}
                    className='p-2 rounded-md flex items-center hover:bg-slate-500'>Make Admin</div>
                }

            </div>
            }

        </div>
        }
       </div>
    )
}

export default GroupMembers
