import React, { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

function Carousel() {
  const slides = [
    {
      url: " https://thumbs.dfs.ivi.ru/storage26/contents/c/5/19c765b2152d043920316b4bfda0cc.jpg/1216x370/?q=60",
    },
    {
      url: "https://thumbs.dfs.ivi.ru/storage9/contents/4/e/1dc4d6462e3d971ef8f8b1ac4d7006.jpg/1216x370/?q=85",
    },
    {
      url: "https://thumbs.dfs.ivi.ru/storage26/contents/b/4/591f8efd756de87a323e716ecf06ff.jpg/1216x370/?q=85",
    },
    {
      url: "https://thumbs.dfs.ivi.ru/storage39/contents/7/3/6a130cfa195eb50195f1924a414ccb.jpg/1216x370/?q=85",
    },
    {
      url: "https://thumbs.dfs.ivi.ru/storage37/contents/2/1/a50f697565b626508d574776cf837b.jpg/1216x370/?q=85",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <main className=" bg-gradient-to-b from-stone-800 to-red-800">
      <div className=" container mx-auto  bg-gradient-to-b  from-stone-800 to-red-800">
        <h1 className="text-slate-100   text-4xl pt-24 py-3 ml-11">
          <strong>Новинки этого года:</strong>
        </h1>
        <div className="max-w-[1400px] h-[500px]  m-auto pt-10 relative group">
          <div
            style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
            className=" w-11/12 h-5/6 mx-auto rounded-2xl bg-center bg-cover duration-500"
          ></div>

          <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
            <BsChevronCompactLeft onClick={prevSlide} size={30} />
          </div>

          <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
            <BsChevronCompactRight onClick={nextSlide} size={30} />
          </div>
          <div className="flex top-4 justify-center py-2">
            {slides.map((slide, slideIndex) => (
              <div
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                className="text-2xl cursor-pointer"
              >
                <RxDotFilled />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Carousel;
