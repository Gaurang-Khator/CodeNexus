import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";
import { RxDropdownMenu } from "react-icons/rx";
import { FaPlus } from "react-icons/fa6";
import ConfirmationModal from "../../common/ConfirmationModal";
import {
    deleteSection,
    deleteSubSection,
} from "../../../../services/operations/courseAPI";
import { setCourse } from "../../slices/courseSlice";
import SubsectionCRUD from "./SubsectionCRUD";

const SectionCreation = ({ handleEditing }) => {
    const { course } = useSelector((state) => state.course);
    const sections = course.courseContent;
    const [confirmationModal, setConfirmationModal] = useState(null);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [addSubsectionData, setAddSubsectionData] = useState(null);
    const [editSubsectionData, setEditSubsectionData] = useState(null);
    const [viewsubsectionData, setViewSubsectionData] = useState(null);

    const deleteSectionHandler = async (sectionID) => {
        const response = await deleteSection(
            {
                sectionID: sectionID,
                courseID: course._id,
            },
            token
        );

        if (response) {
            dispatch(setCourse(response));
        }
    };

    const deleteSubSectionHandler = async (sectionID, subsectionID) => {
        const response = await deleteSubSection(
            {
                sectionID: sectionID,
                subsectionID: subsectionID,
                courseID: course._id,
            },
            token
        );

        if (response) {
            dispatch(setCourse(response));
        }
    };

    return (
        <div>
            {sections.map((section) => {
                return (
                    <div key={section._id} className="">
                        <div>
                            <details open>
                                <summary className="flex flex-row justify-between border-b-2 border-b-richblack-500 w-full items-center">
                                    <div className="flex flex-row gap-2 items-center">
                                        <RxDropdownMenu />
                                        <div>{section.sectionName}</div>
                                    </div>
                                    <div className="flex flex-row gap-2 items-center">
                                        <FiEdit2
                                            onClick={() => {
                                                handleEditing(
                                                    section._id,
                                                    section.sectionName
                                                );
                                            }}
                                        />
                                        <MdDeleteOutline
                                            onClick={() => {
                                                setConfirmationModal({
                                                    text1: "Are you sure?",
                                                    text2: "The section will be deleted permanently!",
                                                    btnText1:
                                                        "Delete the section ",
                                                    btnHandler1: () => {
                                                        deleteSectionHandler(
                                                            section._id
                                                        );
                                                        setConfirmationModal(
                                                            null
                                                        );
                                                    },
                                                    btnText2: "Close",
                                                    btnHandler2: () => {
                                                        setConfirmationModal(
                                                            null
                                                        );
                                                    },
                                                });
                                            }}
                                        />
                                        <span>|</span>
                                        <IoMdArrowDropdown />
                                    </div>
                                </summary>
                                <p>
                                    {/* subssection ka data ayega */}

                                    <div>
                                        {section.subSections.map(
                                            (subsection) => {
                                                return (
                                                    <div
                                                        index={subsection._id}
                                                        className="flex flex-row justify-between border-b-2 border-b-richblack-500 w-full items-center"
                                                    >
                                                        <div className="flex flex-row gap-2 items-center">
                                                            <RxDropdownMenu />
                                                            <div
                                                                onClick={() => {
                                                                    setViewSubsectionData(
                                                                        {
                                                                            subsection:
                                                                                subsection,
                                                                        }
                                                                    );
                                                                }}
                                                            >
                                                                {
                                                                    subsection.title
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-row gap-2 items-center">
                                                            <FiEdit2
                                                                onClick={() => {
                                                                    setEditSubsectionData(
                                                                        {
                                                                            sectionID:
                                                                                section._id,
                                                                            subsection:
                                                                                subsection,
                                                                        }
                                                                    );
                                                                }}
                                                            />
                                                            <MdDeleteOutline
                                                                onClick={() => {
                                                                    setConfirmationModal(
                                                                        {
                                                                            text1: "Are you sure?",
                                                                            text2: "The subsection will be deleted permanently!",
                                                                            btnText1:
                                                                                "Delete the subsection ",
                                                                            btnHandler1:
                                                                                () => {
                                                                                    deleteSubSectionHandler(
                                                                                        section._id,
                                                                                        subsection
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
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                    <button className="flex flex-row gap-2 items-center">
                                        <FaPlus />
                                        <div
                                            onClick={() => {
                                                setAddSubsectionData({
                                                    sectionID: section._id,
                                                });
                                            }}
                                        >
                                            {" "}
                                            Add Lecture
                                        </div>
                                    </button>
                                </p>
                            </details>
                        </div>
                    </div>
                );
            })}
            {confirmationModal ? (
                <ConfirmationModal confirmationModal={confirmationModal} />
            ) : null}

            {addSubsectionData ? (
                <SubsectionCRUD
                    data={addSubsectionData}
                    setData={setAddSubsectionData}
                    add={true}
                />
            ) : editSubsectionData ? (
                <SubsectionCRUD
                    data={editSubsectionData}
                    setData={setEditSubsectionData}
                    edit={true}
                />
            ) : viewsubsectionData ? (
                <SubsectionCRUD
                    data={viewsubsectionData}
                    setData={setViewSubsectionData}
                    view={true}
                />
            ) : null}
        </div>
    );
};

export default SectionCreation;
