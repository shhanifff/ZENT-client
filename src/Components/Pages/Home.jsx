// import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import landImage from '../../assets/must.png'

function SofaOffer() {
  // const navigate = useNavigate();
  return (
    <>
      <div className="h-screen w-screen relative">
        <img
          src={landImage}
          className="absolute top-0 left-0 w-full h-full object-cover"
          
          alt="Sofa Offer"
        />
      </div>
      <Footer />
    </>
  );
}
export default SofaOffer;
