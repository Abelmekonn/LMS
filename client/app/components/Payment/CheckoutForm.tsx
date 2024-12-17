import React, { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
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
        <div>
            <form onSubmit={handleSubmit}>
                <h2 className="text-lg font-bold mb-4">Complete Payment</h2>
                <PaymentElement />
                {message && <p className="text-red-500 mt-2">{message}</p>}
                <button
                    type="submit"
                    disabled={!stripe || isLoading}
                    className={`mt-4 py-2 px-4 rounded bg-blue-500 text-white font-semibold ${
                        isLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                    {isLoading ? "Processing..." : "Pay Now"}
                </button>
            </form>
        </div>
    );
};

export default CheckoutForm;
