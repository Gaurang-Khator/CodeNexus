import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetCourseState } from "../../slices/courseSlice";
import CreateCourse from "../CreateCourse";

const AddCourse = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetCourseState());
        console.log("runn");
    }, []);

    return <div>{<CreateCourse />}</div>;
};

export default AddCourse;
