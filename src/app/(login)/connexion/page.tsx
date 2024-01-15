"use client"
import { TextInput } from '@mantine/core';
import { z } from 'zod';
import { PasswordInput, Box } from '@mantine/core';
import { zodResolver,useForm } from '@mantine/form';
import {ProductCartLine, FormattedPrice, Button, NoticeMessage, useZodI18n, ZodI18nProvider} from "tp-kit/components";
import {useRouter} from "next/navigation";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {useState} from "react";


const schema = z.object({
    
    email: z.string().email(),
    password: z.string().min(6),
  });
export default function ConnexionPage() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const supabase = createClientComponentClient()
    let [responses, setResponses] = useState()
    useZodI18n(z);
    const form = useForm({
        validate: zodResolver(schema),
        initialValues: {
          email: 'fff@gmail.com',
          password: 'rrrrrreeeee',
          termsOfService: false,
        },
    
        
      });




    const handleSignIn = async () => {
        const responsess= await supabase.auth.signInWithPassword({
            email,
            password,
            options: {
                emailRedirectTo: 'localhost:3000'

            }
        })


         setResponses(responsess.error?.message)
        console.log(responsess)
        router.refresh()
        return responsess
    }

return<>

    <div className={"bg-white rounded-lg p-6 shadow-xl space-y-12 max-w-20rem  max-w-2xl mr-auto ml-auto"} >
        <h3>Connexion</h3>
        {/*<NoticeMessage message={"Cette adresse n'est pas disponible"}></NoticeMessage>*/}
        {/*<NoticeMessage type={"success"} message={"Votre inscription a bien été prise en compte.valider votre adresse email pour vous connecter"}></NoticeMessage>*/}
        <ZodI18nProvider>
        <form onSubmit={form.onSubmit(handleSignIn)}>
            {responses!=undefined?


                <NoticeMessage message={responses}></NoticeMessage>:<p></p>


            }
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
  <Button fullWidth size="lg" type="submit">Se connecter</Button>
  </form>
        </ZodI18nProvider>
  
</div>;
</>

}