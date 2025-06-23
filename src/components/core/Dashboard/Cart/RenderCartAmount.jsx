import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { buyCourse } from "../../../../services/operations/PaymentHandlingAPI"

export default function RenderCartAmount() {
    const { total, cart } = useSelector((state) => state.cart);
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleBuyCourse = () => {
        const courses = cart.map((course) => course._id);
        buyCourse( courses,token, user, navigate, dispatch);
    };

    return (
        <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
            <p className="mb-1 text-sm font-medium text-richblack-300">
                Total:
            </p>
            <p className="mb-6 text-3xl font-medium text-yellow-100">
                ₹ {total}
            </p>
            <button onClick={()=>{handleBuyCourse()}} className="
                text-black bg-yellow-50 px-4 py-1 font-bold w-fit
            ">Buy Now</button>
        </div>
    );
}
