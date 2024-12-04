"use client";
import React, { FC, useEffect, useState } from "react";
import { useEditLayoutMutation, useGetHeroDataQuery } from "../../../../redux/features/layout/layoutApi";
import toast from "react-hot-toast";
import Loader from "../../loader";
import { styles } from "@/app/styles/style";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";

type Props = {}

const EditCategories: FC<Props> = () => {
    const { data, refetch } = useGetHeroDataQuery("categories", {
        refetchOnMountOrArgChange: true,
    });

    const [editLayout, { isLoading, isSuccess, error }] = useEditLayoutMutation();
    const [categories, setCategories] = useState<any[]>([]);

    

    useEffect(() => {
        if (data?.layout?.categories) {
            setCategories(data.layout.categories);
        }
        if (isSuccess) {
            refetch();
            toast.success("Categories updated successfully");
        }
        if (error && "data" in error) {
            const errorData = error as any;
            toast.error(errorData?.data?.message || "Something went wrong");
        }
    }, [data, isSuccess, error]);

    const handleCategoriesAdd = (id: any, value: string) => {
        setCategories((prevCategories) =>
            prevCategories.map((i: any) => (i._id === id ? { ...i, title: value } : i))
        );
    };

    const newCategoriesHandler = () => {
        if (!categories.length || categories[categories.length - 1].title === "") {
            toast.error("Please fill the last category before adding a new one.");
            return;
        }
        setCategories((prevCategories) => [...prevCategories, { title: "" }]);
    };

    const areCategoriesChanged = (originalCategories: any[], newCategories: any[]) => {
        return JSON.stringify(originalCategories) !== JSON.stringify(newCategories);
    };

    const isAnyCategoriesTitleEmpty = (categories: any[]) => {
        return categories.some((category: any) => category.title === "");
    };

    const editCategoriesHandler = async () => {
        if (
            areCategoriesChanged(data?.layout?.categories || [], categories) &&
            !isAnyCategoriesTitleEmpty(categories)
        ) {
            await editLayout({
                type: "Categories",
                categories,
            });
        } else {
            toast.error("No changes detected or some category titles are empty.");
        }
    };

    if (!data?.layout?.categories) {
        return <p>Loading categories...</p>;
    }

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="mt-[120px] text-center">
                    <h1 className={`${styles.title}`}>All Categories</h1>
                    {categories.map((item, index) => (
                        <div className="p-3" key={item._id || index}>
                            <div className="flex items-center w-full justify-center">
                                <input
                                    className={`${styles.input} !w-[unset] !border-none !text-[20px]`}
                                    value={item.title}
                                    onChange={(e) =>
                                        handleCategoriesAdd(item._id, e.target.value)
                                    }
                                    placeholder="Enter category title..."
                                />
                                <AiOutlineDelete
                                    className="dark:text-white text-black text-[18px] cursor-pointer"
                                    onClick={() => {
                                        setCategories((prevCategories) =>
                                            prevCategories.filter((i) => i._id !== item._id)
                                        );
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                    <br />
                    <IoMdAddCircleOutline
                        className="dark:text-white text-black text-[25px] cursor-pointer"
                        onClick={newCategoriesHandler}
                    />
                    <div
                        className={`${styles.button} !w-[100px] !min-h-[40px] dark:text-white text-black bg-[#cccccc34]
                            ${
                                !areCategoriesChanged(data.layout.categories, categories) ||
                                isAnyCategoriesTitleEmpty(categories)
                                    ? "!cursor-not-allowed"
                                    : "!cursor-pointer !bg-[#42d383]"
                            }
                            !rounded absolute bottom-12 right-12`}
                        onClick={
                            !areCategoriesChanged(data.layout.categories, categories) ||
                            isAnyCategoriesTitleEmpty(categories)
                                ? () => null
                                : editCategoriesHandler
                        }
                    >
                        Save
                    </div>
                </div>
            )}
        </>
    );
};

export default EditCategories;
