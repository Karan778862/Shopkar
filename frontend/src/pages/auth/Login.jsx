import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { registerUser } from "../../redux/authSlice";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { setUser } from "@/redux/userSlice";
import Navbar from "@/components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import {motion}  from "framer-motion";
import axios from "axios";
import { API } from "@/api/api";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [loading, setloading] = useState()
  

//   const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    // dispatch(setUser(formData));
    try {
      const res = await axios.post(`${API}/api/user/login`,formData,{
        headers: {
          "Content-Type": "application/json"
      },
      withCredentials: true,
      })
      if(res.data){
          dispatch(setUser(res.data))
          if(res.data.role == "user"){

            navigate("/")
          }if(res.data.role == "admin"){
            navigate("/admin/")

          }
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
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {/* {error && <p className="text-red-500">{error}</p>} */}
        <form onSubmit={handleSubmit} className="space-y-4">
         
          <Input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <Input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <Button type="submit" className="w-full bg-[#6b7245]" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>

          <span className='text-sm'>Already have an account? <Link to="/auth/register" className='text-blue-600'>register</Link></span>
        </form>
      </div>
      </motion.div>
    </div>
   </>
  );
}

