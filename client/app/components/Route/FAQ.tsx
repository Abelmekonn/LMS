"use client";
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import React, { useEffect, useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

type Props = {};

const FAQ = (props: Props) => {
    const { data } = useGetHeroDataQuery("FAQ", {});
    const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
    const [questions, setQuestions] = useState<any[]>([]);

    useEffect(() => {
        if (data) {
            setQuestions(data.layout.faq);
        }
    }, [data]);

    const toggleQuestion = (id: string) => {
        setActiveQuestion(activeQuestion === id ? null : id);
    };

    return (
        <div className="max-w-5xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6 text-center text-black dark:text-white">Frequently Asked Questions</h1>
            {questions.length > 0 ? (
                <div className="space-y-4">
                    {questions.map((faq) => (
                        <div
                            key={faq._id}
                            className=" rounded-lg p-4 "
                        >
                            <div
                                className="flex text-black dark:text-white justify-between items-center cursor-pointer"
                                onClick={() => toggleQuestion(faq._id)}
                            >
                                <h2 className="font-semibold text-lg">
                                    {faq.question}
                                </h2>
                                <span className="text-xl">
                                    {activeQuestion === faq._id ? (
                                        <AiOutlineMinus size={20}/>
                                    ) : (
                                        <AiOutlinePlus size={20}/>
                                    )}
                                </span>
                            </div>
                            {
                                activeQuestion === faq._id ?(
                                    <hr className='hidden'/>
                                ):(
                                    <hr className='mt-3'/>
                                )
                            }
                        
                            {activeQuestion === faq._id && (
                                <p className="mt-2 text-gray-900 dark:text-slate-300 ">{faq.answer}</p>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center">No FAQs available.</p>
            )}
        </div>
    );
};

export default FAQ;
