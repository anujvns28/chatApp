import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { useSelector } from 'react-redux';
import { AiOutlinePlusCircle } from "react-icons/ai";
import AddStatus from './AddStatus';
import StatusModal from './StatusModal';


const Status = ({setStatus,setAnuj}) => {
    const {user} = useSelector((state) => state.user);
    const [statusFile,setStatusFile] = useState();
    const [statusImageUrl,setStatusImageUrl] = useState();
    const [statusVidioUrl,setStatusVidioUrl] = useState();
    const [fileType,setFileType] = useState(null);
    const [checkStatus,setCheckStatus] = useState(false);
    const [userStatusInformation,setUserStatusInformation] = useState();
    
    const handleStatus = () =>{
        setAnuj(false)
        setStatus(false)
    }

    const handleChage = (e) => {
      setStatusImageUrl(null)
      setStatusVidioUrl(null)
     console.log(e.target.files[0])
     setStatusFile(e.target.files[0])
     if(e.target.files[0].type === "image/png" || e.target.files[0].type === "image/jpeg" ){
        setStatusImageUrl(URL.createObjectURL(e.target.files[0]))
        setFileType("image")
     }
     if(e.target.files[0].type === "video/mp4"){
        setStatusVidioUrl(URL.createObjectURL(e.target.files[0]))
        setFileType("vidio")
     }
    }

    const handleViewStatus = (data) => {
      setCheckStatus(true)
      setUserStatusInformation(data)
    }
    
  return (
    <div className='w-full h-full min-w-[340px] border border-black flex items-center justify-center transition-all '>
            {
                !user ?
                    <p>loading...</p>
                  :   <div className='w-full h-full bg-slate-700'>
                        <div className='w-full h-[110px] bg-slate-400 flex  items-end justify-start py-4 '>
                            <div className='flex flex-row gap-6 items-center justify-start  w-full pl-6 text-slate-100'>
                                <p onClick={handleStatus}
                                    className='text-xl cursor-pointer'><FaArrowLeft /></p>
                                <p className='text-xl font-semibold'>Status</p>
                            </div>
                        </div>

                        <div className='flex flex-col p-3'>
                        <div className='flex flex-row gap-2 w-full items-center p-2 border border-black '>
                         <div className='relative'>
                           <label>
                           <img src={user.image} className='cursor-pointer h-[50px] w-[50px] rounded-full '/>
                           <p className='cursor-pointer absolute bottom-0 text-xl font-bold right-0 bg-green-400 rounded-full border border-black text-white'><AiOutlinePlusCircle/> </p>
                           <input
                           className='invisible absolute'
                           type='file'
                           onChange={handleChage}
                           />
                           </label>
                         </div>
                         <div onClick={() => handleViewStatus(user)}
                         className='flex flex-col w-full text-sm cursor-pointer justify-center text-white'>
                           <p>My Status</p>
                           <p>Tap to View Status</p>
                         </div>
                        </div>

                        <p className='text-xl font-semibold text-white py-4'>Contacts</p>
                        <div className='flex flex-col gap-2'>
                        {
                          user.contact.map((data,index) => {
                            return <div key={index} className=''>
                              {
                                data.status.length > 0 &&
                                <div onClick={() => handleViewStatus(data)}
                                className='flex flex-row gap-2 border border-black p-2'>
                                   <div className='flex'>
                                    <img src={data.image} className='cursor-pointer h-[50px] w-[50px] rounded-full '/>
                                   </div>
                                   <div className='flex flex-col text-sm cursor-pointer justify-center text-white'>
                                    <p>{data.name}</p>
                                    <p>Tap to View Status</p>
                                   </div>
                                </div>
                              }
                            </div>
                          })
                        }
                        </div>
                        </div>
                    </div>     
            }

            {
                statusFile && <AddStatus fileUrl={statusImageUrl ? statusImageUrl : statusVidioUrl} 
                setStatusFile={setStatusFile}
                fileType={fileType}
                statusFile={statusFile}
                user={user}
                />
            }
            {
              checkStatus && <StatusModal setCheckStatus={setCheckStatus} userData={userStatusInformation}/>
            }
           
        </div>
  )
}

export default Status
