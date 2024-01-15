"use client";

import {FC, memo, Fragment, useState, useEffect} from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuBar, Button } from "tp-kit/components";
import { ShoppingBag, X, User } from "@phosphor-icons/react";
import { Cart } from "./cart";
import { CartCounter } from "./cart-counter";
import Link from "next/link";
import {cookies} from "next/headers";
import {createClientComponentClient, createRouteHandlerClient} from "@supabase/auth-helpers-nextjs";
import {getUser} from "../utils/supabase";
import type { User as SupabaseUser } from '@supabase/gotrue-js';


type Props = {};

const Menu: FC<Props> = memo(  function () {

    const supabase = createClientComponentClient();
    const userPromise =getUser(supabase)

    const[user,setUser]=useState<SupabaseUser|null>(null)

    useEffect(()=>{
        userPromise.then(function(user) {
            setUser(user)
        });

    },[]);

    return (
        <MenuBar
            trailing={
                <div className="flex flex-row items-center gap-4 justify-end">
                    {user?
                    <Link href="/mon-compte">
                        <Button variant="ghost"
                                className="!rounded-full !p-0 h-[44px] w-[44px] flex justify-center items-center aspect-square relative text-3xl">
                            <User size="18" weight="bold"/>
                        </Button>
                    </Link>:
                        <Link href="/connexion">
                            <Button variant="ghost"
                                    className="!rounded-full !p-0 h-[44px] w-[44px] flex justify-center items-center aspect-square relative text-3xl">
                                <User size="18" weight="bold"/>
                            </Button>
                        </Link>
                    }

                    <Popover as="div" className="flex justify-end">
                        {({open}) => (
                            <>

                                {user ?

                                    <Popover.Button as={Button} variant={"ghost"}
                                                    className={"!rounded-full h-[44px] w-[44px] !p-0 flex justify-center items-center aspect-square relative text-3xl"}>
                                        {open
                                            ? <X size={18} weight="regular"/>
                                            : <ShoppingBag size={24} weight="regular"/>}

                                        <div
                                            className="aspect-square bg-brand text-white text-center text-xs absolute -right-1 -top-1 rounded-full flex items-center justify-center h-[20px] w-[20px]">
                                            <div><CartCounter/></div>
                                        </div>
                                    </Popover.Button> : <p></p>}

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-200"
                                    enterFrom="opacity-0 translate-y-1"
                                    enterTo="opacity-100 translate-y-0"
                                    leave="transition ease-in duration-150"
                                    leaveFrom="opacity-100 translate-y-0"
                                    leaveTo="opacity-0 translate-y-1"
                                >
                                    <Popover.Panel
                                        className="absolute left-0 sm:left-auto right-0 top-full z-10 mt-6 sm:w-full sm:max-w-sm">
                                        <Cart/>
                                    </Popover.Panel>
                                </Transition>
                            </>
                        )}
                    </Popover>
                </div>
            }
        />
    );
});

Menu.displayName = "Menu";
export { Menu };
