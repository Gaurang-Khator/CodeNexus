import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { IoCheckbox } from "react-icons/io5";
import { IoIosArrowRoundBack } from "react-icons/io";

const CourseViewerSidebar = ({ setReviewModalData }) => {
    const {
        courseSectionData,
        courseEntireData,
        completedLectures,
        totalNoOfLectures,
    } = useSelector((state) => state.viewCourse);
    const location = useLocation();
    const navigate = useNavigate();

    const [activeSection, setActiveSection] = useState(null);
    const [activeSubSection, setActiveSubSection] = useState(null);

    const { sectionId, subSectionId } = useParams();

    useEffect(() => {
        const updateActives = () => {
            if (!courseSectionData.length) return;
            setActiveSection(sectionId);
            setActiveSubSection(subSectionId);
        };
        updateActives();
    }, [
        location.pathname,
        sectionId,
        subSectionId,
        courseSectionData,
        courseEntireData,
    ]);

    return (
        <div className="bg-richblack-800 min-h-screen ">
            <div className="flex flex-col gap-2 pt-4">
                <div className="w-11/12 mx-auto">
                    <div className="flex flex-row gap-1 items-center mb-5 text-blue-300 text-sm cursor-pointer" onClick={()=>{navigate('/dashboard/enrolled-courses')}}>   
                        <IoIosArrowRoundBack className="text-lg font-extrabold"/>
                        <div className="text-[10px] font-bold">Back To Enrolled Courses</div>
                    </div>
                    <div>
                        <div className="capitalize text-richblack-5 font-bold text-lg">
                            {courseEntireData.courseTitle}{" "}
                            <span className="text-caribbeangreen-100 font-bold text-sm">
                                {completedLectures.length}/{totalNoOfLectures}
                            </span>
                        </div>
                    </div>
                    <div
                        onClick={() => setReviewModalData(true)}
                        className="font-bold text-black bg-yellow-100 rounded-lg px-4 py-2 w-fit cursor-pointer mt-5"
                    >
                        Add Review
                    </div>
                    <div className="bg-richblack-700 w-full h-[1px] mt-5"></div>
                </div>
            </div>

            {/* for course content */}
            <div className="my-5">
                {courseSectionData.map((section) => {
                    return (
                        <div key={section._id}>
                            <div
                                className=" bg-richblack-600 text-richblack-5 font-[600] text-sm py-4"
                                onClick={() => setActiveSection(section._id)}
                            >
                                <div className="mx-auto w-10/12 items-center flex flex-row justify-between">
                                    <div>{section.sectionName}</div>
                                    <div
                                        className={`  ${section._id === activeSection
                                                ? "rotate-180"
                                                : ""
                                            }`}
                                    >
                                        <IoChevronDown />
                                    </div>
                                </div>
                            </div>

                            {section._id === activeSection &&
                                section.subSections.map((subsection) => {
                                    return (
                                        <div
                                            index={subsection._id}
                                            className="py-2"
                                            onClick={() => {
                                                navigate(
                                                    `/view-course/${courseEntireData._id}/section/${section._id}/subSection/${subsection._id}`
                                                );
                                            }}
                                        >
                                            <div className="flex flex-row gap-4 items-center text-richblack-50 text-sm mx-auto w-10/12 ">
                                                <div>
                                                    {subsection._id ===
                                                        subSectionId ? (
                                                        <div className="flex flex-row gap-2 text-blue-200 items-center text-sm">
                                                            <FaPlay className="text-xs" />
                                                            <div>
                                                                {
                                                                    subsection.title
                                                                }
                                                            </div>
                                                        </div>
                                                    ) : completedLectures.includes(
                                                        subsection._id
                                                    ) ? (
                                                        <div className="flex flex-row gap-2 items-center cursor-pointer">
                                                            <IoCheckbox />
                                                            <div>
                                                                {
                                                                    subsection.title
                                                                }
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-row gap-2  items-center cursor-pointer">
                                                            <MdCheckBoxOutlineBlank />
                                                            <div>
                                                                {
                                                                    subsection.title
                                                                }
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CourseViewerSidebar;
