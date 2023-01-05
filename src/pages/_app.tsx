import '../../public/b5/css/bootstrap.css';
import '../cdn/css/look_css/css/look_base_v2.css';
import '../../public/fontawesome-free-5.15.3-web/css/all.css';
import "../cdn/css/animate.min.css";

import 'antd/dist/reset.css';
import '../cdn/css/style.css';
//import '../cdn/css/App.css';
import React, {useState, useEffect} from "react";
import Router from "next/router";
import NProgress from "nprogress";
import {Toaster} from "react-hot-toast";
// import { observer } from 'mobx-react-lite';
import {Provider} from 'react-redux'
import {persistStore} from 'redux-persist'
import {LoadingOutlined} from '@ant-design/icons';
import store from "../redux/store";

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());


const App = ({Component, pageProps}) => {
    persistStore(store);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {

            setLoading(false);
        }, 1000)
    }, []);
    return (
        <Provider store={store}>
            {
                loading ? (
                    <div
                        className="h-full w-100 bg-primary_transparent text-center d-flex flex-row justify-content-center align-items-center">
                        <LoadingOutlined className="text-primary" style={{fontSize: 60}} rotate={180}/>
                    </div>
                ) : (
                    <Component {...pageProps} />
                )
            }
            <Toaster
                duration={5000}
                position="top-center"
                reverseOrder={false}
                containerStyle={{zIndex: 99999999999}}
            />
        </Provider>
    )

};

export default App