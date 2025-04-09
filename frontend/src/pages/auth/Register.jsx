import { useState } from "react";
import { useDispatch} from "react-redux";
import { setUser } from "../../redux/userSlice";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import Navbar from "@/components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import {motion}  from "framer-motion";
import axios from "axios";
import { API } from "@/api/api";


export default function Register() {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [loading, setloading] = useState()


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log(formData)

    try {
      const res = await axios.post(`${API}/api/user/register`,formData,{
       withCredentials:true
      })
      if(res.data){
        dispatch(setUser(res.data))
        Navigate("/user/")
    }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
    <Navbar/>
    <div className="flex items-center justify-center min-h-screen bg-[#84886e]">
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        {/* {error && <p className="text-red-500">{error}</p>} */}
        <form onSubmit={handleSubmit} className="space-y-4 ">
          <Input type="text" name="name" placeholder="full Name"  onChange={handleChange} required />
          <Input type="email" name="email" placeholder="Email"  onChange={handleChange} required />
          <Input type="number" name="phone" placeholder="number"  onChange={handleChange} required />
          <Input type="password" name="password" placeholder="Password"  onChange={handleChange} required />
          <Button type="submit" className="w-full bg-[#84886e]"   disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>
          <span className='text-sm'>Already have an account? <Link to="/auth/login" className='text-blue-600'>Login</Link></span>
        </form>
      </div>
      </motion.div>
    </div>
    </>
  );
}

