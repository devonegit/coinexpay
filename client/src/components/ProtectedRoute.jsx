import { toast } from "react-toastify";
import { useDashboardContext } from "./layout/DashboardLayout";

const ProtectedRoute = ({ children, requiredRoles }) => {
  const { user, logoutUser } = useDashboardContext();

  const userHasAccess = user?.role && requiredRoles.includes(user?.role);
  

  if (!userHasAccess) {
    toast.error('Unauthorized access to this route', {
      autoClose: 2000,
    });

    // Set a timeout to call logoutUser after 2 seconds
    setTimeout(() => {
      logoutUser();
    }, 2000);

    return null;
  }

  return children;
};

export default ProtectedRoute;
