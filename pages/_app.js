import '../public/b5/css/bootstrap.css';
import '../cdn/css/look_css/css/look_base_v2.css';
import '../public/fontawesome-free-5.15.3-web/css/all.css';
import "../cdn/css/animate.min.css";
import '../cdn/css/App.css';
import '../cdn/css/style.css';
import React from "react";
import Router, {useRouter} from "next/router";
import NProgress from "nprogress";
import {Toaster} from "react-hot-toast";


Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());


function App({Component, pageProps}) {

    return (
        <>
            <Component {...pageProps} />
            <Toaster
                duration={5000}
                position="top-center"
                reverseOrder={false}
                containerStyle={{zIndex: 99999999999}}
            />
        </>
    )

}

export default App