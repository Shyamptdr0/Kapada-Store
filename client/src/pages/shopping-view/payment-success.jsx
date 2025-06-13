import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { BadgeDollarSign } from "lucide-react";

function PaymentSuccessPage() {
    const navigate = useNavigate();

    return (
        <div className="mt-20 m-4 flex items-center justify-center">
            <Card className="p-10 w-full max-w-xl text-center">
                <CardHeader className="p-0">
                    <CardTitle className="text-4xl font-bold mb-6">Payment Successful!</CardTitle>
                </CardHeader>

                {/* Animated Icon */}
                <div className="flex justify-center mb-6">
                    <BadgeDollarSign className="w-24 h-24 text-green-600 animate-floating" />
                </div>

                <Button onClick={() => navigate("/shop/account")}>
                    View Orders
                </Button>
            </Card>
        </div>
    );
}

export default PaymentSuccessPage;
