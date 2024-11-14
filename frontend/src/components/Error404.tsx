import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";

export function Error404() {
  const navigate = useNavigate();

  return (
    <div className="w-[80%] ml-[20rem] flex h-screen flex-col items-center justify-center bg-gradient-to-r from-[#133E87] to-[#CBDCEB] text-white">
      <h1 className="text-9xl font-bold animate-bounce">404</h1>
      <h2 className="mt-6 text-3xl font-semibold">Oops! Page Not Found</h2>
      <p className="mt-4 text-lg max-w-md text-center">
        The page you are looking for doesn't exist or has been moved. But don't worry, we'll get you back on track.
      </p>
      <Button
        onClick={() => navigate("/")}
        size="lg"
        color="white"
        className="mt-8 bg-white text-indigo-500 font-semibold hover:bg-indigo-100 hover:text-indigo-700 transition-all duration-300"
      >
        Go Back to Home
      </Button>
    </div>
  );
}
