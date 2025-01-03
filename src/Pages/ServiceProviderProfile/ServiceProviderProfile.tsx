import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../Utils/axiosInstance";
import { Service_Provider_By_Id } from "../../Utils/restEndPoints";
import { IServiceProvidersByID } from "../../Utils/types/ServiceProvider";
import Loader from "../../Components/atoms/PageLoader/Loader";
import tick from '../../assets/verify.png'

const ServiceProviderProfile: React.FC = () => {
  const [profile, setProfile] = React.useState({} as IServiceProvidersByID);

  const { id } = useParams<{ id: string }>();

  const handleVerify = async () => {
    const response = await axiosInstance.get(`${Service_Provider_By_Id}/${id}/verify`);
    console.log("data", response.data);
    setProfile(response.data.serviceProvider);
  };

  const handleReject = async () => {
    const response = await axiosInstance.get(`${Service_Provider_By_Id}/${id}/reject`);
    console.log("data", response.data);
    setProfile(response.data.serviceProvider);
  };

  const fetchServiceProviderUsingId = async () => {
    const response = await axiosInstance.get(`${Service_Provider_By_Id}/${id}`);
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
        <div className="w-screen min-h-screen max-screen pt-10">
          <div className="w-[80%] rounded-3xl mx-auto p-12 bg-[rgba(94,102,113,0.09)] text-black flex flex-col items-start">
            <h1 className="border-l-4 border-lime-500 px-2 text-xl text-semibold">
              Details 
            </h1>
            <div className="flex px-2 py-5 gap-12 w-full">
              <div className="">
                <img className="rounded-full object-cover min-w-[104px] min-h-[104px] w-[104px] h-[104px] max-w-[104px] max-h-[104px]" src={profile?.profilePictureUrl} alt="" />
              </div>
              <div className="flex flex-col gap-6 w-full pl-1">
                <h2 className={`${profile?.status == 'verified'? '' : 'hidden' } text-2xl font-semibold flex items-center gap-1`}>{`${profile?.firstName} ${profile?.lastName}`}
                <span><img className="w-6" src={tick} alt="Verified" /></span>
                </h2>
                <div className="flex justify-start gap-20 w-full">
                  <span className="flex flex-col ">
                    <span className="text-slate-700 px-3">Mobile Number</span>
                    <span className="text-md bg-[rgb(197,201,211)] px-3 rounded-full">{profile?.mobileNumber}</span>
                  </span>
                  <span className="flex flex-col">
                    <span className="text-slate-700 px-3">Status</span>
                    <span className={`capitalize rounded-full px-3  ${profile?.status == 'verified'? 'text-[rgb(26,84,71)]': profile?.status=='pending'? 'text-[rgb(254,242,123)]' : 'text-red-900'}
                    ${profile?.status == 'verified'? 'bg-[rgb(159,224,214)]': profile?.status=='pending'? 'bg-[rgb(42,40,31)]' : 'bg-red-100'}
                    `}>{profile?.status}</span>
                    <span className={`${profile?.status == 'completed'? 'flex' : 'hidden'} pt-5 gap-5`}>
                      <button
                      onClick={()=>handleVerify()}
                       className="border border-black rounded-xl px-4 py-1 text-[rgb(81,181,0)] hover:scale-110 duration-300 font-bold">Verify</button>
                      <button onClick={()=>handleReject()} className="border border-black rounded-xl px-4 py-1 text-[rgb(249,57,57)] hover:scale-110 duration-300 font-bold">Reject</button>
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div></div>
          </div>
          <div className="w-[80%] rounded-3xl mx-auto mt-5 p-12 bg-[rgba(71,77,86,0.09)] text-black">
            <h2 className="border-l-4 border-lime-500 px-2 text-xl text-semibold">
              Business Details
            </h2>
            <div className="flex flex-col gap-6 w-full mt-7 rounded-2xl px-10 py-6 bg-white">
              <h2 className="text-2xl font-semibold ">
                {profile?.business?.businessName}
              </h2>
              <div className="flex justify-between w-full px-6 ">
                <span className="flex flex-col ">
                  <span className="text-slate-700">Business Email</span>
                  <span className="text-md">
                    {profile?.business?.businessEmail}
                  </span>
                </span>
                <span className="flex flex-col ">
                  <span className="text-slate-700">Business ContactNo</span>
                  <span className="text-md">
                    {profile?.business?.businessContactNo}
                  </span>
                </span>
                <span className="flex flex-col ">
                  <span className="text-slate-700">Business Pincode</span>
                  <span className="text-md">{profile?.business?.pincode}</span>
                </span>
              </div>
              <div className="w-full px-6">
                <span className="flex flex-col ">
                  <span className="text-slate-700">Business Address</span>
                  <span className="text-md">{`${profile?.business?.blockNumber}, ${profile?.business?.street}, ${profile?.business?.area} , ${profile?.business?.landmark}, ${profile?.business?.city}, ${profile?.business?.state}, ${profile?.business?.pincode}`}</span>
                </span>
              </div>
              <div className="flex justify-between w-full">
                <span className="flex flex-col bg-[rgba(37,39,41,0.54)] rounded-2xl px-6 py-2 ">
                  <span className="font-bold mb-3 text-white">Category</span>
                  <span className="text-md flex flex-col items-start gap-3">
                    {profile?.business?.category?.map((category: string) => (
                      <span key={category} className="mr-2 bg-blue-600 text-white px-3 py-1 rounded-full">
                        {category}
                      </span>
                    ))}
                  </span>
                </span>
                
                <span className="flex flex-col bg-[rgba(37,39,41,0.54)] rounded-2xl px-6 py-2 ">
                  <span className="font-bold mb-3 text-white">Working Days</span>
                  <span className="text-md flex flex-col gap-3">
                    {profile?.business?.workingDays && Object.entries(profile?.business?.workingDays)?.map(
                      ([day, isWorking]) => (
                        <div key={day}>
                          {isWorking ? <span className="mr-2 bg-blue-600 text-white px-3 py-1 rounded-full">{day}</span> :<span className="hidden"></span>}
                        </div>
                      )
                    )}
                  </span>
                </span>

                <span className="flex flex-col bg-[rgba(37,39,41,0.54)] rounded-2xl px-6 py-2 ">
                  <span className="font-bold mb-3 text-white">Timings</span>
                  <span className="text-md flex flex-col items-center gap-3">
                    {profile?.business?.workingTime && Object.entries(profile?.business?.workingTime).map(
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
