import React, { useEffect, useState } from "react";
import { useGetCourseDetailQuery } from "@/redux/features/courses/coursesApi";
import { useCreatePaymentIntentMutation, useGetStripPublishedKeyQuery } from "@/redux/features/orders/ordersApi";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import Loader from "../loader";
import Heading from "@/app/utils/Heading";
import Header from "../Header";
import Footer from "../Footer";
import CourseDetails from "../../components/Course/CourseDetails";

type Props = {
    id: string;
};

const CourseDetailPage: React.FC<Props> = ({ id }) => {
    const [route, setRoute] = useState("Login");
    const [open, setOpen] = useState(false);
    const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);
    const [clientSecret, setClientSecret] = useState<string>("");

    const { data, isLoading, error } = useGetCourseDetailQuery({ id });
    const { data: config } = useGetStripPublishedKeyQuery({});
    const [createPaymentIntent, { data: paymentIntentData }] = useCreatePaymentIntentMutation({});

    useEffect(() => {
        if (config?.publishableKey) {
            setStripePromise(loadStripe(config.publishableKey));
        }
    }, [config]);

    useEffect(() => {
        if (data?.course?.price) {
            const amount = Math.round(data.course.price); // Convert to cents
            createPaymentIntent(amount);
        }
    }, [createPaymentIntent, data]);

    useEffect(() => {
        if (paymentIntentData?.client_secret) {
            setClientSecret(paymentIntentData.client_secret);
        }
    }, [paymentIntentData]);


    if (isLoading) return <Loader />;
    if (error) return <p>Error: Unable to fetch course details</p>;

    return (
        <div>
            <Heading
                title={`${data?.course?.name} - ELearning`}
                description="ELearning is a programming community developed by passionate developers."
                keywords={data?.course?.tags || []}
            />
            <Header
                route={route}
                setRoute={setRoute}
                open={open}
                setOpen={setOpen}
                activeItem={1}
            />
            {stripePromise && data?.course && (
                <CourseDetails
                    data={data.course}
                    stripePromise={stripePromise}
                    clientSecret={clientSecret}
                    setOpen={setOpen}
                    setRoute={setRoute}
                />
            )}
            <Footer />
        </div>
    );
};

export default CourseDetailPage;
