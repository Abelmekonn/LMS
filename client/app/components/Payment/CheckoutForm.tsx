import React, { useEffect, useState } from "react";
import { PaymentElement, useStripe, useElements, LinkAuthenticationElement } from "@stripe/react-stripe-js";
import { useCreateOrderMutation } from "@/redux/features/orders/ordersApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { redirect, useRouter } from "next/navigation"; // Ensure correct import
import socketId from "socket.io-client";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVICE_URI || "";
const socket = socketId(ENDPOINT, {transports: ['websocket']});

type Props = {
    setOpen: (state: boolean) => void;
    data: any;
    user: any;
};

const CheckoutForm = ({ setOpen, data , user }: Props) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [createOrder, { data: orderData, error, isSuccess }] = useCreateOrderMutation();
    const [loadUser, setLoadUser] = useState(false);

    const { data: userData } = useLoadUserQuery({ skip: !loadUser });
    const router = useRouter();
    const userId=user?._id

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
    
        if (!stripe || !elements) {
            return;
        }
    
        try {
            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: window.location.href,
                },
                redirect: "if_required",
            });
    
            if (error) {
                setMessage(error.message || "An unexpected error occurred.");
            } else if (paymentIntent && paymentIntent.status === "succeeded") {
                const response = await createOrder({
                    courseId: data._id,
                    payment_info: paymentIntent,
                    userId: userId,
                }).unwrap(); // Use `.unwrap()` to get the response
    
                if (response) {
                    setMessage("Payment successful! Order created.");
                    setOpen(false);
                    router.push(`/course-access/${data._id}`); 
                }
            } else {
                setMessage("Payment could not be completed.");
            }
        } catch (err) {
            console.error("Error:", err);
            setMessage("An error occurred while processing your payment.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (orderData) {
            setLoadUser(true);
            socket.emit("notification", { 
                title: "New order",
                message: `New order from ${userData?.data?.name}`,
                userId: user._id, 
            });
            redirect(`/course-access/${data._id}`); // Use router.push for navigation
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage);
            }
        }
    }, [orderData, error, data, user._id, userData?.data?.name]);

    return (
        <div className="">
            <form id="payment-form" onSubmit={handleSubmit}>
                <LinkAuthenticationElement id="link-authentication-element" />
                <PaymentElement id="payment-element" />
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-md mt-5 self-center"
                    disabled={isLoading || !stripe || !elements}
                    id="submit"
                >
                    <span id="button-text text-black">
                        {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                    </span>
                </button>
                {message && <div id="payment-message">{message}</div>}
            </form>
        </div>
    );
};

export default CheckoutForm;
