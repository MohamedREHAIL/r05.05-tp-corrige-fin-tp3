import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import {param} from "ts-interface-checker";
import {Pagination} from "@mantine/core";
import Next = Pagination.Next;

export async function GET(request) {

   //  console.log("ffff")
   // console.log(request.url)
   //  console.log(request.nextUrl.search)
   //  return NextResponse.json({ok:true})





        const requestUrl = new URL(request.url)
        const code = requestUrl.searchParams.get('code')
console.log(code);

        if (code) {
            const supabase = createRouteHandlerClient({ cookies })
            try {
                await supabase.auth.exchangeCodeForSession(code);
            } catch (e) { return NextResponse.json({error: e}) }
        }



        // URL to redirect to after sign in process completes
        return NextResponse.redirect(requestUrl.origin)

    // const requestUrl = new URL(request.url)
    // const formData = await request.formData()
    // const email = formData.get('email')
    // const password = formData.get('password')
    // const cookieStore = cookies()
    // const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    //
    // await supabase.auth.signUp({
    //     email,
    //     password,
    //     options: {
    //         emailRedirectTo: `${requestUrl.origin}/api/auth/callback`,
    //     },
    // })
    //
    // return NextResponse.redirect(requestUrl.origin, {
    //     status: 301,
    // })
}