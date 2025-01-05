import Header from "../components/header";
import SideBar from "../components/side-bar";
import { Outlet, useLocation } from "react-router-dom";
import { useComments } from "../server";
import { useModal } from "../hooks/useModal";
import CreateCommentModal from "../components/modal/comments/create-comment";
import { useUsers } from "../server/users";
import AddUserModal from "../components/modal/users/create-user";
import Loader from "../components/loader";

import useIsSmallScreen from "../hooks/useSmalllScreen";

export default function Dashboard() {
  const { pathname } = useLocation();

  const isSmallScreen = useIsSmallScreen();

  const {
    formData: commentFormData,
    setFormData: setCommentFormData,
    handleAddComment,
    addingComment,
  } = useComments();

  const {
    formData: userFormData,
    setFormData: setUserFormData,
    addUser,
    addingUser,
    isFormComplete,
  } = useUsers();

  const {
    closeModal: createCommentCloseModal,
    isOpen: createCommentIsOpen,
    modalConfig: createCommentConfig,
    openModal: createCommentOpenModal,
  } = useModal();

  const {
    closeModal: createUserCloseModal,
    isOpen: createUserIsOpen,
    modalConfig: createUserConfig,
    openModal: createUserOpenModal,
  } = useModal();

  const handleNewEntry = () => {
    if (pathname === "/") {
      createCommentOpenModal({
        title: "New Entry",
      });
    } else if (pathname === "/users") {
      createUserOpenModal({
        title: "New Entry",
      });
    }
  };

  if (addingComment || addingUser) {
    return <Loader homepage={true} />;
  }

  return (
    <>
      <Header handleNewEntry={handleNewEntry} />
      <div className="flex h-[calc(100dvh-148px)] py-2 bg-[#ffff]  px-4">
        {!isSmallScreen && (
          <div className="w-[18%] ">
            <SideBar />
          </div>
        )}
        <div className={` ${isSmallScreen ? "w-full" : "w-[82%]"}`}>
          <Outlet />
        </div>
      </div>
      {createCommentConfig && (
        <CreateCommentModal
          isOpen={createCommentIsOpen}
          closeModal={createCommentCloseModal}
          modalConfig={createCommentConfig}
          formData={commentFormData}
          setFormData={setCommentFormData}
          onConfirm={handleAddComment}
        />
      )}
      {createUserConfig && (
        <AddUserModal
          isOpen={createUserIsOpen}
          closeModal={createUserCloseModal}
          modalConfig={createUserConfig}
          formData={userFormData}
          setFormData={setUserFormData}
          onConfirm={addUser}
          isFormComplete={isFormComplete}
        />
      )}
    </>
  );
}
