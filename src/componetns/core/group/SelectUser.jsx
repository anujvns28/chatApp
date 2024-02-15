import React, { useEffect, useState } from 'react'
import { fetchAllUser } from '../../../service/operations/user';
import { useSelector } from 'react-redux';
import { RxCross1 } from 'react-icons/rx';
import { ImCheckboxUnchecked } from "react-icons/im";
import { ImCheckboxChecked } from "react-icons/im";
import {SubmmitButton} from "../../common/SubmmitButton"
import { addUsersInGroup } from '../../../service/operations/group';
import { toast } from 'react-toastify';

const SelectUser = ({setSelectUser,groupInfo,fetchGroupInformation}) => {
    const [allContact, setAllContact] = useState();
    const [selectedUser,setSelectedUser] = useState([]);
    const members = [];

    const { user } = useSelector((state) => state.user);

    const fetchingAllUser = async () => {
        const result = await fetchAllUser(user._id);
        if (result) {
            setAllContact(result.data.data);
        }
    }

    const handleMember = (person) => {
        let mem = [...selectedUser]
        const index = mem.findIndex((item) => item == person._id)
        if (index < 0) {
          mem.push(person._id)
        }
        else {
          mem.splice(index,1)
          setSelectedUser(mem)
        }
        setSelectedUser(mem)
      }

      groupInfo.members.map((user) => members.push(user._id))

      const handleAddUser = async() => {
        if(selectedUser.length <=  0){
            toast.error("you not select any usr")
            return
        }else{
            await addUsersInGroup({userId:user._id,groupId:groupInfo._id,members:selectedUser})
            setSelectUser(false)
            fetchGroupInformation()
        }
      }

    useEffect(() => {
        fetchingAllUser();
    }, [])

    console.log(members,"ljkdfalj")
  return (
    <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
            <div className='w-[35%] flex-col min-w-[340px] border border-black  flex items-center justify-center transition-all p-4'>
                {
                    !allContact ?
                        <p>loading...</p>
                        : <div className='w-full h-full bg-slate-300 p-4'>
                            <div className='flex w-full justify-end'>
                                <p onClick={() => setSelectUser(false)}
                                    className='text-xl font-semibold p-2 cursor-pointer'><RxCross1 /></p>
                            </div>

                           <div className='flex flex-col  justify-center gap-2 p-2'>
                           {
                                allContact.allUser.map((userData,index) => {
                                    return <div key={index}>
                                     {
                                        members.includes(userData._id) ?
                                        <div className='opacity-50 flex flex-row gap-3 border border-black items-center p-2'>
                                     

                                        <div className='flex flex-row gap-3'>
                                        <div>
                                            <img className='w-[50px] h-[50px] rounded-full'
                                                src={userData.image} />
                                        </div>
                                        <div className='flex flex-col justify-center'>
                                            <p>{userData.name}</p>
                                            
                                        </div>
                                        </div>

                                     </div>

                                     : <div onClick={() => handleMember(userData)}
                                     className='cursor-pointer flex flex-row gap-3 border border-black items-center p-2'>
                                     <div className='text-xl '>
                                        {!selectedUser.includes(userData._id) ? <ImCheckboxUnchecked/> : <ImCheckboxChecked/>}
                                       </div>

                                        <div className='flex flex-row gap-3'>
                                        <div>
                                            <img className='w-[50px] h-[50px] rounded-full'
                                                src={userData.image} />
                                        </div>
                                        <div className='flex flex-col items-center justify-center'>
                                            <p>{userData.name}</p>
                                            
                                        </div>
                                        </div>

                                     </div>
                                     }
                                    </div>
                                })
                            }
                           </div>
                        </div>
                }
               <button
        onClick={handleAddUser}
        className="mt-6 rounded-[8px] w-full bg-yellow-400 hover:bg-yellow-500 py-[8px] px-[12px] font-medium text-richblack-900"
      >
        Add Members
      </button>
            </div>
        </div>
  )
}

export default SelectUser
