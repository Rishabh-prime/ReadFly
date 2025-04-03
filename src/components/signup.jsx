import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice'
import {Button, Input, Logo} from './index'
import {useDispatch} from 'react-redux'
import authService from '../appwrite/auth'
import {useForm} from 'react-hook-form'


export function Signup(props) {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();

    const signup = async(data) =>{
        setError("");
        try {
            const signupSession = await authService.createAccount(data);
           if(signupSession){
            const signupUser = await authService.getCurrentuser();
            if(signupUser){
                dispatch(login(signupUser));
                navigate("/");
            }
           }
            
        } catch (error) {
           setError(error.message); 
        }
    }
    return (
        <>
           <div className="flex items-center justify-center">
           <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
           <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>

                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>} /// Importnat line 

            <form onSubmit={handleSubmit(signup)}>
             <div className='space-y-5'>

                <Input
                 label="Full Name"
                 palceholders = "Enter your full name"
                 {...register("name",{
                    required: true,
                    minLength: 2,
                    maxLength: 50,
                 })}
                />
                <Input
                 label="Email: "
                 placeholder="Enter your email"
                 type="email"
                 {...register("email", {
                 required: true,
                 validate: {
                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
                  }
                })}
                />

                <Input
                label= "Password"
                 palceholders= "Enter your Password"
                 type= "password"
                 {...register("pasword",{
                  required: true,
                  minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
                 maxLength: {
                 value: 20,
                  message: "Password must be at most 20 characters long",
                 },
                 })}
                  />
                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                
             </div>
            </form>
           </div>
           </div>

            
        </>
    )
}

export default Signup