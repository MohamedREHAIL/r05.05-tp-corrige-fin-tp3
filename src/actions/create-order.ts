"use server";

import { computeCartTotal, computeLineSubtotal } from "../hooks/use-cart";
import { CartData } from "../types";
import prisma from "../utils/prisma";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getUser } from "../utils/supabase";

export async function createOrder(cart: CartData) {

    const supabase = createServerComponentClient({cookies})

    const user = await getUser(supabase)
    console.log("ssaaa", user)
    let userId = null

    if (user !== undefined) {
      userId = user.id
    }

    await prisma.order.create({
      data: {
        total: computeCartTotal(cart.lines),
        lines: {
          create: cart.lines.map(line => ({
            productId: line.product.id,
            qty: line.qty,
            subtotal: computeLineSubtotal(line)
          }))
        },
        userId: userId,
      }
    });



}
