import React from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.jsx";

import ProductStockChart from "@/components/admin-view/Chart.jsx";
import AdminClientList from "@/components/admin-view/User.jsx";

function AdminDashboard(props) {


    return (
       <div>
           <div className="container max-auto grid grid-cols-1 gap-8 ">
                   <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm m-10">
                       <Tabs defaultValue="user">
                           <TabsList>
                               <TabsTrigger value="user">
                                   User
                               </TabsTrigger>
                               <TabsTrigger value="chart">
                                   Chart
                               </TabsTrigger>
                               <TabsTrigger value="aa">
                                   aaa
                               </TabsTrigger>
                           </TabsList>
                           <TabsContent value="user">
                             <AdminClientList/>
                           </TabsContent>
                           <TabsContent value="chart">
                                  <ProductStockChart/>
                           </TabsContent>
                           <TabsContent value="aa">

                           </TabsContent>
                       </Tabs>
                   </div>
               </div>
       </div>
    );
}

export default AdminDashboard;