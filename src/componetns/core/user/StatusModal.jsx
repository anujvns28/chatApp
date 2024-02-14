import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import { RiDeleteBinLine } from "react-icons/ri";
import ViewStatus from './ViewStatus';
import { deleteStatus, fetchUserStatus } from '../../../service/operations/user';

const StatusModal = ({ setCheckStatus, userData }) => {
    const { user } = useSelector((state) => state.user);
    const [viewStatus,setViewStatus] = useState();
    const [status,setStatus] = useState();

    const handleFetchStatus = async() => {
        const result = await fetchUserStatus({userId:userData._id})
        console.log(result)
        if(result){
            setStatus(result.data.data);
        }
    }

    const handleDeletStatus = async(data) => {
        await deleteStatus({userId:userData._id,statusId:data._id})
        handleFetchStatus();
    }
    
    useEffect(() => {
        handleFetchStatus();
    },[])

    return (
        <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
            <div className='w-[30%] min-w-[320px] h-auto bg-slate-400 min-h-[60%]'>
                <div className='w-full h-[70px] bg-slate-300 flex  items-end justify-start py-4 '>
                    <div className='flex flex-row gap-6 items-center justify-start  w-full pl-6 text-slate-100'>
                        <p onClick={() => setCheckStatus(null)}
                            className='text-xl cursor-pointer'><FaArrowLeft /></p>
                        <p className='text-xl font-semibold'>Viewing My Status</p>
                    </div>
                </div>


                <div className='p-3'>
                    <div className='flex flex-row gap-3 items-center border border-black p-2'>
                        <div>
                            <img src={userData.image} className='w-[60px] h-[60px] rounded-full' />
                        </div>
                        <div className='flex flex-col gap-1 justify-center'>
                           
                            <p>{userData.email}</p>
                        </div>
                    </div>

                    <p className='text-xl font-semibold text-white py-3'>Status</p>

                    {
                        status &&
                        <div className='flex flex-col gap-2'>
                        {
                            status.map((data,index) => {
                                return <div key={index} className='flex flex-row justify-between items-center border border-black p-2'>
                                    <div onClick={() => setViewStatus(data)}
                                    className='cursor-pointer flex w-[90%] flex-row justify-between items-center '>
                                       <div className='flex flex-row gap-3'>
                                       <div className='border-4 border-green-500 rounded-full'>
                                            <img src={userData.image} className='w-[50px] h-[50px] rounded-full' />
                                        </div>
                                        <div className='flex flex-col gap-1 justify-center'>
                                            <p>{userData.name}</p>
                                            <p>Time : 05:65</p>
                                        </div>
                                       </div>
                                    </div>
                                    <div>
                                        <p onClick={() => handleDeletStatus(data)}
                                        className={`${user._id === userData._id ? "cursor-pointer": "invisible"} text-xl font-semibold `}><RiDeleteBinLine/></p>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    }
                </div>

                {
                    viewStatus && <ViewStatus statusData={viewStatus} setViewStatus={setViewStatus}/>
                }

            </div>
        </div>
    )
}

export default StatusModal
