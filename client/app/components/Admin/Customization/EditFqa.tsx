"use client";
import React, { FC, useEffect, useState } from "react";
import { useEditLayoutMutation, useGetHeroDataQuery } from "../../../../redux/features/layout/layoutApi";
import { styles } from "../../../../app/styles/style";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";

const EditFqa: FC = () => {
    const { data, refetch } = useGetHeroDataQuery("FAQ", {
        refetchOnMountOrArgChange: true,
    });

    const [editLayout, { isLoading, isSuccess, error }] = useEditLayoutMutation();

    const [questions, setQuestions] = useState<any[]>([]);

    useEffect(() => {
        if (data) {
            setQuestions(data.layout.faq);
        }
        if (isSuccess) {
            refetch();
            toast.success("FAQ updated successfully");
        }
        if (error && "data" in error) {
            const errorData = error as any;
            toast.error(errorData?.data?.message || "Something went wrong");
        }
    }, [data, isSuccess, error]);

    const toggleQuestion = (id: string) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((q) =>
                q._id === id ? { ...q, active: !q.active } : q
            )
        );
    };

    const handleQuestionChange = (id: string, value: string) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((q) =>
                q._id === id ? { ...q, question: value } : q
            )
        );
    };

    const handleAnswerChange = (id: string, value: string) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((q) =>
                q._id === id ? { ...q, answer: value } : q
            )
        );
    };

    const newFaqHandler = () => {
        setQuestions((prevQuestions) => [
            ...prevQuestions,
            { _id: Date.now().toString(), question: "", answer: "", active: true },
        ]);
    };
    
    const isAnyQuestionEmpty = (questions: any[]) => {
        return questions.some((q) => !q.question.trim() || !q.answer.trim());
    };

    const areQuestionsUnchanged = (original: any[], current: any[]) => {
        return JSON.stringify(original) === JSON.stringify(current);
    };
    
    const handleEdit = async () => {
        if (!areQuestionsUnchanged(data.layout.faq, questions) && !isAnyQuestionEmpty(questions)) {
            await editLayout({
                type: "FAQ",
                faq: questions,
            });
        }
    };

    if (!data) {
        return <p>Loading...</p>;
    }

    return (
        <div className="w-[90%] md:w-[80%] m-auto mt-[80px]">
            <div className="mt-12">
                <dl className="space-y-8">
                    {questions.map((q: any) => (
                        <div
                            key={q._id}
                            className={`${
                                q._id !== questions[0]?._id && "border-t"
                            } border-gray-200 pt-6`}
                        >
                            <dt className="text-lg">
                                <button
                                    className="flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none"
                                    
                                >
                                    <input
                                        className={`${styles.input} border-none`}
                                        value={q.question}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            handleQuestionChange(q._id, e.target.value)
                                        }
                                        placeholder="Add Your Question..."
                                    />
                                    <span className="ml-6 flex-shrink-0" onClick={() => toggleQuestion(q._id)}>
                                        {q.active ? (
                                            <FaMinus className="h-6 w-6" />
                                        ) : (
                                            <FaPlus className="h-6 w-6" />
                                        )}
                                    </span>
                                </button>
                            </dt>
                            {q.active && (
                                <dd className="mt-2 pr-12">
                                    <input
                                        type="text"
                                        className={`${styles.input} border-none`}
                                        value={q.answer}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            handleAnswerChange(q._id, e.target.value)
                                        }
                                        placeholder="Add Your Answer..."
                                    />
                                    <span className="ml-6 flex-shrink-0">
                                        <AiOutlineDelete
                                            className="dark:text-white text-black text-[18px] cursor-pointer"
                                            onClick={() => {
                                                setQuestions((prevQuestions) =>
                                                    prevQuestions.filter(
                                                        (prevQ: any) => prevQ._id !== q._id
                                                    )
                                                );
                                            }}
                                        />
                                    </span>
                                </dd>
                            )}
                        </div>
                    ))}
                </dl>
                <br />
                <br />
                <IoMdAddCircleOutline
                    className="dark:text-white text-black text-[25px] cursor-pointer"
                    onClick={newFaqHandler}
                />
            </div>
            <div
                className={`${
                    styles.button
                } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] ${
                    areQuestionsUnchanged(data.layout.faq, questions) ||
                    isAnyQuestionEmpty(questions)
                        ? "!cursor-not-allowed"
                        : "!cursor-pointer !bg-[#42d383]"
                } !rounded absolute bottom-12 right-12`}
                onClick={
                    areQuestionsUnchanged(data.layout.faq, questions) ||
                    isAnyQuestionEmpty(questions)
                        ? () => null
                        : handleEdit
                }
            >
                Save
            </div>
        </div>
    );
};

export default EditFqa;
