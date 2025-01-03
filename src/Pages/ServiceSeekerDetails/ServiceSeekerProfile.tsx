import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../Utils/axiosInstance";
import {
  Service_Seeker_Call_History,
  Service_Seeker_Id,
} from "../../Utils/restEndPoints";
import { IServiceSeekers,IServiceSeekers_CallHistory } from "../../Utils/types/ServiceSeeker";
import { FaPhoneAlt, FaLock } from "react-icons/fa"; // Import specific icons from React Icons
import { LiaUserCheckSolid } from "react-icons/lia";


// Define the expected structure of a service seeker and call history


const ServiceSeekerProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [seeker, setSeeker] = useState<IServiceSeekers | null>(null);
  const [callHistory, setCallHistory] = useState<IServiceSeekers_CallHistory[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  // Fetch service seeker details
  const fetchSeekerDetails = async () => {
    setLoading(true);
    if (id) {
      try {
        const response = await axiosInstance.get(`${Service_Seeker_Id}/${id}`);
        if (response.data && response.data.serviceSeeker) {
          setSeeker(response.data.serviceSeeker);
        } else {
          setError("Service seeker details not found.");
        }
      } catch (error: any) {
        setError(`Error fetching seeker details: ${error.message}`);
      } finally {
        setLoading(false); // Set loading to false after request
      }
    }
  };

  // Fetch call history for the service seeker
  const fetchCallHistory = async () => {
    if (id) {
      try {
        const response = await axiosInstance.get(
          `${Service_Seeker_Call_History}/${id}`
        );
        if (response.data && response.data.callHistory) {
          setCallHistory(response.data.callHistory);
        } else {
          setCallHistory([]); // No call history found
        }
      } catch (error: any) {
        setError(`Error fetching call history: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    if (id) {
      fetchSeekerDetails();
      fetchCallHistory();
    }
  }, [id]);

  // Format date to 12-hour format with AM/PM
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="w-[95%] mx-auto shadow-xl my-6 rounded-xl overflow-hidden">
      {/* Service Seeker Details */}
      <div className="w-full py-7 px-4">
        {loading ? (
          <div className="flex justify-center items-center space-x-2">
            <div className="w-8 h-8 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
            <p className="text-lg font-semibold text-gray-700">
              Loading seeker details...
            </p>
          </div>
        ) : seeker ? (
          <div className="flex flex-wrap justify-between items-center bg-lime-50 p-6 rounded-xl shadow-lg">
            <div className="w-full lg:w-1/3 flex flex-col space-y-4">
              <h2 className="text-2xl font-semibold text-black">
                <LiaUserCheckSolid className="text-3xl text-gray-600" />
                UserID:{" "}
                <span className="font-medium">{seeker._id || "N/A"}</span>
              </h2>

              <div className="flex items-center space-x-2">
                <FaPhoneAlt className="text-lg text-gray-600" />
                <p className="text-lg font-medium text-gray-800">
                  {seeker.mobileNumber || "Mobile number not available"}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <FaLock className="text-lg text-gray-600" />
                <p className="text-lg font-medium text-gray-800">
                  {seeker.status || "Status not provided"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-red-600 text-lg font-semibold">
            {error || "Service seeker details not found."}
          </p>
        )}
      </div>

      {/* Call History */}
      <div className="w-full p-4 shadow-lg rounded-lg bg-white">
        <h3 className="text-lg font-semibold">Call History</h3>
        {loading ? (
          <p>Loading call history...</p> // Show loading message for call history
        ) : error ? (
          <p className="text-red-500">{error}</p> // Display error message
        ) : callHistory.length > 0 ? (
          <table className="w-full text-sm xl:text-md 2xl:text-xl capitalize">
            <thead className="shadow-lg bg-lime-100">
              <tr>
                <td className="py-8 font-medium text-green-900 px-6">Date</td>
                <td className="py-8 font-medium text-green-900 px-6">Time</td>
                <td className="py-8 font-medium text-green-900 px-6">
                  Service Seeker Number
                </td>
                <td className="py-8 font-medium text-green-900 px-6">
                  Service Provider Number
                </td>
              </tr>
            </thead>
            <tbody>
              {callHistory.map((history) => (
                <tr key={history._id}>
                  <td className="py-4 font-medium text-gray-500 px-6">
                    {formatDate(history.createdAt) || "N/A"} {/* Format Date */}
                  </td>
                  <td className="py-4 font-medium text-gray-500 px-6">
                    {formatTime(history.createdAt) || "N/A"} {/* Format Time */}
                  </td>
                  <td className="py-4 font-medium text-gray-500 px-6">
                    {history.serviceSeekerMobileNumber || "N/A"}
                  </td>
                  <td className="py-4 font-medium text-gray-500 px-6">
                    {history.serviceProviderMobileNumber || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No call history available.</p>
        )}
      </div>
    </div>
  );
};

export default ServiceSeekerProfile;
