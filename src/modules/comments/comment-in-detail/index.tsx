import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/button";
import { useComments } from "../../../server";
import Loader from "../../../components/loader";
import EditCommentModal from "../../../components/modal/comments/edit-comment";
import { IComment } from "../../../interface/comment";
import { useModal } from "../../../hooks/useModal";

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

  const { id, name, email, body, postId } = commentDetails;

  if (isCommentLoading || updatingComment) {
    return <Loader />;
  }

  return (
    <div className="h-full bg-gray-100 text-gray-900 overflow-y-scroll">
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-6">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold">Comment Details</h1>
            <p className="text-lg italic">Post ID: {postId}</p>
          </div>
          <div className="flex gap-4">
            <Button
              label="Edit"
              variant="primary"
              style={{
                backgroundColor: "#534e61",
                borderRadius: "8px",
                padding: "0.5rem 1.5rem",
              }}
              onClick={() =>
                openModal({
                  title: "Edit Comment",
                })
              }
            />
            <Button
              label="Back"
              variant="secondary"
              style={{
                backgroundColor: "#E5E7EB",
                color: "#374151",
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
            Comment Metadata
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
        </section>

        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-indigo-600 border-b pb-2 mb-4">
            Comment Content
          </h2>
          <h3 className="text-xl font-medium text-gray-800 mb-2">
            {updatedComment ? updatedComment.name : name}
          </h3>
          <p className="whitespace-pre-line text-gray-700">
            {updatedComment ? updatedComment.body : body}
          </p>
        </section>
      </main>

      <footer className="bg-gray-200 py-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600">&copy; 2024 Comment Details Page</p>
        </div>
      </footer>

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
    </div>
  );
};

export default CommentDetails;
