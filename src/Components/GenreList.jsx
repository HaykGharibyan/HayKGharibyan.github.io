import React, { forwardRef, useState } from "react";
import { data } from "./GenreArray";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const GenreLsit = forwardRef(({ onClick }, ref) => {
  const slideLeft = () => {
    var slider = document.getElementById("sliderrr");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("sliderrr");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <section ref={ref} className=" bg-gradient-to-b to-stone-800 from-red-800">
      <div className="mb-16 container mx-auto">
        <h2 className="text-slate-100 text-4xl py-3 ml-11 mb-6">
          Все жанры вместе:
        </h2>
        <div className="relative flex items-center">
          <MdChevronLeft
            className="opacity-50 cursor-pointer hover:opacity-100"
            onClick={slideLeft}
            size={40}
          />
          <div
            id="sliderrr"
            className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide"
            style={{ overflow: "hidden" }}
          >
            {data.map((item) => (
              <img
                className="w-[150px]  rounded-2xl inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300"
                src={item.img}
                alt="/"
              />
            ))}
          </div>
          <MdChevronRight
            className="opacity-50 cursor-pointer hover:opacity-100"
            onClick={slideRight}
            size={40}
          />
        </div>
      </div>
      <hr className=" border-stone-700" />
    </section>
  );
});
export default GenreLsit;
