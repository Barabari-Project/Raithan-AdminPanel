import React, { useEffect } from "react";
import Header from "../../Components/Header/Header";
import axiosInstance from "../../Utils/axiosInstance";
import { SERVICEPROVIDER } from "../../Utils/restEndPoints";
import { useNavigate } from "react-router-dom";
import { formatSnakeCaseToReadable } from "../../Utils/formateSnakeCasetoCamelCase";

function ServiceProvider() {
  const [serviceProviders, setServiceProviders] = React.useState([]);
  const [filteredProviders, setFilteredProviders] = React.useState([]);
  const [filterStatus, setFilterStatus] = React.useState("all");
  const [searchQuery, setSearchQuery] = React.useState("");

  const navigate = useNavigate();

  const fetchServiceProviders = async () => {
    const response = await axiosInstance.get(SERVICEPROVIDER);
    console.log(response.data);
    setServiceProviders(response.data);
    setFilteredProviders(response.data);
  };

  const handleFilterChange = (status: string) => {
    setFilterStatus(status);

    if (status === "all") {
      setFilteredProviders(serviceProviders);
    } else {
      setFilteredProviders(
        serviceProviders.filter((provider: any) => provider.status === status)
      );
    }
  };

  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim().toLowerCase();

    const filtered = serviceProviders.filter((provider: ServiceProvider) => {
      const firstName = provider.firstName?.toLowerCase() || "";
      const lastName = provider.lastName?.toLowerCase() || "";
      return (
        firstName.includes(trimmedQuery) || lastName.includes(trimmedQuery)
      );
    });

    setFilteredProviders(filtered);
  };

  useEffect(() => {
    fetchServiceProviders();
  }, []);

  return (
    <div>
      <Header />
      <div className="w-[95%] mx-auto shadow-xl my-6 rounded-xl overflow-hidden">
        <div className="w-full flex items-center justify-between py-7 px-4">
          <h1 className="text-xl font-semibold px-4 py-1 rounded-xl bg-lime-100">
            Service Providers
          </h1>
          <div>
            <input
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Search"
              className="px-4 py-2 border bg-lime-100 rounded-xl outline-none"
              name=""
              id=""
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
              pending
            </option>
            <option className="capitalize" value="otp_verified">
              otp verified
            </option>
            <option className="capitalize" value="email_verified">
              email verified
            </option>
            <option className="capitalize" value="business_details_remaining">
              business details remaining
            </option>
            <option className="capitalize" value="completed">
              completed
            </option>
            <option className="capitalize" value="verified">
              verified
            </option>
            <option className="capitalize" value="rejected">
              rejected
            </option>
          </select>
        </div>
        <div className="w-full ">
          <table className="w-full text-sm xl:text-md 2xl:text-xl capitalize">
            <thead className="  shadow-lg">
              <tr className="shadow-lg">
                <td
                  width={"20%"}
                  className="whitespace-normal py-8 font-medium text-black px-6"
                >
                  Profile Picture
                </td>
                <td
                  width={"20%"}
                  className="whitespace-normal py-8 font-medium text-black px-6"
                >
                  First Name
                </td>

                <td
                  width={"20%"}
                  className="whitespace-normal py-8 font-medium text-black px-6"
                >
                  Last Name
                </td>

                <td
                  width={"20%"}
                  className="whitespace-normal py-8 font-medium text-black px-6"
                >
                  Mobile Number
                </td>

                <td
                  width={"20%"}
                  className="whitespace-normal py-8 font-medium text-black px-6"
                >
                  Status
                </td>
              </tr>
            </thead>
            <tbody className="">
              {filteredProviders.map((serviceProvider: any) => (
                <tr
                  onClick={() => navigate(`/${serviceProvider._id}`)}
                  key={serviceProvider._id}
                  className="hover:cursor-pointer hover:bg-green-200"
                >
                  <td
                    width={"20%"}
                    className="whitespace-normal py-4 font-medium text-gray-500 px-6"
                  >
                    <img
                      className="max-h-[50px] h-[50px] w-[50px] rounded-full"
                      src={`${serviceProvider?.profilePictureUrl}`}
                      alt="Profile Picture"
                    />
                  </td>
                  <td
                    width={"20%"}
                    className="whitespace-normal py-4 font-medium text-gray-500 px-6"
                  >
                    {serviceProvider?.firstName || "N/A"}
                  </td>

                  <td
                    width={"20%"}
                    className="whitespace-normal py-4 font-medium text-gray-500 px-6"
                  >
                    {serviceProvider?.lastName || "N/A"}
                  </td>

                  <td
                    width={"20%"}
                    className="whitespace-normal py-4 font-medium text-gray-500 px-6"
                  >
                    {serviceProvider?.mobileNumber || "N/A"}
                  </td>

                  <td
                    width={"20%"}
                    className="whitespace-normal py-4 text-xs xl:text-md font-medium text-gray-500 px-6"
                  >
                    <div
                      className={`${
                        serviceProvider.status == "verified"
                          ? "bg-green-600"
                          : serviceProvider.status == "pending"
                          ? "bg-yellow-600"
                          : "bg-blue-600"
                      } inline-flex items-center rounded-full py-2 px-3 text-white`}
                    >
                      {formatSnakeCaseToReadable(serviceProvider?.status)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ServiceProvider;
