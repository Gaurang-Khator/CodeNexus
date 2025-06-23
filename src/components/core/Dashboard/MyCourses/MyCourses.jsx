import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { formatDate } from "../../../../services/formatDate";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { SlNotebook } from "react-icons/sl";
import { MdOutlineDelete } from "react-icons/md";
import { GiPencil } from "react-icons/gi";
import {
    deleteCourse,
    fetchInstructorCourses,
} from "../../../../services/operations/courseAPI";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import ConfirmationModal from "../../common/ConfirmationModal";
import { useNavigate } from "react-router-dom";
const MyCourses = () => {
    const [mycourses, setMycourses] = useState([]);
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [confirmationModal, setConfirmationModal] = useState(null);
    useEffect(() => {
        const getInstructorCourses = async () => {
            setLoading(true);
            const response = await fetchInstructorCourses(token);
            if (response) {
                setMycourses(response);
                console.log(response);
            }
            setLoading(false);
            console.log("token", token);
        };
        getInstructorCourses();
    }, []);

    const deleteThisCourse = async (courseID) => {
        const formData = new FormData();
        formData.append("courseID", courseID);
        await deleteCourse(formData, token);
        setMycourses((prevCourses) =>
            prevCourses.filter((course) => course._id !== courseID)
        );
    };
    return (
        <div className="bg-richblack-900 text-richblack-5 w-full px-10 py-5 pr-40">
            <div className="flex flex-col">
                <div className="flex flex-row gap-2 items-center">
                    <div
                        className="text-sm text-richblack-400 font-semibold cursor-pointer"
                        onClick={() => {
                            navigate("/dashboard/my-profile");
                        }}
                    >
                        Home
                    </div>
                    <span>/</span>
                    <div
                        onClick={() => {
                            navigate("/dashboard/instructor");
                        }}
                        className="cursor-pointer text-sm text-richblack-400 font-semibold"
                    >
                        Dashboard
                    </div>
                    <span>/</span>
                    <div className="text-yellow-50 font-bold ">My Courses</div>
                </div>
                <div className="flex flex-row justify-between mt-4">
                    <div className="text-4xl font-bold">My Courses</div>
                    <div
                        className="flex flex-row gap-3 items-center cursor-pointer text-black bg-yellow-200 px-4 py-3 rounded-md font-bold"
                        onClick={() => {
                            navigate("/dashboard/add-course");
                        }}
                    >
                        <div>
                            <FaPlus />
                        </div>
                        <div>Add Course</div>
                    </div>
                </div>
            </div>
            {loading ? (
                "Loading..."
            ) : (
                <div className="mt-10">
                    <Table className="border-richblack-400 border-[1px]">
                        <Thead className="text-left uppercase font-normal border-richblack-400 border-[1px]">
                            <Tr className="">
                                <Th className="py-2 font-normal font-mono pl-8 w-[70%]">
                                    Courses
                                </Th>
                                <Th className="py-2 font-normal font-mono  w-[10%]">
                                    Duration
                                </Th>
                                <Th className="py-2 font-normal font-mono  w-[10%]">
                                    Price
                                </Th>
                                <Th className="py-2 font-normal font-mono pr-8 w-[10%]">
                                    Action
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {mycourses.length === 0
                                ? "No course has been created "
                                : mycourses.map((course) => {
                                    return (
                                        <Tr className="">
                                            <Td className="flex flex-row my-4 pl-10">
                                                <div className="w-[40%]">
                                                    <img
                                                        src={course.thumbnail}
                                                        width={250}
                                                        className="aspect-video rounded-lg "
                                                    />
                                                </div>
                                                <div className="ml-4 flex flex-col gap-2 w-[60%]">
                                                    <div className="text-white font-semibold text-1xl">
                                                        {course.courseTitle}:
                                                    </div>
                                                    <div className="font-normal text-richblack-300  text-sm">
                                                        {
                                                            course.courseDescription
                                                        }
                                                    </div>
                                                    <div className="text-sm text-richblack-100 font-semibold">
                                                        {"Created : "}
                                                        {formatDate(
                                                            course.createdAt
                                                        )}
                                                    </div>
                                                    <div>
                                                        {course.status ===
                                                            "Published" ? (
                                                            <div className="flex flex-row gap-2 items-center rounded-full px-2 py-1 text-caribbeangreen-200 bg-richblack-500 w-fit">
                                                                <IoCheckmarkDoneCircleSharp />
                                                                <div>
                                                                    Published
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <SlNotebook />
                                                                <div>
                                                                    Drafted
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </Td>
                                            <Td className="text-sm text-richblack-200 font-inter">
                                                2hr 30min
                                            </Td>
                                            <Td className="text-sm text-richblack-200 font-inter">
                                                {" "}
                                                Rs. {course.price}
                                            </Td>
                                            <Td className="text-xl font-bold text-richblack-200 ">
                                                <div className="flex flex-row gap-2">
                                                    <GiPencil
                                                        onClick={() => {
                                                            navigate(
                                                                `/dashboard/edit-course/${course._id}`
                                                            );
                                                            
                                                        }}
                                                        className="text-2xl cursor-pointer"
                                                    />
                                                    <MdOutlineDelete
                                                        className="cursor-pointer text-2xl"
                                                        onClick={() => {
                                                            setConfirmationModal(
                                                                {
                                                                    text1: "Are you sure?",
                                                                    text2: "The course will be deleted permanently!",
                                                                    btnText1:
                                                                        "Delete the course ",
                                                                    btnHandler1:
                                                                        () => {
                                                                            deleteThisCourse(
                                                                                course._id
                                                                            );
                                                                            setConfirmationModal(
                                                                                null
                                                                            );
                                                                        },
                                                                    btnText2:
                                                                        "Close",
                                                                    btnHandler2:
                                                                        () => {
                                                                            setConfirmationModal(
                                                                                null
                                                                            );
                                                                        },
                                                                }
                                                            );
                                                        }}
                                                    />
                                                </div>
                                            </Td>
                                        </Tr>
                                    );
                                })}
                        </Tbody>
                    </Table>
                </div>
            )}
            {confirmationModal ? (
                <ConfirmationModal confirmationModal={confirmationModal} />
            ) : null}
        </div>
    );
};

export default MyCourses;
