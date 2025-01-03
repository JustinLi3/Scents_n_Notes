import React from "react"; 
import BaseLayout from "../Blog/baseLayout"; 
import { useForm } from "react-hook-form" 

const Login = () => {  
    const {register, handleSubmit} = useForm(); 
    const onSubmit = (d) => 
        alert(JSON.stringify(d));
    return(
        <BaseLayout title="Login"> 
            <div style={{marginTop:"120px"}} className="content-section border border-light p-3 rounded ">
                <form onSubmit={handleSubmit(onSubmit)} method="POST">         
                    <fieldset className="form-group"> 
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input class="form-control" id="username" placeholder="Enter username" {...register("username")}/>
                            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" id="password" placeholder="Enter password" {...register("password")}/>
                        </div> 
                        <legend className="border-bottom mb-4">Log In</legend> 
                    </fieldset> 
                    <div className="form-group">
                        <button className="btn btn-sm btn-outline-info" type="submit">Login</button> 
                        <small className="text-muted ml-4">
                            <a href="{`/password_reset/`}">Forgot Password?</a>
                        </small>
                    </div>
                </form> 
                <div className="border-top pt-3">
                    <small className="text-muted">
                        Need an Account?
                        <a className="ml-2" href="{`/register/`}">Sign In</a>
                    </small>
                </div>
        </div>
        </BaseLayout>  
    );
};

export default Login;