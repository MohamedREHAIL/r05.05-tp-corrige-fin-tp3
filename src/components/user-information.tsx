"use client";

import {FC, memo} from "react";
import {Props} from "next/script";
import {getUser} from "../utils/supabase";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";

const UserInformation: FC<Props> = function () {
    const supabase = createClientComponentClient();
    const user =getUser(supabase)
    return<>
        {console.log(user)}
    </>

}
export {UserInformation };




