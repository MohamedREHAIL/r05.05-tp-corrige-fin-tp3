import {ZodI18nProvider} from "tp-kit/components";

export  default function Layout({children}:any){

    return <ZodI18nProvider>{children}</ZodI18nProvider>

}