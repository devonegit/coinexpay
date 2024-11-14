import React, { useState } from "react";
import { BreadCrumb, ModalBox } from "../../../../components";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaCheck,
  FaToggleOff,
  FaToggleOn,
  FaTimes,
} from "react-icons/fa";
import styled from "styled-components";
import { toast } from "react-toastify";
import customFetch from "../../../../utils/customFetch";
import { useQuery } from "react-query";
import { decrypt, decryptExit } from "../../../../utils/decryption";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { FormAddCoin, FormEditCoin } from "./source";

// Wrapper styled component with class definitions
const Wrapper = styled.div`
  .status-badge {
    display: inline-flex;
    align-items: center;
    padding: 0.25em 0.75em; /* Reduced padding */
    border-radius: 0.375rem;
    font-size: 0.75rem; /* Reduced font size */
    font-weight: 500;
    transition: background-color 0.3s, color 0.3s;
    cursor: pointer;
  }

  .status-badge-active {
    background-color: #d1fae5; /* Tailwind bg-green-100 */
    color: #065f46; /* Tailwind text-green-800 */
  }

  .status-badge-active:hover {
    background-color: #a7f3d0; /* Tailwind bg-green-200 */
    color: #047857; /* Tailwind text-green-700 */
  }

  .status-badge-inactive {
    background-color: #fef2f2; /* Tailwind bg-red-100 */
    color: #b91c1c; /* Tailwind text-red-800 */
  }

  .status-badge-inactive:hover {
    background-color: #fee2e2; /* Tailwind bg-red-200 */
    color: #991b1b; /* Tailwind text-red-700 */
  }

  .table {
    font-size: 0.875rem; /* Reduced font size for the entire table */
    width: 100%;
    border-collapse: collapse;
  }

  .table th,
  .table td {
    padding: 0.5em 1em; /* Adjusted padding */
    border: 1px solid #e5e7eb; /* Tailwind border-gray-200 */
  }

  .table th {
    background-color: #f3f4f6; /* Tailwind bg-gray-100 */
  }

  .table th.coin-name {
    text-align: left; /* Left align header */
  }

  .table td.coin-name {
    text-align: left; /* Left align content */
  }

  .table th.date,
  .table th.status,
  .table th.actions,
  .table th.reward {
    text-align: center;
  }

  .table td.center {
    text-align: center;
  }

  .status-icon {
    transition: color 0.3s, transform 0.3s;
    cursor: pointer;
  }

  .status-icon:hover {
    color: #2563eb; /* Tailwind text-blue-600 */
    transform: scale(1.1);
  }

  .action-icon {
    background-color: #f3f4f6; /* Light background for icons */
    border-radius: 0.375rem;
    padding: 0.25em; /* Reduced padding */
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s, color 0.3s;
    width: 1.5rem; /* Reduced size of the icon container */
    height: 1.5rem; /* Reduced size of the icon container */
  }

  .action-icon:hover {
    background-color: #e5e7eb; /* Slightly darker background on hover */
  }

  .action-icon.edit {
    color: #2563eb; /* Tailwind text-blue-600 */
  }

  .action-icon.delete {
    color: #f43f5e; /* Tailwind text-red-600 */
  }
`;

const getStatusBadgeClass = (status) => {
  switch (status) {
    case "Active":
      return "status-badge status-badge-active";
    case "Inactive":
      return "status-badge status-badge-inactive";
    default:
      return "status-badge"; // Default badge class
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case "Active":
      return <FaCheck className="status-icon mr-1" />;
    case "Inactive":
      return <FaTimes className="status-icon mr-1" />;
    default:
      return null;
  }
};

const EditCoin = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formDataAddCoin, setFormDataAddCoin] = useState({});
  const [formDataEditCoin, setFormDataEditCoin] = useState({});
  const [cryptocoins, setCryptocoins] = useState([]);
  const [clickedButton, setClickedButton] = useState();
  const [row, setRow ] = useState({});

  const { refetch: coinList } = useQuery(
    "coinList",
    async () => {
      const { data } = await customFetch.get("/coins/get-list");
      return data;
    },
    {
      onSuccess: (data) => {
        const dataDecrypt = decrypt(data);
        if (dataDecrypt?.error) {
          decryptExit();
          return navigate("/");
        }
        setCryptocoins(dataDecrypt.list);
        console.log(dataDecrypt.list);
      },

      onError: (error) => {
        toast.error(error.response.data.msg);
      },
      cacheTime: 1000 * 60 * 60,
      enabled: true,
      refetchInterval: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    }
  );

  const handleClose = () => {
    setShowModal(false);
    setFormDataAddCoin({});
    setFormDataEditCoin({});
    setRow({});

  };

  const handleConfirm = async () => {
    if(clickedButton === "add-coin") {
      try {
        setLoading(true);
        await customFetch.patch(`/users/add-coin`, formDataAddCoin);
        toast.success("Coin Added successfully", {
          autoClose: 1000,
        });
  
        setLoading(false);
        coinList(); //refetch coinlist
        setShowModal(false);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        toast.error(error.response.data.msg, {
          autoClose: 1000,
        });
      }
    };
    if(clickedButton === "edit-coin") {
      console.log(formDataEditCoin);
      console.log(row);

      try {
        setLoading(true);
        await customFetch.patch(`/coins/edit-coin/${row._id}`, formDataEditCoin);
        toast.success("Coin Edited successfully", {
          autoClose: 1000,
        });
  
        setLoading(false);
        coinList(); //refetch coinlist
        setShowModal(false);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        toast.error(error.response.data.msg, {
          autoClose: 1000,
        });
      }
    };
    if(clickedButton === "delete") {
  
      try {
        setLoading(true);
        await customFetch.delete(`/coins/delete-coin/${row._id}`);
        toast.success("Coin deleted successfully", {
          autoClose: 1000,
        });
  
        setLoading(false);
        coinList(); //refetch coinlist
        setShowModal(false);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        toast.error(error.response.data.msg, {
          autoClose: 1000,
        });
      }
    };
    }


  const handleInputChange_addCoin = (e) => {
    console.log(e.target.type);
    const { name, value } = e.target;

    setFormDataAddCoin({
      ...formDataAddCoin,
      [name]: value,
    });
  };
  const handleInputChange_editCoin = (e) => {
    const { name, value, type } = e.target;
    if (e.target.type === "select-one") {
      const selectedOption = e.target.options[e.target.selectedIndex];
      const selectedValue = selectedOption.value;

      if (name === "status") {
        setFormDataEditCoin({
          ...formDataEditCoin,
          status: selectedValue,
        });
      }
    }

    setFormDataEditCoin({
      ...formDataEditCoin,
      [name]: value,
    });
  };

  const breadcrumbs = [
    { label: "Home", href: "/dashboard" },
    { label: "Cryptocoins", href: "/dashboard/refer-earn" },
  ];

  return (
    <Wrapper>
      <BreadCrumb title="Add New Cryptocoin" breadcrumbs={breadcrumbs} />
      <div className="bg-white p-4 mt-4 rounded-lg">
        <h2 className="text-2xl font-bold mb-6">
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
            Manage Cryptocoins
          </span>
        </h2>
        <hr className="my-4 border-t border-gray-300" />
        {/* Light gray horizontal rule */}
        <p className="mb-4 text-gray-700">
          Add and manage your cryptocurrencies here. You can activate or
          deactivate coins and remove them as needed.
        </p>
        <div className="flex justify-end mb-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center bg-gradient-to-r from-blue-500 to-blue-700"
            onClick={() => {
              setShowModal(true);
              setClickedButton("add-coin");
            }}
          >
            <FaPlus className="mr-2" />
            Add Cryptocoin
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="table bg-white">
            <thead>
              <tr>
                <th>#</th>
                <th className="coin-name">Cryptocoin Name (Full)</th>
                {/* <th className="coin-name">Cryptocoin Name (Short)</th> */}
                <th className="date">Date Added</th>
                <th className="status">Status</th>
                <th className="reward">Base Reward (Satoshi)</th>
                <th className="reward">Timer (mins)</th>
                <th className="actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cryptocoins.map((coin, index) => (
                <tr key={index}>
                  <td className="center">{index + 1}</td>
                  <td className="coin-name">{`${coin.cryptoNameFull} (${coin.cryptoNameShort})`}</td>
                  {/* <td className="coin-name">{coin.cryptoNameShort}</td> */}
                  <td className="center">
                    {day(coin.createdAt).format("DD-MMM-YYYY h:mm:ss")}
                  </td>
                  <td className="center">
                    <span className={getStatusBadgeClass(coin.status)}>
                      {getStatusIcon(coin.status)} {coin.status}
                    </span>
                  </td>
                  <td className="center">{coin.baseRewardSatoshi}</td>
                  <td className="center">{coin.timer} minute</td>
                  <td className="center">
                    <div className="flex justify-center items-center">
                      <div
                        className="action-icon edit mr-2"
                        title="Update Base Reward"
                      >
                        <FaEdit
                          size={16}
                          onClick={() => {
                            setRow(coin);
                            setShowModal(true);
                            setClickedButton("edit-coin");
                          }}
                        />
                      </div>
                      <div className="action-icon delete" title="Delete">
                        <FaTrash
                          size={16}
                          onClick={() => {
                            setRow(coin);
                            setShowModal(true);
                            setClickedButton("delete");
                          }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-8">
          <div
            className="bg-gray-200 p-4 rounded-lg"
            style={{ width: "728px", height: "90px" }}
          >
            Top Ad Space 728×90
          </div>
        </div>
      </div>
      <ModalBox
        showModal={showModal}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
        handleOk={handleClose}
        title={
          clickedButton === "edit-coin"
            ? "Update Cryptocoin"
            : clickedButton === "add-coin"
            ? "Add Cryptocoin"
            : clickedButton === "delete"
            ? "Delete Cryptocoin"
            : null
        }
        buttonText="Confirm"
        message={
          clickedButton === "edit-coin" ? (
            <FormEditCoin handleInputChange={handleInputChange_editCoin} />
          ) : clickedButton === "add-coin" ? (
            <FormAddCoin handleInputChange={handleInputChange_addCoin} />
          ) : clickedButton === "delete" ? (
            "Are you sure you want to delete this Cryptocoin?"
          ) : null
        }
      />
    </Wrapper>
  );
};

export default EditCoin;
