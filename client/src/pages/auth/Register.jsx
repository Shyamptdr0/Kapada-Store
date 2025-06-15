import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import CommonForm from "@/components/common/Form.jsx";
import { registerFormControls } from "@/config/index.jsx";
import { useDispatch } from "react-redux";
import { registerUser } from "@/store/auth-slice/index.js";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton.jsx";

const initialState = {
    userName: '',
    email: '',
    password: ''
};

function AuthRegister() {
    const [formData, setFormData] = useState(initialState);
    // const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (event) => {
        event.preventDefault();
        // setLoading(true);

        dispatch(registerUser(formData)).then((data) => {
            // setLoading(false);
            if (data?.payload?.success) {
                toast.success(data?.payload?.message);
                navigate('/auth/login');
            } else {
                toast.error(data?.payload?.message);
            }
        });
    };

    // if (loading) {
    //     return (
    //         <div className="w-full max-w-md mx-auto space-y-4">
    //             <Skeleton className="h-8 w-3/4" />
    //             <Skeleton className="h-5 w-full" />
    //             <Skeleton className="h-10 w-full" />
    //             <Skeleton className="h-10 w-full" />
    //             <Skeleton className="h-10 w-full" />
    //             <Skeleton className="h-10 w-full" />
    //         </div>
    //     );
    // }

    return (
        <div className="mx-auto w-full max-w-md space-y-6">
            <div>
                <h1 className='text-3xl font-bold tracking-tight text-foreground'>Create New Account</h1>
                <p className='mt-2'>Already have an account?
                    <Link className='font-medium text-primary ml-2 hover:underline' to='/auth/login'>Login</Link>
                </p>
            </div>
            <CommonForm
                formControls={registerFormControls}
                buttonText="Sign Up"
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
            />
        </div>
    );
}

export default AuthRegister;
