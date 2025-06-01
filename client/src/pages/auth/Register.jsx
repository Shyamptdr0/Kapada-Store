import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import CommonForm from "@/components/common/Form.jsx";
import {registerFormControls} from "@/config/index.jsx";
import {useDispatch} from "react-redux";
import {registerUser} from "@/store/auth-slice/index.js";
import { toast } from "sonner"; // ✅ Fixed import

const initialState = {
    userName: '',
    email: '',
    password: ''
};

function AuthRegister(props) {

    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function onSubmit(event) {
        event.preventDefault();
        dispatch(registerUser(formData)).then((data) => {
            if (data?.payload?.success) {
                toast.success(data?.payload?.message);
                navigate('/auth/login');
            } else {
                toast.error(data?.payload?.message,);

            }
        });
    }

    return (
        <div className="mx-auto w-full max-w-md space-y-6">
            <div>
                <h1 className='text-3xl font-bold tracking-tight text-foreground'>Create New Account</h1>
                <p className='mt-2'>Already have an account
                    <Link className='font-medium text-primary ml-2 hover:underline' to='/auth/login'>Login</Link>
                </p>
            </div>
            <CommonForm
                formControls={registerFormControls}
                buttonText={'Sign Up'}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
            />
        </div>
    );
}

export default AuthRegister;
