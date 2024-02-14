import React, { useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import SubmmitButton from '../../common/SubmmitButton';
import { toast } from 'react-toastify';
import { MdCheck } from "react-icons/md";
import SelectImage from '../../common/SelectImage';
import { useDispatch, useSelector } from 'react-redux';
import { createGroup } from '../../../service/operations/group';


const CreateGroup = ({ setCreateGroup}) => {
  const [members, setMembers] = useState([]);
  const [step,setStep] = useState(1);
  const {user} = useSelector((state) => state.user)
  const [groupInfo,setGroupInfo] = useState();
  const dispatch = useDispatch();
  
  const handleMember = (person) => {
    let mem = [...members]
    const index = mem.findIndex((item) => item._id == person._id)
    if (index < 0) {
      mem.push(person)
    } else {
      mem.splice(index,1)
      setMembers(mem)
    }
    setMembers(mem)
  }

  const handleStep1 = () => {
    if(members.length >= 2){
      setStep(2)
    }else{
      toast.error("Select at least 2 member")
    }
  }

  const handleProfileImg = (url) => {
    let memberId = []
     members.map((item) => memberId.push(item._id));
     memberId.push(user._id)
    const data = {
      userId : user._id,
      image : url,
      members : memberId,
      groupName : groupInfo.groupName,
      groupDesc : groupInfo.groupDesc
    }
    // creating group
    createGroup(data,dispatch)
    setCreateGroup(false)
  }

  const handleChange = (e) => {
    setGroupInfo((prev) => ({
      ...prev,
      [e.target.name] : e.target.value
    }))
  }



  return (
    <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
      <div className='border  min-w-[340px] border-black w-[70%]  bg-slate-200 rounded-md p-4'>
       {
        user.contact ?
        <div className='w-full h-full'>
          {/* seletct group members */}
        {
          step == 1 && 
          <div className='w-full h-full'>
            <div className='w-full flex items-center justify-between p-3 '>
          <p className='w-[60%] flex items-center justify-end text-2xl font-semibold'>Chouse group members</p>
          <p className='text-2xl font-semibold cursor-pointer w-fit'
            onClick={() => setCreateGroup(false)}><RxCross1 />
          </p>
        </div>

        <div className='w-full  justify-center items-center flex flex-col gap-5'>
          <div className='flex flex-row p-4  w-[80%] min-h-[100px] items-center justify-center border border-black rounded-md'>
            {
              members.length == 0
                ? <p>Select</p>
                : <div className='flex flex-row gap-3 flex-wrap items-center justify-center'>
                  {
                    members.map((mem) => {
                      return <div  key={mem.id} className='relative flex flex-col items-center justify-center  p-2'>
                        <img
                          className='w-[70px]  h-[70px] rounded-full cursor-pointer'
                          src={mem.image} />
                        <p onClick={() => handleMember(mem)}
                        className='absolute -top-1 -right-1 cursor-pointer text-2xl font-semibold'><RxCross1 /></p>
                        <p>{mem.name}</p>
                      </div>
                    })
                  }
                </div>
            }
          </div>

          <div className='flex flex-wrap flex-row gap-3 w-[80%] items-center justify-center '>
            {
              user.contact.map((mem) => {
                return <div key={mem._id} className=' flex flex-col items-center justify-center'>
                  <div>
                  {
                    members.findIndex((item) => item._id == mem._id) < 0
                      ? <img onClick={() => handleMember(mem)}
                      className={` w-[70px] h-[70px] rounded-full cursor-pointer`}
                      src={mem.image}
                    />
                      :
                      <div className=' z-50 w-[70px] h-[70px]  text-2xl font-semibold '>
                        <div className='w-[70px] h-[70px] bg-slate-600 opacity-80 rounded-full absolute border border-black flex items-center justify-center '>
                          <p className='opacity-100 text-3xl font-semibold text-black'><MdCheck/></p>
                        </div>
                      <img onClick={() => handleMember(mem)}
                      className={`-z-10  w-[70px] h-[70px] rounded-full cursor-pointer`}
                      src={mem.img}
                    />
                      </div>
                  }
                  </div>
                  <p>{mem.name}</p>
                </div>
              })
            }
          </div>

          <SubmmitButton text={"Next"} handleTask={handleStep1} />
        </div>
          </div>
        }

      {/* group information */}
     {
      step == 2 &&
      <div className='w-full h-full'>
        <div className='pb-2'>
        <label>
        <p className="mb-1  leading-[1.375rem] text-richblack-5"
      >Group Name <sup className='text-pink-200'>*</sup></p>
          <input 
          required
          name='groupName'
          onChange={handleChange}
          placeholder='Group Name'
          className='w-full  rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none
    border-b border-pure-greys-300'
          />
         </label> 
         <label>
         <p className="mb-1  leading-[1.375rem] text-richblack-5"
      >About <sup className='text-pink-200'>*</sup></p>
          <input 
          required
          name='groupDesc'
          onChange={handleChange}
          placeholder='Group Desc'
          className='w-full  rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none
    border-b border-pure-greys-300'
          />
         </label>
        </div>
         <SelectImage text={"Next"} getImgUrl={handleProfileImg}/>
      </div>
     }
        </div>


        : <div className='w-[70vw] h-[70vh] flex flex-col items-center justify-center text-2xl font-semibold'>
          <p className='text-2xl font-semibold cursor-pointer w-fit'
            onClick={() => setCreateGroup(false)}><RxCross1 />
          </p>
          You Have not Members to create Group
        </div>
       }

      </div>
    </div>
  )
}

export default CreateGroup
