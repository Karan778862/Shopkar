import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "../assets/logo.png"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCart } from "@/redux/cartSlice";
import { logout } from "@/redux/userSlice";

export default function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((store) => store.user?.user);
  const cart = useSelector((state) => state.cart || { cartItems: [] }); // Redux state check
console.log(cart)

const oredrhandle =()=>{
  navigate("/user/order")
}


useEffect(() => {
  if(user && user.token){

    dispatch(fetchCart()); // ✅ Redux se cart fetch karega
  }
}, [dispatch, user])
  return (
    <nav className="bg-[#f3f3f3] text-white py-3 shadow-md fixed top-0 left-0 w-full   z-50">
      <div className="container mx-auto flex justify-between items-center ">
        
        {/* Left - Logo */}
        <Link to="/" className="">
                        
          <img src={logo} alt="ShopKar Logo" className="  ml-4"  width={80} height={100}/>
          
        </Link>

        {/* Center - Search Bar (Hidden on Mobile) */}
        <div className="hidden md:block">
          <Input
            type="text"
            placeholder="Search products..."
            className="w-24 md:w-72 bg-white text-black"
          />
        </div>

        {/* Right - Icons */}
        <div className="flex items-center mr-3 gap-7">
          
          {/* Cart Icon */}
          {cart.cartItems.length > 0 &&(<Link to="/user/cart" className="relative">
            <ShoppingCart style={{color:"gray"}} size={24} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
            {cart.cartItems.length}
            </span>
          </Link>)}
          

          {/* User Section */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-10 h-10 bg-gray-500 rounded-full text-xl font-bold flex items-center justify-center"
                >
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40">
                <DropdownMenuItem  >Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={oredrhandle}>Orders</DropdownMenuItem>
                <DropdownMenuItem onClick={()=>dispatch(logout(""))}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth/login">
              <Button className="bg-[#f1f4e3] hover:bg-[#84886e] hove:border border-white text-black">Login</Button>
            </Link>
          )}

          {/* Mobile Menu (Only on Small Screens) */}
          {/* <div className="block md:hidden">
            <Button variant="ghost">
              <Menu size={24} />
            </Button>
          </div> */}
        </div>
      </div>
    </nav>
  );
}
