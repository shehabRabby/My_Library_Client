import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { FaEnvelope, FaIdBadge, FaShieldAlt, FaSignOutAlt, FaCalendarCheck, FaEdit, FaCamera, FaCheck, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const MyProfile = () => {
  const { user, handleLogout, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  
  // Initialize form data with current user values
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    photoURL: user?.photoURL || "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.displayName || "",
        photoURL: user.photoURL || "",
      });
    }
  }, [user]);

  const onLogout = async () => {
    await handleLogout();
    navigate("/sign-in");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    // Show a small loading state while updating
    try {
      await updateUserProfile(formData.displayName, formData.photoURL);
      
      // Close edit mode and show success
      setIsEditing(false);
      Swal.fire({
        icon: 'success',
        title: 'Identity Synchronized',
        text: 'Your profile and navigation bar have been updated.',
        confirmButtonColor: '#6D28D9',
        background: '#fff',
        customClass: {
            popup: 'rounded-[2rem]'
        }
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: error.message,
      });
    }
  };

  const handleCancel = () => {
    // Reset original user data before closing
    setFormData({
      displayName: user?.displayName || "",
      photoURL: user?.photoURL || "",
    });
    setIsEditing(false);
  };

  return (
    <div className="animate-fadeIn space-y-8">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight uppercase">
            Curator <span className="text-brand-primary">Profile</span>
          </h1>
          <p className="text-sm font-medium opacity-50">
            {isEditing ? "Modifying your archive credentials..." : "Manage your digital identity and archive access credentials."}
          </p>
        </div>
        
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="btn bg-brand-primary text-white border-none rounded-2xl px-8 hover:bg-brand-primary/90 shadow-lg shadow-brand-primary/20 transition-all active:scale-95"
          >
            <FaEdit /> Edit Profile
          </button>
        )}
      </div>

      <form onSubmit={handleUpdate} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT PANEL: IDENTITY CARD */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#0F172A] p-10 rounded-[3rem] text-white text-center relative overflow-hidden shadow-2xl border border-white/5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/20 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="relative mb-6 group">
                <div className="w-36 h-36 rounded-[2.5rem] border-4 border-brand-secondary overflow-hidden shadow-2xl bg-slate-800">
                  <img 
                    src={isEditing ? (formData.photoURL || "https://i.pravatar.cc/300") : (user?.photoURL || "https://i.pravatar.cc/300")} 
                    alt="Profile" 
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  />
                  {isEditing && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity">
                       <FaCamera className="text-brand-secondary text-2xl animate-bounce" />
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-brand-secondary text-black p-2 rounded-xl shadow-lg border-4 border-[#0F172A]">
                  <FaShieldAlt size={18} />
                </div>
              </div>

              {isEditing ? (
                <div className="w-full space-y-2 mb-4 text-left">
                  <label className="text-[10px] font-black uppercase tracking-widest text-brand-secondary ml-1">Profile Image URL</label>
                  <input 
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-brand-secondary transition-colors"
                    value={formData.photoURL}
                    onChange={(e) => setFormData({...formData, photoURL: e.target.value})}
                    placeholder="Enter image URL"
                  />
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-black tracking-tighter mb-1 uppercase truncate w-full">
                    {user?.displayName || "Member Curator"}
                  </h2>
                  <p className="text-brand-secondary text-[9px] font-black uppercase tracking-[0.2em] mb-6">
                    Verified Resident
                  </p>
                </>
              )}

              <div className="w-full bg-white/5 p-4 rounded-2xl border border-white/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[9px] font-black uppercase opacity-40">Account Integrity</span>
                    <span className="text-[10px] font-bold text-green-400">OPTIMAL</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-brand-secondary h-full w-[100%]"></div>
                  </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT side: CREDENTIAL DETAILS */}
        <div className="lg:col-span-8">
          <div className="bg-white h-full p-8 md:p-12 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                
                {/* Field: Display Name */}
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 flex items-center justify-center bg-brand-primary/5 text-brand-primary rounded-2xl shrink-0">
                      <FaIdBadge size={20} />
                  </div>
                  <div className="w-full">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Public Alias</p>
                      {isEditing ? (
                        <input 
                          type="text"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                          value={formData.displayName}
                          onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                        />
                      ) : (
                        <p className="text-xl font-bold text-slate-800">{user?.displayName || "Anonymous"}</p>
                      )}
                  </div>
                </div>

                {/* Field: Email */}
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 flex items-center justify-center bg-slate-100 text-slate-400 rounded-2xl shrink-0">
                      <FaEnvelope size={20} />
                  </div>
                  <div className="overflow-hidden">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Archive Email</p>
                      <p className="text-lg font-bold text-slate-500 truncate italic">{user?.email}</p>
                  </div>
                </div>

                {/* Field: Created Date */}
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 flex items-center justify-center bg-brand-primary/5 text-brand-primary rounded-2xl shrink-0">
                      <FaCalendarCheck size={20} />
                  </div>
                  <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Access Granted</p>
                      <p className="text-lg font-bold text-slate-800">
                        {user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString(undefined, { year: 'numeric', month: 'long' }) : "Recently"}
                      </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ACTION FOOTER */}
            <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
              {isEditing ? (
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <button 
                    type="submit"
                    className="flex-1 md:flex-none flex items-center gap-3 py-4 px-10 bg-brand-primary text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-brand-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    <FaCheck /> Sync Changes
                  </button>
                  <button 
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 md:flex-none flex items-center gap-3 py-4 px-10 bg-slate-100 text-slate-600 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-200 transition-all"
                  >
                    <FaTimes /> Abort
                  </button>
                </div>
              ) : (
                <>
                  <div className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.4em]">
                    Internal UID: {user?.uid?.slice(0, 14)}...
                  </div>
                  <button 
                      type="button"
                      onClick={onLogout}
                      className="flex items-center gap-3 py-4 px-8 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all duration-500 group">
                      <FaSignOutAlt className="group-hover:-translate-x-1 transition-transform" /> Terminate Session
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;