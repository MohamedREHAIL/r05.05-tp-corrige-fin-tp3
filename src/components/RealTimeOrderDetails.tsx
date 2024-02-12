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
        let subscription;
        const fetchOrder = async () => {
            subscription = supabase
                .from('Order')
                .select('*')
                .eq('id', order.id)
                .subscribe((payload) => {
                    if (payload.eventType === 'UPDATE') {
                        setRealTimeOrder(payload.new);
                    }
                });
        };

        fetchOrder();

        return () => {
            if (subscription) {
                subscription.unsubscribe();
            }
        };
    }, [order]);

    return <OrderDetailsLayout order={realTimeOrder} />;
};
export {RealTimeOrderDetails };