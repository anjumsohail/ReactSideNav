import React from "react";
import { createPopper } from "@popperjs/core";
import { useNavigate } from "react-router-dom";
//import "bootstrap/dist/css/bootstrap.min.css";

const DropUp = ({ color }) => {
  const navigate = useNavigate();

  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();

  const popoverDropdownRef = React.createRef();

  const openDropdownPopover = () => {
    const popperInstance = createPopper(
      btnDropdownRef.current,
      popoverDropdownRef.current,
      {
        placement: "top-end",
      }
    );
    setDropdownPopoverShow(true);
    popperInstance.update(); // Update the position

    // Manually adjust position if necessary
    const dropdown = popoverDropdownRef.current;
    dropdown.style.transform = ""; // Reset transform to prevent off-screen
  };

  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  // bg colors
  let bgColor;
  color === "white"
    ? (bgColor = "bg-blueGray-700")
    : (bgColor = "bg-" + color + "-500");

  const handleLogout = () => {
    navigate("/logout");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  React.useEffect(() => {
    const popperInstance = createPopper(
      btnDropdownRef.current,
      popoverDropdownRef.current,
      {
        placement: "top-end",
      }
    );

    // Update the Popper instance after it has been mounted
    if (dropdownPopoverShow) {
      popperInstance.update();
    }

    return () => {
      popperInstance.destroy();
    };
  }, [dropdownPopoverShow]); // Runs when dropdownPopoverShow changes

  return (
    <>
      <div id="dropUp1" className="flex flex-wrap">
        <div id="dropUp2" className="w-full sm:w-6/12 md:w-4/12 px-4">
          <div
            id="dropUp3"
            className="relative inline-flex align-middle w-full"
          >
            <button
              className={
                "text-white font-bold uppercase text-sm py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 " +
                bgColor
              }
              type="button"
              ref={btnDropdownRef}
              onClick={() => {
                dropdownPopoverShow
                  ? closeDropdownPopover()
                  : openDropdownPopover();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-three-dots-vertical"
                viewBox="0 0 16 16"
              >
                <path d="M9.5 3a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM9.5 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
              </svg>
            </button>
            <div
              id="drop4"
              ref={popoverDropdownRef}
              className={
                (dropdownPopoverShow ? "block " : "hidden ") +
                (color === "white" ? "bg-white " : bgColor + " ") +
                "text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mb-1"
              }
              style={{ minWidth: "12rem" }}
            >
              <a
                href="/profile"
                className={
                  "text-decoration-none text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent " +
                  (color === "white" ? " text-blueGray-700" : "text-white")
                }
                onClick={handleProfile}
              >
                User Profile
              </a>

              <div className="h-0 my-2 border border-solid border-t-0 border-blueGray-800 opacity-25" />
              <a
                href="/logout"
                className={
                  "text-decoration-none text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent " +
                  (color === "white" ? " text-blueGray-700" : "text-white")
                }
                onClick={handleLogout}
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DropUp;
/*
export  function DropdownRender() {
  return (
    <>
      <Dropdown color="white" />
    </>
  );
}
*/
