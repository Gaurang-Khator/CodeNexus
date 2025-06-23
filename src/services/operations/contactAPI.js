import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { contactEndpoints } from "../apis";

const { CONTACT_ADMIN_API } = contactEndpoints;

export async function contactAdmin(formData) {
  try {
    const loadingToastId = toast.loading("Sending Mail");
    console.log(CONTACT_ADMIN_API,formData);
    const response = await apiConnector("POST", CONTACT_ADMIN_API, {formData});
    console.log("CONTACT ADMIN API RESPONSE............", response);

    if (!response.success) {
      throw new Error(response.message);
    }
    toast.dismiss(loadingToastId);
    toast.success("Mail Sent Successfully");
  } catch (error) {
    console.log("CONTACT ADMIN API ERROR............", error);
    toast.error("Could Not Send Email");
  }
}
