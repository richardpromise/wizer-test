import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/button";
import { useComments } from "../../../server";
import Loader from "../../../components/loader";
import EditCommentModal from "../../../components/modal/comments/edit-comment";
import { IComment } from "../../../interface/comment";
import { useModal } from "../../../hooks/useModal";
import { motion } from "framer-motion";
import { AiFillEdit } from "react-icons/ai";

import { MdKeyboardBackspace } from "react-icons/md";

const CommentDetails: React.FC = () => {
  const navigate = useNavigate();
  const {
    commentDetails,
    isCommentLoading,
    updatingComment,
    updatedComment,
    handleUpdateComment,
  } = useComments();
  const { isOpen, closeModal, modalConfig, openModal } = useModal();
  const [formData, setFormData] = useState<IComment>(commentDetails);

  const { id, name, email, body } = commentDetails;

  if (isCommentLoading || updatingComment) {
    return <Loader />;
  }

  return (
    <motion.div
      className="h-full  text-gray-900 overflow-y-scroll"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header Section */}
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-6">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-semibold">Comment Details</h1>
          </div>
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
                  title: "Edit Comment",
                })
              }
            />
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
            />
          </div>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="max-w-4xl mx-auto px-6 py-10">
        <motion.section
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-indigo-600 border-b pb-2 mb-4">
            Head
          </h2>
          <p className="text-lg">
            <span className="font-medium">Comment ID:</span>{" "}
            {updatedComment ? updatedComment.id : id}
          </p>
          <p className="text-lg">
            <span className="font-medium">Author Email:</span>{" "}
            <a
              href={`mailto:${updatedComment ? updatedComment.email : email}`}
              className="text-indigo-500 underline"
            >
              {updatedComment ? updatedComment.email : email}
            </a>
          </p>
        </motion.section>

        <motion.section
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-indigo-600 border-b pb-2 mb-4">
            Comment
          </h2>
          <h3 className="text-xl font-medium text-gray-800 mb-2">
            {updatedComment ? updatedComment.name : name}
          </h3>
          <p className="whitespace-pre-line text-gray-700">
            {updatedComment ? updatedComment.body : body}
          </p>
        </motion.section>
      </main>

      {/* Edit Comment Modal */}
      {modalConfig && (
        <EditCommentModal
          isOpen={isOpen}
          closeModal={closeModal}
          modalConfig={modalConfig}
          commentInfo={commentDetails}
          formData={formData}
          setFormData={setFormData}
          onConfirm={() => {
            handleUpdateComment(formData);
            closeModal();
          }}
        />
      )}
    </motion.div>
  );
};

export default CommentDetails;
