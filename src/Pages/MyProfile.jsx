import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { FaEnvelope, FaIdBadge, FaShieldAlt, FaSignOutAlt, FaCalendarCheck } from "react-icons/fa";
import { useNavigate } from "react-router";

const MyProfile = () => {
  const { user, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = async () => {
    await handleLogout();
    navigate("/sign-in");
  };

  return (
    <div className="min-h-screen bg-main-bg py-12 px-4 flex justify-center items-center font-sans">
      <div className="max-w-4xl w-full bg-base-100 rounded-[3.5rem] shadow-2xl border border-base-content/5 overflow-hidden grid grid-cols-1 md:grid-cols-12 transition-all">
        
        {/* LEFT PANEL: BRANDED IDENTITY */}
        <div className="md:col-span-5 bg-brand-primary p-12 text-white flex flex-col items-center justify-center text-center">
          <div className="relative mb-8">
            <div className="w-44 h-44 rounded-[3rem] border-4 border-brand-secondary overflow-hidden shadow-2xl">
              <img 
                src={user?.photoURL || "https://i.pravatar.cc/300"} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-brand-secondary text-black p-2 rounded-xl shadow-lg">
              <FaShieldAlt size={20} />
            </div>
          </div>

          <h2 className="text-3xl font-black tracking-tighter leading-tight mb-2">
            {user?.displayName || "Member Curator"}
          </h2>
          <p className="text-white/50 text-[10px] font-black uppercase tracking-[0.3em] mb-8">Verified Haven Resident</p>

          <div className="w-full space-y-3">
             <div className="bg-white/5 border border-white/10 p-4 rounded-3xl flex justify-between items-center">
                <span className="text-[10px] font-black uppercase opacity-60">Status</span>
                <span className="text-xs font-bold text-brand-secondary">ACTIVE</span>
             </div>
             <div className="bg-white/5 border border-white/10 p-4 rounded-3xl flex justify-between items-center">
                <span className="text-[10px] font-black uppercase opacity-60">Archive Access</span>
                <span className="text-xs font-bold text-brand-secondary">UNLIMITED</span>
             </div>
          </div>
        </div>

        {/* RIGHT PANEL: ARCHIVE CREDENTIALS */}
        <div className="md:col-span-7 p-10 md:p-20 flex flex-col justify-between bg-base-100">
          <div className="space-y-12">
            <div className="border-b border-base-content/5 pb-6">
                <h3 className="text-2xl font-black tracking-tight mb-1">Curator Credentials</h3>
                <p className="text-xs font-medium opacity-40">Your unique identity within the Book Haven network.</p>
            </div>

            <div className="space-y-10">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 flex items-center justify-center bg-brand-secondary/10 text-brand-primary rounded-2xl">
                    <FaIdBadge size={22} />
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-1">Public Alias</p>
                    <p className="text-xl font-bold">{user?.displayName || "Not Set"}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-12 h-12 flex items-center justify-center bg-brand-secondary/10 text-brand-primary rounded-2xl">
                    <FaEnvelope size={22} />
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-1">Authenticated Email</p>
                    <p className="text-xl font-bold truncate">{user?.email || "Private"}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-12 h-12 flex items-center justify-center bg-brand-secondary/10 text-brand-primary rounded-2xl">
                    <FaCalendarCheck size={22} />
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-1">Account Created</p>
                    <p className="text-xl font-bold">{user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : "Secure Archive"}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <button 
                onClick={onLogout}
                className="w-full flex items-center justify-center gap-3 py-5 bg-base-200 hover:bg-red-600 text-base-content hover:text-white rounded-[2rem] font-black uppercase tracking-widest text-[10px] transition-all duration-300 shadow-sm active:scale-95">
                <FaSignOutAlt /> Terminate Secure Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;