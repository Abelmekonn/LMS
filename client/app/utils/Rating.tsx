import React, { FC } from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BsStarHalf } from 'react-icons/bs';

type Props = {
    rating : number;
}

const Rating : FC<Props > = ({rating}) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
        if (i <= rating){
            stars.push(<AiFillStar
                key={i}
                size = {20}
                color="#f6100"
                className="mr-2 cursor-pointer"
                />)
        }else if (i === Math.ceil(rating) && !Number.isInteger(rating)){
            stars.push(<BsStarHalf 
                key={i}
                size={17}
                className='mr- cursor-pointer'
                color='#f6b00'
                />)
        } else {
            stars.push(<AiOutlineStar 
                key={i}
                size={20}
                color='#f6ba00'
                className='mr-2 cursor-pointer'
                />)
        }
    }
  return (
    <div className="flex mt-1 ml-2 md:ml-0 md:mt-0 ">{stars}</div>
  )
}

export default Rating