import React, { FC, useState, ChangeEvent, DragEvent, FormEvent, Dispatch, SetStateAction } from 'react';
import { styles } from '../../../styles/style';

type CourseInfoType = {
    name: string;
    description: string;
    price: string;
    estimatePrice: string;
    tags: string;
    level: string;
    demoUrl: string;
    thumbnail: string | null;
}

type Props = {
    courseInfo: CourseInfoType;
    setCourseInfo: (CourseInfoType :CourseInfoType) => void;  // Use React's Dispatch typing for state setter
    active: number;
    setActive: (active: number) => void;
}

const CourseInformation: FC<Props> = ({ courseInfo, setCourseInfo, setActive, active }) => {
    const [dragging, setDragging] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setActive(active + 1);
    };

    const handleFileRead = (readerResult: string | ArrayBuffer | null) => {
        setCourseInfo({ ...courseInfo, thumbnail: readerResult as string });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => handleFileRead(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => handleFileRead(reader.result);
            reader.readAsDataURL(file);
        }
    };


    return (
        <div className='w-[80%] m-auto mt-2'>
            <form onSubmit={handleSubmit} className={`${styles.label}`}>
                {/* Course Name */}
                <div>
                    <label htmlFor="name">Course Name</label>
                    <input
                        type="text"
                        id="name"
                        required
                        value={courseInfo.name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setCourseInfo({ ...courseInfo, name: e.target.value })}
                        placeholder='MERN stack LMS platform'
                        className={`${styles.input}`}
                    />
                </div>
                <br />
                {/* Course Description */}
                <div>
                    <label htmlFor="description" className={`${styles.label}`}>Course Description</label>
                    <textarea
                        id="description"
                        cols={30}
                        rows={8}
                        placeholder='Write something amazing...'
                        className={`${styles.input} !h-min !py-2`}
                        value={courseInfo.description}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setCourseInfo({ ...courseInfo, description: e.target.value })}
                    />
                </div>
                <br />
                {/* Course Price and Estimate Price */}
                <div className='w-full flex justify-between'>
                    <div className="w-[45%]">
                        <label htmlFor="price" className={`${styles.label}`}>Course Price</label>
                        <input
                            type="number"
                            id="price"
                            placeholder='28'
                            className={`${styles.input} !w-full`}
                            value={courseInfo.price}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setCourseInfo({ ...courseInfo, price: e.target.value })}
                        />
                    </div>
                    <div className="w-[45%]">
                        <label htmlFor="estimatePrice" className={`${styles.label}`}>Estimate Price (optional)</label>
                        <input
                            type="number"
                            id="estimatePrice"
                            placeholder='28'
                            className={`${styles.input} !w-full`}
                            value={courseInfo.estimatePrice}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setCourseInfo({ ...courseInfo, estimatePrice: e.target.value })}
                        />
                    </div>
                </div>
                <br />
                {/* Course Category */}
                
                <br />
                {/* Course Tags */}
                <div>
                    <label htmlFor="tags">Course Tags</label>
                    <input
                        type="text"
                        id="tags"
                        required
                        value={courseInfo.tags}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setCourseInfo({ ...courseInfo, tags: e.target.value })}
                        placeholder='MERN stack, LMS platform, etc.'
                        className={`${styles.input}`}
                    />
                </div>
                <br />
                {/* Course Level and Demo URL */}
                <div className='w-full flex justify-between'>
                    <div className="w-[45%]">
                        <label htmlFor="level" className={`${styles.label}`}>Course Level</label>
                        <input
                            type="text"
                            id="level"
                            placeholder='Beginner, Intermediate, Advanced'
                            className={`${styles.input} !w-full`}
                            value={courseInfo.level}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setCourseInfo({ ...courseInfo, level: e.target.value })}
                        />
                    </div>
                    <div className="w-[45%]">
                        <label htmlFor="demoUrl" className={`${styles.label}`}>Demo URL</label>
                        <input
                            type="text"
                            id="demoUrl"
                            placeholder='https://example.com'
                            className={`${styles.input} !w-full`}
                            value={courseInfo.demoUrl}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setCourseInfo({ ...courseInfo, demoUrl: e.target.value })}
                        />
                    </div>
                </div>
                <br />
                {/* File Upload for Thumbnail */}
                <div className="w-full">
                    <input
                        type="file"
                        id='file'
                        accept='image/*'
                        className='hidden'
                        onChange={handleFileChange}
                    />
                    <label htmlFor='file'
                        className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${dragging ? "bg-blue-500" : "bg-transparent"
                            }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        {courseInfo.thumbnail ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={courseInfo.thumbnail} alt="Course Thumbnail" className="w-full max-h-full object-cover" />
                        ) : (
                            <span className='text-black dark:text-white'>
                                Drag and drop your thumbnail here or click to upload
                            </span>
                        )}
                    </label>
                </div>
                <br />
                {/* Submit Button */}
                <div className="w-full flex items-center justify-end">
                    <input
                        type="submit"
                        value="Next"
                        className='w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer'
                    />
                </div>
                <br /><br />
            </form>
        </div>
    );
}

export default CourseInformation;
