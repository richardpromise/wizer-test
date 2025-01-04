import { Modal } from "../..";
import { IUsers } from "../../../../interface/user";
import InputField from "../../../input";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  modalConfig: any;
  userInfo: IUsers;
  onConfirm: () => void;
  formData: IUsers;
  setFormData: React.Dispatch<React.SetStateAction<IUsers>>;
}

export default function EditUserModal({
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
          label="Username"
          placeholder="Enter username"
          required
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        <InputField
          label="Email"
          placeholder="Enter email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <div className="flex flex-col gap-2">
          <h1>Address</h1>
          <InputField
            label="Street"
            placeholder="Enter street"
            required
            value={formData.address.street}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: { ...formData.address, street: e.target.value },
              })
            }
          />
          <InputField
            label="Suite"
            placeholder="Enter suite"
            required
            value={formData.address.suite}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: { ...formData.address, suite: e.target.value },
              })
            }
          />
          <InputField
            label="City"
            placeholder="Enter city"
            required
            value={formData.address.city}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: { ...formData.address, city: e.target.value },
              })
            }
          />
          <InputField
            label="Zipcode"
            placeholder="Enter zipcode"
            required
            value={formData.address.zipcode}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: { ...formData.address, zipcode: e.target.value },
              })
            }
          />
          <div className="">
            <InputField
              label="Lat"
              placeholder="Enter lat"
              required
              value={formData.address.geo.lat}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: {
                    ...formData.address,
                    geo: { ...formData.address.geo, lat: e.target.value },
                  },
                })
              }
            />
            <InputField
              label="Lng"
              placeholder="Enter lng"
              required
              value={formData.address.geo.lng}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: {
                    ...formData.address,
                    geo: { ...formData.address.geo, lng: e.target.value },
                  },
                })
              }
            />
          </div>
          <InputField
            label="Phone"
            placeholder="Enter phone"
            required
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
          <InputField
            label="Website"
            placeholder="Enter website"
            required
            value={formData.website}
            onChange={(e) =>
              setFormData({ ...formData, website: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <h1>Company</h1>
          <InputField
            label="Name"
            placeholder="Enter name"
            required
            value={formData.company.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                company: { ...formData.company, name: e.target.value },
              })
            }
          />
          <InputField
            label="Catch Phrase"
            placeholder="Enter catch phrase"
            required
            value={formData.company.catchPhrase}
            onChange={(e) =>
              setFormData({
                ...formData,
                company: { ...formData.company, catchPhrase: e.target.value },
              })
            }
          />
          <InputField
            label="Bs"
            placeholder="Enter bs"
            required
            value={formData.company.bs}
            onChange={(e) =>
              setFormData({
                ...formData,
                company: { ...formData.company, bs: e.target.value },
              })
            }
          />
        </div>
      </div>
    </Modal>
  );
}
