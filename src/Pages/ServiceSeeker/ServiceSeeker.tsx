import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Utils/axiosInstance";
import { Service_Seeker } from "../../Utils/restEndPoints";
import Header from "../../Components/Header/Header";
import { IServiceSeekers } from "../../Utils/types/ServiceSeeker";



const ServiceSeekerPage: React.FC = () => {
  const [seekers, setSeekers] = useState<IServiceSeekers[]>([]);
  const [filteredSeekers, setFilteredSeekers] = useState<IServiceSeekers[]>([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchSeekers = async () => {
    try {
      const response = await axiosInstance.get(Service_Seeker);
      setSeekers(response.data);
      setFilteredSeekers(response.data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error fetching seekers:", error.message);
      } else {
        console.error("An unknown error occurred while fetching seekers.");
      }
    }
  };

  useEffect(() => {
    fetchSeekers();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    const filtered = seekers.filter((seeker) =>
      seeker.mobileNumber.includes(value)
    );
    setFilteredSeekers(filtered);
  };

  const handleSeekerClick = (seeker: IServiceSeekers) => {
    navigate(`${seeker._id}`, { state: { mobileNumber: seeker.mobileNumber } });
  };

  return (<>
        <Header/>

    <div className="w-[95%] mx-auto shadow-xl my-6 rounded-xl overflow-visible bg-white">
      <div className="w-full flex items-center justify-between py-7 px-4">
        <h1 className="text-2xl font-semibold px-4 py-1 rounded-xl bg-lime-100 text-green-800 shadow-md">
          Service Seekers
        </h1>
        <div className="relative">
          <input
            onChange={handleSearch}
            value={search}
            type="text"
            placeholder="Search by contact number"
            className="px-4 py-2 border-2 border-lime-300 rounded-xl outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
            />
          <div className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500">
            <i className="fas fa-search"></i>
          </div>
        </div>
      </div>

      <div className="w-full p-4 shadow-lg rounded-lg bg-lime-50">
        <table className="w-full text-sm xl:text-md 2xl:text-xl capitalize">
          <thead className="bg-lime-100 text-green-800 shadow-md rounded-lg">
            <tr>
              <th className="py-8 text-xl font-semibold text-center px-6">Name</th>
              <th className="py-8 text-xl font-semibold px-6 text-center">Contact Number</th>
            </tr>
          </thead>
          <tbody>
            {filteredSeekers.map((seeker) => (
              <tr
                key={seeker._id}
                onClick={() => handleSeekerClick(seeker)}
                className="hover:cursor-pointer hover:bg-lime-200 transition-all duration-300 ease-in-out scale-95 transform hover:scale-100"
                >
                <td className="py-4 font-medium text-gray-600 text-center px-6">{seeker.name || "N/A"}</td>
                <td className="py-4 font-medium text-gray-600 text-center px-6">{seeker.mobileNumber || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
            </>
  );
};

export default ServiceSeekerPage;
