import { styles } from '@/app/styles/style';
import { AddCircle } from '@mui/icons-material';
import React, { FC, ChangeEvent } from 'react';

type Props = {
    benefits: { title: string }[];
    setBenefits: (benefits: { title: string }[]) => void;
    prerequisites: { title: string }[];
    setPrerequisites: (prerequisites: { title: string }[]) => void;
    active: number;
    setActive: (active: number) => void;
}

const CourseData: FC<Props> = ({
    benefits,
    setBenefits,
    prerequisites,
    setPrerequisites,
    active,
    setActive
}) => {
  
  const handleBenefitChange = (index: number, value: string) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index].title = value;
    setBenefits(updatedBenefits);
  };
  const handelAddBenefit = () =>{
    setBenefits([...benefits,{title:""}])
  }

  return (
    <div className='w-[80%] m-auto mt-24 block'>
      <div>
        <label htmlFor="benefit" className={`${styles.label} text-[20px]`}>
          What are the benefits of this course for students?
        </label>
        <br />
        {benefits.map((benefit, index) => (
          <input
            key={index}
            type="text"
            name="benefit"
            value={benefit.title}
            placeholder="Benefit for students from this course will be"
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleBenefitChange(index, e.target.value)}
            className={`${styles.input} mt-2`}
          />
        ))}
        <AddCircle 
        style={{margin:"10px 0px",cursor:"pointer",width:"30px"}}
        onClick={handelAddBenefit}
        />
      </div>
    </div>
  );
}

export default CourseData;
