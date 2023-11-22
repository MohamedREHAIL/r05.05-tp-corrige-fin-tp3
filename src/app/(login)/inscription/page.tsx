
"use client"
import { z } from 'zod';

import { PasswordInput, Box , Group,TextInput} from '@mantine/core';
import {zodResolver , useForm} from  '@mantine/form'
import {  Button } from "tp-kit/components";

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
    
<Box maw={360} mx="auto">
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
  
</Box>;
</>

}