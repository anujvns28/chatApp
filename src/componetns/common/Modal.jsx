import React from 'react'
import SubmmitButton from './SubmmitButton'

const Modal = ({modalData}) => {
  return (
    <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
    <div className='w-[23%] min-w-[320px] absolute bg-slate-400 border border-black p-6 rounded-md flex flex-col gap-2'>
  
       <p className='text-xl font-semibold'>{modalData.text1}</p>
       <p>{modalData.text2}</p>
   
   <div className='flex items-center justify-between pt-4'>
   <button onClick={modalData.handler1}
   className='py-2 px-3 bg-slate-200 hover:bg-slate-300
      rounded-md w-fit cursor-pointer flex items-center justify-center'>
    {modalData.btn1}
   </button>

   <button onClick={modalData.handler2}>
   <SubmmitButton text={modalData.btn2}/>
   </button>

   </div>

   </div>
    </div>
  )
}

export default Modal
