import { Button } from "flowbite-react";
import { ModalComponent } from "./subComp/ProductModal";
import { ProductCard } from "./subComp/ProductCard";
import { useEffect, useState } from "react";
import { getProduct } from "../data/products";
import { Loading } from "./Loading";
import { ProductNotFound } from "./subComp/ProductNotFound";

interface item {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  imageUrl2: string;
  imageUrl3: string;
}

export const Products = () => {
  const [products, setProducts] = useState<item[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    const response = await getProduct();
    setProducts(response.data.result);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct=async()=>{
    await fetchProducts()
  }
  const handleProductDelete = async () => {
    await fetchProducts();
  };
  const handleUpdateProduct=async ()=>{
    await fetchProducts();
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-[80%] ml-[20rem] h-screen">
      <div className="flex my-5 justify-around">
        <div className="font-semibold text-5xl text-center font-sans my-5 text-[#133E87]">Products</div>
        <div className="my-auto">
          <Button size="lg" color="white" className="bg-[#133E87] text-white p-2 h-min" onClick={() => setOpenModal(true)}>
            Add Product
          </Button>
        </div>
      </div>
      <ModalComponent openModal={openModal} setOpenModal={setOpenModal} onAdd={handleAddProduct}/>
      {products.length === 0 ? (
        <ProductNotFound />
      ) : (
        <div className="grid grid-cols-3">
          {products.map(item => (
            <ProductCard 
              item={item} 
              key={item.id} 
              onDelete={handleProductDelete} 
              onUpdate={handleUpdateProduct} 
            />
          ))}
        </div>
      )}
    </div>
  );
};
