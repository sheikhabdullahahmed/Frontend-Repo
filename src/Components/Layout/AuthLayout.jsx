import React from 'react'
import Card2 from '../../assets/Images/card2.png'
import { LuTrendingUpDown } from 'react-icons/lu'

/* ✅ StatsInFoCard Component */
const StatsInFoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex  gap-6 bg-white p-4 rounded-xl  shadow-md  shadow-purple-400/10  border  border-gray-200/5 z-10">
      <div
        className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}
      >
        {icon}
      </div>
      <h6 className="text-xs text-gray-500 mb-1 ">{label}</h6>
      <span className="text-[20px]">{value}</span>
    </div>
  )
}

/* ✅ AuthLayout Component */
function AuthLayout({ children }) {
  return (
    <div className="flex">
      {/* Left Section */}
      <div className="h-screen w-screen md:w-[60vw] px-12 pt-8 pb-12">
        <h2 className="text-lg font-medium text-black">Expense Tracker</h2>
        {children}
      </div>

      {/* Right Section */}
      <div className="hidden md:block w-[40vw] h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">
        <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5"></div>
        <div className="w-48 h-56 rounded-[40px] border-20px border-fuchsia-600 absolute top-[30%] -right-[10%]"></div>
        <div className="w-48 h-48 rounded-[40px] bg-violet-500 absolute -bottom-7 -left-5"></div>



        <div className="grid grid-cols-1 z-20">
          <StatsInFoCard
            icon={<LuTrendingUpDown />}
            label="Track Your Item"
            color="bg-purple-600"
            value="430,000"
          />
        </div>

        <img
          src={Card2}
          className="w-64 lg:w-[90%] absolute bottom-10 shadow-lg shadow-blue-500/50"
          alt="Auth Visual"
        />
      </div>
    </div>
  )
}

export default AuthLayout
