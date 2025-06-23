import React, { useEffect, useState } from "react";
import { CiSquareQuestion } from "react-icons/ci";
import { GiTireIronCross } from "react-icons/gi";

const TagSection = ({ label, name, register, setValue, getValues, errors }) => {
    const [tag, setTag] = useState("");
    const [tagList, setTagList] = useState([]);

    useEffect(() => {
        register(name, {
            required: true,
            validate: (value) => value.length > 0,
        });
        const currentvalues = getValues();
        console.log("bhiaye aji ",currentvalues[name]);
        setTagList(currentvalues[name] || []);
    }, [register, name, getValues]);

    useEffect(() => {
        setValue(name, tagList);
    }, [tagList, name, setValue]);

    const addToList = () => {
        if (tag.trim().length > 0) {
            const updatedList = [...tagList, tag.trim()];
            setTagList(updatedList);
            setTag("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === ",") {
            e.preventDefault();
            addToList();
        }
    };

    const removeFromList = (index) => {
        const updatedList = tagList.filter((_, i) => i !== index);
        setTagList(updatedList);
    };

    return (
        <div>
            <label htmlFor={name}>
                {label} <sup className="text-red text-xs">*</sup>
            </label>
            <div className="mt-1">
                <div className="flex flex-row flex-wrap gap-2 text-xs mb-1">
                    {tagList.map((Tag, index) => (
                        <div
                            key={index}
                            className="flex flex-row gap-2 items-center bg-yellow-50 p-1 rounded-3xl text-richblack-900"
                        >
                            <div>{Tag}</div>
                            <div
                                onClick={() => removeFromList(index)}
                                className="cursor-pointer"
                            >
                                <GiTireIronCross className="text-xs" />
                            </div>
                        </div>
                    ))}
                </div>
                <input
                    type="text"
                    id={name}
                    name={name}
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter Tag and Press , "
                    className="bg-richblack-700 px-4 py-3 mt-1 rounded-lg text-white placeholder:text-richblack-200 placeholder:text-sm w-full shadow-[0_1px_0px_0px_rgba(110,114,127,1)] "
                />

                {errors[name] && (
                    <span className="text-xs text-red">Tags are required.</span>
                )}
            </div>
        </div>
    );
};

export default TagSection;
