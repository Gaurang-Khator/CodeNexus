import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper/modules";
import ReactStars from "react-stars";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { apiConnector } from "../../../services/apiConnector";
import { ratingEndpoints } from "../../../services/apis";

const ReviewSlider = () => {
    const { GET_ALL_RATING } = ratingEndpoints;
    const [ratings, setRatings] = useState([]);

    useEffect(() => {
        const fetchBestReviews = async () => {
            try {
                const response = await apiConnector("GET", GET_ALL_RATING);
                console.log("rating ", response);

                if (response?.success) {
                    setRatings(response.allRatings);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchBestReviews();
    }, [GET_ALL_RATING]); // Add dependency array

    return (
        <div className="h-[400px] bg-richblack-900">
            <div className="w-10/12 mx-auto">
                <h1 className="text-center font-semibold text-4xl text-white mt-6 mb-20">
                    REVIEWS FROM OTHER LEARNERS
                </h1>
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, Autoplay]}
                    spaceBetween={50}
                    slidesPerView={4}
                    navigation
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log("slide change")}
                    className="h-[50%]"
                >
                    {ratings.length > 0 ? (
                        ratings.slice(0, 15).map((rating) => (
                            <SwiperSlide key={rating.id} className="bg-richblack-800 p-4 px-4 min-w-[300px]">
                                <div>
                                    <div className="flex flex-row gap-2 items-center ">
                                        <div>
                                            <img
                                                src={rating.user.image}
                                                className="w-[50px] aspect-square rounded-full "
                                            />
                                        </div>
                                        <div className="flex flex-col ">
                                            <div className="text-white capitalize">
                                                {rating.user.firstName}{" "}
                                                {rating.user.lastName}
                                            </div>
                                            <div className="text-richblack-300 capitalize text-sm">
                                                {rating.course.courseTitle}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-richblack-5 mt-4">
                                        {rating.review.substr(0, 50)}
                                        {rating.review.length > 50 ? "..." : ""}
                                    </div>
                                    <div className="flex flex-row gap-2 items-center">
                                        <div className="text-[#ffd700] font-bold mt-1">{rating.rating}.0</div>
                                        <ReactStars
                                            count={5}
                                            value={rating.rating}
                                            edit={false}
                                            size={24}
                                            color2={"#ffd700"}
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    ) : (
                        <SwiperSlide>No ratings available</SwiperSlide>
                    )}
                </Swiper>
            </div>
        </div>
    );
};

export default ReviewSlider;
