import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../Utils/axiosInstance";
import {
  Service_Seeker_Call_History,
  Service_Seeker_Id,
} from "../../Utils/restEndPoints";
import {
  IServiceSeekers,
  IServiceSeekers_CallHistory,
} from "../../Utils/types/ServiceSeeker";
import Loader from "../../Components/atoms/PageLoader/Loader";
import { FaPhoneAlt, FaLock } from "react-icons/fa";
import { LiaUserCheckSolid } from "react-icons/lia";

const ServiceSeekerProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [seeker, setSeeker] = useState<IServiceSeekers | null>(null);
  const [callHistory, setCallHistory] = useState<IServiceSeekers_CallHistory[]>(
    []
  );
  const [error, setError] = useState<string | null>(null);
  const [loadingSeeker, setLoadingSeeker] = useState<boolean>(false);
  const [loadingHistory, setLoadingHistory] = useState<boolean>(false);

  // Fetch service seeker details
  const fetchSeekerDetails = async () => {
    setLoadingSeeker(true);
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
      setLoadingSeeker(false);
    }
  };

  // Fetch call history for the service seeker
  const fetchCallHistory = async () => {
    setLoadingHistory(true);
    try {
      const response = await axiosInstance.get(
        `${Service_Seeker_Call_History}/${id}`
      );
      if (response.data && response.data.callHistory) {
        setCallHistory(response.data.callHistory);
      } else {
        setCallHistory([]);
      }
    } catch (error: any) {
      setError(`Error fetching call history: ${error.message}`);
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchSeekerDetails();
      fetchCallHistory();
    }
  }, [id]);

  // Format date and time
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const formatTime = (dateString: string) =>
    new Date(dateString).toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  return (
    <div>
      {loadingSeeker ? (
        <Loader />
      ) : (
        <div className="w-screen min-h-screen max-screen pt-10">
          {/* Service Seeker Details */}
          <div className="w-full py-7 px-4">
            {seeker ? (
              <div className="w-[90%] rounded-3xl mx-auto p-8 bg-[rgba(94,102,113,0.09)] text-black flex flex-col items-start">
                <div className="w-full lg:w-1/3 flex flex-col space-y-4">
                    <LiaUserCheckSolid className=" text-4xl text-gray-600" />
                  <h2 className="border-l-4 border-lime-500 px-2 text-2xl font-semibold text-black">
                    UserID:{" "}
                    <span className="font-medium">{seeker._id || "N/A"}</span>
                  </h2>
                  <div className="flex items-center space-x-2">
                    <FaPhoneAlt className="border-l-4 border-lime-500 px-2 text-lg text-gray-600" />
                    <p className=" text-lg font-medium text-gray-800">
                      {seeker.mobileNumber || "Mobile number not available"}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaLock className="border-l-4 border-lime-500 px-2 text-lg text-gray-600" />
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
          <div className="w-[90%] rounded-3xl mx-auto p-8 bg-[rgba(94,102,113,0.09)] text-black flex flex-col items-start">
          <h3 className="border-l-4 border-lime-500 px-2 text-lg font-semibold ">Call History</h3>
          <div className="w-[90%] rounded-3xl mx-auto py-8 px-6 bg-white text-black flex flex-col items-start">
            {loadingHistory ? (
              <p>Loading call history...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : callHistory.length > 0 ? (
              <table className="w-full text-sm xl:text-md 2xl:text-xl capitalize">
                <thead className="shadow-lg bg-lime-100">
                  <tr>
                    <td className="py-8 font-medium text-green-900 px-6">
                      Date
                    </td>
                    <td className="py-8 font-medium text-green-900 px-6">
                      Time
                    </td>
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
                        {formatDate(history.createdAt) || "N/A"}
                      </td>
                      <td className="py-4 font-medium text-gray-500 px-6">
                        {formatTime(history.createdAt) || "N/A"}
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
        </div>
      )}
    </div>
  );
};

export default ServiceSeekerProfile;
