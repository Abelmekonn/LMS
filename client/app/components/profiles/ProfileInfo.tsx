import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react';
import avatarDefault from '../../../public/assets/avatar.jpg';
import { AiOutlineCamera } from 'react-icons/ai';
import { styles } from '../../../app/styles/style';
import { useEditProfileMutation, useUpdateAvatarMutation } from '../../../redux/features/user/userApi';
import { useLoadUserQuery } from '../../../redux/features/api/apiSlice';
import toast from 'react-hot-toast';

type Props = {
    avatar: string | null;
    user: {
        name: string;
        email: string;
        avatar?: string;
    };
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
    const [name, setName] = useState(user.name || '');
    const [updateAvatar,{isSuccess,isError}] = useUpdateAvatarMutation();
    const [editProfile, { isSuccess: success, isError: updateError, error: updateErrorDetails }] = useEditProfileMutation();
    const [loadingUser, setLoadingUser] = useState(false);
    const { data: loadedUser, isLoading } = useLoadUserQuery(undefined, { skip: !loadingUser });

    const imageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                if (fileReader.readyState === 2) {
                    const avatarUrl = fileReader.result as string;
                    updateAvatar(avatarUrl).catch((error) => console.error("Error updating avatar:", error));
                }
            };
            fileReader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        if (success || isSuccess) {
            setLoadingUser(true);
            toast.success("profile updated")
        }
        if (updateError || isError) {
            console.error("Update profile error:", updateErrorDetails);
        }
    }, [success, updateError, updateErrorDetails,isSuccess,isError]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (name.trim() !== '') {
            try {
                await editProfile({ name }).unwrap();
                // Optionally, you can set success state or trigger other actions
            } catch (error) {
                console.error("Error updating profile:", error);
            }
        }
    };

    return (
        <>
            <div className='w-full flex justify-center'>
                <div className="relative">
                    <Image
                        src={user.avatar ? user.avatar.url : avatarDefault}
                        alt='User Avatar'
                        className='w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full'
                        width={120}
                        height={120}
                        priority
                    />
                    <input
                        type="file"
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
                <form onSubmit={handleSubmit}>
                    <div className="md:w-[50%] m-auto block pb-4">
                        <div className="w-[100%]">
                            <label className="block pb-2">Full Name</label>
                            <input
                                type="text"
                                className={`${styles.input} !w-[95%] mb-1 md:mb-0`}
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="w-[100%] pt-2">
                            <label className="block pb-2">Email Address</label>
                            <input
                                type="text"
                                readOnly
                                className={`${styles.input} !w-[95%] mb-1 md:mb-0`}
                                value={user.email}
                            />
                        </div>
                        <input 
                            type="submit" 
                            className={`w-[50%] md:w-[250px] h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer`}
                            value="Update Profile"
                        />
                    </div>
                </form>
                <br />
            </div>
        </>
    );
}

export default ProfileInfo;
