import React from "react"; 
import Axios from "axios";
import BaseLayout from "../Blog/baseLayout";
import { useForm } from "react-hook-form" 

const Register = () => {
    const {register, handleSubmit, watch, formState: { errors }} = useForm();  
    const password = watch("password");
    const onSubmit = async (d) => {
        try {
            const response = await Axios.post(
                "http://127.0.0.1:8000/api/register/",
                {
                    headers: {
                        "Content-Type": "application/json",
                        // Include CSRF token if required
                        "X-CSRFToken": getCookie("csrftoken"), // Function below to get the CSRF token
                      },
                }
            )
        }
        }
    }
        Axios.post(`URL`, JSON.stringify(d),
        {
            headers: {
                "Authorization": `AUTHORIZATION_KEY`,
                "Content-Type": 'application/json'
            }
        }
    )
    .then(res => console.log(res))
    .catch(error => console.err(error))
    return (
        <BaseLayout title="Register"> 
             <div className="content-section border border-muted p-3 rounded ">
                <form  onSubmit={handleSubmit(onSubmit)} method="POST"> 
                    <fieldset className="form-group">
                        <div className="form-group">
                            <label htmlFor="username">Username*</label>
                            <input className="form-control" id="username" {...register("username")} required/>
                            <small className="form-text text-muted">Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email*</label>
                            <input type="email" className="form-control" id="email" {...register("email")} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" {...register("password", {required: "Password is required",minLength: {value: 8,message: "Password must be at least 8 characters"},})} />
                            <ul className="form-text text-muted">
                                <li>Your password can’t be too similar to your other personal information.</li>
                                <li>Your password must contain at least 8 characters.</li>
                                <li>Your password can’t be a commonly used password.</li>
                                <li>Your password can’t be entirely numeric.</li>
                            </ul>
                        </div> 
                        <div className="form-group">
                            <label htmlFor="passwordConfirm">Password confirmation</label>
                            <input
                                type="password"
                                className="form-control"
                                id="passwordConfirm"
                                {...register("passwordConfirm", {
                                required: "Password confirmation is required",
                                validate: (value) =>
                                    value === password || "Passwords do not match",
                                })}
                            />
                            <small className="form-text text-muted">
                                Enter the same password as before, for verification.
                            </small>
                            {errors.passwordConfirm && (
                                <span className="text-danger">
                                {errors.passwordConfirm.message}
                                </span>
                            )}
                        </div>
                        <div className="form-group">
                            <button className="btn btn-outline-info" type="submit">Sign Up</button>
                        </div>
                        <legend className="border-bottom mb-4">Register</legend> 
                        
                    </fieldset> 
                </form> 
                <div className="border-top pt-3">
                    <small className="text-muted">
                        Already Have An Account?
                        <a className="ml-2" href="{% url 'login' %}">Sign In</a>
                    </small>
                </div>
        </div>
        </BaseLayout>
    )
}

export default Register;