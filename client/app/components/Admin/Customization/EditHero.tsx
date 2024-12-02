"use client";
import Image from 'next/image';
import { useEditLayoutMutation, useGetHeroDataQuery } from '../../../../redux/features/layout/layoutApi';
import React, { FC, useEffect, useState } from 'react';
import { AiOutlineCamera } from 'react-icons/ai';
import { styles } from '../../../../app/styles/style';
import toast from 'react-hot-toast';

const EditHero: FC = () => {
    const [image, setImage] = useState<string | null>(""); // For image URL or base64
    const [title, setTitle] = useState<string>("");
    const [subtitle, setSubtitle] = useState<string>("");

    const { data, refetch } = useGetHeroDataQuery("Banner", {
        refetchOnMountOrArgChange: true,
    });

    const [editLayout, { isLoading, isSuccess, error }] = useEditLayoutMutation();

    useEffect(() => {
        if (data) {
            setTitle(data.layout?.banner?.title || "");
            setSubtitle(data.layout?.banner?.subTitle || "");
            setImage(data.layout?.banner?.image?.url || null);
        }
        if (isSuccess) {
            refetch();
            toast.success("Hero updated successfully");
        }
        if (error && "data" in error) {
            const errorData = error as any;
            toast.error(errorData?.data?.message || "Something went wrong");
        }
    }, [data, isSuccess, error]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target?.result as string); // Convert to base64
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEdit = async () => {
        if (!title.trim() || !subtitle.trim() || !image) {
            return toast.error("Please fill all fields and upload an image.");
        }

        console.log({ type: "Banner", title, subtitle, image });

        await editLayout({
            type: "Banner",
            title,
            subtitle,
            image,
        });
    };

    const isDirty =
        data?.layout?.banner?.title !== title ||
        data?.layout?.banner?.subTitle !== subtitle ||
        data?.layout?.banner?.image?.url !== image;

    return (
        <div className='w-full flex flex-col justify-between md:flex-row items-center dark:bg-gradient-to-b text-black dark:text-white'>
            <div className='mt-10 relative top-[100px] md:top-[unset] w-[400px] h-[400px] 2xl:w-[500px] 2xl:h-[500px] lg:w-[450px] lg:h-[450px] hero_animation rounded-full overflow-hidden flex items-center justify-center'>
                <Image
                    src={image || "/placeholder-image.jpg"}
                    alt="Hero Image"
                    className="object-cover w-full h-full"
                    width={100}
                    height={100}
                />
                <input
                    type='file'
                    name='banner'
                    id='banner'
                    accept='image/*'
                    onChange={handleImageChange}
                    className='hidden'
                />
                <label htmlFor="banner" className='absolute bottom-0 right-0 z-20'>
                    <AiOutlineCamera className='dark:text-white text-black text-[18px] cursor-pointer' aria-label="Upload Hero Image" />
                </label>
            </div>

            <div className="flex-col lg:w-[50%] w-[90%] justify-between items-center lg:mt-[10px] text-center lg:text-center mt-[150px]">
                <textarea
                    className='dark:text-white resize-none text-[#000000c7] w-full text-[30px] md:text-[60px] font-Josefin leading-snug bg-transparent'
                    placeholder='Improve Your Online Learning Experience Better Instantly'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    rows={4}
                ></textarea>
                <br />
                <textarea
                    className='dark:text-white resize-none text-[#000000c7] text-[10px] w-full lg:text-[18px] 2xl:text-[20px] font-medium bg-transparent'
                    placeholder='Discover the best online courses and tutorials for your skills'
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    rows={3}
                ></textarea>
                <br /><br /><br />
                <div
                    className={`${styles.button} ${
                        isDirty ? "!cursor-pointer bg-[#42e383]" : "!cursor-not-allowed"
                    } !w-[130px] !min-h-[40px] dark:text-white text-black text-center bg-[#cccccc34] !rounded bottom-12 right-12`}
                    onClick={isDirty ? handleEdit : undefined}
                >
                    Save
                </div>
            </div>
        </div>
    );
};

export default EditHero;
