import '../../public/b5/css/bootstrap.css';
import '../cdn/css/look_css/css/look_base_v2.css';
import '../../public/fontawesome-free-5.15.3-web/css/all.css';
import '../cdn/css/animate.min.css';
import 'antd/dist/reset.css';
import '../cdn/css/style.css';
import '@uiw/react-markdown-preview/esm/styles/markdown.css';
import '../cdn/css/markdown.css';
import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import store from '../redux/store';
import dynamic from 'next/dynamic';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const Loading = dynamic(() => import('../components/common/loading'));

const App = ({ Component, pageProps }) => {
    persistStore(store);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);
    return (
        <Provider store={store}>
            {loading ? (
                <div className="h-full w-100 text-center d-flex flex-row justify-content-center align-items-center">
                    <Loading />
                </div>
            ) : (
                <Component {...pageProps} />
            )}
            <Toaster
                toastOptions={{
                    duration: 5000,
                }}
                position="bottom-left"
                reverseOrder={false}
                containerStyle={{ zIndex: 99999999999 }}
            />
        </Provider>
    );
};

export default App;
