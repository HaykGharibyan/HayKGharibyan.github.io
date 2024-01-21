import React from "react";

const Footer = () => (
  <footer className="bg-stone-800">
    <div
      className={`container mx-auto text-slate-300 ${
        window.innerWidth <= 640 ? "px-10" : ""
      }`}
    >
      <div className="flex justify-between">
        <div className="w-1/2">
          <p className="text-6xl py-2 text-slate-100">Мир Кино</p>
          <p className=" text-xl">Лучший сайт для просмотра кино</p>
        </div>

        <div className="mt-3">
          <p className="text-xl ">
            <strong>Contacts</strong>
          </p>
          <ul className="">
            <li>
              <a href="">About</a>
            </li>
            <li>
              <a href="">Contacts</a>
            </li>
            <li>
              <a href="">Adress</a>
            </li>
          </ul>
        </div>

        <div className="mt-3">
          <p className="text-xl">
            <strong>Links</strong>
          </p>
          <ul className="">
            <li>
              <a href="#!">Instagaram</a>
            </li>
            <li>
              <a href="#!">Facebook</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div className="text-center text-neutral-500 py-3">
      © 2023 Copyright:
      <a href="#"> Mirkino.com</a>
    </div>
  </footer>
);

export default Footer;
