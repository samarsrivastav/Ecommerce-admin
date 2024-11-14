import { HiX } from "react-icons/hi";
import { deleteProduct } from "../../data/products";
import { FaPen } from "react-icons/fa";
import { useState } from "react";
import { ConfirmationModal } from "./ConfirmationModal"; 
import { UpdateModalComponent } from "./updateProductModal";

interface Item {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

export const ProductCard = ({ item, onDelete ,onUpdate}: { item: Item; onDelete: (id: number) => void ;onUpdate:(id:number)=>void}) => {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); 
  
  const handleDelete = async () => {
    const response = await deleteProduct(item.id);
    if (response.status === 200) {
      onDelete(item.id); 
    }
    setIsModalOpen(false); 
  };
  return (
    <div className="my-5 mx-3 h-min max-w-xs rounded-3xl shadow-black shadow-xl bg-[#E0EAF5] border-2 border-black overflow-hidden">
      <div className="relative">
        <img
          src={item.imageUrl}
          alt="card image"
          className="w-full h-60 object-cover"
        />
        <button className="absolute top-2 right-2 bg-gray-800 bg-opacity-50 text-white p-1 rounded-full" onClick={() => setIsModalOpen(true)}>
          <HiX className="h-5 w-5" />
        </button>
      </div>
      <div className="p-4">
        <h5 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 flex justify-between">
          {item.title}
          <button className=" text-black p-1 rounded-full" onClick={() => setIsUpdateModalOpen(true)}>
            <FaPen className="h-5 w-5" />
          </button>
        </h5>
        <p className="text-gray-700 dark:text-gray-400 text-sm line-clamp-2">
          {item.description}
        </p>
      </div>
      <UpdateModalComponent openModal={isUpdateModalOpen} setOpenModal={setIsUpdateModalOpen} onUpdate={onUpdate} id={item.id}/>
      <ConfirmationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={handleDelete} 
      />
    </div>
  );
};
