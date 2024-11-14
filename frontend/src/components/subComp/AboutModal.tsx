import { Button, FileInput, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { updateAbout } from "../../data/aboutApis";

interface AboutModalComponentProps {
  openModal: boolean;
  setOpenModal: (isOpen: boolean) => void;
}

export function AboutModalComponent({ openModal, setOpenModal }: AboutModalComponentProps) {
  const [companyName, setCompanyName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [companyAddress, setCompanyAddress] = useState<string>("");
  const [loading,setLoading]=useState(false)
  const [file, setFile] = useState<File | null>(null);
  const handleFileChange=(event:any)=>{
    const selectedFile=event.target.files?.[0]
    if(selectedFile){
      setFile(selectedFile)
    }
  }

  const handleUpdate = async () => {
    setLoading(true)
    try {
      const response=await  updateAbout({
        companyName: companyName || undefined,
        email: email || undefined,
        phone: phone || undefined,
        companyAdress: companyAddress || undefined,
        file:file||undefined
      });
      if(response.status==200){
        setOpenModal(false);
        setLoading(false)
      }
    } catch (error) {
      console.error("Error updating details:", error);
    }
  };

  return (
    <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)}>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">Update the details</h3>

          <div>
            <Label htmlFor="CompanyName" value="Company Name" />
            <TextInput
              id="CompanyName"
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="Email" value="Email" />
            <TextInput
              id="Email"
              type="email"
              placeholder="New Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="Phone" value="Phone" />
            <TextInput
              id="Phone"
              type="text"
              placeholder="Update Your Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="CompanyAddress" value="Company Address" />
            <TextInput
              id="CompanyAddress"
              type="text"
              placeholder="Add Company Address..."
              value={companyAddress}
              onChange={(e) => setCompanyAddress(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="image" value="Product Image" />
            <FileInput id="image" accept="image/*" required onChange={handleFileChange}/>
          </div>

          <div className="w-full">
            {loading?<p>Loading...</p>:""}
            <Button className="bg-[#133E87] text-white" onClick={handleUpdate}>
              Update Contact Details
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
