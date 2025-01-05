import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface Props {
  label: string;
  activeIcon: string;
  inactiveIcon: string;
  path: string;
  setCloseMenu?: (value: boolean) => void;
}

export default function SideBarLinks({
  activeIcon,
  inactiveIcon,
  label,
  path,
  setCloseMenu,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isExactActive = location.pathname === path;
  const isDynamicActive =
    !isExactActive &&
    ((path === "/users" && location.pathname.startsWith("/users/")) ||
      (path === "/" && location.pathname.startsWith("/comment/")));

  const isActive = isExactActive || isDynamicActive;

  const handleNavigation = () => {
    navigate(path);
    if (setCloseMenu) setCloseMenu(false);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const iconToShow = isActive || isHovered ? activeIcon : inactiveIcon;

  return (
    <div
      onClick={handleNavigation}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`flex items-center w-full p-2 gap-2 rounded-md transition-colors duration-300 cursor-pointer ${
        isActive
          ? "bg-[#8158F3] text-white"
          : "hover:bg-[#8158F3] hover:text-white"
      }`}
    >
      <img
        src={iconToShow}
        alt={`${label} icon`}
        className="h-6 w-6 object-contain"
      />
      <span className="text-[14px]">{label}</span>
    </div>
  );
}
