import { Button, Label, Modal, TextInput, FileInput } from "flowbite-react";
import { useState } from "react";
import { addProduct } from "../../data/products";

export function ModalComponent({ openModal, setOpenModal ,onAdd}: { openModal: any; setOpenModal: any,onAdd:any }) {
  const [title,setTitle]=useState("")
  const [description,setDescription]=useState("")
  const [onButtonLoading,setOnButtonLoading]=useState("")
  const [file, setFile] = useState<File | undefined>(undefined);
  const [file2, setFile2] = useState<File | undefined>(undefined);
  const [file3, setFile3] = useState<File | undefined>(undefined);
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
            <TextInput id="title" placeholder="Title of Your Product" required onChange={(e)=>{
              setTitle(e.target.value)
            }}/>
          </div>

          <div>
            <Label htmlFor="description" value="Description" />
            <TextInput id="description" type="text" placeholder="Description of Your Product" required onChange={(e)=>{
              setDescription(e.target.value)
            }}/>
          </div>

          <div>
            <Label htmlFor="image" value="Product Image" />
            <FileInput id="image" accept="image/*" required onChange={handleFileChange}/>
          </div>
          <div>
            <Label htmlFor="image2" value="Product Image" />
            <FileInput id="image2" accept="image/*" onChange={handleFileChange2}/>
          </div>
          <div>
            <Label htmlFor="image3" value="Product Image" />
            <FileInput id="image3" accept="image/*" onChange={handleFileChange3}/>
          </div>
            <div className="error text-red">{err}</div>
          <div className="w-full flex justify-between">
            <Button className="bg-[#133E87] text-white " type="button" onClick={async()=>{
              setOnButtonLoading("Loading....")
              if(file){
                const res=await addProduct(title,description,file,file2,file3)
                if(res.data.status===200){
                  setOpenModal(false)
                  onAdd()
                  setOnButtonLoading("")
                }else{
                  seterr('item not added')
                }
              }else{
                seterr("file not there")
              }
            }}>Add Product</Button>
            <p>{onButtonLoading}</p>
          </div>

        </div>
      </Modal.Body>
    </Modal>
  );
}
