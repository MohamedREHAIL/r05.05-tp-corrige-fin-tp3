
"use client"
import { z } from 'zod';

import { PasswordInput, Box , Group,TextInput} from '@mantine/core';
import {zodResolver , useForm} from  '@mantine/form'
import {Button, Card, NoticeMessage} from "tp-kit/components";

const schema = z.object({
    name: z.string().min(2, { message: 'Le nom doit contenir au minimum 2 caractères' }),
    email: z.string().email({ message: 'Email invalide' }),
    password: z.string().length().min(6, { message: 'le mot de passe doit contenir plus de 6 caractères' }),
  });


export default function InscriptionPage() {
    const form = useForm({
        validate: zodResolver(schema),
        initialValues: {
          name:'',
          email:'',
          password:'',
          termsOfService: false,
        },
    
        
      });
return<>

<div className={"bg-white rounded-lg p-6 shadow-xl space-y-12 max-w-20rem  max-w-2xl mr-auto ml-auto"} >

    <h3>Inscription</h3>
    <NoticeMessage message={"Cette adresse n'est pas disponible"}></NoticeMessage>
    <NoticeMessage type={"success"} message={"Votre inscription a bien été prise en compte.valider votre adresse email pour vous connecter"}></NoticeMessage>
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
    <TextInput
            label="Nom"
            description="Le nom qui sera utilisé pour vos commandes"
            placeholder="Nom"
            {...form.getInputProps('name')}
        />
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
      
          <Button fullWidth size="lg" type="submit">S'inscrire</Button>
        
    
    </form>
  
</div>;
</>

}