"use client";
import Image from 'next/image'
import { useGetHeroDataQuery } from '../../../../redux/features/layout/layoutApi'
import React, { FC, useEffect, useState } from 'react'
import { AiOutlineCamera } from 'react-icons/ai'
import { styles } from '../../../../app/styles/style';

type Props = {}

const EditHero: FC = () => {
    const [image, setImage] = useState<string | null>(""); // Initialize as empty string or null
    const [title, setTitle] = useState<string>(""); // Correctly initialize as string
    const [subtitle, setSubtitle] = useState<string>("");

    // Fetch hero data by type "Banner"
    const { data } = useGetHeroDataQuery("Banner", {
        refetchOnMountOrArgChange: true,
    });

    // Update state when data is fetched
    useEffect(() => {
        if (data) {
            setTitle(data?.layout?.banner?.title || ""); // Ensure fallback values
            setSubtitle(data?.layout?.banner?.subTitle || ""); // Correct property case
            setImage(data?.layout?.banner?.image?.url || null); // Handle missing image URL
        }
    }, [data]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file); // Generate a preview
            setImage(imageUrl);
        }
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        // Add logic to handle form submission and update layout
        console.log("Updated title:", title);
        console.log("Updated subtitle:", subtitle);
        console.log("Updated image:", image);
    };
    return (
        <>
            <div className='w-full lg:flex items-center '>
                <div className="absolute top-[100px] lg:top-[unset] 2xl:h-[700px] 2xl:w-[700px] lg:h-[500px] lg:w-[500px]  w-[50vh] hero_animation rounded-[50%] lg:left-[18rem] xl:left-[21rem]">
                    <div className='lg:w-[40%] flex lg:min-h-screen items-center justify-end pt-[70px] xl:pt-[0] z-10'>
                        <div className=' relative flex item-center justify-end'>
                            <Image
                                src={image}
                                alt="Hero Image"
                                className="object-cover lg:max-w-[90%] w-[90%] 2xl:max-w-[85%] h-[auto] z-[10]"
                                width={100}
                                height={100}
                            />
                            <input
                                type='file'
                                name='banner'
                                id='banner'
                                accept='image/*'
                                onChange={handleUpdate}
                                className='hidden'
                            />
                            <label htmlFor="banner" className='absolute bottom-0 right-0 z-20'>
                                <AiOutlineCamera className='dark:text-white text-black text-[18px] cursor-pointer' />
                            </label>
                        </div>
                    </div>
                    <div className="flex lg:w-[60%] items-center lg:mt-[0px] text-center lg:text-center mt-[150px]">
                        <textarea 
                            className='dark:text-white resize-none text-[#000000c7] text-[30px] px-3 w-full lg:text-[60px] 2xl:text-[70px] font-medium bg-transparent'
                            name="" 
                            placeholder='Improve Your Online Learning Experience Better Instantly'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            rows={4}
                            />
                            <br />
                            <textarea
                            className='dark:text-white resize-none text-[#000000c7] text-[20px] px-3 w-full lg:text-[30px] 2xl:text-[40px] font-medium bg-transparent'
                            name=""
                            placeholder='Discover the best online courses and tutorials for your skills'
                            value={subtitle}
                            onChange={(e) => setSubtitle(e.target.value)}
                            rows={4}
                            />
                            <br /><br /><br />
                            <div className={`${
                                styles.button
                            } !w-[100px] !min-h-[40px] dark:text-white text-black bg-[#cccccc34]
                            ${
                                data?.layOut?.banner?.title !== title || 
                                data?.layOut?.banner?.subtitle !== subtitle ||
                                data?.layOut?.banner?.image?.url !== image
                                    ? "!cursor-pointer bg-[#42e383]"
                                    : "!cursor-not-allowed"
                            }
                            !rounded absolute bottom-12 right-12
                            `}
                            onClick={
                                data?.layOut?.banner?.title !== title ||
                                data?.layOut?.banner?.subtitle !== subtitle||
                                data?.layOut?.banner?.image?.url !== image
                                ? 
                                : null
                            }
                            ></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditHero