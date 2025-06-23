import toast from "react-hot-toast";
import { paymentEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import razorpaylogo from '../../assets/RazorpayLogo/razorpaylogo.png'
import { setPaymentLoading } from "../../components/core/slices/courseSlice";
import { resetCart } from "../../components/core/slices/cartSlice";
// import hello from "../../../server/.env"


const { CAPTURE_PAYMENT_API, VERIFY_PAYMENT_API, SEND_SUCCESS_MAIL } = paymentEndpoints


// require('dotenv').config({ path: "../../../server/.env" });

function loadScript(src) {
    return new Promise((resolve) => {
        const toLoad = document.createElement('script')
        toLoad.src = src;

        toLoad.onload = () => {
            resolve(true)
        }
        toLoad.onerror = () => {
            resolve(false)
        }

        document.body.appendChild(toLoad);
    })
}

export async function buyCourse(courses,token,userDetails,navigate,dispatch) {
    const loadingToast = toast.loading('Loading...');
    try {
        console.log('Token to y hai ',token);
        console.log('Course id ',courses)
        const resp = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
        if (!resp) {
            toast.error('Razorpay SDK failed');
            return;
        }

        const orderResponse = await apiConnector("POST",CAPTURE_PAYMENT_API,{courses,token})

        if(!orderResponse || !orderResponse.success){
            toast.error('Order response not received');
            return ;
        }

        console.log(orderResponse);

        if(orderResponse.success){
            const options={
                "key":"rzp_test_IB56tm2EpdyM00",
                "currency":orderResponse.order.currency,
                "amount":orderResponse.order.amount,
                "order_id":orderResponse.order.id,
                "name":"CodeNexus",
                "description":"Thanks for buying ",
                "image":razorpaylogo,
                prefill:{
                    "name":userDetails.firstName,
                    "email":userDetails.emailID,
                },
                handler: function(response){
                    //send payment email 
                    sendPaymentSuccessEmail(response,orderResponse.order.amount,token);
                    //verify paymetn 
                    verifyPayment({...response,courses},token , navigate, dispatch)
                }
            }

            const paymentWindow=new window.Razorpay(options);
            paymentWindow.open();
            paymentWindow.on("paymenet failed",function(response){
                toast.error('payment failure');
                console.log(response.error)
            })
        }
    }
    catch (error) {
        console.log('Errror occured while buying the course ');
        toast.error('Something failed')
    }
    toast.dismiss(loadingToast);
}

const verifyPayment=async(formData,token,navigate,dispatch)=>{
    const loadingToast=toast.loading('Loading...');
    dispatch(setPaymentLoading(true));
    try{
        const response=await apiConnector("POST",VERIFY_PAYMENT_API,{formData,token});
        if(!response.success){
            throw new Error('Api got success false');
        }

        navigate('/dashboard/enrolled-courses');
        dispatch(resetCart());
    }
    catch(error){
        toast.error('Somethign failed');
        console.log(error);
    }
    dispatch(setPaymentLoading(false));
    toast.dismiss(loadingToast);
}

const sendPaymentSuccessEmail=async(response,amt,token)=>{
    const loadingToast=toast.loading('Loading...');
    console.log("respones",response);
    try{
        let order_id=response.razorpay_order_id;//need to defined 
        let payment_id=response.razorpay_payment_id;
        console.log(order_id);
        console.log(payment_id);
        console.log(token);
        console.log(amt);
        const res=await apiConnector("POST",SEND_SUCCESS_MAIL,{amt,order_id,payment_id,token});
        if(!res.success)    
            throw new Error('api got success false');

        toast.success('Mail sent successfully');
    }
    catch(error){
        console.log(error);
        toast.error('Payment mail sending failed');
    }
    toast.dismiss(loadingToast);
}