
"use client"
import { z } from 'zod';

import { PasswordInput, Box , Group,TextInput} from '@mantine/core';
import {zodResolver , useForm} from  '@mantine/form'
import {Button, Card, NoticeMessage, useZodI18n, ZodI18nProvider} from "tp-kit/components";
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";

const schema = z.object({
    name: z.string().nonempty(),
    email: z.string().email().nonempty(),
    password: z.string().min(6),
});
type FormValues = z.infer<typeof schema>;




export default function InscriptionPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let [responses, setResponses] = useState()
    const router = useRouter()
    const supabase = createClientComponentClient()



    const handleSignUp = async () => {
      const responsess=  await supabase.auth.signUp({

            email,
            password,
            options: {
                data:{
                    name:name
                },
                emailRedirectTo: `${location.origin}/api/auth/callback`,
            }

        })
        router.refresh()
        setResponses(responsess.error?.message)
        return responsess


    }

    const handleSignIn = async () => {
       console.log( await supabase.auth.signInWithPassword({
            email,
            password,
           options:{

           }
        }))
        router.refresh()
    }

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.refresh()
    }



    useZodI18n(z);
    const form = useForm<FormValues>({

        initialValues: {
            name: 'fff',
            email: 'gggg@gmail.com',
            password: '21222222221',
        },
        validate: zodResolver(schema),
    });



    return (
        <>
            <div className={"bg-white rounded-lg p-6 shadow-xl space-y-12 max-w-20rem  max-w-2xl mr-auto ml-auto"}>
                <h3>Inscription</h3>
                {/*<NoticeMessage message={"Cette adresse n'est pas disponible"}></NoticeMessage>*/}
                {/*<NoticeMessage type={"success"} message={"Votre inscription a bien été prise en compte. Validez votre adresse email pour vous connecter"}></NoticeMessage>*/}


                    <form onSubmit={form.onSubmit(handleSignUp)}>

                        {responses!=undefined?


                                   <NoticeMessage message={responses}></NoticeMessage>:<p></p>


                        }

                        <TextInput
                            label="Nom"
                            description="Le nom qui sera utilisé pour vos commandes"
                            placeholder="Nom"
                            {...form.getInputProps('name')}
                            value={name}

                            onChange={(event) => setName(event.currentTarget.value)}
                        />
                        <TextInput
                            label="adresse email"
                            placeholder="Input placeholder"
                            {...form.getInputProps('email')}
                            value={email}

                            onChange={(event) => setEmail(event.currentTarget.value)}

                        />
                        <PasswordInput
                            label="Mot de passe"
                            placeholder="Input placeholder"
                            {...form.getInputProps('password')}
                            value={password}

                            onChange={(event) => setPassword(event.currentTarget.value)}
                        />
                        <Button fullWidth size="lg" type="submit">
                            S'inscrire
                        </Button>



                    </form>

            </div>
        </>
    );
}


/*



 */