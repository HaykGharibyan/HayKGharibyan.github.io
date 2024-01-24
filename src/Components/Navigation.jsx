import React, { useState, useEffect } from "react";
import logo from "../Assets/logo.png";
import search from "../Assets/search-interface-symbol.png";
import usericon from "../Assets/user.png";
import closeicon from "../Assets/close.png";
import { useMediaQuery } from "react-responsive";
import toggleIcon from "../Assets/open-menu.png";
export default function Navigation({
  onOpenCart,
  onSearch,
  onClick,
  onLogin,
  onScrollToSerials,
  onScrollToGenre,
}) {
  const [openBuyPage, setOpenBuyPage] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const [toggle, setToggle] = useState(false);

  const openPage = () => {
    setOpenBuyPage(true);
  };
  const closePage = () => {
    setOpenBuyPage(false);
  };
  const isMobile = useMediaQuery({ maxWidth: 1024 });
  const isMobilee = useMediaQuery({ minWidth: 1024 });
  let toggleNavbar = () => {
    setToggle(!toggle);
  };
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);
  return (
    <header>
      {openBuyPage && (
        <div className=" fixed w-full h-full   flex items-start py-16 justify-center bg-opacity-90 bg-neutral-700 z-50 ">
          <div
            className={`container   ${
              window.innerWidth <= 640 ? "mx-1  " : "mx-96"
            }`}
          >
            <h1
              className={`container   text-center  text-slate-100   ${
                window.innerWidth <= 640 ? "text-6xl" : "text-7xl"
              }`}
            >
              <strong>
                ПОДПИСКА
                <br /> МИР КИНО
              </strong>
            </h1>
            <p className="text-3xl text-center py-5 text-slate-100">
              Подключай и смотри новые фильмы и сериалы в отличном качестве и
              без рекламы.
            </p>
            <button className="border-2 p-4 w-10/12   rounded-xl mx-auto mt-5 border-red-600 bg-red-400 px-2 hover:bg-red-700  hover:border-red-400 hover:text-slate-300 flex items-center">
              <strong className="mx-auto  text-2xl">
                Смотреть 30 дней бесплатно
              </strong>
            </button>
            <div
              className={`  grid grid-cols-3 gap-10 mt-10 -mx-20     ${
                window.innerWidth <= 640 ? " opacity-0" : ""
              }`}
            >
              <div className=" grid col-span-1 bg-opacity-40 rounded-2xl bg-amber-400 hover:bg-opacity-95">
                <strong>
                  <h2 className=" text-slate-200 text-center text-2xl p-2">
                    Одна подписка для всей семьи или друзей
                  </h2>
                </strong>
                <hr />
                <p className="text-gray-300  p-1">
                  Создай персональное пространство для каждого и подключай до
                  пяти устройств. И всё это в одной подписке.
                </p>
              </div>
              <div className="grid col-span-1 bg-opacity-40 rounded-2xl bg-orange-400 hover:bg-opacity-95">
                <strong>
                  <h2 className=" text-slate-200 text-2xl text-center p-2">
                    Максимальное качество
                  </h2>
                </strong>
                <hr />
                <p className="text-gray-300  p-1">
                  Постоянно обновляемый каталог фильмов, сериалов и мультфильмов
                  в 4K*. А ещё система, которая позволяет смотреть без
                  неприятных сбоев и остановок.
                </p>
              </div>
              <div className="grid col-span-1 bg-opacity-40 rounded-2xl bg-red-400 hover:bg-opacity-95">
                <strong>
                  <h2 className=" text-white text-center text-2xl p-2">
                    Просмотр офлайн
                  </h2>
                </strong>
                <hr />
                <p className="text-gray-300  p-1">
                  Смотри даже там, где нет интернета. Скачивай любимые фильмы и
                  сериалы прямо на телефон или планшет.*
                </p>
              </div>
            </div>

            <button
              className={`right-32 top-16 absolute   ${
                window.innerWidth <= 640 ? " right-7 top-6  " : ""
              }`}
              onClick={closePage}
            >
              <img
                src={closeicon}
                alt="closeIcon "
                className="w-6 hover:scale-105"
              />
            </button>
          </div>
        </div>
      )}
      <div
        className={`bg-stone-800 z-40  fixed w-full top-0 transition-transform ${
          visible ? "transform-none" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto   bg-stone-800">
          <div className=" flex justify-between py-5 ">
            <div
              className={`flex space-x-3  left-3 ${
                window.innerWidth <= 640 ? "left-3" : "{sm:m-10}"
              }`}
            >
              {!toggle && (
                <div className="flex  ml-4 justify-between">
                  <img src={logo} alt="logo" className="mr-1 w-8 h-8" />
                  <strong className="  text-slate-200 whitespace-nowrap p-1">
                    <a href=""> Мир Кино</a>
                  </strong>
                </div>
              )}

              {isMobilee && (
                <div className="flex space-x-3 ">
                  <button
                    className=" text-neutral-400   hover:text-slate-200 "
                    onClick={onOpenCart}
                  >
                    Мой мир
                  </button>
                  <button className=" text-neutral-400   hover:text-slate-200 ">
                    Что нового
                  </button>
                  <button
                    onClick={onClick}
                    className=" text-neutral-400   hover:text-slate-200 "
                  >
                    Фильмы
                  </button>
                  <button
                    onClick={onScrollToSerials}
                    className=" text-neutral-400   hover:text-slate-200 "
                  >
                    Сериалы
                  </button>
                  <button
                    onClick={onScrollToGenre}
                    className=" text-neutral-400   hover:text-slate-200 "
                  >
                    Все жанры
                  </button>
                </div>
              )}
            </div>
            {isMobilee && (
              <div className="flex  space-x-3">
                <button
                  onClick={openPage}
                  className="bg-red-600 rounded-md text-slate-200 text-sm px-3 hover:bg-red-800"
                >
                  Смотреть 30 дней бесплатно
                </button>
                <button
                  onClick={onSearch}
                  className="border-2 rounded-md border-red-700 text-slate-400 px-2 hover:border-red-900 flex items-center"
                >
                  <img src={search} alt="user icon" className="w-5 mr-1 " />
                  Поиск...
                </button>
                <button
                  onClick={onLogin}
                  className="border-2 rounded-md border-red-700 text-slate-400 px-2 hover:border-red-900 flex items-center"
                >
                  <img src={usericon} alt="user icon" className="w-5 mr-1 " />
                  Войти
                </button>
              </div>
            )}
            {isMobile && (
              <button
                onClick={toggleNavbar}
                className={`flex fixed right-3 lg:hidden space-x-3 ${
                  window.innerWidth <= 640 ? "mx-3" : "{sm:m-10}"
                } transition-transform ease-in-out duration-300 transform ${
                  toggle ? "rotate-180 " : "rotate-0"
                }`}
              >
                <img src={toggleIcon} alt="" />
              </button>
            )}
            {toggle && (
              <div className="w-full  transition-transform ease-in-out  duration-300 h-full flex flex-col  justify-center items-center  bg-stone-800 ">
                <img src={logo} alt="logo" className="mr-1 w-10 h-10" />
                <strong className="  text-slate-200 text-2xl whitespace-nowrap p-1">
                  <a href=""> Мир Кино</a>
                </strong>
                <div className="flex flex-col space-y-1  text-xl mx-auto w-full h-full mb-3  ">
                  <button
                    className=" text-neutral-400   hover:text-slate-200   "
                    onClick={onOpenCart}
                  >
                    Мой мир
                  </button>
                  <button className=" text-neutral-400   hover:text-slate-200 ">
                    Что нового
                  </button>
                  <button
                    onClick={onClick}
                    className=" text-neutral-400   hover:text-slate-200 "
                  >
                    Фильмы
                  </button>
                  <button
                    onClick={onScrollToSerials}
                    className=" text-neutral-400   hover:text-slate-200 "
                  >
                    Сериалы
                  </button>
                  <button
                    onClick={onScrollToGenre}
                    className=" text-neutral-400   hover:text-slate-200 "
                  >
                    Все жанры
                  </button>
                </div>
                <div className=" flex flex-col   mx-auto w-full h-full   ">
                  <button
                    onClick={openPage}
                    className="bg-red-600 rounded-lg mx-4 text-slate-200 text-md p-2   hover:bg-red-800"
                  >
                    Смотреть 30 дней бесплатно
                  </button>
                </div>
                <div className="flex flex-col mx-auto w-full h-full">
                  <button
                    onClick={onSearch}
                    className="border-2 rounded-lg my-3 p-2 mx-4 border-red-700 text-slate-400 px-2 hover:border-red-900 flex items-center justify-center"
                  >
                    <img src={search} alt="search icon" className="w-5 mr-1" />
                    Поиск...
                  </button>
                </div>

                <div className="flex flex-col text-center mx-auto w-full h-full">
                  <button
                    onClick={onLogin}
                    className="border-2 rounded-lg mx-4 border-red-700 p-2 text-slate-400 px-2 hover:border-red-900 flex items-center justify-center"
                  >
                    <img src={usericon} alt="user icon" className="w-5 mr-1" />
                    Войти
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <hr className=" border-stone-700" />
    </header>
  );
}
