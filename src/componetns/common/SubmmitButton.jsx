import React from 'react'

const SubmmitButton = ({text,handleTask}) => {
  return (
    <div className='' >
      <div className=' bg-yellow-400 hover:bg-yellow-500
      rounded-md w-fit cursor-pointer flex items-center justify-center py-[8px] px-[12px] font-medium'
       onClick={handleTask}>
        {text}
      </div>
    </div>
  )
}

export default SubmmitButton
