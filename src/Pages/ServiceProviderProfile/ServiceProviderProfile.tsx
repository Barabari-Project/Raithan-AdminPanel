import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../Utils/axiosInstance";
import { SERVICEPROVIDERBYID } from "../../Utils/routes";
import { IServiceProvidersByID } from "../../Utils/types/ServiceProvider";
import Loader from "../../Components/atoms/PageLoader/Loader";
import tick from '../../assets/verify.png'

const ServiceProviderProfile: React.FC = () => {
  const [profile, setProfile] = React.useState({} as IServiceProvidersByID);

  const { id } = useParams<{ id: string }>();

  const fetchServiceProviderUsingId = async () => {
    const response = await axiosInstance.get(`${SERVICEPROVIDERBYID}/${id}`);
    console.log("data", response.data.serviceProvider);
    setProfile(response.data.serviceProvider);
  };
  useEffect(() => {
    fetchServiceProviderUsingId();
  }, []);
  return (
    <div>
      {Object.keys(profile).length == 0 ? (
        <Loader />
      ) : (
        <div className="bg-[rgb(71,77,86)] w-screen min-h-screen pt-10">
          <div className="w-[80%] rounded-3xl mx-auto p-12 bg-[rgb(18,19,21)] text-white flex flex-col items-start">
            <h1 className="border-l-4 border-lime-500 px-2 text-xl text-semibold">
              Details 
            </h1>
            <div className="flex px-2 py-5 gap-12 w-full">
              <div className="border border-black">
                <img className="rounded-full object-cover min-w-[104px] min-h-[104px] w-[104px] h-[104px] max-w-[104px] max-h-[104px]" src={profile?.profilePictureUrl} alt="" />
              </div>
              <div className="flex flex-col gap-6 w-full pl-1">
                <h2 className={`${profile?.status == 'verified'? '' : 'hidden' } text-2xl font-semibold flex items-center gap-1`}>{`${profile?.firstName} ${profile?.lastName}`}
                <span><img className="w-6" src={tick} alt="Verified" /></span>
                </h2>
                <div className="flex justify-start gap-20 w-full">
                  <span className="flex flex-col ">
                    <span className="text-slate-300 px-3">Mobile Number</span>
                    <span className="text-md bg-[rgb(37,38,40)] px-3 rounded-full">{profile?.mobileNumber}</span>
                  </span>
                  <span className="flex flex-col">
                    <span className="text-slate-300 px-3">Status</span>
                    <span className={`capitalize rounded-full px-3  ${profile?.status == 'verified'? 'text-[rgb(51,162,136)]': profile?.status=='pending'? 'text-[rgb(254,242,123)]' : 'text-red-900'}
                    ${profile?.status == 'verified'? 'bg-[rgb(45,63,60)]': profile?.status=='pending'? 'bg-[rgb(42,40,31)]' : 'bg-red-100'}
                    `}>{profile?.status}</span>
                  </span>
                </div>
              </div>
            </div>
            <div></div>
          </div>
          <div className="w-[80%] rounded-3xl mx-auto mt-5 p-12 bg-[rgb(18,19,21)] text-white">
            <h2 className="border-l-4 border-lime-500 px-2 text-xl text-semibold">
              Business Details
            </h2>
            <div className="flex flex-col gap-6 w-full mt-7 rounded-2xl px-10 py-6 bg-[rgb(41,42,44)]">
              <h2 className="text-2xl font-semibold ">
                {profile?.business?.[0]?.businessName}
              </h2>
              <div className="flex justify-between w-full px-6 ">
                <span className="flex flex-col ">
                  <span className="text-slate-300">Business Email</span>
                  <span className="text-md">
                    {profile?.business?.[0]?.businessEmail}
                  </span>
                </span>
                <span className="flex flex-col ">
                  <span className="text-slate-300">Business ContactNo</span>
                  <span className="text-md">
                    {profile?.business?.[0]?.businessContactNo}
                  </span>
                </span>
                <span className="flex flex-col ">
                  <span className="text-slate-300">Business Pincode</span>
                  <span className="text-md">{profile?.business?.[0]?.pincode}</span>
                </span>
              </div>
              <div className="w-full px-6">
                <span className="flex flex-col ">
                  <span className="text-slate-300">Business Address</span>
                  <span className="text-md">{`${profile?.business?.[0]?.blockNumber}, ${profile?.business?.[0]?.street}, ${profile?.business?.[0]?.area} , ${profile?.business?.[0]?.landmark}, ${profile?.business?.[0]?.city}, ${profile?.business?.[0]?.state}, ${profile?.business?.[0]?.pincode}`}</span>
                </span>
              </div>
              <div className="flex justify-between w-full">
                <span className="flex flex-col bg-[rgb(37,39,41)] rounded-2xl px-6 py-2 ">
                  <span className="font-bold mb-3">Category</span>
                  <span className="text-md flex flex-col items-start gap-3">
                    {profile?.business?.[0]?.category?.map((category: string) => (
                      <span key={category} className="mr-2 bg-blue-600 text-white px-3 py-1 rounded-full">
                        {category}
                      </span>
                    ))}
                  </span>
                </span>
                
                <span className="flex flex-col bg-[rgb(37,39,41)] rounded-2xl px-6 py-2 ">
                  <span className="font-bold mb-3">Working Days</span>
                  <span className="text-md flex flex-col gap-3">
                    {profile?.business?.[0]?.workingDays && Object.entries(profile?.business?.[0]?.workingDays)?.map(
                      ([day, isWorking]) => (
                        <div key={day}>
                          {isWorking ? <span className="mr-2 bg-blue-600 text-white px-3 py-1 rounded-full">{day}</span> :<span className="hidden"></span>}
                        </div>
                      )
                    )}
                  </span>
                </span>

                <span className="flex flex-col bg-[rgb(37,39,41)] rounded-2xl px-6 py-2 ">
                  <span className="font-bold mb-3">Timings</span>
                  <span className="text-md flex flex-col items-center gap-3">
                    {profile?.business?.[0]?.workingTime && Object.entries(profile?.business?.[0]?.workingTime).map(
                      ([xyz, time]) => (
                        <div key={xyz} className="mr-2 bg-blue-600 text-white px-3 py-1 rounded-full capitalize">
                          {xyz} - <span className="">{time.toUpperCase()}</span>
                        </div>
                      )
                    )}
                  </span>
                </span>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceProviderProfile;
