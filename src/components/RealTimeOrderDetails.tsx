"use client"
import {Props} from "next/script";
import {FC, useEffect,useState} from "react";
import { createClient } from '@supabase/supabase-js'
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {OrderDetailsLayout} from "tp-kit/components";



const RealTimeOrderDetails = ({ order }) => {
    const [realTimeOrder, setRealTimeOrder] = useState(order);
    const supabase = createClientComponentClient()


    useEffect(() => {
     
        const fetchOrder = async () => {
            const channel = supabase
                .channel('Order')
                .on(
                    'postgres_changes',
                    {
                        event: 'UPDATE',
                        schema: 'public',
                        table:'Order'
                    },
                    (payload) => setRealTimeOrder(payload.new)

                )
                .subscribe()

        };

        fetchOrder();


    }, [order]);

    return <OrderDetailsLayout order={realTimeOrder} />;
};
export {RealTimeOrderDetails };