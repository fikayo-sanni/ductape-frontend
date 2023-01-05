import {Logo} from "../config/constant";
import Link from "next/link";
import {ArrowRightOutlined} from "@ant-design/icons";


export default function landing_header()
{
    return(
    <div className="container sticky-top">
        <header
            className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
            <a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                <Logo type="icon"/>
            </a>

            <ul id="main_navigation" className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                <li><a href="#" className="nav-link px-2 link-secondary">Home</a></li>
                <li><a href="#" className="nav-link px-2 link-dark">Features</a></li>
                <li><a href="#" className="nav-link px-2 link-dark">Pricing</a></li>
                <li><a href="#" className="nav-link px-2 link-dark">Company</a></li>
            </ul>

            <div className="col-md-3 text-end">
                <Link href="/security/signup">
                    <button type="button" className="btn btn-lg btn-primary">
                        Create an account
                        <ArrowRightOutlined className="ms-2" />
                    </button>
                </Link>
            </div>
        </header>
    </div>
    )
}