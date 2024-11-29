
import { useRecoilState } from "recoil";
import { authAtom } from "../recoil/atoms/authAtoms";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate=useNavigate()
 
        const [, setUser] = useRecoilState(authAtom);
      
        const handleLogout = () => {
          setUser(null);
          localStorage.removeItem("token"); //here jwt is set in local storage 
          localStorage.removeItem("name");
          navigate("/signin")
        };
  return (
    <div onClick={handleLogout}>Logout</div>
  )
}

export default Logout