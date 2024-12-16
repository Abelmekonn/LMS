import { useGetCourseDetailQuery } from '@/redux/features/courses/coursesApi'
import React, { useEffect, useState } from 'react'
import Loader from '../loader'
import Heading from '@/app/utils/Heading'
import Header from '../Header'
import CourseDetails from '../../components/Course/CourseDetails'
import Footer from '../Footer'
import { useCreatePaymentIntentMutation, useGetStripPublishedKeyQuery } from '@/redux/features/orders/ordersApi'
import { loadStripe } from '@stripe/stripe-js'

type Props = {
    id: string
}

const CourseDetailPage = ({id}: Props) => {
    const [route , setRoute] = useState('Login')
    const [open , setOpen] = useState(false)
    const { data, isLoading, error } = useGetCourseDetailQuery({ id });
    const {data: config } = useGetStripPublishedKeyQuery({})
    const [createPaymentIntent, {data:paymentIntentData}] = useCreatePaymentIntentMutation();
    const [stripPromise,setStripePromise] = useState<any>(null)
    const [clientSecret, setClientSecret] = useState<string | null>(null);

    useEffect(() => {
        if (config?.publishableKey) {
            setStripePromise(loadStripe(config.publishableKey));
        }
    }, [config]);
    
    useEffect(() => {
        if (data?.course?.price) {
            const amount = Math.round(data.course.price * 100);
            createPaymentIntent(amount);
        }
    }, [createPaymentIntent, data]);
    
    useEffect(() => {
        if (paymentIntentData?.client_secret) {
            setClientSecret(paymentIntentData.client_secret);
        }
    }, [paymentIntentData]);
    


    return (
        <>
        {
            isLoading ? (
                <Loader />
            ):(
                <div>
                    <Heading
                        title={data.course.name + "- ELearning"}
                        description={
                            "ELearning is a programming community which is developed by a group of passionate developers"
                        }
                        keywords={data?.course?.tags}
                    />
                    <Header 
                        route={route}
                        setRoute={setRoute}
                        open={open}
                        setOpen={setOpen}
                        activeItem={1}
                    />
                    {
                        stripPromise && (
                            <CourseDetails data={data.course} stripePromise={stripPromise} clientSecret={clientSecret} />
                        )
                    }
                    <Footer />
                </div>
            )
        }
        </>
    )
}

export default CourseDetailPage