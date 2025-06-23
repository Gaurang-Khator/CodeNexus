import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import TagSection from "./TagSection";
import ThumbnailSection from "./ThumbnailSection";
import RequirementSection from "./RequirementSection";
import { apiConnector } from "../../../../services/apiConnector";
import { categories } from "../../../../services/apis";
import { setCourse, setStep } from "../../slices/courseSlice";
import toast from "react-hot-toast";
import { HiCurrencyRupee } from "react-icons/hi2";
import {
    addCourseDetails,
    editCourseDetails,
} from "../../../../services/operations/courseAPI";

const Form1 = () => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);

    const { CATEGORIES_API } = categories;
    const {
        handleSubmit,
        register,
        setValue,
        getValues,
        formState: { errors },
        watch,
    } = useForm();
    const courseTitle = watch("courseTitle", "");
    const courseDescription = watch("courseDescription", "");

    const { editCourse, course } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const [thumbnailChanged, setThumbnailChanged] = useState(false);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    };

    const [courseCategories, setCourseCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await apiConnector("GET", CATEGORIES_API);
            setCourseCategories(response.allCategories);
        };
        fetchCategories();

        if (editCourse) {
            setValue("courseTitle", course.courseTitle);
            setValue("courseDescription", course.courseDescription);
            setValue("coursePrice", course.price);
            setValue("courseCategory", course.category);
            setValue("courseBenefits", course.whatYouWillLearn);
            setValue("courseRequirement", course.instructions);
            setValue("courseTags", course.tag);

        }
    }, []);

    const currentvalues = getValues();
    const dataChange = () => {
        if (
            currentvalues.courseTitle !== course.courseTitle ||
            currentvalues.courseDescription !== course.courseDescription ||
            currentvalues.courseCategory !== course.category ||
            currentvalues.coursePrice !== course.price ||
            currentvalues.courseBenefits !== course.whatYouWillLearn ||
            JSON.stringify(currentvalues.courseRequirement) !==
                JSON.stringify(course.instructions) ||
            JSON.stringify(currentvalues.courseTags) !==
                JSON.stringify(course.tag)
        ) {
            return true;
        }
        return false;
    };

    async function submitHandler(data) {
        console.log("entry ");
        if (editCourse) {
            if (thumbnailChanged || dataChange()) {
                console.log("entry 2");
                const formData = new FormData();
                if (currentvalues.courseTitle !== course.courseTitle) {
                    formData.append("courseTitle", currentvalues.courseTitle);
                }
                if (
                    currentvalues.courseDescription !== course.courseDescription
                ) {
                    formData.append(
                        "courseDescription",
                        currentvalues.courseDescription
                    );
                }
                if (currentvalues.courseCategory !== course.category) {
                    formData.append("category", currentvalues.courseCategory);
                }
                if (currentvalues.coursePrice !== course.price) {
                    formData.append("price", currentvalues.coursePrice);
                }
                if (currentvalues.courseBenefits !== course.whatYouWillLearn) {
                    formData.append(
                        "whatYouWillLearn",
                        currentvalues.courseBenefits
                    );
                }
                if (
                    JSON.stringify(currentvalues.courseRequirement) !==
                    JSON.stringify(course.instructions)
                ) {
                    formData.append(
                        "instructions",
                        JSON.stringify(currentvalues.courseRequirement)
                    );
                }

                if (
                    JSON.stringify(currentvalues.courseTags) !==
                    JSON.stringify(course.tag)
                ) {
                    formData.append(
                        "tag",
                        JSON.stringify(currentvalues.courseTags)
                    );
                }
                formData.append("thumbnailImage", currentvalues.thumbnail);
                formData.append("courseID", course._id);
                setLoading(true);
                console.log("Form Data", formData);
                const response = await editCourseDetails(formData, token);
                console.log(response);
                if (response) {
                    dispatch(setStep(2));
                    dispatch(setCourse(response));
                }
                setLoading(false);
            } else {
                toast.error("No data has been changed");
                return;
            }
        } else {
            const formData = new FormData();
            formData.append("courseTitle", currentvalues.courseTitle);
            formData.append(
                "courseDescription",
                currentvalues.courseDescription
            );
            formData.append("category", currentvalues.courseCategory);
            formData.append("price", currentvalues.coursePrice);
            formData.append("whatYouWillLearn", currentvalues.courseBenefits);
            formData.append(
                "instructions",
                JSON.stringify(currentvalues.courseRequirement)
            );
            formData.append("tag", JSON.stringify(currentvalues.courseTags));
            formData.append("thumbnailImage", currentvalues.thumbnail);

            setLoading(true);
            const response = await addCourseDetails(formData, token);
            if (response) {
                dispatch(setStep(2));
                dispatch(setCourse(response));
            }
            setLoading(false);
        }

        setThumbnailChanged(false);
    }

    return (
        <form
            onSubmit={handleSubmit(submitHandler)}
            onKeyDown={handleKeyDown}
            className="bg-richblack-800 rounded-lg p-6 flex flex-col gap-4 mt-10"
        >
            <div>
                <label htmlFor="courseTitle" className="text-sm font-semibold">
                    Course Title <sup className="text-[10px] text-red">*</sup>
                </label>
                <div className="relative">
                    <input
                        id="courseTitle"
                        type="text"
                        name="courseTitle"
                        placeholder="Enter course title"
                        maxLength={100}
                        {...register("courseTitle", {
                            required: true,
                            maxLength: 100,
                        })}
                        className="bg-richblack-700 px-4 py-3 rounded-lg text-white placeholder:text-richblack-200 placeholder:text-sm w-full shadow-[0_1px_0px_0px_rgba(110,114,127,1)]"
                    />

                    <div className="text-xs text-white bottom-1 right-1 mt-1 absolute">
                        {courseTitle.length} / 100
                    </div>
                </div>
                {errors.courseTitle && (
                    <span className="text-xs text-red">
                        Course Title is required and should not exceed 100
                        characters.
                    </span>
                )}
            </div>
            <div>
                <label htmlFor="courseDescription">
                    Course Description <sup className="text-xs text-red">*</sup>
                </label>
                <div className="relative">
                    <textarea
                        type="text"
                        id="courseDescription"
                        name="courseDescription"
                        placeholder="Enter course description"
                        maxLength={400}
                        {...register("courseDescription", { required: true })}
                        className="bg-richblack-700 px-4 py-3 rounded-lg text-white placeholder:text-richblack-200 placeholder:text-sm w-full shadow-[0_1px_0px_0px_rgba(110,114,127,1)]"
                    />

                    <div className="text-xs text-white absolute bottom-2 right-2 ">
                        {courseDescription.length} / 400
                    </div>
                </div>

                {errors.courseDescription && (
                    <span className="text-xs text-red">
                        Course Description is required.
                    </span>
                )}
            </div>

            <div className="relative">
                <label htmlFor="coursePrice">
                    Course Price <sup className="text-xs text-red">*</sup>
                </label>
                <div className="flex items-center relative">
                    <HiCurrencyRupee className="absolute bottom-2 text-3xl pl-1 pb-1" />
                    <input
                        type="number"
                        id="coursePrice"
                        name="coursePrice"
                        placeholder="Enter course price"
                        {...register("coursePrice", { required: true })}
                        className="bg-richblack-700 px-4 py-3 pl-10 rounded-lg text-white placeholder:text-richblack-200 placeholder:text-sm w-full shadow-[0_1px_0px_0px_rgba(110,114,127,1)]"
                    />
                </div>
                {errors.coursePrice && (
                    <span className="text-xs text-red">
                        Course Price is required.
                    </span>
                )}
            </div>

            {/* Category option */}

            <div>
                <label htmlFor="courseCategory">
                    Course Category <sup className="text-xs text-red">*</sup>
                </label>
                <select
                    id="courseCategory"
                    defaultValue={""}
                    {...register("courseCategory", { required: true })}
                    className="bg-richblack-700 px-4 py-3 rounded-lg text-white placeholder:text-richblack-200 placeholder:text-sm w-full shadow-[0_1px_0px_0px_rgba(110,114,127,1)]"
                >
                    <option value="" disabled>
                        Choose a category
                    </option>
                    {courseCategories.map((course, index) => {
                        return (
                            <option key={index} value={course._id}>
                                {course.categoryName}
                            </option>
                        );
                    })}
                </select>
            </div>

            {/* Tags option */}
            <TagSection
                label={"Tags"}
                name={"courseTags"}
                register={register}
                setValue={setValue}
                getValues={getValues}
                errors={errors}
            />

            {/* Thumbnail option */}
            <label>
                Course thumbnail <sup className="text-xs text-red">*</sup>
            </label>

            <ThumbnailSection
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
                name={"thumbnail"}
                image={editCourse ? course.thumbnail : null}
                setThumbnailChanged={setThumbnailChanged}
            />

            <div>
                <label htmlFor="courseBenefits">
                    Benefits of the course{" "}
                    <sup className="text-xs text-red">*</sup>
                </label>
                <textarea
                    type="text"
                    id="courseBenefits"
                    name="courseBenefits"
                    placeholder="Enter course benefits"
                    {...register("courseBenefits", { required: true })}
                    className="bg-richblack-700 px-4 py-3 rounded-lg text-white placeholder:text-richblack-200 placeholder:text-sm w-full shadow-[0_1px_0px_0px_rgba(110,114,127,1)]"
                />

                {errors.courseBenefits && (
                    <span className="text-xs text-red">
                        Course Benefits is required.
                    </span>
                )}
            </div>

            {/* Requirement column */}
            <RequirementSection
                label={"Requirement/Instructions"}
                name={"courseRequirement"}
                register={register}
                setValue={setValue}
                getValues={getValues}
                errors={errors}
            />
            {editCourse && (
                <div
                    onClick={() => {
                        dispatch(setStep(2));
                    }}
                >
                    Continue without saving
                </div>
            )}
            <button
                type="submit"
                className="font-bold rounded-md text-black bg-yellow-50 p-2"
            >
                {editCourse ? "Save changes" : "Next"}
            </button>
        </form>
    );
};

export default Form1;
