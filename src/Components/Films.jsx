import React, { forwardRef, useState, useRef } from "react";
import FilmsArray from "./FilmsArray";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import favoriteicon from "../Assets/heart.png";
import watchicon from "../Assets/watch.png";

const Films = forwardRef(({ onClick, onOpenFilm }, ref) => {
  const [selectedFilmId, setSelectedFilmId] = useState(null);
  const sliderRef = useRef(null);
  const startXRef = useRef(null);

  const handleButtonClick = (id) => {
    setSelectedFilmId(id);
    onClick(id);
  };

  const handleTouchStart = (event) => {
    startXRef.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event) => {
    const diff = startXRef.current - event.touches[0].clientX;
    sliderRef.current.scrollLeft += diff * 2; // Увеличьте значение 2 для более быстрой прокрутки
    startXRef.current = event.touches[0].clientX;
  };

  const slideLeft = () => {
    sliderRef.current.scrollLeft -= 500;
  };

  const slideRight = () => {
    sliderRef.current.scrollLeft += 500;
  };

  return (
    <section
      ref={ref}
      className="bg-gradient-to-b to-stone-800 from-red-800"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div className="container mx-auto">
        <h2 className="text-slate-100 text-4xl pb-3 ml-10 mb-6">
          Фильмы с высоким рейтингом:
        </h2>
        <div className="relative flex items-center">
          <MdChevronLeft
            className="opacity-50 cursor-pointer hover:opacity-100"
            onClick={slideLeft}
            size={40}
          />
          <div
            ref={sliderRef}
            className="w-full h-full overflow-x-scroll whitespace-nowrap"
            style={{ overflow: "hidden", scrollBehavior: "smooth" }}
          >
            {FilmsArray.map((item) => (
              <div
                className="relative w-[250px] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300"
                key={item.id}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full rounded-2xl h-full object-cover"
                />

                <div className="absolute inset-0 flex flex-col items-center justify-end opacity-0 hover:opacity-100 p-4">
                  <div className="text-white text-center ">
                    <p className=" text-xl py-3">{item.name}</p>
                    <div className="flex items-center justify-between space-x-7">
                      <button
                        onClick={onOpenFilm}
                        className="border-2 rounded-md border-red-700 text-slate-400 px-3 hover:border-red-900"
                      >
                        <img
                          className="w-12 px-3 py-1"
                          src={watchicon}
                          alt="смотреть"
                        />
                      </button>

                      <button
                        className="border-2 rounded-md border-red-700 text-slate-400 px-3 hover:border-red-900"
                        onClick={() => handleButtonClick(item.id)}
                      >
                        <img
                          className="w-12  px-3 py-1"
                          src={favoriteicon}
                          alt="Избранное"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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

export default Films;
