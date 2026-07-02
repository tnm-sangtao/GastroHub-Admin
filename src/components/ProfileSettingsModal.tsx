import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Mail, Lock, X, Check, Key, Upload, Eye, EyeOff } from 'lucide-react';

interface ProfileSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeUser: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    role: string;
  };
  onSave: (updatedData: { name: string; email: string; avatar: string; newPassword?: string }) => void;
}

export default function ProfileSettingsModal({ isOpen, onClose, activeUser, onSave }: ProfileSettingsModalProps) {
  const [name, setName] = useState(activeUser.name);
  const [email, setEmail] = useState(activeUser.email);
  const [avatar, setAvatar] = useState(activeUser.avatar);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Synchronize state when active user changes
  useEffect(() => {
    setName(activeUser.name);
    setEmail(activeUser.email);
    setAvatar(activeUser.avatar);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    setError('');
    setSuccessMsg('');
  }, [activeUser.id, activeUser.name, activeUser.email, activeUser.avatar]);

  if (!isOpen) return null;

  // Process selected or dropped file to base64
  const processFile = (file: File) => {
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      setError('Invalid format: Please upload a valid image file (PNG, JPG, WEBP).');
      return;
    }
    
    if (file.size > 3 * 1024 * 1024) {
      setError('File is too large: Image size should be less than 3MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setAvatar(e.target.result as string);
        setError('');
        setSuccessMsg('Image uploaded and optimized successfully!');
        setTimeout(() => setSuccessMsg(''), 2500);
      }
    };
    reader.onerror = () => {
      setError('An error occurred while reading the image file.');
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    // If attempting to change password
    if (newPassword || confirmPassword || currentPassword) {
      if (!currentPassword) {
        setError('Please enter your current password to authorize credentials change');
        return;
      }
      if (newPassword !== confirmPassword) {
        setError('New password and confirmation password do not match');
        return;
      }
      if (newPassword.length < 6) {
        setError('New password must be at least 6 characters long');
        return;
      }
    }

    onSave({
      name: name.trim(),
      email: email.trim(),
      avatar: avatar.trim(),
      ...(newPassword ? { newPassword } : {})
    });

    setSuccessMsg('Your profile configurations have been successfully updated!');
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center z-[9999] p-4 font-sans">
        <motion.div
          initial={{ scale: 0.95, y: 15, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 15, opacity: 0 }}
          className="bg-white rounded-2xl border border-[#1C1814]/5 shadow-2xl w-full max-w-4xl max-h-[92vh] overflow-hidden flex flex-col relative font-sans text-left"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-[#EAE4DC] flex items-center justify-between shrink-0 bg-white">
            <div className="text-left space-y-1">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#7553FF]/12 text-[#7553FF] flex items-center justify-center">
                  <User className="w-4.5 h-4.5" />
                </div>
                <h3 className="text-[20px] font-bold text-[#1C1814] font-sans tracking-tight">
                  Profile Settings
                </h3>
              </div>
              <p className="text-[14px] text-slate-700 font-sans mt-1">
                Manage your user profile, upload customized workspace avatars, and update password credentials.
              </p>
            </div>
            <button 
              type="button"
              onClick={onClose}
              className="p-1.5 hover:bg-slate-100 text-slate-700 hover:text-slate-800 rounded-lg transition-all cursor-pointer border-none bg-transparent self-start shrink-0"
            >
              <X className="w-[18px] h-[18px]" />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[#EAE4DC]">
              
              {/* LEFT COLUMN: Visual Profile & Avatar Upload */}
              <div className="w-full md:w-80 shrink-0 p-6 space-y-6 bg-white text-left">

                {/* Avatar Circle Preview */}
                <div className="flex flex-col items-center justify-center py-2 space-y-3">
                  <div className="relative group">
                    {avatar ? (
                      <img
                        src={avatar}
                        alt="Profile Preview"
                        referrerPolicy="no-referrer"
                        className="w-24 h-24 rounded-full object-cover border-2 border-[#7553FF]/20 shadow-md transition-all group-hover:opacity-90"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-[#7553FF]/10 text-[#7553FF] flex items-center justify-center font-bold text-[32px] font-sans border-2 border-dashed border-[#7553FF]/30">
                        {name ? name.charAt(0).toUpperCase() : 'A'}
                      </div>
                    )}
                    <span className="absolute bottom-0 right-0 bg-[#7553FF] text-white p-1.5 rounded-full shadow-md text-[12px]">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="inline-block px-2.5 py-0.5 bg-[#7553FF]/10 text-[#7553FF] rounded-full text-[11px] font-bold uppercase tracking-wider font-sans">
                      {activeUser.role || 'Member'}
                    </span>
                    <p className="text-[13px] text-slate-700 mt-1 font-sans font-medium">{activeUser.name}</p>
                  </div>
                </div>

                {/* Interactive Drag & Drop Area */}
                <div className="space-y-2">
                  <label className="text-[13px] font-light text-[#1C1814] tracking-wider block font-sans">
                    Upload Avatar File
                  </label>
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={triggerFileInput}
                    className={`border border-dashed rounded-xl p-4 text-center cursor-pointer transition-all select-none flex flex-col items-center justify-center ${
                      isDragging
                        ? 'border-[#7553FF] bg-[#7553FF]/5 shadow-inner scale-[0.98]'
                        : 'border-[#e2e8f0] hover:border-[#7553FF]/50 bg-white hover:bg-[#7553FF]/[0.01]'
                    }`}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/png, image/jpeg, image/jpg, image/webp"
                      className="hidden"
                    />
                    <Upload className={`w-6 h-6 mb-2 transition-colors ${isDragging ? 'text-[#7553FF]' : 'text-[#7C7267]'}`} />
                    <p className="text-[13px] font-bold text-[#1C1814] leading-snug">
                      Drag & drop image
                    </p>
                    <p className="text-[12px] text-slate-700 mt-1">
                      or <span className="text-[#7553FF] font-semibold underline">browse file</span>
                    </p>
                    <p className="text-[10px] text-slate-700 mt-1.5 font-mono">
                      PNG, JPG, WEBP (Max 3MB)
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Sectioned Settings Panel (Basic Specifications + Change Password) */}
              <div className="flex-1 p-6 space-y-8 overflow-y-auto bg-white text-left">
                
                {/* SECTION 1: Basic Specifications */}
                <div className="bg-slate-50/40 border border-[#EAE4DC] rounded-xl p-5 space-y-4">
                  <div className="flex items-center gap-2 border-b border-[#EAE4DC] pb-2.5">
                    <div className="w-6 h-6 rounded-md bg-[#7553FF]/10 text-[#7553FF] flex items-center justify-center">
                      <User className="w-3.5 h-3.5" />
                    </div>
                    <h4 className="text-[14px] font-extrabold text-[#1C1814] tracking-wider font-sans">
                      Basic Specifications
                    </h4>
                  </div>

                  <p className="text-[13px] text-slate-700 leading-relaxed font-sans">
                    Update your real name and contact email address associated with your personal account.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name Input */}
                    <div className="space-y-1.5">
                      <label className="text-[12px] font-light text-[#1C1814] tracking-wider block font-sans">
                        Full Name <span className="text-rose-500 font-serif">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Jean Dupont"
                          className="w-full h-11 pl-9 pr-4 bg-white border border-[#C8BFB5]/50 hover:border-[#7553FF]/50 focus:border-[#7553FF] rounded-xl text-[14px] text-slate-800 placeholder:text-slate-700/60 outline-none transition-all focus:ring-4 focus:ring-[#7553FF]/10 font-sans shadow-xs"
                        />
                        <User className="w-4 h-4 text-slate-700 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>

                    {/* Email Input */}
                    <div className="space-y-1.5">
                      <label className="text-[12px] font-light text-[#1C1814] tracking-wider block font-sans">
                        Email Address <span className="text-rose-500 font-serif">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. jean.dupont@johnsbistro.com"
                          className="w-full h-11 pl-9 pr-4 bg-white border border-[#C8BFB5]/50 hover:border-[#7553FF]/50 focus:border-[#7553FF] rounded-xl text-[14px] text-slate-800 placeholder:text-slate-700/60 outline-none transition-all focus:ring-4 focus:ring-[#7553FF]/10 font-sans shadow-xs"
                        />
                        <Mail className="w-4 h-4 text-slate-700 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION 2: Change Security Password */}
                <div className="bg-slate-50/40 border border-[#EAE4DC] rounded-xl p-5 space-y-4">
                  <div className="flex items-center gap-2 border-b border-[#EAE4DC] pb-2.5">
                    <div className="w-6 h-6 rounded-md bg-[#7553FF]/10 text-[#7553FF] flex items-center justify-center">
                      <Key className="w-3.5 h-3.5" />
                    </div>
                    <h4 className="text-[14px] font-extrabold text-[#1C1814] tracking-wider font-sans">
                      Change Security Password
                    </h4>
                  </div>

                  <p className="text-[13px] text-slate-700 leading-normal font-sans">
                    Leave these fields empty if you do not want to alter your system access password.
                  </p>

                  {/* Vertical layout for Password Fields */}
                  <div className="flex flex-col gap-4 max-w">
                    {/* Current Password */}
                    <div className="space-y-1.5">
                      <label className="text-[12px] font-light text-[#1C1814] tracking-wider block font-sans">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showCurrentPassword ? "text" : "password"}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full h-11 pl-9 pr-10 bg-white border border-[#C8BFB5]/50 hover:border-[#7553FF]/50 focus:border-[#7553FF] rounded-xl text-[14px] text-slate-800 placeholder:text-slate-700/60 outline-none transition-all focus:ring-4 focus:ring-[#7553FF]/10 font-sans shadow-xs"
                        />
                        <Lock className="w-4 h-4 text-slate-700 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword((prev) => !prev)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-750 focus:outline-none p-1 rounded-md hover:bg-slate-100/80 cursor-pointer transition-all border-none bg-transparent"
                          title={showCurrentPassword ? "Hide current password" : "Show current password"}
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* New Password */}
                    <div className="space-y-1.5">
                      <label className="text-[12px] font-light text-[#1C1814] tracking-wider block font-sans">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Min 6 characters"
                          className="w-full h-11 pl-9 pr-10 bg-white border border-[#C8BFB5]/50 hover:border-[#7553FF]/50 focus:border-[#7553FF] rounded-xl text-[14px] text-slate-800 placeholder:text-slate-700/60 outline-none transition-all focus:ring-4 focus:ring-[#7553FF]/10 font-sans shadow-xs"
                        />
                        <Lock className="w-4 h-4 text-slate-700 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword((prev) => !prev)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-750 focus:outline-none p-1 rounded-md hover:bg-slate-100/80 cursor-pointer transition-all border-none bg-transparent"
                          title={showNewPassword ? "Hide new password" : "Show new password"}
                        >
                          {showNewPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Confirm New Password */}
                    <div className="space-y-1.5">
                      <label className="text-[12px] font-light text-[#1C1814] tracking-wider block font-sans">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Re-type new password"
                          className="w-full h-11 pl-9 pr-10 bg-white border border-[#C8BFB5]/50 hover:border-[#7553FF]/50 focus:border-[#7553FF] rounded-xl text-[14px] text-slate-800 placeholder:text-slate-700/60 outline-none transition-all focus:ring-4 focus:ring-[#7553FF]/10 font-sans shadow-xs"
                        />
                        <Lock className="w-4 h-4 text-slate-700 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword((prev) => !prev)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-750 focus:outline-none p-1 rounded-md hover:bg-slate-100/80 cursor-pointer transition-all border-none bg-transparent"
                          title={showConfirmPassword ? "Hide confirmation password" : "Show confirmation password"}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notifications & Alert Bars */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="p-4 bg-rose-50 text-rose-700 border border-rose-100 rounded-xl text-[13px] font-sans font-medium"
                    >
                      {error}
                    </motion.div>
                  )}

                  {successMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="p-4 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-xl text-[13px] font-sans font-medium flex items-center gap-2"
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      {successMsg}
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-[#EAE4DC] flex items-center justify-end gap-3 shrink-0 bg-white">
              <button 
                type="button"
                onClick={onClose}
                className="px-5 h-[38px] border border-[#EAE4DC] hover:bg-[#FAF9F7] text-[14px] font-bold text-slate-700 rounded-lg transition-all cursor-pointer bg-transparent"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-5 h-[38px] bg-[#7553FF] hover:bg-[#623EE2] text-white text-[14px] font-bold rounded-lg shadow-[0_2px_6px_rgba(117,83,255,0.35)] transition-all cursor-pointer border-none"
              >
                Save Changes
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
