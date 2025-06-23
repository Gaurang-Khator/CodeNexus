import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { categories } from "../apis";

const { CATALOG_PAGE_DATA_API } = categories;

export async function getCategoryPageDetails(categoryId) {
    let result = null;
    try {
        const loadingToastId = toast.loading("Loading...");
        const response = await apiConnector("POST", CATALOG_PAGE_DATA_API, {
            categoryId: categoryId,
        });
        console.log("Category page details ............", response);

        if (!response.success) {
            throw new Error(response.message);
        }
        result = response;
        toast.dismiss(loadingToastId);
        toast.success("Category page details loaded successfully");
    } catch (error) {
        console.log("Category page details API ERROR............", error);
        toast.error("Failed to load category page details");
    }
    return result;
}
