import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../../hooks/useModal";
import Loader from "../../../components/loader";
import Button from "../../../components/button";
import { IUsers } from "../../../interface/user";
import { useUsers } from "../../../server/users";
import EditUserModal from "../../../components/modal/users/edit-user";

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

  const { name, username, email, address, phone, website, company } =
    userDetails;

  if (isUserLoading || updatingUser) {
    return <Loader />;
  }

  return (
    <div className="h-full bg-gray-100 text-gray-900 overflow-y-scroll">
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-6">
        <div className=" w-full xl:max-w-4xl mx-auto px-6 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">
              {updatedUser ? updatedUser.name : name}
            </h1>
            <p className="text-lg italic">
              @{updatedUser ? updatedUser.username : username}
            </p>
          </div>
          <div className="flex gap-4">
            <Button
              label="Edit"
              variant="primary"
              style={{
                background: "linear-gradient(90deg, #8159F3, #5C3DB7)",
                borderRadius: "8px",
                padding: "0.5rem 1.5rem",
              }}
              onClick={() =>
                openModal({
                  title: "Edit User",
                })
              }
            />
            <Button
              label="Back"
              variant="secondary"
              style={{
                backgroundColor: "#D6C8F7",
                color: "white",
                borderRadius: "8px",
                padding: "0.5rem 1.5rem",
              }}
              onClick={() => navigate(-1)}
            />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-indigo-600 border-b pb-2 mb-4">
            Contact Information
          </h2>
          <p className="text-lg">
            <span className="font-medium">Email:</span>{" "}
            <a
              href={`mailto:${updatedUser ? updatedUser.email : email}`}
              className="text-indigo-500 underline"
            >
              {updatedUser ? updatedUser.email : email}
            </a>
          </p>
          <p className="text-lg">
            <span className="font-medium">Phone:</span> {phone}
          </p>
          <p className="text-lg">
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
        </section>

        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-indigo-600 border-b pb-2 mb-4">
            Address
          </h2>
          <p className="text-lg">
            <span className="font-medium">Street:</span>{" "}
            {updatedUser ? updatedUser.address.street : address?.street}
          </p>
          <p className="text-lg">
            <span className="font-medium">Suite:</span>{" "}
            {updatedUser ? updatedUser.address.suite : address?.suite}
          </p>
          <p className="text-lg">
            <span className="font-medium">City:</span>{" "}
            {updatedUser ? updatedUser.address.city : address?.city}
          </p>
          <p className="text-lg">
            <span className="font-medium">Zipcode:</span>{" "}
            {updatedUser ? updatedUser.address.zipcode : address?.zipcode}
          </p>
          <p className="text-lg">
            <span className="font-medium">Coordinates:</span>{" "}
            {updatedUser ? updatedUser.address.geo.lat : address?.geo.lat},{" "}
            {updatedUser ? updatedUser.address.geo.lng : address?.geo.lng}
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-indigo-600 border-b pb-2 mb-4">
            Company Information
          </h2>
          <p className="text-lg">
            <span className="font-medium">Name:</span>{" "}
            {updatedUser ? updatedUser.company.name : company?.name}
          </p>
          <p className="text-lg">
            <span className="font-medium">Catchphrase:</span>{" "}
            {updatedUser
              ? updatedUser.company.catchPhrase
              : company?.catchPhrase}
          </p>
          <p className="text-lg">
            <span className="font-medium">Business:</span>{" "}
            {updatedUser ? updatedUser.company.bs : company?.bs}
          </p>
        </section>
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
