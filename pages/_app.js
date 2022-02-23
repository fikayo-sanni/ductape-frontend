import '../public/b5/css/bootstrap.css';
import '../cdn/css/look_css/css/look_base_v2.css';
import '../public/fontawesome-free-5.15.3-web/css/all.css';
import "../cdn/css/animate.min.css";
//import 'react-image-lightbox/style.css';
import '../cdn/css/App.css';
import '../cdn/css/style.css';
import React from "react";
import Router, {useRouter} from "next/router";
import NProgress from "nprogress";


Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());


function App({ Component, pageProps }) {

        return (

                        <Component {...pageProps} />
        )

}

export default App