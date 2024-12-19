import React, { useState } from "react";
import { PaymentElement, useStripe, useElements, LinkAuthenticationElement } from "@stripe/react-stripe-js";
import { useCreateOrderMutation } from "@/redux/features/orders/ordersApi";

type Props = {
    setOpen: (state: boolean) => void;
    data: any;
};

const CheckoutForm = ({ setOpen, data }: Props) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [createOrder] = useCreateOrderMutation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        if (!stripe || !elements) {
            setMessage("Stripe is not properly initialized.");
            setIsLoading(false);
            return;
        }

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.href,
            },
            redirect: "if_required", // Prevents automatic redirection
        });

        if (error) {
            setMessage(error.message || "An unexpected error occurred.");
            setIsLoading(false)
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            await createOrder({
                courseId: data.id,
                payment_info: {
                    id: paymentIntent.id,
                    status: paymentIntent.status,
                },
            });

            setMessage("Payment successful! Order created.");
            setOpen(false);
        } else {
            setMessage("Payment could not be completed.");
        }

        setIsLoading(false);
    };

    return (
        <div className="">

            <form id="payment-form" onSubmit={handleSubmit}>
                <LinkAuthenticationElement id="link-authentication-element"
                // Access the email value like so:
                // onChange={(event) => {
                //  setEmail(event.value.email);
                // }}
                //
                // Prefill the email field like so:
                // options={{defaultValues: {email: 'foo@bar.com'}}}
                />
                <PaymentElement id="payment-element" />
                <button className="bg-blue-500 text-white py-2 px-4 rounded-md mt-5 self-center " disabled={isLoading || !stripe || !elements} id="submit">
                    <span id="button-text text-black">
                        {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                    </span>
                </button>
                {/* Show any error or success messages */}
                {message && <div id="payment-message">{message}</div>}
            </form>
        </div>
    );
};

export default CheckoutForm;
