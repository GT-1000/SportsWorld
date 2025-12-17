import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow px-8 py-4 flex justify-center gap-6">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-blue-600 font-semibold"
            : "text-gray-600 hover:text-blue-600"
        }
      >
        Dashboard
      </NavLink>

      <NavLink
        to="/register"
        className={({ isActive }) =>
          isActive
            ? "text-black-600 font-semibold"
            : "text-gray-600 hover:text-black-600"
        }
      >
        Register athlete
      </NavLink>

      <NavLink
        to="/admin"
        className={({ isActive }) =>
          isActive
            ? "text-black-600 font-semibold"
            : "text-gray-600 hover:text-black-600"
        }
      >
        Administer athletes
      </NavLink>
    </nav>
  );
}