import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useModal } from "../../../hooks/useModal";
import Loader from "../../../components/loader";
import Button from "../../../components/button";
import { IUsers } from "../../../interface/user";
import { useUsers } from "../../../server/users";
import EditUserModal from "../../../components/modal/users/edit-user";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { MdKeyboardBackspace } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";

const UserDetails: React.FC = () => {
  const navigate = useNavigate();
  const {
    userDetails,
    isUserLoading,
    updatedUser,
    updatingUser,
    handleUpdateUser,
  } = useUsers();
  const [formData, setFormData] = useState<IUsers>(userDetails);
  const { isOpen, closeModal, modalConfig, openModal } = useModal();

  const { name, email, address, phone, website, company } = userDetails;

  if (isUserLoading || updatingUser) {
    return <Loader />;
  }

  // Animation variants for cards
  const cardVariants = {
    initial: (i: number) => ({
      opacity: 0,
      y: 50 * i,
      rotate: i % 2 === 0 ? -5 : 5, // Alternate rotation
    }),
    animate: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: {
      scale: 1.05,
      rotate: 0,
      transition: { type: "spring", stiffness: 300 },
    },
  };

  return (
    <div className="min-h-screen  text-gray-900">
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-6">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            {updatedUser ? updatedUser.name : name}
          </h1>
          <div className="flex flex-col-reverse md:flex md:flex-row gap-2">
            <Button
              icon={<AiFillEdit size={20} />}
              label="Edit"
              variant="primary"
              style={{
                background: "linear-gradient(90deg, #8159F3, #5C3DB7)",
                borderRadius: "8px",
                padding: "0.5rem 1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() =>
                openModal({
                  title: "Edit User",
                })
              }
            >
              <IoIosArrowForward />{" "}
            </Button>

            <Button
              icon={<MdKeyboardBackspace size={20} />}
              label="Back"
              variant="secondary"
              style={{
                backgroundColor: "#D6C8F7",
                color: "white",
                borderRadius: "8px",
                padding: "0.5rem 1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => navigate(-1)}
            >
              <IoIosArrowBack className="text-white text-xl" />{" "}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex flex-col gap-6 relative">
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6"
            custom={0}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
          >
            <h2 className="text-xl font-semibold text-indigo-600 mb-4">
              User Info
            </h2>
            <p>
              <span className="font-medium">Email:</span>{" "}
              <a
                href={`mailto:${updatedUser ? updatedUser.email : email}`}
                className="text-indigo-500 underline"
              >
                {updatedUser ? updatedUser.email : email}
              </a>
            </p>
            <p>
              <span className="font-medium">Phone:</span> {phone}
            </p>
            <p>
              <span className="font-medium">Website:</span>{" "}
              <a
                href={`http://${updatedUser ? updatedUser.website : website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-500 underline"
              >
                {updatedUser ? updatedUser.website : website}
              </a>
            </p>
          </motion.div>

          <motion.div
            className="bg-white rounded-lg shadow-lg p-6"
            custom={1}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
          >
            <h2 className="text-xl font-semibold text-indigo-600 mb-4">
              Address
            </h2>
            <p>
              <span className="font-medium">Street:</span>{" "}
              {updatedUser ? updatedUser.address.street : address?.street}
            </p>
            <p>
              <span className="font-medium">Suite:</span>{" "}
              {updatedUser ? updatedUser.address.suite : address?.suite}
            </p>
            <p>
              <span className="font-medium">City:</span>{" "}
              {updatedUser ? updatedUser.address.city : address?.city}
            </p>
            <p>
              <span className="font-medium">Zipcode:</span>{" "}
              {updatedUser ? updatedUser.address.zipcode : address?.zipcode}
            </p>
            <p>
              <span className="font-medium">Coordinates:</span>{" "}
              {updatedUser
                ? `${updatedUser.address.geo.lat}, ${updatedUser.address.geo.lng}`
                : `${address?.geo.lat}, ${address?.geo.lng}`}
            </p>
          </motion.div>

          <motion.div
            className="bg-white rounded-lg shadow-lg p-6"
            custom={2}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
          >
            <h2 className="text-xl font-semibold text-indigo-600 mb-4">
              Company Info
            </h2>
            <p>
              <span className="font-medium">Name:</span>{" "}
              {updatedUser ? updatedUser.company.name : company?.name}
            </p>
            <p>
              <span className="font-medium">Catchphrase:</span>{" "}
              {updatedUser
                ? updatedUser.company.catchPhrase
                : company?.catchPhrase}
            </p>
            <p>
              <span className="font-medium">Business:</span>{" "}
              {updatedUser ? updatedUser.company.bs : company?.bs}
            </p>
          </motion.div>
        </div>
      </main>

      {modalConfig && (
        <EditUserModal
          isOpen={isOpen}
          closeModal={closeModal}
          modalConfig={modalConfig}
          userInfo={userDetails}
          formData={formData}
          setFormData={setFormData}
          onConfirm={() => {
            handleUpdateUser(formData);
            closeModal();
          }}
        />
      )}
    </div>
  );
};

export default UserDetails;
