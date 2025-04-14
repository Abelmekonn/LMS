"use client";

import { Card } from "@/components/ui/card";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

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
        <section className="w-full px-4 md:px-8 py-12">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-muted-foreground mt-2">
                        Answers to common questions about our services and products.
                    </p>
                </div>

                <Card className="bg-transparent p-6">
                    {questions.length > 0 ? (
                        <div className="space-y-4">
                            {questions.map((faq) => {
                                const isOpen = activeQuestion === faq._id;
                                return (
                                    <div
                                        key={faq._id}
                                        className="rounded-lg border border-border px-4 py-3 transition-colors duration-200"
                                    >
                                        <button
                                            className="flex items-center justify-between w-full text-left text-lg font-medium text-gray-900 dark:text-white"
                                            onClick={() => toggleQuestion(faq._id)}
                                        >
                                            <span>{faq.question}</span>
                                            <span className="ml-2">
                                                {isOpen ? (
                                                    <AiOutlineMinus size={20} />
                                                ) : (
                                                    <AiOutlinePlus size={20} />
                                                )}
                                            </span>
                                        </button>

                                        {isOpen && (
                                            <div className="mt-2 text-gray-700 dark:text-slate-300 text-sm">
                                                {faq.answer}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-center text-muted-foreground">No FAQs available.</p>
                    )}
                </Card>
            </div>
        </section>
    );
};

export default FAQ;
