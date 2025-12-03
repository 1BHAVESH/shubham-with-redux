// components/StatsSection.jsx

import { Award, Building, Trophy, UsersRound, UserStar } from "lucide-react";

export default function StatsSection() {
  return (
    <section
      className="relative py-16 bg-black lg:h-[170px]"
      style={{
        backgroundImage: `url('/bg-pattern.png')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-[1300px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6">

        {/* STAT ITEM */}
        <div className="flex items-center space-x-2 text-white">
          <div className="w-14 h-14 border-2 bg-white text-black border-[#d4af37] rounded-full flex items-center justify-center">
           <Trophy />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#d4af37] leading-none">4</h2>
            <p className="text-sm text-yellow-400 mt-1">Award Winning</p>
          </div>
        </div>

        {/* STAT ITEM */}
        <div className="flex items-center space-x-4 text-white">
          <div className="w-14 h-14 bg-white text-black border-2 border-[#d4af37] rounded-full flex items-center justify-center">
           <Building />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#d4af37] leading-none">3</h2>
            <p className="text-sm text-yellow-400 mt-1 font-light">Projects Ready</p>
          </div>
        </div>

        {/* STAT ITEM */}
        <div className="flex items-center space-x-4 text-white">
          <div className="w-14 h-14 bg-white text-black border-2 border-[#d4af37] rounded-full flex items-center justify-center">
           <UserStar />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#d4af37] leading-none">23 </h2>
            <p className="text-sm text-yellow-400 mt-1">Happy Client</p>
          </div>
        </div>

        {/* STAT ITEM */}
        <div className="flex items-center space-x-4 text-white">
          <div className="w-14 h-14 bg-white text-black border-2 border-[#d4af37] rounded-full flex items-center justify-center">
            <UsersRound />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#d4af37] leading-none">20</h2>
            <p className="text-sm text-yellow-400 mt-1 ">Team Members</p>
          </div>
        </div>

      </div>
    </section>
  );
}
