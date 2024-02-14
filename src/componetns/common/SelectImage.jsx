import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { createAccount } from '../../service/operations/auth';
import { toast } from 'react-toastify';
import { RxCross1 } from "react-icons/rx";


const SelectImage = ({text,getImgUrl}) => {
  const [avatrs, setAvatars] = useState([])
  const [profileFile, setPorfileFile] = useState()
  const [profileImage, setPorfileImg] = useState()
  const { signupData } = useSelector((state) => state.user);
  
  const avatarArray = []
  
  const handleAvatars = async () => {
    for (let i = 1; i <= 5; i++) {
      const image = `https://api.multiavatar.com/Binx%${Math.round(Math.random() * 100)}ond.svg`
      avatarArray.push(image)
    }

    if (avatarArray.length === 5) {
      setAvatars(avatarArray)
    }
  }

  useEffect(() => {
    handleAvatars()
  }, [])


  const handelFile = (e) => {
    setPorfileFile(e.target.files[0])
    const img = URL.createObjectURL(e.target.files[0])
    setPorfileImg(img)
  }

  const handleClick = () => {
    setPorfileFile(null)
    setPorfileImg(null)
  }

  const handleSelectedAvatars = (url) =>{
    setPorfileImg(url)
    setPorfileFile(url)
  }

  const handelSubmit = async() => {
    if(profileFile){
    const data = {
      ...signupData,
      image : profileFile
    }

    createAccount(data)

    console.log(data,"this is printng hole data ")
    }else{
      // genaret a toast 
      console.log("you are not seletwct image ")
    }
  }

  const handlemyfun = () => {
   if(!profileFile){
    toast.error("You hanv not select img")
   }else{
    getImgUrl(profileFile)
   }
  }


  return (
    <div className='flex flex-col w-full h-full items-center justify-center min-h-[400px] '>
     <p className='text-xl font-semibold mb-5'> Select Profile Image </p>

     {
          profileFile
            ? <div>
              <button className='text-xl font-semibold w-full flex justify-end'
              onClick={handleClick}><RxCross1/></button>
              <img src={profileImage}

                className='w-[150px] h-[150px] rounded-full'
              />
            </div>
            : <div> </div>
        }

      {
        avatrs.length === 5 ?
          <div className='flex flex-row gap-3 items-center justify-center p-2  flex-wrap m-3'>
            {
              avatrs.map((img,index) => {
                let url = img
                return <div key={index} className='w-[100px] h-[100px] rounded-md'>
                  <img
                    src={url}
                    width={100}
                    key={url}
                  onClick={() => handleSelectedAvatars(url)}
                  />

                </div>
              })
            }
          </div>
          : <div>Loading...</div>
      }

      <div className='w-full '>       
       <label className='flex flex-col justify-center items-center w-full'>
        <p className='cursor-pointer flex justify-center px-3 py-2 text-blue-500 border border-black rounded-md w-fit'>Chouse File</p>
       <input
       className='invisible'
          type='file'
          onChange={handelFile}
        />
       </label>
      </div>

     
      <button
        onClick={handlemyfun}
        className=" rounded-[8px] bg-yellow-400 hover:bg-yellow-500 py-[8px] px-[12px] font-medium text-richblack-900 w-full max-w-[320px]"
      >
      {text}
      </button>
    </div>
  )
}

export default SelectImage
