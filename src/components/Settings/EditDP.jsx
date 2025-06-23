import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoUpload } from "react-icons/go";
import toast from "react-hot-toast";
import { UploadImage } from "../../services/operations/ProfileUpdationAPI";

const EditDP = () => {
    const [image, setImage] = useState(null);

    const { token } = useSelector((state) => state.auth);

    const { user } = useSelector((state) => state.profile);
    const dp = user.image;

    const dispatch = useDispatch();

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };
    const handlesubmit = async (e) => {
        e.preventDefault();
        // PrintAPI();
        console.log(image);
        if (image === null) {
            toast.error("Image not selected ");
        } else {
            dispatch(UploadImage(image, token));
        }
    };

    return (
        <div className="bg-richblack-800 rounded-lg p-6 flex flex-row gap-5 w-7/12 mx-auto">
            <div>
                <img
                    src={dp}
                    className="rounded-full"
                    width={70}
                    height={70}
                ></img>
            </div>
            <div className="flex flex-col gap-2">
                <div>Change profile picture</div>
                <div className="flex flex-row gap-5 items-center">
                    <div>
                        <label
                            htmlFor="chooseNewDP"
                            className="bg-richblack-700 text-richblack-300 px-5 py-3 rounded-md text-lg font-semibold"
                        >{`${image ? "Selected" : "Select "}`}</label>
                        <input
                            type="file"
                            id="chooseNewDP"
                            name="chooseNewDP"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="flex flex-row gap-2 items-center bg-yellow-50 text-black p-2 rounded-lg font-semibold px-4">
                        <button onClick={handlesubmit}>Upload</button>
                        <GoUpload />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditDP;
