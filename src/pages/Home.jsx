import React from "react";
import HighlightText from "../components/core/Home/HighlightText";
import ModifiedButtons from "../components/core/Home/ModifiedButtons";
import { FaArrowRight } from "react-icons/fa";
import { PiMedal } from "react-icons/pi";
import { Link } from "react-router-dom";
import { IoDiamond, IoSchool } from "react-icons/io5";
import banner from "../assets/homepagevideo.mp4"
import HomeCore from "../components/core/Home/HomeCore";
import { VscSymbolNamespace } from "react-icons/vsc";
import TimeLineImage from "../assets/Images/TimelineImage.png";
import CalendarSection from "../components/core/Home/CalendarSection";
import BecomeInstructor from "../components/core/Home/BecomeInstructor";
import FooterHome from "../components/core/Home/FooterHome";
import ExploreCourses from "../components/core/Home/ExploreCourses";
import ReviewSlider from "../components/core/common/ReviewSlider";

const Home = () => {
    return (
        <div className=" flex flex-col justify-between ">
            {/* Section 1 */}
            <section className="bg-richblack-900 text-white">
                <section className="w-10/12 mx-auto max-w-[1260px] ">
                    <div className="text-white">
                        <Link to={"/signup"}>
                            <div className="flex flex-row gap-2 bg-richblack-800 text-richblack-200 w-fit rounded-full mx-auto mt-5 px-[18px] py-[6px] items-center hover:scale-95 transition-all duration-200 hover:bg-richblack-900">
                                <div>Become an Instructor</div>
                                <FaArrowRight />
                            </div>
                        </Link>
                        <div className="flex gap-2 mx-auto w-fit font-semibold text-[36px] mt-5">
                            Empower Your Future with
                            <HighlightText text={"Coding Skills"} />
                        </div>
                        <div className="text-richblack-200  max-w-maxContent w-8/12 mx-auto text-center text-[16px] font-500 mt-5">
                            With our online coding courses,you can team at your
                            own pace, from anywhere in the world, and get access
                            to a wealth of resources, including hands-on
                            projects, quizzes and personalized feedback from
                            instructors.
                        </div>
                        <div className="flex gap-3 mx-auto w-fit mt-5">
                            <ModifiedButtons active={true} linkto={"/"}>
                                Learn More
                            </ModifiedButtons>
                            <ModifiedButtons active={false} linkto={"/"}>
                                Book a Demo
                            </ModifiedButtons>
                        </div>
                    </div>

                    {/* video banner */}
                    <div className=" mx-16 my-7 shadow-[2px_2px_10px_0px_rgba(0,100,100,0.3)]">
                        <video muted autoPlay loop >
                            <source src={banner} type="video/mp4"  />
                        </video>
                    </div>

                    {/* core section 1  */}
                    <div>
                        <HomeCore
                            position={"flex-row"}
                            heading={
                                <div className="font-semibold text-4xl ">
                                    Unlock your
                                    <HighlightText text={"Coding poential"} />
                                    with our online courses
                                </div>
                            }
                            subheading={
                                "Our courses are designed and taught by  ustry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                            }
                            btn1={{
                                btnText: "Try it Yourself",
                                linkto: "/signup",
                                active: true,
                            }}
                            btn2={{
                                btnText: "Learn More",
                                linkto: "/login",
                                active: false,
                            }}
                            codeblock={`<!DOCTYPE html>\n<html>\nhead><>Example</ \ntitle><linkrel="stylesheet"href="styles.css">\n</head>\n<body>\nh1><ahref="/">Header</a>\n</h1>\nnav><a href="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n</nav>`}
                            codeColor={"text-yellow-25"}
                        />

                        <HomeCore
                            position={"flex-row-reverse"}
                            heading={
                                <div className="font-semibold text-4xl ">
                                    Unlock your
                                    <HighlightText text={"Coding poential"} />
                                    with our online courses
                                </div>
                            }
                            subheading={
                                "Our courses are designed and taught by  ustry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                            }
                            btn1={{
                                btnText: "Try it Yourself",
                                linkto: "/signup",
                                active: true,
                            }}
                            btn2={{
                                btnText: "Learn More",
                                linkto: "/login",
                                active: false,
                            }}
                            codeblock={`<!DOCTYPE html>\n<html>\nhead><>Example</ \ntitle><linkrel="stylesheet"href="styles.css">\n</head>\n<body>\nh1><ahref="/">Header</a>\n</h1>\nnav><a href="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n</nav>`}
                            codeColor={"text-yellow-25"}
                        />
                    </div>

                    <ExploreCourses />
                </section>
            </section>

            {/* Section 2 */}

            <section className="bg-pure-greys-5 text-richblack-700 -z-20">
                <div className="home-background">
                    <div className="max-w-maxContent mx-auto flex">
                        <div className="flex flex-row gap-5 justify-between items-center mt-52 mx-auto">
                            <ModifiedButtons linkto={"/signup"} active={true}>
                                <div className="flex flex-row items-center gap-2">
                                    <div>Explore Full Catalog</div>
                                    <FaArrowRight />
                                </div>
                            </ModifiedButtons>
                            <ModifiedButtons linkto={"/signup"} active={false}>
                                Learn More
                            </ModifiedButtons>
                        </div>
                    </div>
                </div>

                <div className="w-10/12 max-w-maxContent flex flex-row items-center justify-between mx-auto gap-8 mt-10">
                    <div className="text-4xl font-semibold w-6/12">
                        Get the Skills you need for a{" "}
                        <HighlightText text={"Job that is in demand"} />
                    </div>
                    <div className="flex flex-col w-5/12 items-start gap-4">
                        <div>
                            The modern StudyNotion is the dictates its own
                            terms. Today, to be a competitive specialist
                            requires more than professional skills.
                        </div>
                        <ModifiedButtons
                            linkto={"/signup"}
                            active={true}
                            className
                        >
                            Learn More
                        </ModifiedButtons>
                    </div>
                </div>

                <div className="w-10/12 max-w-maxContent flex flex-row mx-auto gap-12 mt-10">
                    {/* Left half */}
                    <div className="flex items-center justify-between w-1/2">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-row gap-4">
                                <div className="w-[40px] h-[40px] rounded-full flex flex-row items-center justify-center mt-2 bg-white shadow-md">
                                    <PiMedal className="text-2xl text-blue-300 " />
                                </div>
                                <div>
                                    <div className="font-bold text-richblack-700 text-lg">
                                        Leadership
                                    </div>
                                    <div className="text-richblack-500">
                                        Fully committed to the success company.
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-row gap-4">
                                <div className="w-[40px] h-[40px] rounded-full flex flex-row items-center justify-center mt-2 bg-white shadow-md">
                                    <IoSchool className="text-2xl text-pink-300 " />
                                </div>
                                <div>
                                    <div className="font-bold text-richblack-700 text-lg">
                                        Leadership
                                    </div>
                                    <div className="text-richblack-500">
                                        Fully committed to the success company.
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-row gap-4">
                                <div className="w-[40px] h-[40px] rounded-full flex flex-row items-center justify-center mt-2 bg-white shadow-md">
                                    <IoDiamond className="text-2xl text-caribbeangreen-300 " />
                                </div>
                                <div>
                                    <div className="font-bold text-richblack-700 text-lg">
                                        Leadership
                                    </div>
                                    <div className="text-richblack-500">
                                        Fully committed to the success company.
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-row gap-4">
                                <div className="w-[40px] h-[40px] rounded-full flex flex-row items-center justify-center mt-2 bg-white shadow-md">
                                    <VscSymbolNamespace className="text-2xl text-yellow-300 " />
                                </div>
                                <div>
                                    <div className="font-bold text-richblack-700 text-lg">
                                        Leadership
                                    </div>
                                    <div className="text-richblack-500">
                                        Fully committed to the success company.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative mb-20">
                        <img
                            src={TimeLineImage}
                            className="shadow-[-3px_-3px_10px_5px_rgba(0,100,255,0.3)]"
                        />
                        <div className="w-[640px] h-[490px] bg-white absolute -z-10 -bottom-5 -right-5 shadow-md">
                            {" "}
                        </div>

                        <div className="absolute flex flex-row bg-caribbeangreen-800 text-white justify-center items-center gap-6 py-10 px-3 -bottom-12 left-14">
                            <div className="flex flex-row w-1/2 gap-5 ">
                                <div className="font-bold text-2xl ml-10 mt-2">
                                    10
                                </div>
                                <div className="opacity-50">
                                    YEARS OF EXPERIENCE
                                </div>
                            </div>
                            <div className="flex flex-row w-1/2 gap-5">
                                <div className="font-bold text-2xl">250</div>
                                <div className="opacity-50">
                                    TYPES OF COURSES
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <CalendarSection />
            </section>

            {/* Section 3 */}
            <section className="bg-richblack-900 text-white">
                <div className="w-10/12 max-w-maxContent mx-auto flex flex-col gap-5">
                    <BecomeInstructor />
                </div>
            </section>

			<ReviewSlider/>

            {/* Footer */}
            <FooterHome />
        </div>
    );
};

export default Home;
