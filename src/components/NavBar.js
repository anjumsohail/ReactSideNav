import React, { useEffect } from "react";
import "./Navbar.css";

import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useState, useRef } from "react";
import { Dropdown } from "react-bootstrap";
import "@mdi/font/css/materialdesignicons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

import DropUp from "./dropUp";

export default function NavBar({ Datas }) {
  const navigate = useNavigate();

  const [activeItemId, setActiveItemId] = useState(null);
  const { Profile, Data, logoText, personImg, colors } = Datas;

  const [expandedItems, setExpandedItems] = useState({}); // To track expanded
  const [MenuExpanded, setMenuExpanded] = useState(true);

  const handleChildData = (data) => {
    setMenuExpanded(data); // Get Menu expended state from Child
    console.log("NavBar ", MenuExpanded);
  };

  const handleClicked = (id, path, children) => {
    // Only proceed if the item has children
    if (children && Array.isArray(children) && children.length > 0) {
      setExpandedItems((prev) => {
        const isCurrentlyExpanded = prev[id];
        const newExpandedState = { ...prev };

        // Toggle the current item
        newExpandedState[id] = !isCurrentlyExpanded;

        // Toggle all children of the current item
        children.forEach((child) => {
          newExpandedState[child.id] = !isCurrentlyExpanded; // Toggle child state
        });

        return newExpandedState;
      });
    }
    setActiveItemId(id); // Set the active item
    if (!children && path) {
      navigate(path);
    }
  };

  const renderMenuItems = (items) => {
    try {
      // Check if items is an array
      if (!Array.isArray(items)) {
        console.error("Expected an array but received:", items);
        return null; // or return an empty array
      }
      // Log the items before mapping
      // Check if the items array is empty
      if (items.length === 0) {
        return null; // or return an empty array
      }

      return items.map((item) => {
        // Check if the item is a valid object
        if (!item || typeof item !== "object") {
          console.warn("Invalid item structure (not an object):", item);
          return null; // Skip invalid items
        }

        // Check if the item has required properties
        if (!item.id || !item.name) {
          console.warn("Invalid item structure (missing id or name):", item);
          return null; // Skip invalid items
        }

        return (
          <React.Fragment key={item.id}>
            <SidebarItem
              icon={MenuExpanded && item.icon} // Fallback to empty string if icon is undefined
              text={item.name}
              active={activeItemId === item.id}
              alert={false} // Your logic for alert
              onClick={() => handleClicked(item.id, item.path, item.children)} // Toggle expand on click
              ItemExpanded={expandedItems[item.id] || item.level < 2} // Pass down expanded state
              hasChildren={
                Array.isArray(item.children) && item.children.length > 0
              } // Check for children
              path={item.path ? item.path : "#"}
            />

            {item.children &&
              Array.isArray(item.children) &&
              item.children.length > 0 &&
              expandedItems[item.id] && (
                <ul className="pl-4">
                  {renderMenuItems(item.children)}{" "}
                  {/* Recursively render children */}
                </ul>
              )}
          </React.Fragment>
        );
      });
    } catch (error) {
      console.error("An error occurred while rendering menu items:", error);
      return null; // or return an empty array
    }
  };
  return (
    <Sidebar
      onDataUpdate={handleChildData}
      logoText={logoText}
      personImg={personImg}
      Profile={Profile}
    >
      {renderMenuItems(Data)} {/* Pass the Data prop to render items */}
    </Sidebar>
  );
}

export function SidebarItem({
  icon,
  text,
  active,
  alert,
  onClick,
  ItemExpanded,
  hasChildren,
  path,
}) {
  return (
    <>
      {ItemExpanded || hasChildren ? ( // Render only if expanded or has children
        <li
          onClick={onClick} // Handle click to toggle
          className={`relative flex items-center py-2 px-3 my-1
                        font-medium rounded-md cursor-pointer
                        transition-colors group
                        ${
                          active
                            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                            : "hover:bg-indigo-50 text-gray-600"
                        }`}
        >
          {icon && <i className={icon}></i>}
          <a
            href={path}
            className={`overflow-hidden transition-all ${
              ItemExpanded ? "opacity-100" : "opacity-0 w-0"
            }`}
          >
            {text}
          </a>
          {alert && (
            <div
              className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
                ItemExpanded ? "" : "top-2"
              }`}
            />
          )}
          {/* Only show the tooltip when not expanded */}
          {!ItemExpanded && (
            <div
              className={`absolute left-full rounded-md px-2 py-1 ml-6
                                bg-indigo-100 text-indigo-800 text-sm
                                invisible opacity-20 -translate-x-3 transition-all
                                group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
            >
              {text}
            </div>
          )}
        </li>
      ) : null}{" "}
      {/* Render nothing if not expanded and has no children */}
    </>
  );
}

export function Sidebar({
  onDataUpdate,
  children,
  logoText,
  personImg,
  Profile,
}) {
  const [expanded, setExpanded] = useState(true);
  const [isOpen, setIsOpen] = useState(false); // State for the popup menu
  const menuRef = useRef(null); // Create a ref for the menu

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the menu open/close
  };

  const handleClick = () => {
    setExpanded((curr) => {
      const newVal = !curr;
      onDataUpdate(newVal); // Make sure to call onDataUpdate with the new value
      console.log("sidebar ", newVal);
      return newVal;
    });
  };

  return (
    <aside className="navbar h-screen border-1 border-indigo-600 ">
      <nav
        className={`h-full flex flex-col bg-white border-r shadow-sm all ${
          expanded ? "w-100" : "w-0"
        }`}
      >
        <div className="flex justify-between items-center bg-blue-200">
          <img
            src={logoText}
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt=""
          />
          <button
            onClick={handleClick}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>
        <div className="flex h-full justify-between bg-blue-200">
          <ul className="flex-1 px-3  bg-blue-100">{children}</ul>
        </div>

        <div className="border-t flex p-3  bg-blue-200">
          <img src={personImg} alt="" className="w-10 h-10 rounded-md" />
          <div
            className={`
              flex
              transition-all ${expanded ? "w-52" : "w-0"}
          `}
          >
            <div
              id="logout"
              className="flex"
              style={{ visibility: expanded ? "visible" : "hidden" }}
            >
              <div className="leading-4">
                <h4 className="font-semibold">{Profile && Profile.username}</h4>
                <span className="text-xs text-gray-600">
                  {Profile && Profile.email}
                </span>
              </div>
              <DropUp color="blue" />
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
}
