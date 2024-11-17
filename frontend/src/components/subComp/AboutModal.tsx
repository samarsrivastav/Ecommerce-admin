import { Button, FileInput, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { updateAbout } from "../../data/aboutApis";
interface aboutProp{
  id?:string,
  phone?:string,
  email?:string,
  logo?:string,
  companyName?:string,
  companyAdress?:string,
  companyTagline?:string,
  companyDescription?:string
}
interface AboutModalComponentProps {
  openModal: boolean;
  setOpenModal: (isOpen: boolean) => void;
  about:aboutProp
}

export function AboutModalComponent({ openModal, setOpenModal ,about}: AboutModalComponentProps) {
  const [companyName, setCompanyName] = useState<string | undefined>(about.companyName||undefined);
  const [email, setEmail] = useState<string| undefined>(about.email||undefined);
  const [phone, setPhone] = useState<string| undefined>(about.phone||undefined);
  const [companyAddress, setCompanyAddress] = useState<string| undefined>(about.companyAdress||undefined);
  const [companyDescription, setCompanyDescription] = useState<string| undefined>(about.companyDescription||undefined);
  const [companyTagline, setCompanyTagline] = useState<string| undefined>(about.companyTagline||undefined);
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
        companyDescription: companyDescription || undefined,
        companyTagline:companyTagline||undefined,
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
              value={companyName || "N/A"}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="Email" value="Email" />
            <TextInput
              id="Email"
              type="email"
              value={email || "N/A"}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="Phone" value="Phone" />
            <TextInput
              id="Phone"
              type="text"
              value={phone || "N/A"}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="CompanyAddress" value="Company Address" />
            <TextInput
              id="CompanyAddress"
              type="text"
              value={companyAddress || "N/A"}
              onChange={(e) => setCompanyAddress(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="CompanyTagline" value="Company Tagline" />
            <TextInput
              id="CompanyTagline"
              type="text"
              value={companyTagline || "N/A"}
              onChange={(e) => setCompanyTagline(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="CompanyDescription" value="Company Description" />
            <TextInput
              id="CompanyDescription"
              type="text"
              value={companyDescription || "N/A"}
              onChange={(e) => setCompanyDescription(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="image" value="Company Logo" />
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
