import {ZodI18nProvider} from "tp-kit/components";
import {
    createClientComponentClient,
    createRouteHandlerClient,
    createServerComponentClient
} from "@supabase/auth-helpers-nextjs";
import {getUser} from "../../utils/supabase";
import {redirect} from "next/navigation";
import {useState} from "react";
import {cookies} from "next/headers";

export  default async function Layout({children}: any) {

    const supabase = createServerComponentClient({cookies})
    const user = await getUser(supabase)

    console.log("bbbb", user)




    if(user) redirect('http://localhost:3000/mon-compte')

        //console.log(user);




    // if(userPromise!=null){
    //     redirect('http://localhost:3000/mon-compte')
    // }else{
    //     redirect('http://localhost:3000/connexion')
    // }
    return <ZodI18nProvider>{children}</ZodI18nProvider>


}