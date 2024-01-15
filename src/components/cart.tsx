"use client";

import {FC, memo, useCallback, useState} from "react";
import {ProductCartLine, FormattedPrice, Button, NoticeMessage} from "tp-kit/components";
import {
  removeLine,
  updateLine,
  computeCartTotal,
  useCart,
  clearCart,
} from "../hooks/use-cart";
import { createOrder } from "../actions/create-order";

type Props = {};

const Cart: FC<Props> = memo(function () {
  const lines = useCart((cart) => cart.lines);
  const wrapperClasses = "bg-white rounded-lg p-6 shadow-xl space-y-12";
    const [erreur, setError] = useState<string | null>(null);

    const handleCreateOrder = useCallback(async () => {
        try {
            await createOrder(useCart.getState());

            setError(null);
            if(erreur==null){
                clearCart();
            }
        } catch (error) {
            console.error("Error creating order:", error);
            setError("Une erreur s'est produite lors de la création de la commande.");
        }
    }, []);

  if (lines.length === 0)
    return (

      <div className={wrapperClasses}>
        <p className="my-12 text-center text-gray-600 text-sm">
          Votre panier est vide
        </p>
      </div>
    );

  return (

    <div className={wrapperClasses}>
        {console.log(erreur)}
        {erreur!==null?<NoticeMessage message={erreur}/>:<p></p>}
      <h2 className="text-sm uppercase font-bold tracking-wide">Mon panier</h2>

      <div className="space-y-4">
        {lines.map(({ product, qty }) => (
          <ProductCartLine
            key={product.id}
            product={product}
            qty={qty}
            onDelete={() => removeLine(product.id)}
            onQtyChange={(qty) => updateLine({ product, qty })}
          />
        ))}
      </div>

      <table className="w-full">
        <tbody>
          <tr>
            <th className="text-left">Total</th>
            <td className="text-right font-bold">
              <FormattedPrice price={computeCartTotal(lines)} />
            </td>
          </tr>
        </tbody>
      </table>

      <Button fullWidth size="lg" onClick={handleCreateOrder}>
        Commander
      </Button>
    </div>
  );
});

Cart.displayName = "Cart";
export { Cart };
