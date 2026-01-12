import { useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../RTK/AuthService";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

const useLogout = () => {
  const navigate = useNavigate();
  const [logoutUser] = useLogoutUserMutation();

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await logoutUser().unwrap();

      if (res?.ok || res?.success || res?.message) {
        
        dispatch(logout())
        navigate("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return { handleLogout };
};

export default useLogout;
