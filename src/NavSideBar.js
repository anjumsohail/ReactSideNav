import NavBar from "./components/NavBar";
import React, { useEffect, useState } from "react";
import "@mdi/font/css/materialdesignicons.min.css";

const NavSideBar = ({ Datas = {} }) => {
  const { logoText = "", personImg = "", url = "" } = Datas || {};
  const [menuItems, setMenuItems] = useState([]);
  const [Profile, setProfile] = useState();
  const [ValidJSON, setValidJSON] = useState(true);

  const validateMenuData = (data) => {
    // Check if the root object has the expected structure

    if (typeof data !== "object" || data === null) return false;
    const { profile, menu } = data;
    // Validate profile
    if (
      !profile ||
      typeof profile !== "object" ||
      !profile.username ||
      !profile.id ||
      !profile.email
    ) {
      return false;
    }

    // Validate menu
    if (!Array.isArray(menu)) {
      return false;
    }

    // Validate each menu item
    for (const item of menu) {
      if (
        !item ||
        typeof item !== "object" ||
        !item.id ||
        !item.name ||
        (typeof item.children !== "undefined" && !Array.isArray(item.children))
      ) {
        return false;
      }
    }

    return true;
  };

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        // const response = await fetch('http://localhost:8000/api/menu-items');
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setValidJSON(validateMenuData(data));

        console.log(ValidJSON);

        if (ValidJSON) {
          setMenuItems(data.menu);
          setProfile(data.profile);
        } else {
          console.error("Invalid data structure:", data);
          // Handle invalid data scenario
          setMenuItems([]);
          setProfile(null);
        }
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, []); // Note: Only run once when the component mounts

  const renderMenuItems = (items) => {
    try {
      if (!Array.isArray(items)) {
        console.error("Expected an array but received:", items);
        return null; // or return an empty array
      }

      if (items.length === 0) {
        return null; // or return an empty array
      }
      return items.map((item) => {
        if (!item || typeof item !== "object" || !item.id || !item.name) {
          console.warn("Invalid item structure:", item);
          return null; // Skip invalid items
        }
        return (
          <li key={item.id}>
            {item.name}
            {item.children && item.children.length > 0 && (
              <ul>{renderMenuItems(item.children)}</ul>
            )}
          </li>
        );
      });
    } catch (error) {
      console.error("An error occurred while rendering menu items:", error);
      return null; // or return an empty array
    }
  };

  return (
    <div className="flex">
      {ValidJSON ? (
        <NavBar
          Datas={{
            Profile: Profile,
            Data: menuItems,
            logoText,
            personImg,
            colors: "colors",
          }}
        />
      ) : (
        <h2>Invalid JSON Structure</h2>
      )}
    </div>
  );
};

export default NavSideBar;
