import React from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { useSelector } from 'react-redux'

const ViewStatus = ({statusData,setViewStatus}) => {
   

  return (
    <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
            <div className='w-[30%] min-w-[320px] h-auto bg-slate-400 py-7'>
                <div className='w-full h-[70px] bg-slate-300 flex  items-end justify-start py-4 '>
                    <div className='flex flex-row gap-6 items-center justify-start  w-full pl-6 text-slate-100'>
                        <p onClick={() => setViewStatus(null)}
                            className='text-xl cursor-pointer'><FaArrowLeft /></p>
                        <p className='text-xl font-semibold'>View Status</p>
                    </div>
                </div>

               {
                statusData ? 
                <div className='w-full  items-center justify-center flex flex-col gap-3'>
                {
                   statusData.fileType === "image" && 
                   <img src={statusData.fileUrl}/> 
                } 

                {
                    statusData.fileType === "vidio" && 
                    <video src={statusData.fileUrl} controls autoPlay/>
                }
                <p className='text-xl font-semibold text-white'>{statusData.label}</p>   
                </div>
                : "loading..."
               }

                
            </div>
        </div>
  )
}

export default ViewStatus
