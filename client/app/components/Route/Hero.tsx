import Image from "next/image"
import Link from "next/link"
import React ,{FC} from "react"

type Props = {};

export const Hero : FC<Props> = (props)=>{
    return (
        <div className="w-full md:flex item-center">
            <div className="absolute top-100px md:top-[unset] 2xl:w-[700px] 2xl:h-[700px] lg:h-[600px] lg:w-[600px] hero_animation rounded">
                <div className="md:w-[40] flex md:min-h-screen items-center justify-end pt-[70px] xl:pt-[0] z-10">
                    <Image
                        src={require("../../../public/assets/10002.jpg")}
                        alt=""
                        className="object-contain lg:max-w-[90%] w-[90%] 1500px:"
                    />
                </div>
            </div>
        </div>
    )
}