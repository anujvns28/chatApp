import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchAllUser, fetchUserRequest } from '../../../service/operations/user';
import { FaArrowLeft } from 'react-icons/fa6';
import SubmmitButton from '../../common/SubmmitButton';
import { useNavigate } from 'react-router-dom';

const Request = ({setRequests}) => {
    const { user } = useSelector((state) => state.user);
    const [request, setRequest] = useState();
    const [allContact,setAllContact] = useState();
    const [allUser,setAllUser] = useState([]);
    const navigate = useNavigate();
    const existingContact = []

    
    const fetchingAllUser = async () => {
        const result = await fetchAllUser(user._id);
        if (result) {
            result.data.data.allUser.map((con) => existingContact.push(con._id));
            setAllContact(existingContact)
        }
    }


    const handleFetchRequest = async () => {
        console.log("comming")
        const result = await fetchUserRequest({ userId: user._id });
        if (result) {
            console.log(result.data.data);
            setRequest(result.data.data);
        }

    }

    const handleNavigate = (user) => {
        navigate(`/request/${user.token}`)
    }

    useEffect(() => {
        fetchingAllUser()
        handleFetchRequest();
    },[])

    
    return (
        <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
            <div className='w-[60%] h-auto bg-slate-400 min-h-[40%] min-w-[300px]'>
                <div className='w-full h-[70px] bg-slate-300 flex  items-end justify-start py-4 '>
                    <div className='flex flex-row gap-6 items-center justify-start  w-full pl-6 text-slate-100'>
                        <p onClick={() => setRequests(false)}
                            className='text-xl cursor-pointer'><FaArrowLeft /></p>
                        <p className='text-xl font-semibold'>All Request</p>
                    </div>
                </div>

                <div className='flex flex-col gap-2 p-2 '>
                  {
                    request ? 
                    <div className='flex h-full py-4 flex-col gap-2 items-center justify-center'>
                        {
                            allContact &&
                            request.map((user,index) => {
                                return !allContact.includes(user._id) && <div key={index} className='flex items-center min-w-[320px] w-[30%] justify-between border border-black p-1'>
                                <div  className='flex flex-row gap-2'>
                                   <img className='h-[60px] w-[60px] rounded-full' src={user.image} />
                                   <div className='flex flex-col gap-1'>
                                   <p>{user.name}</p>
                                   <p>{user.email}</p>
                                   </div>
                                </div>
                               <SubmmitButton text={"Check"} handleTask={ () => handleNavigate(user)}/>
                               </div>
                            })
                        }
                        {
                    request.length === 0 && "You have not any request Yet"
                  }
                    </div> 
                    : "loading..."
                  }

                  
                </div>
            </div>
        </div>
    )
}

export default Request
