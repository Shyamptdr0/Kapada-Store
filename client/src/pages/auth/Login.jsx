import React, {useState} from 'react';
import {data, Link} from "react-router-dom";
import CommonForm from "@/components/common/Form.jsx";
import {loginFormControls} from "@/config/index.jsx";
import {useDispatch} from "react-redux";
import {loginUser} from "@/store/auth-slice/index.js";
import {toast} from "sonner";

const initialState ={
    email: '',
    password: ''
}
function AuthLogin(props) {


    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch();

    function onSubmit(event){
        event.preventDefault()

        dispatch(loginUser(formData)).then((data)=>{
            if (data?.payload?.success){
                toast.success(data?.payload?.message, );
            }else {
                toast.error(data?.payload?.message);

            }
        })

    }

    return (
        <div className="mx-auto w-full max-w-md space-y-6">
            <div>
                <h1 className='text-3xl font-bold tracking-tight text-foreground'>Sign in to your account</h1>
                <p className='mt-2 '>Don't have an account
                    <Link className='font-medium text-primary  ml-2 hover:underline' to='/auth/register'>Register</Link>
                </p>
            </div>
            <CommonForm
                formControls={loginFormControls}
                buttonText={'Sign In'}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
            />
        </div>
    );
}

export default AuthLogin;