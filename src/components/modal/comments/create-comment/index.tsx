import { Modal } from "../..";
import { IFormData } from "../../../../interface/comment";
import InputField from "../../../input";
import TextArea from "../../../textArea";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  modalConfig: any;
  formData: IFormData;
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>;
  onConfirm: () => void;
}
export default function CreateCommentModal({
  isOpen,
  closeModal,
  modalConfig,
  formData,
  setFormData,
  onConfirm,
}: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title={modalConfig.title}
      onConfirm={onConfirm}
    >
      <div className="flex flex-col gap-2 min-h-full">
        <InputField
          label="Name"
          placeholder="Enter name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <InputField
          label="Email"
          placeholder="Enter email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <TextArea
          label="Body"
          placeholder="Enter body"
          required
          value={formData.body}
          onChange={(e) => setFormData({ ...formData, body: e.target.value })}
        />
      </div>
    </Modal>
  );
}
