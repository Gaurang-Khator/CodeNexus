import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { updateCompletedLectures } from "../../../components/core/slices/viewCourseSlice";
import ReactPlayer from "react-player";
import { RiLoopLeftFill } from "react-icons/ri";
import { FaBackward } from "react-icons/fa6";
import { FaForward } from "react-icons/fa6";

import { apiConnector } from "../../../services/apiConnector";
import { courseProgrssEndpoints } from "../../../services/apis";
import toast from "react-hot-toast";

const VideoPlayer = () => {
    const { courseId, sectionId, subSectionId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const playerRef = useRef();
    const { token } = useSelector((state) => state.auth);
    const { courseSectionData, courseEntireData, completedLectures } =
        useSelector((state) => state.viewCourse);

    const { UPDATE_COURSE_PROGRESS_API } = courseProgrssEndpoints;

    const [videoData, setVideoData] = useState(null);
    const [videoEnded, setVideoEnded] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const setVideoSpecificDetails = async () => {
            if (!courseSectionData.length) return;
            if (!courseId || !sectionId || !subSectionId) {
                navigate("/dashboard/enrolled-courses");
                return;
            }

            const filteredData = courseSectionData.filter(
                (course) => course._id === sectionId
            );

            const filteredVideoData = filteredData?.[0]?.subSections.filter(
                (data) => data._id === subSectionId
            );

            setVideoData(filteredVideoData?.[0]);
            setVideoEnded(false);
        };

        setVideoSpecificDetails();
    }, [courseSectionData, courseEntireData, location.pathname]);

    const isFirstVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        );

        const currentSubSectionIndex = courseSectionData[
            currentSectionIndex
        ].subSections.findIndex((data) => data._id === subSectionId);

        return currentSectionIndex === 0 && currentSubSectionIndex === 0;
    };

    const isLastVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        );

        const noOfSubSections =
            courseSectionData[currentSectionIndex].subSections.length;

        const currentSubSectionIndex = courseSectionData[
            currentSectionIndex
        ].subSections.findIndex((data) => data._id === subSectionId);

        return (
            currentSectionIndex === courseSectionData.length - 1 &&
            currentSubSectionIndex === noOfSubSections - 1
        );
    };

    const goToNextVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        );

        const currentSubSectionIndex = courseSectionData[
            currentSectionIndex
        ].subSections.findIndex((data) => data._id === subSectionId);

        if (
            currentSubSectionIndex !==
            courseSectionData[currentSectionIndex].subSections.length - 1
        ) {
            const nextSubSectionId =
                courseSectionData[currentSectionIndex].subSections[
                    currentSubSectionIndex + 1
                ]._id;
            navigate(
                `/view-course/${courseId}/section/${sectionId}/subSection/${nextSubSectionId}`
            );
        } else {
            const nextSectionId =
                courseSectionData[currentSectionIndex + 1]?._id;
            const nextSubSectionId =
                courseSectionData[currentSectionIndex + 1]?.subSections[0]?._id;
            if (nextSectionId && nextSubSectionId) {
                navigate(
                    `/view-course/${courseId}/section/${nextSectionId}/subSection/${nextSubSectionId}`
                );
            }
        }
    };

    const goToPrevVideo = () => {
        console.log('called');
        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        );

        const currentSubSectionIndex = courseSectionData[
            currentSectionIndex
        ].subSections.findIndex((data) => data._id === subSectionId);

        if (currentSubSectionIndex !== 0) {
            const prevSubSectionId =
                courseSectionData[currentSectionIndex].subSections[
                    currentSubSectionIndex - 1
                ]._id;
            navigate(
                `/view-course/${courseId}/section/${sectionId}/subSection/${prevSubSectionId}`
            );
        } else {
            const prevSectionId =
                courseSectionData[currentSectionIndex - 1]?._id;
            const prevSubSectionLength =
                courseSectionData[currentSectionIndex - 1]?.subSections.length;
            const prevSubSectionId =
                courseSectionData[currentSectionIndex - 1]?.subSections[
                    prevSubSectionLength - 1
                ]?._id;
            if (prevSectionId && prevSubSectionId) {
                navigate(
                    `/view-course/${courseId}/section/${prevSectionId}/subSection/${prevSubSectionId}`
                );
            }
        }
    };

    const handleLectureCompletion = async () => {
        if(completedLectures.includes(subSectionId))    return ;
        setLoading(true);
        const res = await apiConnector("POST", UPDATE_COURSE_PROGRESS_API, {
            subSectionId,
            courseId,
            token,
        });
        if (res?.success) {
            dispatch(updateCompletedLectures(subSectionId));
            toast.success("Marked as Completed");
        } else {
            toast.dismiss("Technical glitch . Try again later");
        }
        setLoading(false);
    };

    return (
        <div className="h-full w-full bg-richblack-900">
            {!videoData ? (
                <div>No Data Found</div>
            ) : (
                <div className=" w-full relative">
                    <ReactPlayer
                        url={videoData?.videoURL}
                        playsinline
                        onEnded={() => {
                            setVideoEnded(true);
                            handleLectureCompletion();
                        }}
                        ref={playerRef}
                        controls={true}
                        width="100%"
                        height="80%"
                        className="aspect-video"
                    />
                    {videoEnded && (
                        <div className="flex flex-row justify-between text-[60px] w-10/12">
                            {!isFirstVideo() && (
                                <button
                                    disabled={loading}
                                    onClick={goToPrevVideo}
                                >
                                    <FaBackward />
                                </button>
                            )}
                            <button
                                disabled={loading}
                                onClick={() => {
                                    if (playerRef?.current) {
                                        playerRef.current?.seekTo(0);
                                        setVideoEnded(false);
                                    }
                                }}
                            >
                                <RiLoopLeftFill />
                            </button>
                            {!isLastVideo() && (
                                <button
                                    disabled={loading}
                                    onClick={goToNextVideo}
                                >
                                    <FaForward />
                                </button>
                            )}
                        </div>
                    )}
                </div>
            )}
            <h1 className="text-3xl font-bold text-richblack-25 px-5 mt-4">{videoData?.title}</h1>
            <p className="text-lg text-richblack-50 px-5 mt-2">{videoData?.description}</p>
        </div>
    );
};

export default VideoPlayer;
