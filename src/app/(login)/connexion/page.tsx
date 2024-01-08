"use client"
import { TextInput } from '@mantine/core';
import { z } from 'zod';
import { PasswordInput, Box } from '@mantine/core';
import { zodResolver,useForm } from '@mantine/form';
import {ProductCartLine, FormattedPrice, Button, NoticeMessage, useZodI18n, ZodI18nProvider} from "tp-kit/components";


const schema = z.object({
    
    email: z.string().email(),
    password: z.string().min(6),
  });
export default function ConnexionPage() {
    useZodI18n(z);
    const form = useForm({
        validate: zodResolver(schema),
        initialValues: {
          email: 'fff@gmail.com',
          password: 'rrrrrreeeee',
          termsOfService: false,
        },
    
        
      });

return<>

    <div className={"bg-white rounded-lg p-6 shadow-xl space-y-12 max-w-20rem  max-w-2xl mr-auto ml-auto"} >
        <h3>Connexion</h3>
        <NoticeMessage message={"Cette adresse n'est pas disponible"}></NoticeMessage>
        <NoticeMessage type={"success"} message={"Votre inscription a bien été prise en compte.valider votre adresse email pour vous connecter"}></NoticeMessage>
        <ZodI18nProvider>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>

    <TextInput
    label="adresse email"
    placeholder="Input placeholder"
    {...form.getInputProps('email')}
  />
   <PasswordInput
      label="Mot de passe"
      placeholder="Input placeholder"
      {...form.getInputProps('password')}
    />
  <Button fullWidth size="lg" type="submit">Se connecter</Button>
  </form>
        </ZodI18nProvider>
  
</div>;
</>

}