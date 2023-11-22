"use client"
import { TextInput } from '@mantine/core';
import { z } from 'zod';
import { PasswordInput, Box } from '@mantine/core';
import { zodResolver,useForm } from '@mantine/form';
import { ProductCartLine, FormattedPrice, Button } from "tp-kit/components";


const schema = z.object({
    
    email: z.string().email({ message: 'Email invalide' }),
    password: z.string().length().min(6, { message: 'le mot de passe doit contenir plus de 6 caractères' }),
  });
export default function ConnexionPage() {

    const form = useForm({
        validate: zodResolver(schema),
        initialValues: {
          email: '',
          password: '',
          termsOfService: false,
        },
    
        
      });
return<>
    
<Box maw={340} mx="auto">
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
  
</Box>;
</>

}