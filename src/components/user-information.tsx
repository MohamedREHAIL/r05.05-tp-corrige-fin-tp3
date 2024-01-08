"use client";

import {FC, memo, useState} from "react";
import {Props} from "next/script";
import {getUser} from "../utils/supabase";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {Button} from "tp-kit/components";
import {useRouter} from "next/navigation";



const UserInformation: FC<Props> = function () {
    const supabase = createClientComponentClient();
    const userPromise =getUser(supabase)
    userPromise.then(console.log)
    const router = useRouter()

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.refresh()
    }

    const[user,setUser]=useState(null)

    userPromise.then(function(resultat) {
        // Vous pouvez accéder à l'objet user ici
        var users = resultat;
        setUser(users)
        //console.log(user);
    }).catch(function(erreur) {
        // Gérer les erreurs ici, si nécessaire
        console.error(erreur);
    });

    return(<>



        {user?console.log(user.email):console.log("eee")}

        {user ?
            <div className="bg-white rounded-lg p-6 shadow-lg mr-20">
                <h2>Mon compte</h2><br/>
                <h3>Bonjour, {user.user_metadata.name} </h3><br/>
                <p>email: {user.email}</p><br/>
                <p> nom: {user.user_metadata.name}</p><br/>
                <Button onClick={handleSignOut} >Se déconnecter</Button>
            </div>


            : <p></p>

        }
    </>)

}
export {UserInformation };




