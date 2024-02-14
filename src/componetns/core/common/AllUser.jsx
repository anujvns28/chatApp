import React, { useEffect, useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { addUserInConatact, fetchAllUser } from '../../../service/operations/user';


const AllUser = ({ setAllUser}) => {
    const [allContact, setAllContact] = useState();
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch()

    const fetchingAllUser = async () => {
        const result = await fetchAllUser(user._id);
        if (result) {
            setAllContact(result.data.data);
        }
    }

    useEffect(() => {
        fetchingAllUser();
    }, [])

    const handleClick = async (chatId) => {
        await addUserInConatact({ userId: user._id, chatId: chatId },dispatch)
        fetchingAllUser();
    }

    return (
        <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
            <div className='w-[40%] min-w-[340px] border border-black  flex items-center justify-center transition-all '>
                {
                    !allContact ?
                        <p>loading...</p>
                        : <div className='w-full h-full bg-slate-300 p-4'>
                            <div className='flex w-full justify-end'>
                                <p onClick={() => setAllUser(false)}
                                    className='text-xl font-semibold p-2 cursor-pointer'><RxCross1 /></p>
                            </div>

                            <div className='flex flex-col  justify-center gap-2 p-2'>
                                {
                                    allContact.allUser.map((userData, index) => {
                                        return <div key={index} className='flex flex-wrap  flex-row gap-3 justify-between border border-black items-center p-2'>
                                            <div className='flex flex-row gap-3'>
                                                <div>
                                                    <img className='w-[50px] h-[50px] rounded-full'
                                                        src={userData.image} />
                                                </div>
                                                <div className='flex items-center justify-center'>
                                                    <p>{userData.name}</p>
                                                </div>
                                            </div>

                                            {
                                                !allContact.contact.includes(userData._id) &&
                                                <div onClick={() => handleClick(userData._id)}
                                                    className='border border-black  h-[70%] px-2 py-1 rounded-md bg-yellow-500 cursor-pointer flex items-center justify-center'>
                                                    Add user
                                                </div>
                                            }
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}
export default AllUser
