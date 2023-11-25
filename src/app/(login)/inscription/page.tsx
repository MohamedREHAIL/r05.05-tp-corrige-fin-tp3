
"use client"
import { z } from 'zod';

import { PasswordInput, Box , Group,TextInput} from '@mantine/core';
import {zodResolver , useForm} from  '@mantine/form'
import {Button, Card, NoticeMessage, useZodI18n, ZodI18nProvider} from "tp-kit/components";

const schema = z.object({
    name: z.string().nonempty(),
    email: z.string().email().nonempty(),
    password: z.string().min(6),
});
type FormValues = z.infer<typeof schema>;


// ... (other imports)

export default function InscriptionPage() {
    // Call useZodI18n once at the top level
    const form = useForm<FormValues>({
        initialValues: {
            name: 'fff',
            email: 'gggg@gmail.com',
            password: '21222222221',
        },
        validate: zodResolver(schema),
    });

    useZodI18n(z);

    return (
        <>
            <div className={"bg-white rounded-lg p-6 shadow-xl space-y-12 max-w-20rem  max-w-2xl mr-auto ml-auto"}>
                <h3>Inscription</h3>
                <NoticeMessage message={"Cette adresse n'est pas disponible"}></NoticeMessage>
                <NoticeMessage type={"success"} message={"Votre inscription a bien été prise en compte. Validez votre adresse email pour vous connecter"}></NoticeMessage>

                <ZodI18nProvider>
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
                        <Button fullWidth size="lg" type="submit">
                            S'inscrire
                        </Button>
                    </form>
                </ZodI18nProvider>
            </div>
        </>
    );
}
