import toast from 'react-hot-toast';
import { useUpdatePasswordMutation } from '../../../redux/features/user/userApi';
import { styles } from '../../styles/style'
import React, { useEffect, useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import Loader from '../loader';

type Props = {}

const ChangePassword = (props: Props) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const passwordChangeHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("New password and confirm password do not match.");
        } else {
            await updatePassword({ oldPassword, newPassword });
        }
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("Password changed successfully");
            window.location.reload();
        }

        if (error && 'data' in error) {
            const errorData = error as any;
            toast.error(errorData.data.message);
        }
    }, [isSuccess, error]);

    return (
        <div className='w-full px-3 items-center pl-2 md:px-5 md:pl-0'>
            <h1 className="block text-[25px] font-Poppins text-center font-[500] text-black dark:text-[#fff] pb-2">
                Change Password
            </h1>
            <div className='w-full'>
                <form className="w-full md:pl-[30%]" onSubmit={passwordChangeHandler}>
                    <div className="w-[100%] md:w-[60%] mt-5 relative">
                        <label htmlFor="oldPassword" className="block pb-2 text-black dark:text-[#fff]">
                            Enter your old Password
                        </label>
                        <input
                            type={showOldPassword ? "text" : "password"}
                            id="oldPassword"
                            className={`${styles.input} !w-[95%] mt-5`}
                            required
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                        {showOldPassword ? (
                            <AiOutlineEye
                                className="absolute top-[60%] right-[5%] cursor-pointer text-black dark:text-white mr-2"
                                size={20}
                                onClick={() => setShowOldPassword(false)}
                            />
                        ) : (
                            <AiOutlineEyeInvisible
                                className="absolute top-[60%] right-[5%] cursor-pointer text-black dark:text-white mr-2"
                                size={20}
                                onClick={() => setShowOldPassword(true)}
                            />
                        )}
                    </div>

                    <div className="w-[100%] md:w-[60%] mt-5 relative">
                        <label htmlFor="newPassword" className='block pb-2 text-black dark:text-[#fff]'>
                            Enter your new Password
                        </label>
                        <input
                            type={showNewPassword ? 'text' : 'password'}
                            id="newPassword"
                            className={`${styles.input} !w-[95%] mt-5`}
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        {showNewPassword ? (
                            <AiOutlineEye
                                className={`absolute top-[60%] right-[5%] cursor-pointer text-black dark:text-white mr-2`}
                                size={20}
                                onClick={() => setShowNewPassword(false)}
                            />
                        ) : (
                            <AiOutlineEyeInvisible
                                className={`absolute top-[60%] right-[5%] cursor-pointer text-black dark:text-white mr-2`}
                                size={20}
                                onClick={() => setShowNewPassword(true)}
                            />
                        )}
                    </div>
                    <div className="w-[100%] md:w-[60%] mt-5 relative">
                        <label htmlFor="confirmPassword" className='block pb-2 text-black dark:text-[#fff]'>
                            Enter your confirm Password
                        </label>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            className={`${styles.input} !w-[95%] mt-5`}
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {showConfirmPassword ? (
                            <AiOutlineEye
                                className={`absolute top-[35%] right-[5%] cursor-pointer text-black dark:text-white mr-2`}
                                size={20}
                                onClick={() => setShowConfirmPassword(false)}
                            />
                        ) : (
                            <AiOutlineEyeInvisible
                                className={`absolute top-[35%] right-[5%] cursor-pointer text-black dark:text-white mr-2`}
                                size={20}
                                onClick={() => setShowConfirmPassword(true)}
                            />
                        )}
                        <button
                            type="submit"
                            className={`w-[50%] md:w-[250px] h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer`}
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
            <br /><br />
        </div>
    )
}

export default ChangePassword;
