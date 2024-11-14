//@ts-nocheck
import { Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
export const Dashboard = () => {
    return (
        <div className="w-[80%] ml-[20rem]">
            <div className="flex flex-col items-center justify-center min-h-screen  w-screen bg-gradient-to-r from-[#133E87] to-[#CBDCEB] text-white p-8 text-center">
                <div className="max-w-2xl">
                    <Typography variant="h2" className="text-4xl md:text-5xl font-bold mb-6">
                        Welcome to Your Admin Dashboard
                    </Typography>
                    <Typography variant="lead" className="text-lg md:text-xl mb-8">
                        Manage your products, track offers and inventory, and gain insights to drive growth. Your dashboard puts all essential tools and analytics at your fingertips.
                    </Typography>
                    <Link to='/products'>
                        <Button size="lg" color="white" variant="filled" className="bg-[#CBDCEB] hover:bg-[#133E87] hover:text-white">
                            View Products
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
