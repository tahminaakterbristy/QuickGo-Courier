import Footer from "../Shared/Footer/Footer";
import Navbar from "../Shared/Navbar/Navbar";
import Banner from "./Banner/Banner";
import OurPricing from "./OurPricing/OurPricing";
import OurServices from "./OurServices/OurServices";
import Testimonial from "./Testimonial/Testimonial";
import WhyChooseUs from "./WhyChooseUs/WhyChooseUs";


const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Banner></Banner>
            <OurServices></OurServices>
            <OurPricing></OurPricing>
            <Testimonial></Testimonial>
            <WhyChooseUs></WhyChooseUs>
            <Footer></Footer>
        </div>
    );
};

export default Home;