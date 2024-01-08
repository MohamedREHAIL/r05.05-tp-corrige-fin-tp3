import { ReactNode } from "react";
import { SectionContainer } from "tp-kit/components";
import prisma from "../../utils/prisma";
import { OrderTable } from "../../components/order-table";
import {Card} from "@mantine/core";
import {UserInformation} from "../../components/user-information";

export default async function Layout({ children }: { children: ReactNode }) {
  const orders = await prisma.order.findMany();

  return (
    <>
      {/* Orders list */}
        <SectionContainer wrapperClassName="py-24 min-h-[80vh]">
            <div className="flex">
                <div >
                    <UserInformation></UserInformation>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-lg">
                    <OrderTable orders={orders}/>
                </div>

            </div>
        </SectionContainer>


        {/* Children */}
        {children}
    </>
  );
}
