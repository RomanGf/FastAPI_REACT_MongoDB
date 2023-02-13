import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "./api/axios";
import { setToken } from "./Auth"; 


var qs = require('qs')

export const Login = () => {

    let navigate = useNavigate();
    const {
        register, handleSubmit, formState: { error },
    } = useForm()
    console.log('IM before form submit');
    const onFormSubmit = async(data) => {
        const params = qs.stringify({
            'username': data.email,
            'password': data.password,
        });
        
        const headers = {
        'accept': 'application/json',
        'Content-type': 'application/x-www-form-urlencoded',
        }
        
        axios.post('/user/signin', params, headers)
        .then(response => {

            if (response.status === 200) {
                console.log(response.data);
                setToken(response.data.token)
                navigate('/profile')
            }
        })
        .catch(e => {
            console.log('Login error');
            console.log(e.request);
        })
    }
    
    const onErrors = (error) => {console.log(error);}
    
    return (
        <div className="card" >
            <form 
            className='form-signin' 
            onSubmit={ handleSubmit(onFormSubmit, onErrors) }
            >
                <h2>Login Page</h2>
                <div className="form-outline mb-4">
                    <input 
                    type="email" 
                    id="form2Example1" 
                    className="form-control" 
                    placeholder="email@email.com"
                    name='email'
                    autoComplete="off"
                    {...register('email', { required: "The email is required" })}
                    />
                    {error?.email && error.email.message}
                    <label className="form-label" >Email address</label>
                </div>

                <div className="form-outline mb-4">
                    <input 
                    type="password" 
                    id="form2Example2" 
                    className="form-control" 
                    placeholder="your password"
                    name="password"
                    {...register('password', { required: 'The password is required' })}
                    />
                    {error?.password && error.password.message}

                    <label className="form-label" >Password</label>
                </div>

                <button type="button" >Login</button>

                {/* <button type="button" className="btn btn-primary btn-block mb-4">Sign in</button> */}
            </form>
        </div>
    )
}