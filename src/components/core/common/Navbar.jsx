import React, { useEffect, useState } from "react";
import logo from "../../../assets/Logo/CodeNexus.png";
import { NavbarLinks } from "../../../data/navbar-links";
import { Link, matchPath } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import ProfileDropDown from "./ProfileDropDown";
import { apiConnector } from "../../../services/apiConnector";
import { categories } from "../../../services/apis";
import { BsChevronDown } from "react-icons/bs";

const Navbar = () => {
    const token = useSelector((state) => state.auth.token);
    const totalItems = useSelector((state) => state.cart.totalItems);
    const user = useSelector((state) => state.profile.user);
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [subLinks, setSubLinks] = useState([
        {
            title: "Python",
            link: "/python",
        },
        {
            title: "Web Development",
            link: "/webdev",
        },
    ]);

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    };

    const fetchAPIData = async () => {
        try {
            setLoading(true);
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            setLoading(false);
            console.log("Result :", result);
            console.log(result.allCategories);
            const categ = result.allCategories;
            if (categ) {
                const modifiedSublinks = categ.map((category) => {
                    // Combine category name if it contains 2 or more words with '-'
                    const combinedTitle = category.categoryName
                        .split(" ")
                        .join("-");
                    return {
                        title: category.categoryName,
                        link: `/catalog/${combinedTitle.toLowerCase()}`, // Assuming link should be lowercase
                    };
                });

                // Update sublinks state with modified sublinks
                setSubLinks(modifiedSublinks);
            }
        } catch (error) {
            console.log("problem occured while fetching api data", error);
        }
    };
    useEffect(() => {
        fetchAPIData();
    }, []);

    function pathfinder(path) {
        return path === location.pathname;
    }

    return (
        <div className="bg-richblack-900 h-14 border-b-[1px] border-b-richblack-600 flex items-center justify-center py-4">
            <div className="mx-auto w-10/12 max-w-maxContent flex flex-row justify-between items-center">
                <Link to="/">
                    <img src={logo} width={200} className="mt-2" />
                </Link>
                {/* Home Catalog About Contact */}

                <nav className="hidden md:block">
                    <ul className="flex gap-x-6 text-richblack-25">
                        {NavbarLinks.map((link, index) => (
                            <li key={index}>
                                {link.title === "Catalog" ? (
                                    <>
                                        <div
                                            className={`group relative flex cursor-pointer items-center gap-1 ${
                                                matchRoute(
                                                    "/catalog/:catalogName"
                                                )
                                                    ? "text-yellow-25"
                                                    : "text-richblack-25"
                                            }`}
                                        >
                                            <p className="font-bold">{link.title}</p>
                                            <BsChevronDown />
                                            <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                                                <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                                                {!loading ? (
                                                    <>
                                                        {subLinks.length ? (
                                                            subLinks.map(
                                                                (
                                                                    subLink,
                                                                    i
                                                                ) => (
                                                                    <Link
                                                                        to={
                                                                            subLink.link
                                                                        }
                                                                        className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                                                        key={i}
                                                                    >
                                                                        <p>
                                                                            {
                                                                                subLink.title
                                                                            }
                                                                        </p>
                                                                    </Link>
                                                                )
                                                            )
                                                        ) : (
                                                            <p className="text-center">
                                                                No Courses Found
                                                            </p>
                                                        )}
                                                    </>
                                                ) : (
                                                    <p className="text-center">
                                                        Loading...
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <Link to={link?.path}>
                                        <p
                                            className={`font-bold ${
                                                matchRoute(link?.path)
                                                    ? "text-yellow-25"
                                                    : "text-richblack-25"
                                            }`}
                                        >
                                            {link.title}
                                        </p>
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="text-white flex flex-row gap-5 items-center">
                    {user && user.accountType !== "Instructor" && (
                        <Link to="/dashboard/cart" className="relative">
                            <FaShoppingCart />
                            {totalItems > 0 && (
                                <div className="absolute  text-black  font-bold  px-1 text-xs bg-yellow-50 left-3 rounded-full  -bottom-2">
                                    {totalItems}
                                </div>
                            )}
                        </Link>
                    )}
                    {token === null && (
                        <div className="flex flex-row gap-4">
                            <Link to="/login">
                                <button className="border-richblack-700 bg-richblack-800 text-richblack-100 rounded-md px-[12px] py-[8px]">
                                    Login
                                </button>
                            </Link>
                            <Link to="/signup">
                                <button className="border-richblack-700 bg-richblack-800 text-richblack-100 rounded-md px-[12px] py-[8px]">
                                    Sign Up
                                </button>
                            </Link>
                        </div>
                    )}
                    {token !== null && <ProfileDropDown />}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
