import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { categories } from "../../../services/apis";
import toast from "react-hot-toast";
import { apiConnector } from "../../../services/apiConnector";
import CourseSlider from "./CourseSlider";
import Course_Card from "./Course_Card";
import { getCategoryPageDetails } from "../../../services/operations/catalogPageAPI";

const CatalogPage = () => {
    const { catalogName } = useParams();
    const [categoryId, setCategoryId] = useState(null);
    const [catalogData, setCatalogData] = useState(null);
    const [isPopular, setIsPopular] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCategoryId = async () => {
            const loadingToast = toast.loading("Loading...");
            try {
                const result = await apiConnector(
                    "GET",
                    categories.CATEGORIES_API
                );
                const category = result.allCategories.find(
                    (ct) =>
                        ct.categoryName.split(" ").join("-").toLowerCase() ===
                        catalogName
                );
                if (category) {
                    setCategoryId(category._id);
                } else {
                    toast.error("Category not found");
                }
            } catch (error) {
                toast.error("Failed to load categories");
            } finally {
                toast.dismiss(loadingToast);
            }
        };
        getCategoryId();
    }, [catalogName]);

    useEffect(() => {
        const getCatalogPageInfo = async () => {
            try {
                setLoading(true);
                const response = await getCategoryPageDetails(categoryId);
                if (response) {
                    setCatalogData(response.data);
                    console.log("Response",response);
                } else {
                    toast.error("Failed to load catalog data");
                }
            } catch (error) {
                toast.error("Error fetching catalog data");
            } finally {
                setLoading(false);
            }
        };
        if (categoryId) {
            getCatalogPageInfo();
        }
    }, [categoryId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-richblack-900">
            {catalogData ? (
                <div>
                    {/* Top Section */}
                    <div className="bg-richblack-800 py-12">
                        <div className="w-10/12 mx-auto ">
                            <div className="text-richblack-200 my-2">
                                <span>Home</span>
                                <span>{" / "}</span>
                                <span>Catalog</span>
                                <span>{" / "}</span>
                                <span className="text-yellow-200">
                                    {
                                        catalogData.selectedCategoryInfo
                                            .categoryName
                                    }
                                </span>
                            </div>
                            <h1 className="text-2xl text-richblack-5 font-semibold">
                                {catalogData.selectedCategoryInfo.categoryName}
                            </h1>
                            <p className="text-richblack-100 my-2">
                                {
                                    catalogData.selectedCategoryInfo
                                        .categoryDescription
                                }
                            </p>
                        </div>
                    </div>

                    {/* Section 1 */}
                    <section className="mx-auto w-10/12 mt-8">
                        <div>
                            <h2 className="text-3xl text-richblack-5 font-semibold ">
                                Courses to get you started
                            </h2>
                            <div className="flex flex-row gap-4 my-4 cursor-pointer">
                                <div>
                                    <p
                                        className={
                                            isPopular
                                                ? "text-yellow-200"
                                                : "text-richblack-100"
                                        }
                                        onClick={() => setIsPopular(true)}
                                    >
                                        Most Popular
                                    </p>
                                    <div>
                                        {isPopular ? (
                                            <div className="bg-yellow-300 w-full h-[2px] rounded-full"></div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <p
                                        className={
                                            !isPopular
                                                ? "text-yellow-200"
                                                : "text-richblack-100"
                                        }
                                        onClick={() => setIsPopular(false)}
                                    >
                                        New
                                    </p>
                                    <div>
                                        {!isPopular ? (
                                            <div className="bg-yellow-300 w-full h-[2px] rounded-full"></div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>
                            </div>
                            <CourseSlider
                                courses={
                                    isPopular
                                        ? catalogData.selectedCategoryPopular
                                            .course
                                        : catalogData.selectedCategoryNewest
                                            .course
                                }
                            />
                        </div>
                    </section>

                    <section className="mx-auto w-10/12 my-8">
                        <h2 className="text-3xl text-richblack-5 font-semibold my-4 ">
                            Top Courses in{" "}
                            {catalogData.randomCategoryPopular.categoryName}
                        </h2>
                        <CourseSlider
                            courses={catalogData.randomCategoryPopular.course}
                        />
                    </section>

                    <section className="mx-auto w-10/12 mt-8">
                        <h2 className="text-3xl text-richblack-5 font-semibold  my-4">Frequently Bought Together</h2>
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                            {catalogData.courseWithMostStudents
                                .slice(0, 4)
                                .map((course) => (
                                    <Course_Card
                                        key={course._id}
                                        course={course}
                                        Height={400}
                                    />
                                ))}
                        </div>
                    </section>
                </div>
            ) : (
                <div>No content to load</div>
            )}
        </div>
    );
};

export default CatalogPage;
