import { setUser } from "../../components/core/slices/profileSlice";
import { apiConnector } from "../apiConnector";
import { profileEndpoints } from "../apis";
import toast from "react-hot-toast";


const {
    
    GET_USER_DETAILS_API,
    UPDATE_PROFILE_API,
    DELETE_ACCOUNT_API,
    UPDATE_DP_API,
    GET_ENROLLED_COURSES_API,
    GET_DP_API,
    CHANGEPASSWORD_API
}=profileEndpoints;

export function UploadImage(file, token) {
    return async (dispatch) => {
        const loadingToast = toast.loading("Uploading Image");
        try {            
            // Create a FormData object to send the file
            const formData = new FormData();
            formData.append('displayPicture', file); // 'displayPicture' should match the field name expected by the backend
            formData.append('token', token); // Append the token to the FormData
            
            const response = await apiConnector("POST", UPDATE_DP_API, formData, {
                // No need to set additional headers here since the token is included in the FormData
            });

            console.log("Response", response);
            if (!response.success) {
                throw new Error(response.message);
            }

            localStorage.setItem('user', JSON.stringify(response.data));
            setUser(response.data);
            
            toast.dismiss(loadingToast);
            toast.success("Image changed successfully");
        } catch (error) {
            console.log("Profile updation api front end error", error);
            toast.dismiss(loadingToast);
            toast.error("Image was not able to change");
        }
    }
}

export function updateProfile(data,token){
    return async(dispatch)=>{
        const loadingToast = toast.loading("Updating Details");
        try {            
            // Create a FormData object to send the file
            
            const response = await apiConnector("POST", UPDATE_PROFILE_API, {data,token});
            
            console.log("Response", response);
            if (!response.success) {
                throw new Error(response.message);
            }
            localStorage.setItem('user', JSON.stringify(response.updatedUserDetails));
            setUser(response.updatedUserDetails);
            toast.dismiss(loadingToast);
            toast.success("Details changed successfully");
        } catch (error) {
            console.log("Detials changed api conection problem", error);
            toast.dismiss(loadingToast);
            toast.error("Data was not able to change");
        }
    }
}



export function changePassword(data,token){
    return async(dispatch)=>{
        const loadingToast = toast.loading("Updating Details");
        try {            
            // Create a FormData object to send the file

            const updatedData={...data,token};
            console.log(updatedData)
            
            const response = await apiConnector("POST", CHANGEPASSWORD_API, updatedData);
            
            console.log("Response", response);
            if (!response.success) {
                throw new Error(response.message);
            }
            toast.dismiss(loadingToast);
            toast.success("Password updated successfully");
        } catch (error) {
            console.log("Password updation failed problem", error);
            toast.dismiss(loadingToast);
            toast.error("Password couldn't be chagned . Try again later");
        }
    }
}
