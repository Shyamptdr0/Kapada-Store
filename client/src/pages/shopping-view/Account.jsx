import React from 'react';
import accountImage from "../../assets/account.jpg"
import {Tabs, TabsList, TabsTrigger,TabsContent} from "@/components/ui/tabs.jsx";
import Address from "@/components/shopping-view/Address.jsx";
import ShoppingOrders from "@/components/shopping-view/Orders.jsx";


function ShoppingAccount() {
    return (
        <div className="flex flex-col mt-16">
           <div className="relative h-[300px] w-full overflow-hidden">
               <img
                   src={accountImage}
                   alt="account Image"
                   className="w-full h-full object-center object-cover"
               />
           </div>
            <div className="container max-auto grid grid-cols-1 gap-8 py-8">
              <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm m-10">
                <Tabs defaultValue="orders">
                    <TabsList>
                        <TabsTrigger value="orders">
                            Orders
                        </TabsTrigger>
                        <TabsTrigger value="address">
                            Address
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="orders">
                        <ShoppingOrders/>
                    </TabsContent>
                    <TabsContent value="address">
                        <Address/>
                    </TabsContent>
                </Tabs>
              </div>
            </div>
        </div>
    );
}

export default ShoppingAccount;