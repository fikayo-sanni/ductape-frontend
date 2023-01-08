import {Logo} from "../config/constant";
import Link from "next/link";

export default function landingsidebar()
{
    return(
        <div className="col-lg-4 order-1 order-lg-0  bg-j">
            <div className="bg-transparent_black_7 font-white d-flex padding_50 flex-column" style={{height: '100%'}}>
                <Link href="/">
                    <a className="font-white">
    <Logo size="full"/>
                    </a>
                </Link>

    <div className="mt-5 mt-auto">
        <div  className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators m-0" style={{top: -25,zIndex: 9999,height: 25, width: 'auto', justifyContent: 'left'}}>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                        className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                        aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                        aria-label="Slide 3"></button>
            </div>

            <div className="carousel-inner">
                <div className="carousel-item active">
                    <h4 className="font-white font-weight-700">Financial management at your fingertips</h4>
                    <p className="">Get to manage your finances better than you have with insight into
                        every expense or income generated
                        by your organization.</p>

                </div>
                <div className="carousel-item">
                    <h4 className="font-white font-weight-700">Access to financial reports</h4>
                    <p className="">See your organization's profitability with a bird's eye view with
                        in-depth
                        reporting analysis.</p>
                </div>
                <div className="carousel-item">
                    <h4 className="font-white font-weight-700">Automate your operation</h4>
                    <p className="">Take advantage of our key features to automate your business
                        operation to
                        produce a more efficient workflow.</p>
                </div>
            </div>
        </div>

        <p className=" ">Got more questions? <a href="#" className="">contact us</a></p>
    </div>

    <div className="">
        <span className="me-4">&copy; 2021</span>
        <a href="" className=" me-4">Privacy policy</a>
        <a href="" className="">Terms & conditions</a>
    </div>
            </div>
        </div>
)
}