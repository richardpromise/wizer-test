import activeCommentIcon from "../../assets/icons/comments-icon.svg";
import inActiveCommentIcon from "../../assets/icons/inactive-comment.svg";
import inActiveProfileIcon from "../../assets/icons/profile.svg";
import activeProfileIcon from "../../assets/icons/active-profile.svg";
import SideBarLinks from "../../links";

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
export default function SmallScreenSideBar() {
  return (
    <div className={` w-full h-screen fixed top-0 right-0 pr-2`}>
      <div className="flex flex-col gap-2">
        {routes.map((route, i) => (
          <SideBarLinks
            key={i}
            activeIcon={route.activeIcon}
            inactiveIcon={route.inactiveIcon}
            label={route.label}
            path={route.path}
          />
        ))}
      </div>
    </div>
  );
}
