import { styles } from '@/app/styles/style';
import CoursePlayer from '@/app/utils/CoursePlayer';
import Rating from '@/app/utils/Rating';
import { useAddAnswerMutation, useAddNewQuestionMutation, useAddReplyReviewMutation, useAddReviewMutation, useGetCourseDetailQuery } from '@/redux/features/courses/coursesApi';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { AiFillStar, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineStar } from 'react-icons/ai';
import { BiMessage } from 'react-icons/bi';
import { VscVerifiedFilled } from 'react-icons/vsc';
import { format } from 'timeago.js';
import socketId from "socket.io-client";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVICE_URI || "";
const socket = socketId(ENDPOINT, {transports: ['websocket']});

type Props = {
    id: string;
    activeVideo: number;
    setActiveVideo: (activeVideo: number) => void;
    data: any;
    user: any;
    refetch: any;
}

const CourseContentMedia = ({ id, activeVideo, setActiveVideo, refetch, data, user }: Props) => {
    const [activeBar, setActiveBar] = useState(0);
    const [replyStates, setReplyStates] = useState<{ [key: string]: boolean }>({});
    const [question, setQuestion] = useState("");
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [reviewId, setReviewId] = useState("");
    const [answer, setAnswer] = useState("");
    const [questionId, setQuestionId] = useState("");
    const [reply, setReply] = useState("");
    const [isReviewReply, setIsReviewReply] = useState(false);

    const { data: course, refetch: courseRefetch } = useGetCourseDetailQuery({ id }, { refetchOnMountOrArgChange: true });

    const [addAnswer, { isLoading: answerCreationLoading, error: answerCreationError, data: answerCreationData, isSuccess: answerCreationSuccess }] = useAddAnswerMutation();
    const [addReview, { isLoading: reviewCreationLoading, error: reviewCreationError, data: reviewCreationData, isSuccess: reviewCreationSuccess }] = useAddReviewMutation();
    const [addNewQuestion, { isLoading: questionCreationLoading, error, data: questionCreationData, isSuccess }] = useAddNewQuestionMutation();
    const [addReplyReview, { isLoading: reviewReplyCreationLoading, error: reviewReplyCreationError, data: reviewReplyCreationData, isSuccess: reviewReplyCreationSuccess }] = useAddReplyReviewMutation();
    const isReviewExists = course?.reviews?.find((item: any) => item.user === user._id);

    const courseData = course?.course

    const handleQuestion = () => {
        if (question.length === 0) {
            toast.error("Question can't be empty")
        }
        else {
            addNewQuestion({ question, courseId: id, contentId: data[activeVideo]._id });
        }
    }

    useEffect(() => {
        if (isSuccess) {
            setQuestion("");
            refetch()
            toast.success("Question added successfully");
            socket.emit("notification", { 
                title: "New Question Received",
                message: `you have new question in ${data[activeVideo]?.title}`,
                userId: user._id, 
            });
        }
        if (answerCreationSuccess) {
            setAnswer("");
            refetch();
            toast.success("Answer added successfully");
            if (user.role === "admin") {
                socket.emit("notification", {
                    title: "New Reply Received",
                    message: `you have new question reply in ${data[activeVideo]?.title}`,
                    userId: user._id,
                })
            }
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error.data as any;
                toast.error(errorMessage.message);
            }
            else {
                toast.error("Something went wrong");
            }
        }
        if (answerCreationError) {
            if ("data" in answerCreationError) {
                const errorMessage = answerCreationError.data as any;
                toast.error(errorMessage.message);
            }
            else {
                toast.error("Something went wrong");
            }
        }
        if (reviewCreationError) {
            if ("data" in reviewCreationError) {
                const errorMessage = reviewCreationError.data as any;
                toast.error(errorMessage.message);
            }
        }
        if (reviewCreationSuccess) {
            setReview("");
            setRating(1);
            courseRefetch();
            toast.success("Review added successfully");
            socket.emit("notification", {
                title: "New Review Received",
                message: `you have new review in ${data[activeVideo]?.title}`,
                userId: user._id,
            });
        }
        if (reviewReplyCreationSuccess) {
            toast.success("Reply added successfully");
            refetch();
            setReply("");
        }
        if (reviewReplyCreationError) {
            if ("data" in reviewReplyCreationError) {
                const errorMessage = reviewReplyCreationError.data as any;
                toast.error(errorMessage.message);
            }
            else {
                toast.error("Something went wrong");
            }
        }
    }, [isSuccess, error, answerCreationSuccess, answerCreationError, reviewCreationSuccess, reviewCreationError, reviewReplyCreationSuccess, reviewReplyCreationError, courseRefetch, refetch, activeVideo, data, user._id, user.role])

    const handleReplySubmit = () => {
        addAnswer({ answer, courseId: id, contentId: data[activeVideo]._id, questionId: questionId });
    };

    const handleReviewSubmit = () => {
        if (review.length === 0) {
            toast.error("Review can't be empty");
        }
        else {
            addReview({ rating, review, courseId: id, contentId: data[activeVideo]._id });
        }
    };

    const [openReplyId, setOpenReplyId] = useState<string | null>(null);

    const toggleReply = (reviewId: string) => {
        setOpenReplyId((prev) => (prev === reviewId ? null : reviewId));
    };

    const handelReviewReplySubmit = () => {
        if (reply === "") {
            toast.error("Reply can't be empty")
        } else {
            addReplyReview({ reviewId, comment: reply, courseId: id })
        }
    }

    return (
        <div className="w-[95%] 800px:w-[86%] mx-auto py-4">
            <CoursePlayer
                videoUrl={data[activeVideo]?.videoUrl}
                title={data[activeVideo]?.title}
            />
            <div className="w-full flex items-center justify-between  my-3">
                <div className={`${'flex flex-row justify-content-center min-w-fit item-center py-3 px-6 rounded-full cursor-pointer bg-[#2190ff] min-h min-h-[45px] text-[20px] font-Poppins font-semibold'} !min-h-[40px] !py-[unset] ${activeVideo === 0 && "!cursor-no-drop opacity-[.8]"
                    }`}
                    onClick={() =>
                        setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
                    }
                >
                    <AiOutlineArrowLeft size={30} className='mr-2 self-center' />
                    <span className='self-center'>Pre Lesson</span>
                </div>
                <div className={`${'flex flex-row justify-content-center min-w-fit  py-3 px-6 rounded-full cursor-pointer bg-[#2190ff] min-h min-h-[45px] text-[20px] self-center font-Poppins font-semibold'} !min-h-[40px] !py-[unset] ${activeVideo === data?.length - 1 && "!cursor-no-drop opacity-[.8]"
                    }`}
                    onClick={() =>
                        setActiveVideo(activeVideo === data?.length - 1 ? data?.length - 1 : activeVideo + 1)
                    }
                >
                    <span className='self-center'>Next Lesson</span>
                    <AiOutlineArrowRight size={30} className='ml-2 self-center' />
                </div>
            </div>
            <h1 className="pt-2 text-[20px] dark:text-white text-black font-Poppins font-[600] ">
                {data[activeVideo]?.title}
            </h1>
            <br />
            <div className="w-full p-4 flex dark:text-white text-black items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner">
                {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
                    <h5
                        key={`tab-${index}`}
                        className={`800px:text-[20px] cursor-pointer ${activeBar === index ? "text-red-500" : "dark:text-white text-black"}`}
                        onClick={() => setActiveBar(index)}
                    >
                        {text}
                    </h5>
                ))}
            </div>
            <br />
            {activeBar === 0 && (
                <p className="text-[18px] dark:text-white text-black whitespace-pre-line mb-3">
                    {data[activeVideo]?.description}
                </p>
            )}
            {
                activeBar === 1 && (
                    <div>
                        {data[activeVideo]?.links?.map((item: any, index: number) => (
                            <div className="mb-5 flex gap-2" key={index}>
                                <h2 className="md:text-[20px] 800px:inline-block dark:text-white text-black">
                                    {item.title && item.title + " :"}
                                </h2>
                                <a href={item.url} className="inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2">
                                    {item.url}
                                </a>
                            </div>
                        ))}
                    </div>
                )
            }
            {
                activeBar === 2 && (
                    <>
                        <div className='flex w-full '>
                            <Image
                                src={user.avatar ? user.avatar.url : "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"}
                                alt=''
                                width={50}
                                height={50}
                                className='rounded-full object-cover w-[50px] h-[50px]'
                            />
                            <textarea
                                name=""
                                id=""
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                cols={40}
                                rows={5}
                                className='outline-none bg-transparent ml-3 border-2 border-gray-400 dark:border-[#ffffff57] md:w-full w-[90%] font-Poppins md:text-[18px] text-[16px] rounded-md p-2'
                                placeholder='Write your question here...'
                            />
                        </div>
                        <div className="w-full flex justify-end">
                            <div
                                className={`${styles.button
                                    } !w-[120px] !h-[40px] !text-[18px] mt-5 ${questionCreationLoading ? "cursor-not-allowed opacity-50" : ""}`}
                                onClick={questionCreationLoading ? () => { } : handleQuestion}
                            >
                                Submit
                            </div>
                        </div>
                        <br />
                        <br />
                        <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
                        <div>
                            <CommentReply
                                data={data}
                                activeVideo={activeVideo}
                                refetch={refetch}
                                user={user}
                                setQuestionId={setQuestionId}
                                answer={answer}
                                setAnswer={setAnswer}
                                handleReplySubmit={handleReplySubmit}
                                answerCreationLoading={answerCreationLoading}
                                questionId={questionId}
                            />
                        </div>
                    </>
                )
            }
            {
                activeBar === 3 && (
                    <>
                        {
                            !isReviewExists && (
                                <>
                                    <div className="flex w-full">
                                        <Image
                                            src={user.avatar ? user.avatar.url : "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"}
                                            alt=''
                                            width={50}
                                            height={50}
                                            className='rounded-full object-cover w-[50px] h-[50px]'
                                        />
                                        <div className="w-full">
                                            <h5 className="pl-3 text-[28px] font-[500] dark:text-white text-black">
                                                Give a Rating <span className="text-red-500">*</span>
                                            </h5>
                                            <div className="flex w-full ml-2 pb-3">
                                                {[1, 2, 3, 4, 5].map((i) =>
                                                    rating >= i ? (
                                                        <AiFillStar
                                                            key={i}
                                                            size={25}
                                                            color='rgb(246,186,0)'
                                                            className="mr-1 cursor-pointer"
                                                            onClick={() => setRating(i)}
                                                        />
                                                    ) : (
                                                        <AiOutlineStar
                                                            key={i}
                                                            size={25}
                                                            color='rgb(246,186,0)'
                                                            className="mr-1 cursor-pointer"
                                                            onClick={() => setRating(i)}
                                                        />
                                                    )
                                                )}
                                            </div>
                                            <textarea
                                                value={review}
                                                onChange={(e) => setReview(e.target.value)}
                                                cols={40}
                                                rows={5}
                                                className='text-black dark:text-white outline-none bg-transparent ml-3 border-2 border-gray-400 dark:border-[#ffffff57] md:w-full w-[90%] font-Poppins md:text-[18px] text-[16px] rounded-md p-2'
                                                placeholder='Write your review here...'
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full flex justify-end">
                                        <div className={`${styles.button
                                            } !w-[120px] !h-[40px] !text-[18px] mt-5 ${reviewCreationLoading && "cursor-no-drop"}`}
                                            onClick={reviewCreationLoading ? () => { } : handleReviewSubmit}
                                        >
                                            Submit
                                        </div>
                                    </div>
                                </>
                            )}
                        <br />
                        <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
                        <div className="w-full">
                            {courseData?.reviews?.length > 0 ? (
                                [...courseData.reviews].reverse().map((item: any) => (
                                    <div className="w-full my-5" key={item._id}>
                                        <div className="w-full flex">
                                            <div>
                                                <Image
                                                    src={item?.user?.avatar?.url || "https://randomuser.me/api/portraits/men/5.jpg"}
                                                    alt={`${item?.user?.name || 'User'}'s avatar`}
                                                    width={50}
                                                    height={50}
                                                    className="rounded-full object-cover w-[50px] h-[50px]"
                                                />
                                            </div>
                                            <div className="ml-2 text-black dark:text-white">
                                                <h1 className="text-[18px]">{item?.user?.name}</h1>
                                                <Rating rating={item?.rating} />
                                                <p>{item?.comment || "No review"}</p>
                                                <small className="dark:text-[#ffffff83]">
                                                    {format(new Date(item?.createdAt), "PPpp")}
                                                </small>
                                            </div>
                                        </div>
                                        {user.role === "admin" && (
                                            <span
                                                className={`${styles.label} text-black dark:text-white cursor-pointer ml-16 md:pl-16`}
                                                onClick={() => {
                                                    toggleReply(item._id); // Open or close the current review's reply
                                                    setReviewId(item._id); // Optional logic for handling the current review ID
                                                }}
                                            >
                                                Add Reply
                                            </span>
                                        )}
                                        {openReplyId === item._id && (
                                            <div className="w-full flex relative">
                                                <input
                                                    type="text"
                                                    placeholder="Write your reply..."
                                                    value={reply}
                                                    onChange={(e) => setReply(e.target.value)}
                                                    className={`${styles.input} !border-[0px] w-[90%] ml-[10%] rounded-none !border-b`}
                                                />
                                                <button
                                                    type="submit"
                                                    className="absolute right-0 bottom-0 text-black dark:text-white"
                                                    onClick={handelReviewReplySubmit}
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        )}
                                        {item.commentReplies.length > 0 &&
                                            item.commentReplies.map((reply: any) => (
                                                <div className="w-full flex ml-10 md:ml-16 my-5" key={reply._id}>
                                                    <div className="w-[50px] h-[50px]">
                                                        <Image
                                                            src={reply?.user?.avatar?.url || "https://randomuser.me/api/portraits/men/5.jpg"}
                                                            alt={`${reply?.user?.name || 'User'}'s avatar`}
                                                            width={50}
                                                            height={50}
                                                            className="rounded-full object-cover w-[50px] h-[50px]"
                                                        />
                                                    </div>
                                                    <div className="pl-2 text-black dark:text-white">
                                                        <h5 className="text-[20px]">{reply?.user?.name}</h5>
                                                        <div className="flex item-center">
                                                            <h5 className="text-[20px]">{reply.user.name}</h5>
                                                            {
                                                                reply.user.role === "admin" && (
                                                                    <VscVerifiedFilled size={20} className='text-[#2190ff]' />
                                                                )
                                                            }
                                                        </div>
                                                        <p className="text-[16px]">{reply?.comment}</p>
                                                        <small className="dark:text-[#ffffff83]">
                                                            {format(new Date(reply?.createdAt), "PPpp")}
                                                        </small>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                ))
                            ) : (
                                <p>No reviews yet</p>
                            )}
                        </div>
                    </>
                )
            }
        </div>
    )
}

const CommentReply = ({
    data,
    activeVideo,
    refetch,
    user,
    setQuestionId,
    answer,
    setAnswer,
    handleReplySubmit,
    answerCreationLoading, 
    questionId
}: any) => {
    return (
        <>
            <div className="w-full my-3">
                {
                    data[activeVideo]?.questions?.map((item: any, index: number) => (
                        <CommentItem
                            key={index}
                            index={index}
                            item={item}
                            data={data}
                            activeVideo={activeVideo}
                            answer={answer}
                            setAnswer={setAnswer}
                            questionId={questionId}
                            setQuestionId={setQuestionId}
                            handleReplySubmit={handleReplySubmit}
                            answerCreationLoading={answerCreationLoading}
                        />
                    ))
                }
            </div>
        </>
    )
}

const CommentItem = ({
    data,
    activeVideo,
    index,
    item,
    answer,
    setAnswer,
    handleReplySubmit,
    answerCreationLoading,
    questionId,
    setQuestionId
}: any) => {
    const [replyActive, setReplyActive] = useState(false);

    return (
        <>
            <div className="my-4">
                <div className="flex mb-2">
                    <div>
                        <Image
                            src={item?.user?.avatar ? item?.user?.avatar.url : "https://randomuser.me/api/portraits/men/5.jpg"}
                            alt=''
                            width={50}
                            height={50}
                            className='rounded-full object-cover w-[50px] h-[50px]'
                        />
                    </div>
                    <div className="pl-3">
                        <h5 className="text-[20px] font-Poppins font-[500] dark:text-white text-black">
                            {item?.user?.name}
                        </h5>
                        <p className="text-[16px] font-Poppins font-[400] dark:text-white text-black">
                            {item?.question}
                        </p>
                        <small className='text-[#ffffff83]'>{format(item.createdAt).toString()}</small>
                    </div>
                </div>
                <div className="w-full flex gap-1">
                    <span className="text-black dark:text-[#ffffff83] cursor-pointer ml-16 md:pl-16"
                        onClick={() => {
                            setQuestionId(item._id);
                            setReplyActive(!replyActive);
                        }}
                    >
                        {!replyActive ? item?.questionReplies?.length !== 0 ? "All Replies" : "Reply" : "Hide Replies"}
                    </span>
                    <BiMessage size={20} className='cursor-pointer text-[#000000b8] dark:text-[#ffffff83]' />
                    <span className='pl-2 ml-[-4px] cursor-pointer text-[#000000b8] dark:text-[#ffffff83]'>
                        {item?.questionReplies?.length}
                    </span>
                </div>
                {replyActive && questionId === item._id && (
                        <>
                            {item.questionReplies.map((item: any) => (
                                <div className='w-full mt-5 flex ml-16 text-black dark:text-white' key={item._id}>
                                    <div>
                                        <Image
                                            src={item?.user?.avatar ? item?.user?.avatar.url : "https://randomuser.me/api/portraits/men/5.jpg"}
                                            alt=''
                                            width={50}
                                            height={50}
                                            className='rounded-full object-cover w-[50px] h-[50px]'
                                        />
                                    </div>
                                    <div className="pl-2">
                                        <div className="flex item-center">
                                            <h5 className="text-[20px]">{item.user.name}</h5>
                                            {
                                                item.user.role === "admin" && (
                                                    <VscVerifiedFilled size={20} className='text-[#2190ff]' />
                                                )
                                            }
                                        </div>
                                        <p className="text-[16px]">{item.answer}</p>
                                        <small className='text-[#ffffff83]'>{format(item.createdAt).toString()}</small>
                                    </div>
                                </div>
                            ))}
                            <>
                                <div className="w-[90%] justify-end flex relative text-black dark:text-white">
                                    <input
                                        type="text"
                                        value={answer}
                                        onChange={(e) => setAnswer(e.target.value)}
                                        className={`block md:ml-12 mt-2 outline-none bg-transparent border-b border-[#00000027] dark:text-white text-black dark:border-[#fff] w-[90%] p-[5px] ${answer === "" || answerCreationLoading && "cursor-not-allowed opacity-50"}`}
                                        placeholder='Write your reply here...'
                                    />
                                    <button
                                        className="absolute right-0 bottom-1"
                                        onClick={handleReplySubmit}
                                        type='submit'
                                        disabled={answer === "" || answerCreationLoading}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </>
                        </>
                    )}
            </div>
        </>
    )
}

export default CourseContentMedia