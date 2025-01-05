import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import useIsSmallScreen from "../../hooks/useSmalllScreen";
import Button from "../button";
import activeCommentIcon from "../../assets/icons/comments-icon.svg";
import logo from "../../assets/imgs/wizzer-logo.svg";
import inActiveCommentIcon from "../../assets/icons/inactive-comment.svg";
import inActiveProfileIcon from "../../assets/icons/profile.svg";
import activeProfileIcon from "../../assets/icons/active-profile.svg";
import SideBarLinks from "../links";
import { useLocation } from "react-router-dom";

export interface IRoutes {
  label: string;
  path: string;
  activeIcon: string;
  inactiveIcon: string;
}

export const routes: IRoutes[] = [
  {
    label: "Comments",
    path: "/",
    activeIcon: activeCommentIcon,
    inactiveIcon: inActiveCommentIcon,
  },
  {
    label: "Users",
    path: "/users",
    activeIcon: activeProfileIcon,
    inactiveIcon: inActiveProfileIcon,
  },
];

export default function Header({ handleNewEntry }: any) {
  const isSmallScreen = useIsSmallScreen();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const hiddenButtonPaths = ["/comment/:id", "/users/:id"];
  const shouldHideButton = hiddenButtonPaths.some((pattern) => {
    const regex = new RegExp(`^${pattern.replace(":id", "[^/]+")}$`);
    return regex.test(pathname);
  });

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Animation Variants
  const sidebarVariants = {
    hidden: { x: "-100%" },
    visible: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 20,
        staggerChildren: 0.1,
      },
    },
    exit: { x: "-100%", transition: { duration: 0.2 } },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  return (
    <div>
      <div className="flex flex-wrap md:flex-nowrap justify-between items-center bg-[#FFFFFF] h-auto md:h-[98px] px-4 md:px-6 py-4 md:py-0 border border-[#E5E5E5]">
        <img src={logo} alt="wizzer-logo" className="h-8 md:h-auto w-auto" />

        <div className="flex flex-col justify-end items-end gap-1 md:gap-3 mt-3 md:mt-0">
          <div className="text-[#000000] font-normal text-sm md:text-[14px] leading-5 md:leading-[17.5px]">
            Welcome
          </div>
          <div className="text-[#000000] font-semibold text-lg md:text-[20px] leading-6 md:leading-[25.5px]">
            Anabanana
          </div>
        </div>
      </div>

      <div
        className={`flex flex-row-reverse w-full items-center  ${
          shouldHideButton ? "justify-end" : "justify-between"
        }  bg-[#ffff] h-[50px] px-4 py-2 border-t border-gray-200`}
      >
        {!shouldHideButton && (
          <Button
            label="New Entry"
            size="small"
            onClick={handleNewEntry}
            icon={<CiCirclePlus size={18} />}
            iconPosition="left"
          />
        )}

        {isSmallScreen && (
          <button
            onClick={toggleMenu}
            className="text-gray-700 hover:text-blue-500 focus:outline-none"
          >
            {isMenuOpen ? <FiX size={34} /> : <FiMenu size={34} />}
          </button>
        )}
      </div>

      <AnimatePresence>
        {isSmallScreen && isMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sidebarVariants}
            className="absolute top-[148px] left-0 w-full bg-white shadow-lg border-t border-gray-200 z-20 h-[77svh]"
          >
            <motion.div className="flex flex-col gap-2 w-full p-6">
              {routes.map((route, i) => (
                <motion.div key={i} variants={linkVariants}>
                  <SideBarLinks
                    activeIcon={route.activeIcon}
                    inactiveIcon={route.inactiveIcon}
                    label={route.label}
                    path={route.path}
                    setCloseMenu={setIsMenuOpen}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
