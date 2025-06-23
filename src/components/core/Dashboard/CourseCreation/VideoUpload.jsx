import React, { useState,useEffect} from 'react';
import { IoMdImages } from 'react-icons/io';

const VideoUpload = ({ register, errors, setValue, name, video, setChangesMade, view = false,setVideoDuration }) => {
    const [videourl, setVideoUrl] = useState(video ? video : "");
    const [file, setFile] = useState("");
    const [isDraggingOver, setIsDraggingOver] = useState(false);

    useEffect(() => {
        register(name, {
            required: true,
        })
    }, [])

    useEffect(() => {
        setValue(name, file);
    }, [file])

    const handleFileSelection = (selectedFile) => {
        if (selectedFile) {
			
            setFile(selectedFile);
            setChangesMade(true);
            const reader = new FileReader();
            reader.onloadend = () => {
                setVideoUrl(reader.result);
            };
            reader.readAsDataURL(selectedFile);
            getVideoDuration(selectedFile);
        }
    };

    const handleFileInputChange = (event) => {
        const selectedFile = event.target.files[0];
        handleFileSelection(selectedFile);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        console.log("File dropped:", event.dataTransfer.files[0]);
        const droppedFile = event.dataTransfer.files[0];
        handleFileSelection(droppedFile);
        setIsDraggingOver(false); // Reset dragging state
    };

    const getVideoDuration = (file) => {
        const videoElement = document.createElement('video');
        videoElement.preload = 'metadata';
        videoElement.onloadedmetadata = () => {
            console.log("Video duration:", videoElement.duration);
			setVideoDuration(Math.floor(videoElement.duration));
        };
        videoElement.src = URL.createObjectURL(file);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDraggingOver(true);
    };

    const handleDragLeave = () => {
        setIsDraggingOver(false);
    };

    return (
        <div className={`bg-richblack-700 rounded-lg border-dashed border-2 border-richblack-400 aspect-video items-center justify-between flex ${isDraggingOver ? "bg-richblack-300" : "opacity-100"}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}>
            {videourl ? (
                <div className="flex items-center justify-between flex-col">
                    <video src={videourl} className="aspect-video p-4" />
                    {view === false && (<button onClick={() => { setVideoUrl("") }} className="text-center text-richblack-5 underline">Cancel</button>)}
                </div>
            ) : (
                <div className="flex items-center justify-between mx-auto">
                    <label htmlFor={name} className="flex items-center justify-between h-full">
                        <div className="items-center justify-between flex flex-col">
                            <div><IoMdImages className="text-4xl text-yellow-25" /></div>
                            <div>Drag and drop videos or browse from your computer</div>
                            <div>
                                <div>Aspect Ratio 16:9</div>
                                <div>Recommend Size : 1024 X 576</div>
                            </div>
                        </div>
                    </label>
                    <input
                        type="file"
                        id={name}
                        name={name}
                        className="hidden h-0"
                        onChange={handleFileInputChange}
                        accept="video/*"
                    />
                    {errors[name] && <span>Video is needed.</span>}
                </div>
            )}
        </div>
    );
};

export default VideoUpload;
