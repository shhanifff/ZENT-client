import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

function Furniture() {
  const navigate = useNavigate();
  return (
    <>
      {/* main  */}
      <div>
        <h1 className="text-center font-bold py-3 text-xl text-yellow-900">
          All Products
        </h1>
        <div>
          <img
            src="https://ii1.pepperfry.com/assets/94256b49-3e30-4126-aed8-3c0a46dd416c.jpg"
            className="px-9"
          />
        </div>

        <h1 className="text-center font-bold py-3 text-xl text-yellow-900 ">
          Shop by Catagories
        </h1>
        <div className="w-full  h-12 pt-4">
          <ul className="flex justify-center items-center justify-evenly flex-wrap">
            <li>
              <div onClick={() => navigate("products")} className="cursor-pointer">
                <img
                  src="https://ii1.pepperfry.com/media/wysiwyg/banners/Frame_360_14062024_1.jpg"
                  alt=""
                />
                <h1 className="text-center text-xl">Sofa & Seating</h1>
              </div>
            </li>
            <li>
              <div onClick={() => navigate("products")} className="cursor-pointer">
                <img
                  src="https://ii1.pepperfry.com/media/wysiwyg/banners/Frame_360_14062024_2.jpg"
                  alt=""
                />
                <h1 className="text-center text-xl">Mattresses</h1>
              </div>
            </li>
            <li>
              <div onClick={() => navigate("products")} className="cursor-pointer">
                <img
                  src="https://ii1.pepperfry.com/media/wysiwyg/banners/Frame_360_14062024_3.jpg"
                  alt=""
                />
                <h1 className="text-center text-xl">Dinning</h1>
              </div>
            </li>
            <li>
              <div onClick={() => navigate("products")} className="cursor-pointer">
                <img src="https://ii1.pepperfry.com/media/wysiwyg/banners/Frame_360_12072024_7.jpg" />
                <h1 className="text-center text-xl">Home Kitchen</h1>
              </div>
            </li>
            <li>
              <div onClick={() => navigate("products")} className="cursor-pointer">
                <img
                  src="https://ii1.pepperfry.com/media/wysiwyg/banners/Frame_360_14062024_9.jpg"
                  alt=""
                />
                <h1 className="text-center text-xl">Lamp & Light</h1>
              </div>
            </li>
          </ul>
          <button
            className="text-center mt-6 relative left-1/2 transform -translate-x-1/2 hover:text-orange-400 bg-white "
            onClick={() => navigate("products")}
          >
            Show all products →
          </button>

          <div className="flex justify-center items-center py-7">
            <img
              src="https://ii1.pepperfry.com/assets/727c5087-4a0d-42cc-859b-651879bcb770.jpg"
              alt=""
              className="px-7 w-1/2 "
            />
            <img
              src="https://ii1.pepperfry.com/assets/271a6b8e-370f-4ec2-9fd3-0060e9f9d495.jpg"
              alt=""
              className="px-7 w-1/2 "
            />
          </div>

          <h1 className="text-center py-4 font-bold text-2xl text-yellow-900">
            Shop Best Seller
          </h1>
          <ul className="flex justify-center items-center justify-evenly flex-wrap ">
            <li>
              <div className="py-3 cursor-pointer" onClick={() => navigate("products")} >
                <img
                  src="https://ii1.pepperfry.com/assets/13031544-34e7-48e0-a951-b9fbb2f9f4ff.jpg"
                  alt=""
                />
                <h1 className="text-center text-xl">Memory Foam Mattress</h1>
              </div>
            </li>
            <li>
              <div className="py-3 cursor-pointer" onClick={() => navigate("products")} >
                <img
                  src="https://ii1.pepperfry.com/assets/29689779-0d5c-43b2-8565-47485f18219a.jpg"
                  alt=""
                />
                <h1 className="text-center text-xl">Ease Fabric Seater</h1>
              </div>
            </li>
            <li>
              <div className="py-3 cursor-pointer" onClick={() => navigate("products")} >
                <img
                  src="https://ii1.pepperfry.com/assets/2fcc79d3-d10f-4ae9-bedc-78d6de43d93d.jpg"
                  alt=""
                />
                <h1 className="text-center text-xl">Memory Foam Mattress</h1>
              </div>
            </li>
          </ul>
        <Footer/>
        </div>
      </div>
    </>
  );
}
export default Furniture;
