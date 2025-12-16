import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow px-8 py-4 flex gap-6">
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
            ? "text-blue-600 font-semibold"
            : "text-gray-600 hover:text-blue-600"
        }
      >
        Register athlete
      </NavLink>

      <NavLink
        to="/admin"
        className={({ isActive }) =>
          isActive
            ? "text-blue-600 font-semibold"
            : "text-gray-600 hover:text-blue-600"
        }
      >
        Admin athletes
      </NavLink>
    </nav>
  );
}
