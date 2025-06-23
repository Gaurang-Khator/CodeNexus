import React, { useEffect, useState } from "react";
import { CiEraser } from "react-icons/ci";
const RequirementSection = ({
    label,
    name,
    register,
    setValue,
    getValues,
    errors,
}) => {
    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);

    useEffect(() => {
        register(name, {
            required: true,
            validate: (value) => value.length > 0,
        });

        const currentvalues = getValues();
        console.log("bhiaye aji ",currentvalues[name]);
        setRequirementList(currentvalues[name] || []);
    }, []);
    useEffect(() => {
        setValue(name, requirementList);
    }, [requirementList]);

    const addToList = () => {
        if (requirement.length > 0) {
            const updatedList = [...requirementList, requirement];
            setRequirementList(updatedList);
            setRequirement("");
        }
    };
    const removeFromList = (index) => {
        const updatedList = requirementList.filter((_, i) => i !== index);
        setRequirementList(updatedList);
    };
    return (
        <div>
            <label htmlFor={name}>
                {label} <sup className="text-red text-xs">*</sup>
            </label>
            <input
                type="text"
                id={name}
                name={name}
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                className="bg-richblack-700 px-4 py-3 rounded-lg text-white placeholder:text-richblack-200 placeholder:text-sm w-full shadow-[0_1px_0px_0px_rgba(110,114,127,1)]"
            />
            <div onClick={addToList} className="cursor-pointer font-bold text-xs text-richblack-800 bg-yellow-100 px-2 py-[6px] mt-2 rounded-lg w-fit ">Add</div>

            {requirementList.map((require, index) => {
                return (
                    <div key={index} className="flex flex-row gap-2 items-center">
                        <div className="text-xs font-bold mt-1">{require}</div>
                        <div
                            onClick={() => {
                                removeFromList(index);
                            }}
                            className="cursor-pointer"
                        >
                            <CiEraser/>
                        </div>
                    </div>
                );
            })}

            {errors[name] && <span className="text-xs text-red">Requirements are required.</span>}
        </div>
    );
};

export default RequirementSection;
