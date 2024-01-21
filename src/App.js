import "./App.css";
import Carousel from "./Components/Carousel";
import Films from "./Components/Films";
import Footer from "./Components/Footer";
import GenreList from "./Components/GenreList";
import Navigation from "./Components/Navigation";
import Serials from "./Components/Serials";
import React, { Component } from "react";
import closeicon from "./Assets/close.png";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import FilmsArray from "./Components/FilmsArray";
import trashBin from "./Assets/bin.png";

import ReactPlayer from "react-player";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      showCart: false,
      showSearchCart: false,
      selectedFilmId: null,
      searchText: "",
      searchResults: [],
      allFilms: [],
      showLogForm: false,
      activeForm: "login",
      login: "",
      password: "",
      users: [],
      loggedIn: false,
      error: "",
      openFilm: false,
    };
    this.ref = React.createRef();
    this.serialsRef = React.createRef();
    this.genreRef = React.createRef();
    this.handleAddDiv = this.handleAddDiv.bind(this);
    this.slideLeft = this.slideLeft.bind(this);
    this.slideRight = this.slideRight.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleOpenCart = this.handleOpenCart.bind(this);
    this.handleOpenSearchCart = this.handleOpenSearchCart.bind(this);
    this.handleOpenLogForm = this.handleOpenLogForm.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleScrollToSerials = this.handleScrollToSerials.bind(this);
    this.handleScrollToGenre = this.handleScrollToGenre.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleOpenLogin = this.handleOpenLogin.bind(this);
    this.handleOpenRegistration = this.handleOpenRegistration.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleAddObject = this.handleAddObject.bind(this);
  }

  handleAddDiv = (filmId) => {
    const selectedFilm = FilmsArray.find((film) => film.id === filmId);
    if (selectedFilm) {
      const newItem = (
        <film
          key={selectedFilm.id}
          id={selectedFilm.id}
          name={selectedFilm.name}
          img={selectedFilm.img}
        />
      );
      this.setState((prevState) => ({
        items: [...prevState.items, newItem],
        selectedFilmId: filmId,
      }));
    }
  };
  slideLeft = () => {
    var slider = document.getElementById("sliderrr");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  slideRight = () => {
    var slider = document.getElementById("sliderrr");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  handleDelete = (filmId) => {
    this.setState((prevState) => ({
      items: prevState.items.filter((item) => item.key !== filmId),
    }));
  };

  handleOpenCart = () => {
    this.setState((prevState) => ({ showCart: !prevState.showCart }));
  };

  handleOpenSearchCart = () => {
    this.setState((prevState) => ({
      showSearchCart: !prevState.showSearchCart,
    }));
  };

  handleOpenFilm = () => {
    this.setState((prevState) => ({
      openFilm: !prevState.openFilm,
    }));
  };

  handleOpenLogForm = () => {
    this.setState((prevState) => ({
      showLogForm: !prevState.showLogForm,
    }));
  };

  handleClick = () => {
    this.ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  handleScrollToSerials = () => {
    this.serialsRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  handleScrollToGenre = () => {
    this.genreRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  handleSearch = (e) => {
    const query = e.target.value;
    this.setState({ searchText: query });

    const filteredFilms = FilmsArray.filter((film) =>
      film.name.toLowerCase().includes(query.toLowerCase())
    );

    this.setState({ searchResults: filteredFilms });
  };
  handleOpenLogin = () => {
    this.setState({ showLogForm: true, activeForm: "login" });
  };

  handleOpenRegistration = () => {
    this.setState({ showLogForm: true, activeForm: "registration" });
  };

  componentDidMount() {
    this.fetchData();
  }
  fetchData = async () => {
    try {
      const response = await fetch(
        "https://65453cb35a0b4b04436ddb70.mockapi.io/Users"
      );
      if (response.ok) {
        const data = await response.json();
        this.setState({ users: data });
      } else {
        console.error("Ошибка получения данных с сервера");
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  handleLogin() {
    const { login, password, users } = this.state;
    const user = users.find(
      (user) => user.login === login && user.password === password
    );
    if (user) {
      this.setState({ loggedIn: true, error: "" });
      console.log("Успешный вход!");
      setTimeout(() => {
        this.setState({ showLogForm: false });
      }, 2000);
    } else {
      this.setState({ error: "Неправильный логин или пароль" });
      console.log("Неправильный логин или пароль");
    }
  }
  validatePassword(value) {
    const minLength = 8;
    const hasLowerCase = /[a-z]/.test(value);
    const hasUpperCase = /[A-Z]/.test(value);
    const hasDigit = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value);

    return (
      value.length >= minLength &&
      hasLowerCase &&
      hasUpperCase &&
      hasDigit &&
      hasSpecialChar
    );
  }

  handleAddObject() {
    try {
      const { login, password, users } = this.state;

      const isLoginTaken = users.some((user) => user.login === login);

      if (isLoginTaken) {
        this.setState({
          registrationError: "Этот логин уже занят!",
          registrationSuccess: null,
        });
        return;
      }

      if (!this.validatePassword(password)) {
        this.setState({
          registrationError: "Пароль не соответствует требованиям.",
          registrationSuccess: null,
        });
        return;
      }

      fetch("https://65453cb35a0b4b04436ddb70.mockapi.io/Users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      })
        .then((response) => {
          if (response.ok) {
            this.setState({
              registrationSuccess: "Регистрация прошла успешно!",
              registrationError: null,
            });
            setTimeout(() => {
              this.setState({ showLogForm: false });
            }, 2000);
          } else {
            this.setState({
              registrationError: "Ошибка при регистрации!",
              registrationSuccess: null,
            });
          }
        })
        .catch((error) => {
          console.error("Ошибка при отправке запроса:", error);
        });
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
    }
  }

  render() {
    const { login, password, loggedIn, error } = this.state;
    return (
      <div>
        {this.state.openFilm && (
          <div className="fixed w-full  h-full  flex items-start py-16 justify-center bg-opacity-90 bg-neutral-700 z-50 ">
            <div className="container flex items-center justify-center ">
              <div>
                <p className="text-white text-3xl mb-5">Название фильма</p>
                <ReactPlayer
                  className=" "
                  url={"https://www.youtube.com/watch?v=U6EOzNprSXo"}
                  controls
                  width="800px"
                  height="450px"
                />
              </div>

              <button
                className="right-32 top-16 absolute"
                onClick={() => this.setState({ openFilm: false })}
              >
                <img
                  src={closeicon}
                  alt="closeIcon"
                  className="w-6 hover:scale-105"
                />
              </button>
            </div>
          </div>
        )}
        {this.state.showCart && (
          <div
            className={` fixed w-full h-full  items-start bg-opacity-90 bg-neutral-700 z-50 ${
              window.innerWidth <= 640 ? "px-5" : "sm:m-10"
            }`}
          >
            <div className=" flex container mx-auto justify-between py-20">
              <strong className="text-5xl text-slate-200">
                Список избранных
              </strong>
              <button
                className=""
                onClick={() => this.setState({ showCart: false })}
              >
                <img
                  src={closeicon}
                  alt="closeIcon "
                  className="w-6 hover:scale-105"
                />
              </button>
            </div>
            <div class=" container mx-auto ">
              {this.state.items.length === 0 ? (
                <div>
                  <hr classname=" border-stone-800" />
                  <p className="py-10 text-center text-5xl text-slate-300">
                    Список пуст
                  </p>
                  <hr classname="border-stone-800" />
                </div>
              ) : (
                <div className="relative flex items-center">
                  <MdChevronLeft
                    className="opacity-50 cursor-pointer hover:opacity-100"
                    onClick={this.slideLeft}
                    size={40}
                  />
                  <div
                    id="sliderrr"
                    className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide"
                    style={{ overflow: "hidden" }}
                  >
                    {this.state.items.map((item) => (
                      <div
                        className="relative w-[250px] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300"
                        key={item.props.key}
                      >
                        <img
                          src={item.props.img}
                          alt={item.props.name}
                          className="w-full rounded-2xl h-full object-cover"
                        />
                        <div className="flex py-2 justify-between">
                          <p className="text-slate-200 text-xl ">
                            {item.props.name}
                          </p>
                          <button
                            className="border-2 rounded-md border-red-700 text-slate-400 px-2 hover:border-red-900 flex items-center"
                            onClick={() => this.handleDelete(item.key)}
                          >
                            <img
                              className="w-5 mx-1 "
                              src={trashBin}
                              alt="trashbin"
                            />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <MdChevronRight
                    className="opacity-50 cursor-pointer hover:opacity-100"
                    onClick={this.slideRight}
                    size={40}
                  />
                </div>
              )}
            </div>
          </div>
        )}
        {this.state.showSearchCart && (
          <div className="  fixed w-full h-full flex  items-start py-32 justify-center bg-opacity-90 bg-neutral-700 z-50 ">
            <div
              className={`container   ${
                window.innerWidth <= 640 ? "mx-5" : "mx-96"
              }`}
            >
              <h1 className="text-5xl py-7 text-slate-100  ">
                <strong>Поиск</strong>
              </h1>
              <input
                value={this.state.searchText}
                onChange={this.handleSearch}
                type="text"
                placeholder="Фильмы, жанры, персонажы"
                className="block bg-white w-full border rounded-md py-2 pl-4 pr-3 shadow-sm hover:border-sky-500 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              />
              {this.state.searchText && this.state.searchResults.length > 0 ? (
                <div className="grid grid-cols-3 p-3 w-full h-full bg-slate-200 rounded-2xl  mt-3">
                  {this.state.searchResults.map((film) => (
                    <div
                      key={film.id}
                      className="flex items-center cursor-pointer"
                    >
                      <img
                        className="w-20 m-2 rounded-xl "
                        src={film.img}
                        alt={film.name}
                      />
                      <a>
                        <h2 className="text-black ">{film.name}</h2>
                      </a>
                    </div>
                  ))}
                </div>
              ) : null}

              <button
                className={`right-32 top-16 absolute ${
                  window.innerWidth <= 640 ? "right-12 top-12" : ""
                }`}
                onClick={() => this.setState({ showSearchCart: false })}
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
        {this.state.showLogForm && (
          <div className="fixed w-full h-full flex items-start py-32  justify-center bg-opacity-90 bg-neutral-700 z-50">
            <div className="container mx-96">
              <h1 className="text-2xl text-center text-slate-100">
                <strong>
                  {" "}
                  <span>
                    <button
                      onClick={this.handleOpenLogin}
                      className={`${
                        this.state.activeForm === "login"
                          ? "bg-red-700 text-white "
                          : " bg-gray-300  text-black"
                      } py-2 px-4 m-2 rounded focus:outline-none hover:bg-red-700 hover:text-white`}
                    >
                      Войти
                    </button>

                    <button
                      onClick={this.handleOpenRegistration}
                      className={`${
                        this.state.activeForm === "registration"
                          ? "bg-red-700 text-white "
                          : " bg-gray-300  text-black"
                      } py-2 m-2 px-4 rounded focus:outline-none hover:bg-red-700 hover:text-white`}
                    >
                      Регистрация
                    </button>
                  </span>
                </strong>
              </h1>
              <div>
                {this.state.activeForm === "login" ? (
                  <div className="container mx-auto bg-slate-300 flex flex-col rounded-2xl">
                    <div className="p-5 ">
                      <div className=" container ">
                        {error && (
                          <strong>
                            <p className="text-red-600 text-center">{error}</p>
                          </strong>
                        )}
                        {loggedIn && (
                          <strong>
                            <p className="text-green-600 text-center ">
                              Вы вошли в систему!
                            </p>
                          </strong>
                        )}{" "}
                        <p className=" text-center text-xl m-3">
                          Имя ползоавелья
                        </p>
                        <input
                          className="block bg-white w-full border rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                          type="text"
                          value={login}
                          onChange={(e) =>
                            this.setState({ login: e.target.value })
                          }
                          placeholder="Логин"
                        />{" "}
                      </div>
                      <div>
                        <p className=" text-center text-xl m-3">Пароль</p>
                        <input
                          className="block bg-white w-full border rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                          type="password"
                          value={password}
                          onChange={(e) =>
                            this.setState({ password: e.target.value })
                          }
                          placeholder="Пароль"
                        />
                      </div>
                      <button
                        className="border-2 w-1/3 h-10  rounded-md mx-auto mt-5 border-green-600 bg-green-300 px-2 hover:bg-green-700  hover:border-green-300 hover:text-slate-300 flex items-center"
                        onClick={this.handleLogin}
                      >
                        <strong className="mx-auto"> В О Й Т И</strong>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="container mx-auto bg-slate-300 flex flex-col rounded-2xl">
                      <div className="p-5 ">
                        <div className=" container ">
                          {this.state.registrationError && (
                            <strong>
                              <p className="text-red-600 text-center">
                                {this.state.registrationError}
                              </p>
                            </strong>
                          )}
                          {this.state.registrationSuccess && (
                            <strong>
                              <p className="text-green-600 text-center">
                                {this.state.registrationSuccess}
                              </p>
                            </strong>
                          )}
                          <p className=" text-center text-xl m-3 ">
                            Имя ползоавелья
                          </p>
                          <input
                            className="block bg-white w-full border rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                            type="text"
                            value={login}
                            onChange={(e) =>
                              this.setState({ login: e.target.value })
                            }
                            placeholder="Логин"
                          />
                        </div>
                        <div>
                          <p className=" text-center text-xl m-3">Пароль</p>
                          <input
                            className="block bg-white w-full border rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                            type="password"
                            value={password}
                            onChange={(e) =>
                              this.setState({ password: e.target.value })
                            }
                            placeholder="Пароль"
                          />
                        </div>
                        <button
                          className="border-2 w-1/3 h-10  rounded-md mx-auto mt-5 border-green-600 bg-green-300 px-2 hover:bg-green-700  hover:border-green-300 hover:text-slate-300 flex items-center"
                          onClick={this.handleAddObject}
                        >
                          <strong className="mx-auto uppercase">
                            Зарегистрироваться
                          </strong>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <button
                className="right-32 top-16 absolute"
                onClick={() => this.setState({ showLogForm: false })}
              >
                <img
                  src={closeicon}
                  alt="closeIcon"
                  className="w-6 hover:scale-105"
                />
              </button>
            </div>
          </div>
        )}

        <Navigation
          onOpenCart={this.handleOpenCart}
          onSearch={this.handleOpenSearchCart}
          onLogin={this.handleOpenLogForm}
          onClick={this.handleClick}
          onScrollToSerials={this.handleScrollToSerials}
          onScrollToGenre={this.handleScrollToGenre}
        />

        <Carousel onClick={this.handleAddDiv} />
        <Films
          onClick={this.handleAddDiv}
          ref={this.ref}
          onOpenFilm={this.handleOpenFilm}
        />
        <Serials
          onOpenFilm={this.handleOpenFilm}
          onClick={this.handleAddDiv}
          ref={this.serialsRef}
        />
        <GenreList
          onOpenFilm={this.handleOpenFilm}
          onClick={this.handleAddDiv}
          ref={this.genreRef}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
