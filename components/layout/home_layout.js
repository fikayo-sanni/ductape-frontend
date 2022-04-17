import Head from 'next/head';
import React from "react";


export default function Home_Layout ({
    children,
    title = 'Home',
}) {

    return (
        <div className="">

            <Head>
                <title>{title} | Startupia</title>
                <meta charSet="utf-8" />
                <link rel="shortcut icon" type="image/png" href="/images/logo_2.png"/>
                <link rel="icon" type="image/png" href="/images/logo_2.png" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap"
                              rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet"/>
            </Head>


            {children}


            <script src="/b5/js/bootstrap.bun.js"
                    integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
        </div>
    )
}
