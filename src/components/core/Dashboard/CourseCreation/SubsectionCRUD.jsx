import React, { useEffect, useState } from "react";
import { GiTireIronCross } from "react-icons/gi";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import VideoUpload from "./VideoUpload";
import { useDispatch, useSelector } from "react-redux";
import {
    createSubSection,
    updateSubSection,
} from "../../../../services/operations/courseAPI";
import { setCourse } from "../../slices/courseSlice";
const SubsectionCRUD = ({
    data,
    setData,
    add = false,
    view = false,
    edit = false,
}) => {
    const {
        register,
        setValue,
        formState: { errors },
        handleSubmit,
        getValues,
    } = useForm();

    const { course } = useSelector((state) => state.course);
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [changesMade, setChangesMade] = useState(false);
    const [duration,setVideoDuration]=useState(null);

    useEffect(() => {
        if (edit || view) {
            setValue("subsectionTitle", data.subsection.title);
            setValue("subsectionDescription", data.subsection.description);
        }
    });

    const onsubmithandle = async () => {
        console.log("Muje kyu bulaya hai");
        if (loading) {
            toast.error("Loading in progress. Please wait");
            return;
        }
        if (edit) {
            //form data banaega
            //video tab ayega agar changes made m wo hoga

            if (
                currentValues.subsectionTitle === data.subsection.title &&
                currentValues.subsectionDescription === data.subsection.description &&
                changesMade === false
            ) {
                toast.error("No changes has been made");
                return;
            }

            const currentValues = getValues();
            const formData = new FormData();
            if (currentValues.subsectionTitle !== data.subsection.title) {
                formData.append("title", currentValues.subsectionTitle);
            }
            if (currentValues.subsectionDescription !== data.subsection.description) {
                formData.append("description", currentValues.subsectionDescription);
            }
            if (changesMade) {
                formData.append("video", currentValues.lecturevideo);
                formData.append("duration",duration);
            }
            formData.append("courseID", course._id);
            formData.append("subsectionID", data.subsection._id);

            setLoading(true);
            const response = await updateSubSection(formData, token);

            if (response) {
                dispatch(setCourse(response));
            }

            setLoading(false);
            setData(null);
        } else if (add) {
            const currentValues = getValues();
            const formData = new FormData();
            formData.append("title", currentValues.subsectionTitle);
            formData.append("description", currentValues.subsectionDescription);
            formData.append("video", currentValues.lecturevideo);
            formData.append("courseID", course._id);
            formData.append("sectionID", data.sectionID);
            formData.append("duration",duration);

            setLoading(true);
            const response = await createSubSection(formData, token);

            if (response) {
                dispatch(setCourse(response));
            }
            setLoading(false);
            setData(null);
        }
    };


    return (
        <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="w-11/12 max-w-[800px] rounded-lg border border-richblack-400 bg-richblack-800 p-6">
                <div className="flex flex-row justify-between">
                    <div>
                        {add ? "Adding" : null}
                        {view ? "Viewing" : null}
                        {edit ? "Editing" : null}
                        {" Lecture"}
                    </div>
                    <div>
                        <GiTireIronCross
                            onClick={() => {
                                setData(null);
                            }}
                        />
                    </div>
                </div>

                <div>
                    <form onSubmit={handleSubmit(onsubmithandle)}>
                        <div>
                            {/* Video option */}
                            <label>
                                Lecture video <sup>*</sup>
                            </label>

                            <VideoUpload
                                register={register}
                                errors={errors}
                                setValue={setValue}
                                name={"lecturevideo"}
                                video={edit || view ? data.subsection.videoURL : null}
                                setChangesMade={setChangesMade}
                                view={view}
                                setVideoDuration={setVideoDuration}
                            />
                        </div>
                        <div>
                            <label htmlFor="subsectionTitle">
                                Lecture Title <sup>*</sup>
                            </label>
                            <input
                                id="subsectionTitle"
                                type="text"
                                name="subsectionTitle"
                                placeholder="Enter Lecture title"
                                {...register("subsectionTitle", { required: true })}
                                className="bg-richblack-700 px-4 py-3 rounded-lg text-white placeholder:text-richblack-200 placeholder:text-sm w-full shadow-[0_1px_0px_0px_rgba(110,114,127,1)]"
                            />

                            {errors.subsectionTitle && (
                                <span>Lecture Title is required.</span>
                            )}
                        </div>
                        <div>
                            <label htmlFor="subsectionDescription">
                                Lecture Description <sup>*</sup>
                            </label>
                            <textarea
                                type="text"
                                id="subsectionDescription"
                                name="subsectionDescription"
                                placeholder="Enter Lecture description"
                                {...register("subsectionDescription", { required: true })}
                                className="bg-richblack-700 px-4 py-3 rounded-lg text-white placeholder:text-richblack-200 placeholder:text-sm w-full shadow-[0_1px_0px_0px_rgba(110,114,127,1)]"
                            />

                            {errors.subsectionDescription && (
                                <span>Lecture Description is required.</span>
                            )}
                        </div>
                        <button type="submit" className="cursor-pointer">
                            {loading
                                ? "Loading..."
                                : add || edit
                                    ? "Save"
                                    : edit
                                        ? "Save changes"
                                        : "kuch aana nhi chahiye"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SubsectionCRUD;
