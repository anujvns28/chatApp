import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { createStatus } from '../../../service/operations/user';



const AddStatus = ({fileUrl,setStatusFile,fileType,statusFile,user}) => {
    const [statusLabel,setStatusLable] = useState();

    console.log(fileUrl)
    const handleStatsu = async() => {
        const data = {
            file : statusFile,
            label : statusLabel ? statusLabel : null,
            fileType : fileType,
            userId : user._id
        }

    const result = await createStatus(data);    
    setStatusFile(null)
    }
    
  return (
    <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
            <div className='w-[30%] min-w-[340px] h-auto bg-slate-400'>
                <div className='w-full h-[70px] bg-slate-300 flex  items-end justify-start py-4 '>
                    <div className='flex flex-row gap-6 items-center justify-start  w-full pl-6 text-slate-100'>
                        <p onClick={() => setStatusFile(null)}
                            className='text-xl cursor-pointer'><FaArrowLeft /></p>
                        <p className='text-xl font-semibold'>View Status</p>
                    </div>
                </div>

                <div className='w-full h-[90vh] items-center flex flex-col gap-3'>
                {
                    
                   fileType === "image" && 
                   <div className='flex flex-col gap-2 '>
                      <img src={fileUrl} height={30}/> 
                   </div>
                } 

                {
                    fileType === "vidio" && 
                    <div className='flex flex-col gap-2'>
                        <p>Vidio</p>
                        <video src={fileUrl} controls/>
                    </div>
                }   

                <input
                placeholder='Enter text '
                onChange={(e) => setStatusLable(e.target.value)}
                className='w-[90%] p-2 rounded-md border border-black '
                />

                <button onClick={handleStatsu}
                className='w-[90%] p-2 rounded-md bg-yellow-400 '>Add Stauts</button>
                </div>
            </div>
        </div>
  )
}

export default AddStatus
