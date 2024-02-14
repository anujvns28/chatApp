import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import SubmmitButton from '../../common/SubmmitButton'
import { changeUserDesc, changeUserName } from '../../../service/operations/user';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../../slice/user';

const EditUserProfileInof = ({setEditUserProfile,editUserProfile,isUserLogin}) => {
    const [formData,setFormData] = useState();
    const {user} = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name] : e.target.value
           })) 
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const data = {
            ...formData,
            userId: user._id,
        }

        if(editUserProfile.inputName == "userName"){
            const result = await changeUserName(data,dispatch);
            dispatch(setUser(result.data.data))
            }
            if(editUserProfile.inputName == "about"){
            const result = await changeUserDesc(data,dispatch);
            dispatch(setUser(result.data.data))
            }
    
            setEditUserProfile(null);
    }


  return (
    <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
            <div className='w-[60%] min-w-[300px]  bg-slate-400 '>
                <div className='w-full h-[70px] bg-slate-300 flex  items-end justify-start py-4 '>
                    <div className='flex flex-row gap-6 items-center justify-start  w-full pl-6 text-slate-100'>
                        <p  onClick={() => setEditUserProfile(null)}
                            className='text-xl cursor-pointer'><FaArrowLeft /></p>
                        <p className='text-xl font-semibold'>{editUserProfile.text}</p>
                    </div>
                </div>

                <form className='border border-black p-5 flex flex-col gap-2'>
                    <label>
                        <p>{editUserProfile.placeHolder}</p>
                        <input
                        type={`${editUserProfile.inputTpye}`}
                        name={editUserProfile.inputName}
                        placeholder={editUserProfile.placeHolder}
                        required
                        onChange={handleChange}
                        className='w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 outline-none
                        border-b border-pure-greys-300'
                        />
                    </label>
                    <button type='submit' onClick={handleSubmit}>
                        <SubmmitButton text={"Edit"}/>
                    </button>
                </form>

            </div>
        </div>
  )
}

export default EditUserProfileInof
