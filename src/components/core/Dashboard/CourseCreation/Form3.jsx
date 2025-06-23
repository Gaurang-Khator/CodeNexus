import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { editCourseDetails } from "../../../../services/operations/courseAPI";
import toast from "react-hot-toast";
import { setCourse, setStep } from "../../slices/courseSlice";

const Form3 = () => {
    const {
        getValues,
        setValue,
        formState: { errors },
        register,
        handleSubmit,
    } = useForm();

    const [loading, setLoading] = useState(false);

    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const onSubmit = async () => {
        console.log(course.status);
        console.log(getValues().public);
        if (
            (course.status === "Published" && getValues().public === true) ||
            (course.status === "Draft" && getValues().public === false)
        ) {
            console.log("here");
            toast.error(`Course status is already ${course.status}`);
            return;
        } else {
            const formData = new FormData();
            let status;
            if (getValues().public) status = "Published";
            else status = "Draft";
            console.log(status);

            formData.append("status", status);
            formData.append("courseID", course._id);

            setLoading(true);
            const response = await editCourseDetails(formData, token);
            console.log(response);
            if (response) {
                dispatch(setCourse(response));
                //navigate
            }
            setLoading(false);
        }
    };

    return (
        <div>
            <div>Publish Setting</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="checkbox" name="public" {...register("public")} />
                <label htmlFor="public">Make this course as public </label>

                <button
                    onClick={() => {
                        dispatch(setStep(2));
                    }}
                >
                    Go Back
                </button>
                <button type="submit" disabled={loading}>
                    Save changes
                </button>
            </form>
        </div>
    );
};

export default Form3;
