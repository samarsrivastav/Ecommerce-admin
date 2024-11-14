import { Button, Label, Modal, TextInput, FileInput } from "flowbite-react";
import { useState } from "react";
import { updateProduct } from "../../data/products";

export function UpdateModalComponent({ openModal, setOpenModal ,onUpdate,id}: { openModal: any; setOpenModal: any,onUpdate:any ,id:number}) {
  const [title,setTitle]=useState("")
  const [description,setDescription]=useState("")
  const [onButtonLoading,setOnButtonLoading]=useState("")
  const [file, setFile] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [file3, setFile3] = useState<File | null>(null);
  const [err,seterr]=useState("")
  const handleFileChange=(event:any)=>{
    const selectedFile=event.target.files?.[0]
    if(selectedFile){
      setFile(selectedFile)
    }
  }
  const handleFileChange2=(event:any)=>{
    const selectedFile=event.target.files?.[0]
    if(selectedFile){
      setFile2(selectedFile)
    }
  }
  const handleFileChange3=(event:any)=>{
    const selectedFile=event.target.files?.[0]
    if(selectedFile){
      setFile3(selectedFile)
    }
  }
  return (
    <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)}>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">Add New Product</h3>

          <div>
            <Label htmlFor="title" value="Title" />
            <TextInput id="title" placeholder="Title of Your Product" onChange={(e)=>{
              setTitle(e.target.value)
            }}/>
          </div>

          <div>
            <Label htmlFor="description" value="Description" />
            <TextInput id="description" type="text" placeholder="Description of Your Product" onChange={(e)=>{
              setDescription(e.target.value)
            }}/>
          </div>

          <div>
            <Label htmlFor="image" value="Product Image" />
            <FileInput id="image" accept="image/*" onChange={handleFileChange}/>
          </div>
          <div>
            <Label htmlFor="image" value="Product Image" />
            <FileInput id="image" accept="image/*" onChange={handleFileChange2}/>
          </div>
            <div className="error text-red">{err}</div>
          <div>
            <Label htmlFor="image" value="Product Image" />
            <FileInput id="image" accept="image/*" onChange={handleFileChange3}/>
          </div>
            <div className="error text-red">{err}</div>
          <div className="w-full flex justify-between">
          <Button
              className="bg-[#133E87] text-white"
              type="button"
              onClick={async () => {
                setOnButtonLoading("Loading....");
                if (title.trim() === "" && description.trim() === "" && !file && !file2 && !file3) {
                  seterr("Please fill in at least one field or select a file.");
                  setOnButtonLoading("");
                  return;
                }

                try {
                  const res = await updateProduct(id, title, description, file || undefined,file2 || undefined,file3 || undefined);

                  if (res.status === 200) {
                    setOpenModal(false);
                    onUpdate();
                    setOnButtonLoading("");
                  } else {
                    seterr("Error updating product");
                    setOnButtonLoading("");
                  }
                } catch (error) {
                  seterr("Failed to update product");
                  setOnButtonLoading("");
                }
              }}
            >
              Update Product
            </Button>
            <p>{onButtonLoading}</p>
          </div>

        </div>
      </Modal.Body>
    </Modal>
  );
}
