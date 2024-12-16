import React, { useState } from 'react'
import { LinkAuthenticationElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useCreateOrderMutation } from '@/redux/features/orders/ordersApi';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';


type Props = {
    setOpen: any;
    data: any;
}

const CheckoutForm = ({ setOpen, data }: Props) => {
    const stripe = useStripe()
    const elements = useElements()
    const [message, setMessage] = useState<any>("")
    const [createOrder, { data: orderData, error }] = useCreateOrderMutation({})
    const [loadUser, setLoadUser] = useState(false)
    const { } = useLoadUserQuery({ skip: loadUser ? false : true })
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault()
    }

    return (
        <div>
            <form id="payment-form" onSubmit={handleSubmit}>
                <LinkAuthenticationElement id="link-authentication-element"/>
                <PaymentElement id="payment-element" />
                <button disabled={isLoading || !stripe || !elements} id="submit">
                    <span id="button-text">
                        {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                    </span>
                </button>
                {/* Show any error or success messages */}
                {message && <div id="payment-message">{message}</div>}
            </form>
        </div>
    )
}

export default CheckoutForm