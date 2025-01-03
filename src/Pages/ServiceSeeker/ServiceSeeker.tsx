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
  const [filterStatus, setFilterStatus] = useState("all");
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
    filterSeekers(value, filterStatus);
  };

  const handleFilterChange = (status: string) => {
    setFilterStatus(status);
    filterSeekers(search, status);
  };

  const filterSeekers = (searchQuery: string, status: string) => {
    const trimmedQuery = searchQuery.trim().toLowerCase();

    const filtered = seekers.filter((seeker) => {
      const matchesSearch = seeker.mobileNumber.includes(trimmedQuery);
      const matchesStatus = status === "all" || seeker.status === status;
      return matchesSearch && matchesStatus;
    });

    setFilteredSeekers(filtered);
  };

  const handleSeekerClick = (seeker: IServiceSeekers) => {
    navigate(`${seeker._id}`, { state: { mobileNumber: seeker.mobileNumber } });
  };

  return (
    <>
      <Header />

      <div className="w-[95%] mx-auto shadow-xl my-6 rounded-xl overflow-hidden">
        <div className="w-full flex items-center justify-between py-7 px-4">
          <h1 className="text-xl font-semibold px-4 py-1 rounded-xl bg-lime-100">
            Service Seekers
          </h1>
          <div>
            <input
              onChange={handleSearch}
              value={search}
              type="text"
              placeholder="Search by contact number"
              className="px-4 py-2 border bg-lime-100 rounded-xl outline-none"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="px-4 py-2 border bg-lime-100 rounded-xl outline-none"
          >
            <option className="capitalize" value="all">
              All
            </option>
            <option className="capitalize" value="pending">
              Pending
            </option>
            <option className="capitalize" value="verified">
              Verified
            </option>
            <option className="capitalize" value="rejected">
              Rejected
            </option>
            <option className="capitalize" value="completed">
              Completed
            </option>
          </select>
        </div>

        <div className="w-full ">
          <table className="w-full text-sm xl:text-md 2xl:text-xl capitalize">
            <thead className="  shadow-lg">
              <tr className="shadow-lg">
                <th className="whitespace-normal text-left py-8 font-medium text-black px-6">
                  Mobile Number
                </th>
                <th className="whitespace-normal text-left py-8 font-medium text-black px-6">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredSeekers.map((seeker) => (
                <tr
                  key={seeker._id}
                  onClick={() => handleSeekerClick(seeker)}
                  className="hover:cursor-pointer hover:bg-green-200"
                >
                  <td className="whitespace-normal py-4 font-medium text-gray-500 px-6">
                    {seeker.mobileNumber}
                  </td>
                  <td className="whitespace-normal py-4 font-medium text-gray-500 px-6">
                    <div
                      className={`inline-flex items-center rounded-full py-2 px-3 text-white ${
                        seeker.status === "verified"
                          ? "bg-green-600"
                          : seeker.status === "pending"
                          ? "bg-yellow-600"
                          : seeker.status === "rejected"
                          ? "bg-red-600"
                          : "bg-blue-600"
                      }`}
                    >
                      {seeker.status}
                    </div>
                  </td>
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
