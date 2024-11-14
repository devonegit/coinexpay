import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import Sidebar from "./required/Sidebar";
import Topbar from "./required/Topbar";
import styled from "styled-components";
import { useState, createContext, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import { useQuery } from "react-query";
import { decrypt, decryptExit } from "../../utils/decryption";


export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/current-user");

    const dataDecrypt = decrypt(data);
    if (dataDecrypt?.error) {
      decryptExit();
      return redirect("/");
    }

    return dataDecrypt;
  } catch (error) {
    if (error.response.data.msg === "authentication invalid") {
      await customFetch.get("/auth/logout");
      toast.error("Unauthorized Access", {
        autoClose: 2000,
      });
      return redirect("/");
    }
    toast.error("Session Expired!", {
      autoClose: 2000,
    });
    return redirect("/");
  }
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .content-wrapper {
    display: flex;
    flex: 1;
  }

  .sidebar {
    transition: transform 0.3s ease-in-out;
    width: 250px;
    position: relative;
    top: 0;
  }

  .sidebar-hidden {
    transform: translateX(-100%);
    position: absolute;
    top: 64px;
    left: 0;
    height: calc(100% - 64px);
  }

  .main {
    padding: 0.1rem 1rem 1rem 1rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  .main-content {
    background-color: #f8f8f8;
    flex-grow: 1;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
  }

  .copyright {
    text-align: center;
    margin-bottom: 1rem; /* Adds margin below the copyright notice */
  }
`;
const DashboardContext = createContext();
const DashboardLayout = () => {
  const loaderData = useLoaderData();
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [currentUser, setCurrentUser] = useState(loaderData.user);
  const navigate = useNavigate();



  const { data, isLoading } = useQuery(
    "currentUser",
    async () => {
      const { data } = await customFetch.get("/users/current-user");

      return data;
    },
    {
      onSuccess: (data) => {
        const dataDecrypt = decrypt(data);
        if (dataDecrypt?.error) {
          decryptExit();
          return navigate("/");
        }
        setCurrentUser(dataDecrypt?.user);
      },
      onError: (error) => {
        toast.error(error.response.data.msg);
        navigate("/");
      },
      cacheTime: 1000 * 60 * 10,
    }
  );


  // const {} = useQuery(
  //   "addLoyalBonus",
  //   async () => {
  //     const { data } = await customFetch.post("/users/loyalty");
  //     return data;
  //   },
  //   {
  //     onSuccess: (data) => {
  //       const dataDecrypt = decrypt(data);
  //       if (dataDecrypt?.error) {
  //         decryptExit();
  //         return navigate("/");
  //       }
       
  //     },
  //     onError: (error) => {
  //       toast.error(error.response.data.msg);
  //       navigate("/");
  //     },
  //     // Prevent refetching
  //   refetchOnWindowFocus: false,
  //   refetchInterval: false,
  //   refetchOnMount: false,
  //   }
  // );

  if (isLoading) return null;

  const handleSidebarToggle = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const logoutUser = async () => {
    navigate("/");
    await customFetch.get("/auth/logout");
    localStorage.removeItem("claimUnlockedAt");
    toast.success("Logged out successfully...", {
      autoClose: 2000,
    });
  };

  return (
    <DashboardContext.Provider
      value={{
        user: currentUser,
        logoutUser,
      }}
    >
      <Wrapper>
        <Topbar handleSidebarToggle={handleSidebarToggle} />
        <div className="content-wrapper">
          <div className={`sidebar ${!sidebarVisible ? "sidebar-hidden" : ""}`}>
            <Sidebar isVisible={sidebarVisible} />
          </div>
          <div className="main">
            <div className="main-content">
              <Outlet />
            </div>
            {/* <div className="copyright">
            &copy; 2024 Your Company. All rights reserved.
          </div> */}
          </div>
        </div>
      </Wrapper>
    </DashboardContext.Provider>
  );
};
export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
