import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { buyCourse } from "../services/operations/PaymentHandlingAPI";
import { fetchCourseDetails } from "../services/operations/courseAPI";
import GetAvgRating from "../utils/avgRating";
import Error from "./Error";
import ConfirmationModal from "../components/core/common/ConfirmationModal";
import RatingStars from "../components/core/common/RatingStars";
import { formatDate } from "../services/formatDate";
import { FaCalendarAlt, FaChevronUp } from "react-icons/fa";
import { FaLanguage } from "react-icons/fa";

import CourseDetailsCard from "../components/core/common/CourseDetailsCard";
import FooterHome from "../components/core/Home/FooterHome";
import { MdOutlinePersonalVideo } from "react-icons/md";
import { GoDotFill } from "react-icons/go";

const CourseDetails = () => {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const { loading } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { courseId } = useParams();
    console.log("course id ye mili h ", courseId);
    const [courseData, setCourseData] = useState(null);
    const [confirmationModal, setConfirmationModal] = useState(null);
    useEffect(() => {
        const getCourseFullDetails = async () => {
            try {
                const result = await fetchCourseDetails(courseId);
                console.log("Printing CourseData-> ", result);
                setCourseData(result);
            } catch (error) {
                console.log("Could not fetch coursse details");
            }
        };
        getCourseFullDetails();
    }, [courseId]);

    const [avgReviewCount, setAverageReviewCount] = useState(0);

    useEffect(() => {
        const count = GetAvgRating(courseData?.data?.ratingAndReviews);
        setAverageReviewCount(count);
    }, [courseData]);

    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
    useEffect(() => {
        let lectures = 0;
        courseData?.data?.courseContent?.forEach((sec) => {
            lectures += sec.subSections.length || 0;
        });
        setTotalNoOfLectures(lectures);
    }, [courseData]);

    const [isActive, setIsActive] = useState(Array(0));
    const handleActive = (id) => {
        setIsActive(
            !isActive.includes(id)
                ? isActive.concat(id)
                : isActive.filter((e) => e != id)
        );
    };

    const handleBuyCourse = () => {
        if (token) {
            console.log("token ye tha ", token);
            buyCourse([courseId], token, user, navigate, dispatch);
            return;
        }
        setConfirmationModal({
            text1: "you are not Logged in",
            text2: "Please login to purchase the course",
            btnText1: "Login",
            btnText2: "Cancel",
            btnHandler1: () => navigate("/login"),
            btnHandler2: () => setConfirmationModal(null),
        });
    };

    if (loading || !courseData) {
        return <div>Loading...</div>;
    }

    if (!courseData.success) {
        return (
            <div>
                <Error />
            </div>
        );
    }
    const {
        _id: course_id,
        courseTitle: courseName,
        courseDescription,
        thumbnail,
        price,
        whatYouWillLearn,
        courseContent,
        ratingAndReviews,
        instructor,
        studentsEnrolled,
        createdAt,
    } = courseData.data;

    return (
        <div className="flex flex-col text-black">
            <div className="relative flex flex-col justify-start ">
                <div className="bg-richblack-800">
                    <div className="mx-auto w-10/12 my-10 flex flex-row ">
                        <div className="flex flex-col gap-2 w-8/12">
                            <div className="text-richblack-200 my-2">
                                <span>Home</span>
                                <span>{" / "}</span>
                                <span>Catalog</span>
                                <span>{" / "}</span>
                                <span className="text-yellow-200">
                                    {courseData.data.category.categoryName}
                                </span>
                            </div>
                            <p className="text-2xl text-richblack-5 font-semibold">
                                {courseName}
                            </p>
                            <p className="text-richblack-100">
                                {courseDescription.substr(0,400)}{courseDescription.length>400?"...":""}
                            </p>
                            <div className="flex gap-x-2">
                                <span className="text-yellow-200 font-bold mt-[1px]">
                                    {avgReviewCount}
                                </span>
                                <RatingStars
                                    Review_Count={avgReviewCount}
                                    Star_Size={24}
                                />
                                <span className="text-richblack-5">{`(${ratingAndReviews.length} reviews) `}</span>
                                <span className="text-richblack-5">{`(${studentsEnrolled.length} students enrolled)`}</span>
                            </div>

                            <div>
                                <p className="text-richblack-50">
                                    Created By{" "}
                                    {`${instructor.firstName} ${instructor.lastName}`}
                                </p>
                            </div>

                            <div className="flex gap-x-3 text-richblack-25">
                                <p className="flex flex-row gap-2 items-center">
                                    <FaCalendarAlt />
                                    Created At {formatDate(createdAt)}
                                </p>
                                <p className="flex flex-row gap-2 items-center">
                                    <FaLanguage /> English
                                </p>
                            </div>
                        </div>
                        <div className="w-4/12"></div>
                    </div>
                    <div className="absolute right-[8%] top-[15%]">
                <CourseDetailsCard
                    course={courseData?.data}
                    setConfirmationModal={setConfirmationModal}
                    handleBuyCourse={handleBuyCourse}
                />
            </div>
                </div>
            </div>

            <div className="bg-richblack-900 text-white h-full min-h-[400px]">
                <div className="mx-auto w-10/12 my-10 flex flex-row ">
                    <div className="flex flex-col gap-2 w-8/12">
                        <div className="p-4 rounded-md border-richblack-200 my-4 border-[1px] shadow-sm">
                            <p className="text-xl font-semibold mb-3">
                                {" "}
                                What You Will learn
                            </p>
                            <div className="w-[95%] mx-auto text-sm">
                                {whatYouWillLearn}
                            </div>
                        </div>

                        <div>
                            <div>
                                <p>Course Content:</p>
                            </div>

                            <div className="flex gap-x-3 justify-between items-center">
                                <div className="flex flex-row gap-3 items-center">
                                    <span>
                                        {courseContent.length} sections 
                                    </span>
                                    <GoDotFill/>

                                    <span>{totalNoOfLectures} lectures</span>
                                    <span>
                                        {courseData.data?.totalDuration} total
                                        length
                                    </span>
                                </div>

                                <div>
                                    <button onClick={() => setIsActive([])} className="text-yellow-50 italic font-bold">
                                        Collapse all Sections
                                    </button>
                                </div>
                            </div>
                            <div className="mt-3">
                                {courseData.data.courseContent.map(
                                    (section, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="border-[1px] border-richblack-400 "
                                            >
                                                <div
                                                    className="flex flex-row justify-between items-center bg-richblack-600 p-3 cursor-pointer"
                                                    onClick={() => {
                                                        handleActive(
                                                            section._id
                                                        );
                                                    }}
                                                >
                                                    <div className="flex flex-row gap-2 items-center">
                                                        <div>
                                                            <FaChevronUp />
                                                        </div>
                                                        <div>
                                                            {
                                                                section.sectionName
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="text-yellow-50 font-normal italic">
                                                        {
                                                            section.subSections
                                                                .length
                                                        }{" "}
                                                        Lectures
                                                    </div>
                                                </div>
                                                {console.log(section)}
                                                <div className="w-[95%] mx-auto text-sm">
                                                    {isActive.includes(
                                                        section._id
                                                    ) &&
                                                        section.subSections.map(
                                                            (
                                                                subSection,
                                                                idx
                                                            ) => {
                                                                return (
                                                                    <div
                                                                        key={
                                                                            idx
                                                                        }
                                                                        className="flex flex-row justify-between p-4"
                                                                    >
                                                                        <div className="flex flex-row gap-2 items-center">
                                                                            <div className="items-center flex flex-row">
                                                                                <MdOutlinePersonalVideo />
                                                                            </div>
                                                                            <div>
                                                                                {
                                                                                    subSection.title
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            {
                                                                                subSection.duration
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }
                                                        )}
                                                </div>
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="w-4/12"></div>
                </div>
            </div>
            

            <FooterHome />
            {confirmationModal && (
                <ConfirmationModal confirmationModal={confirmationModal} />
            )}
        </div>
    );
};

export default CourseDetails;
