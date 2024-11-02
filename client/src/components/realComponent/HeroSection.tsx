import { useState } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { Button } from "../ui/button";

const HeroSection = ()=>{
   const [searchText,setSearchText] = useState<string>("");
   const backgroundImageStyle = {
      backgroundImage:
        "url('https://images.pexels.com/photos/372882/pexels-photo-372882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
   return(
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto md:p-10 rounded-lg items-center justify-center m-4 gap-20">
        <div className="flex flex-col gap-10 md:w-[40%]">
            <div className="flex flex-col gap-5">
               <h1 className="font-bold md:font-extrabold md:text-5xl text-4xl">Bringing Freshness to Your Doorstep</h1>
               <p>
              Welcome to <span className="underline font-bold">Kp-food</span>, where every
              dish is a celebration of flavours and a journey through culinary
              delight.
            </p>
            </div>
            <div className="relative flex items-center gap-4">
             <Input 
               type="text"
               value={searchText}
               onChange={(e)=>setSearchText(e.target.value)}
               className="pl-10 border-2 shadow-lg"
             />
             <Search className="text-gray-500 absolute inset-y-2 left-2"/>
             <Button className="bg-amber-500 hover:bg-amber-700">Search</Button>
            </div>
        </div>
        <div>
         <img src="https://media0.giphy.com/media/abJN71IWfrVYY/giphy.gif?cid=ecf05e47v0z8b6wqmcrpmf6pqy0gcq922mh4t09pf6cizd9r&ep=v1_stickers_search&rid=giphy.gif&ct=s" alt="" className="object-cover w-full max-h-[500px]" />
        </div>
      </div>
   );
}

export default HeroSection;