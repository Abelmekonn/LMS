import Image from 'next/image';
import React, { FC, useState } from 'react'
import avatarDefault from '../../../public/assets/avatar.jpg';
import { AiOutlineCamera } from 'react-icons/ai';
import { styles } from '../../../app/styles/style';

type Props = {
    avatar: string | null;
    user: any;
}

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
    const [name, setName] = useState(user && user.name)

    const imageHandler = async (e: any) => {
        console.log("999")
    }

    const handelSubmit = async (e: any) => {
        console.log("object")
    }

    return (
        <>
            <div className='w-full flex justify-center'>
                <div className="relative">
                    <Image
                        src={user.avatar || avatar || avatarDefault}
                        alt='User Avatar'
                        className='w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full'
                        width={120}  // Adding width
                        height={120} // Adding height
                    />
                    <input type="file"
                        name=""
                        className='hidden'
                        id='avatar'
                        onChange={imageHandler}
                        accept='image/png,image/jpg,image/jpeg,image/webp'
                    />
                    <label htmlFor="avatar">
                        <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
                            <AiOutlineCamera size={20} className='z-1' />
                        </div>
                    </label>
                </div>
            </div>
            <br /><br />
            <div className="w-full pl-6 md:pl-18">
                <form onSubmit={handelSubmit}>
                    <div className="md:w-[50%] m-auto block pb-4">
                        <div className="w-[100%]">
                            <label className="block pb-2">Full Name</label>
                            <input
                                type="text"
                                className={`${styles.input} !w-[95%] mb-1 md:mb-0 `}
                                required
                                value={user?.name}
                            />
                        </div>
                        <div className="w-[100%] pt-2">
                            <label className="block pb-2">Email Address</label>
                            <input type="text"
                            readOnly
                            className={`${styles.input} !w-[95%] mb-1 md:mb-0 `}
                            value={user?.email}
                            />
                        </div>
                        <input 
                        type="submit" 
                        className={`w-[50%] md:w-[250px] h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer `}
                        value="Update Profile"
                        required
                        />
                    </div>
                </form>
                <br />
            </div>
        </>
    )
}

export default ProfileInfo;
