"use client"
import {Props} from "next/script";
import {FC, useEffect} from "react";
import { createClient } from '@supabase/supabase-js'
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {OrderDetailsLayout} from "tp-kit/components";





const RealTimeOrderDetails: (order) => JSX.Element = function (order) {

    const supabase = createClientComponentClient()

    useEffect(()=>{
        const channel = supabase
            .channel('schema-db-changes')
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                },
                (payload) => console.log(payload)
            )
            .subscribe()
    })

return <OrderDetailsLayout order={order}/>
}


export {RealTimeOrderDetails };