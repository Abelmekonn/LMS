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
            <h1>fkgvwngjnrrvger</h1>
            
        </div>
    )
}

export default CheckoutForm