import { styles } from '@/app/styles/style';
import { AddCircle } from '@mui/icons-material';
import React, { FC, ChangeEvent } from 'react';
import toast from 'react-hot-toast';

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
  const handelAddBenefit = () => {
    setBenefits([...benefits, { title: "" }])
  }
  const handlePrerequisitesChange = (index: number, value: string) => {
    const updatedPrerequisites = [...prerequisites];
    updatedPrerequisites[index].title = value;
    setPrerequisites(updatedPrerequisites);
  };
  const handelAddPrerequisites = () => {
    setPrerequisites([...prerequisites, { title: "" }])
  }

  
  const prevButton = () =>{
    setActive(active - 1);
}

const handelOptions = () =>{
    if (benefits[benefits.length - 1]?.title !== "" && prerequisites[prerequisites.length -1]?.title  !== "") {
      setActive(active + 1);
    }
    else{
      toast.error("Please fill the fields for go to next")
    }
}

  return (
    <div className='w-[80%] m-auto mt-24 block'>
      <div>
        <label htmlFor="benefit" className={`${styles.label} dark:text-white text-[20px]`}>
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
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handelAddBenefit}
          className="dark:text-white"

        />
      </div>
      <div>
        <label htmlFor="benefit" className={`${styles.label} text-[20px]`}>
          What are the prerequisites of this course for students?
        </label> 
        <br />
        {prerequisites.map((prerequisite, index) => (
          <input
            key={index}
            type="text"
            name="benefit"
            value={prerequisite.title}
            placeholder="Prerequisites for students from this course will be"
            onChange={(e: ChangeEvent<HTMLInputElement>) => handlePrerequisitesChange(index, e.target.value)}
            className={`${styles.input} mt-2`}
          />
        ))}
        <AddCircle
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handelAddPrerequisites}
          className="dark:text-white"

        />
      </div>
      <div className="w-full flex justify-between items-center">
        <div  className="w-full md:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] rounded text-center text-[#fff] mt-8 cursor-pointer"
        onClick={()=>prevButton()}
        >
          Prev
        </div>
        <div className="w-full md:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] rounded text-center text-[#fff] mt-8 cursor-pointer"
        onClick={()=>handelOptions()}
        >
          Next
        </div>
      </div>
    </div>
  );
}

export default CourseData;
