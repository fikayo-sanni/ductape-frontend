import Home_layout from "../components/layout/home_layout";
import React, {useEffect, useState} from "react";
import NProgress from "nprogress";
import {toast} from "react-hot-toast";
import {Logo} from '../components/config/constant';
import Router from "next/router";
import { loginUser } from "../components/services/users.service";
import { fetchWorkspaces } from "../components/services/workspaces.service";
import Link from "next/link";
import {useDispatch} from "react-redux";
import {changeUser, changeWorkspaces, changeDefaultWorkspaceId} from "../data/applicationSlice";

const Index = (props) => {
    const dispatch = useDispatch();

    const [loadingButton, setLoadingButton] = useState(false);
    const [user, setUser] = useState({});


    const handleChange = e =>
        setUser({...user, [e.target.name]: e.target.value});

    const login = async(e, buttonId) => {
        e.preventDefault();
        try {
            setLoadingButton(true);
            NProgress.start();
            //toast.success('Registration successful')
            const login = await loginUser(user);
            console.log(login);
            const userData = login.data.data;
            dispatch(changeUser(userData));
            toast.success('Login successful')
            const { workspaces } = login.data.data;
            if(workspaces.length){
                const {auth_token: token, public_key, _id: user_id} = userData;
                const spaces = await fetchWorkspaces({token, public_key, user_id});
                const {data} = spaces.data;
                let defaultChanged = false;
                data.map((d,i)=>{
                    if(d.default){
                        defaultChanged = true;
                        dispatch(changeDefaultWorkspaceId(d.workspace_id))
                    }
                })
                if(!defaultChanged) dispatch(changeDefaultWorkspaceId(data[0].workspace_id));

                dispatch(changeWorkspaces(data));
                Router.push('/dashboard');
            }else{ 
                Router.push('/workspaces');
            }
        } catch (e) {
            setLoadingButton(false)
            NProgress.done()
            console.log('An error occurred', e.response);
            const error = e.response? e.response.data.errors: e.toString();
            toast.error(error || e.toString())
        }
    }

    useEffect(() => {

    }, [])

    return (
        <Home_layout title="Home">
            <div className="h-100 row g-0">
                <div className="col-lg-12 order-1 order-lg-0 d-flex flex-column bg-primary-transparent padding_50">

                    <Logo size="full" className="mb-5 justify-content-center"/>

                    <div className="col-xl-4 col-lg-6 col-md-8 mt-4 col-sm-10 mb-auto mx-auto">

                        <div className="bg-white login_box shadow">
                            <h4 className="text-center mb-5 font-weight-700">Sign In</h4>

                            <form id="login_form" onSubmit={(e) => login(e, 'login_button')}>
                                <div className="row">

                                    <div className="col-12 mb-4">
                                        <div className="form-floating">
                                            <input type="email" value={user.email} onChange={handleChange} required
                                                   className="form-control" placeholder="email" name="email"/>
                                            <label>Email</label>
                                        </div>
                                    </div>

                                    <div className="col-12 mb-4">
                                        <div className="form-floating">
                                            <input type="password" value={user.password} onChange={handleChange} required
                                                   className="form-control" placeholder="password" name="password"/>
                                            <label>Password</label>
                                        </div>
                                    </div>

                                    <div className="col-lg-12 mx-auto">

                                        <button className="btn btn-lg p-3 mt-4 btn-primary w-100" disabled={loadingButton}
                                                id="reg_button">Login
                                        </button>
                                        <p className="mb-0 mt-4 text-center">Forgot your password? <Link href="reset">
                                                <a className="">Reset password</a>
                                            </Link>
                                        </p>
                                        <p className="mb-0 mt-4 text-center">
                                            <Link href="register">
                                                <a className="">Create an
                                                    account</a>
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>


                    <div className="text-center">
                        <span className="me-4">&copy; 2022</span>
                        <a href="" className="font-gray-3 me-4">Privacy policy</a>
                        <a href="" className="font-gray-3">Terms & conditions</a>
                    </div>

                </div>

            </div>
        </Home_layout>
    )
}

export default Index