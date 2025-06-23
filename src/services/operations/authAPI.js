import { toast } from "react-hot-toast";

import { setLoading, setToken } from "../../components/core/slices/authSlice";
import { resetCart } from "../../components/core/slices/cartSlice";
import { setUser } from "../../components/core/slices/profileSlice";
import { apiConnector } from "../apiConnector";
import { authenticationEndpoints } from "../apis";

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
} = authenticationEndpoints;

export function sendOtp(email, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            console.log(SENDOTP_API);
            console.log(email);
            const response = await apiConnector("POST", SENDOTP_API, {
                email,
                checkUserPresent: true,
            });
            console.log("SENDOTP API RESPONSE............", response.success);

            console.log(response.success);

            if (!response.success) {
                throw new Error(response.message);
            }

            toast.success("OTP Sent Successfully");
            console.log("Proceeding to verifying");
            navigate("/verify-email");
        } catch (error) {
            console.log("SENDOTP API ERROR............", error);
            toast.error("Could Not Send OTP");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
}

export function signUp(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", SIGNUP_API, {
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
            });

            console.log("SIGNUP API RESPONSE............", response);

            if (!response.success) {
                throw new Error(response.message);
            }
            toast.success("Signup Successful");
            navigate("/login");
        } catch (error) {
            console.log("SIGNUP API ERROR............", error);
            toast.error("Signup Failed");
            navigate("/signup");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
}

export function login(email, password, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", LOGIN_API, {
                email,
                password,
            });

            console.log("LOGIN API RESPONSE............", response);

            if (!response.success) {
                throw new Error(response.message);
            }

            toast.success("Login Successful");
            dispatch(setToken(response.token));
            const userImage = response.user?.image
                ? response.user.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.user.firstName} ${response.user.lastName}`;

            dispatch(setUser({ ...response.user, image: userImage }));
            localStorage.setItem("token", JSON.stringify(response.token));
            localStorage.setItem("user", JSON.stringify(response.user));
            navigate("/dashboard/my-profile");
        } catch (error) {
            console.log("LOGIN API ERROR............", error);
            toast.error("Login Failed");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
}

export function getPasswordResetToken(email, setEmailSent) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", RESETPASSTOKEN_API, {
                email,
            });

            console.log("RESETPASSTOKEN RESPONSE............", response);

            if (!response.success) {
                throw new Error(response.message);
            }

            toast.success("Reset Email Sent");
            setEmailSent(true);
        } catch (error) {
            console.log("RESETPASSTOKEN ERROR............", error);
            toast.error("Failed To Send Reset Email");
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    };
}

export function resetPassword(password, confirmPassword, token, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", RESETPASSWORD_API, {
                password,
                confirmPassword,
                token,
            });

            console.log("RESETPASSWORD RESPONSE............", response);

            if (!response.success) {
                throw new Error(response.message);
            }

            toast.success("Password Reset Successfully");
            navigate("/login");
        } catch (error) {
            console.log("RESETPASSWORD ERROR............", error);
            toast.error("Failed To Reset Password");
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    };
}

export function logout(navigate) {
    return (dispatch) => {
        dispatch(setToken(null));
        dispatch(setUser(null));
        dispatch(resetCart());
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged Out");
        navigate("/");
    };
}
