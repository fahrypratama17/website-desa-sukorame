"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { HiLocationMarker, HiClock } from "react-icons/hi";
import { FiPhone, FiMail, FiChevronDown, FiSend } from "react-icons/fi";

const KontakPage = ({ settings }: { settings: Record<string, string> }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Fallback to a placeholder number if setting is empty or format is complex
    // In production, you would parse the DB setting for a clean mobile number.
    const rawPhone = settings?.kontak_telepon || "6281234567890";
    // Basic cleanup: remove spaces, brackets, dashes
    let waNumber = rawPhone.replace(/\D/g, "");
    if (waNumber.startsWith("0")) {
      waNumber = "62" + waNumber.substring(1);
    }
    
    const text = `Halo Admin Desa Sukorame,\n\nNama: ${formData.name}\nNo. HP: ${formData.phone}\nKeperluan: ${formData.subject}\n\nPesan:\n${formData.message}`;
    const encodedText = encodeURIComponent(text);
    
    window.open(`https://wa.me/${waNumber}?text=${encodedText}`, "_blank");
  };

  const handleQuickWhatsApp = () => {
    const rawPhone = settings?.kontak_telepon || "6281234567890";
    let waNumber = rawPhone.replace(/\D/g, "");
    if (waNumber.startsWith("0")) {
      waNumber = "62" + waNumber.substring(1);
    }
    window.open(`https://wa.me/${waNumber}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-24">
      {/* Header Area */}
      <div className="mx-auto w-[90%] max-w-6xl pt-16 md:pt-24">
        <h1 className="font-montserrat-700 text-3xl md:text-5xl text-[#1C3F2D] mb-4">
          Hubungi Kami
        </h1>
        <p className="font-inter-400 text-[#414844] text-base md:text-lg max-w-2xl leading-relaxed">
          Pemerintah Desa Sukorame siap melayani dan mendengarkan aspirasi Anda. Silakan hubungi kami melalui kanal yang tersedia atau kunjungi kantor desa pada jam kerja.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="mx-auto w-[90%] max-w-6xl mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Contact Cards */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          
          {/* Card: Alamat */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex gap-5 items-start">
            <div className="w-12 h-12 shrink-0 rounded-full bg-[#B2D8C6] flex items-center justify-center">
              <HiLocationMarker className="h-6 w-6 text-[#1C3F2D]" />
            </div>
            <div>
              <h3 className="font-montserrat-700 text-lg text-[#1C3F2D] mb-1">Alamat Kantor</h3>
              <p className="font-inter-400 text-sm text-[#414844] leading-relaxed">
                {settings?.kontak_alamat || "Jl. Raya Sukorame No. 1, Desa Sukorame, Kec. Binangun, Kab. Blitar"}
              </p>
            </div>
          </div>

          {/* Card: Jam Pelayanan */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex gap-5 items-start">
            <div className="w-12 h-12 shrink-0 rounded-full bg-[#B2D8C6] flex items-center justify-center">
              <HiClock className="h-6 w-6 text-[#1C3F2D]" />
            </div>
            <div>
              <h3 className="font-montserrat-700 text-lg text-[#1C3F2D] mb-1">Jam Pelayanan</h3>
              <div className="font-inter-400 text-sm text-[#414844] leading-relaxed">
                <p>Senin - Kamis: 08.00 - 15.00 WIB</p>
                <p>Jumat: 08.00 - 11.00 WIB</p>
              </div>
            </div>
          </div>

          {/* Card: Telepon & Email */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-6">
            <div className="flex gap-5 items-center">
              <div className="w-10 h-10 shrink-0 rounded-full bg-gray-100 flex items-center justify-center">
                <FiPhone className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="font-inter-600 text-xs text-gray-400 uppercase tracking-wider mb-1">Telepon</p>
                <p className="font-inter-500 text-[#1C3F2D]">{settings?.kontak_telepon || "-"}</p>
              </div>
            </div>
            
            <div className="w-full h-px bg-gray-100"></div>

            <div className="flex gap-5 items-center">
              <div className="w-10 h-10 shrink-0 rounded-full bg-gray-100 flex items-center justify-center">
                <FiMail className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="font-inter-600 text-xs text-gray-400 uppercase tracking-wider mb-1">Email</p>
                <p className="font-inter-500 text-[#1C3F2D]">{settings?.kontak_email || "-"}</p>
              </div>
            </div>
          </div>

          {/* Card: Layanan Cepat WhatsApp */}
          <div className="bg-[#0A2615] rounded-2xl p-6 shadow-md relative overflow-hidden mt-2">
            {/* Background decoration */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full pointer-events-none"></div>
            <div className="absolute -bottom-10 right-8 w-32 h-32 bg-white/10 rounded-full pointer-events-none"></div>
            
            <div className="flex items-center justify-between relative z-10">
              <div className="pr-4">
                <h3 className="font-montserrat-700 text-white text-lg mb-2">Layanan Cepat via WhatsApp</h3>
                <p className="font-inter-400 text-green-100/80 text-sm leading-relaxed max-w-[200px]">
                  Hubungi perangkat desa untuk respon yang lebih cepat.
                </p>
              </div>
              <button 
                onClick={handleQuickWhatsApp}
                className="w-14 h-14 shrink-0 bg-[#25D366] hover:bg-[#20bd5a] transition-colors rounded-full flex items-center justify-center shadow-lg"
              >
                <FaWhatsapp className="h-7 w-7 text-white" />
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
            <h2 className="font-montserrat-700 text-2xl md:text-3xl text-[#1C3F2D] mb-8">Kirim Pesan</h2>
            
            <form onSubmit={handleWhatsAppRedirect} className="flex flex-col gap-6">
              
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-inter-600 text-sm text-[#1C3F2D]">Nama Lengkap</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Masukkan nama Anda" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#2B694D] focus:border-transparent font-inter-400 placeholder:text-gray-400 transition-shadow"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="font-inter-600 text-sm text-[#1C3F2D]">Nomor WhatsApp</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="08xxxxxxxxxx" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#2B694D] focus:border-transparent font-inter-400 placeholder:text-gray-400 transition-shadow"
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="font-inter-600 text-sm text-[#1C3F2D]">Keperluan</label>
                <div className="relative">
                  <select 
                    id="subject" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#2B694D] focus:border-transparent font-inter-400 text-[#414844] appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Pilih Keperluan Anda</option>
                    <option value="Informasi Layanan Administrasi">Informasi Layanan Administrasi</option>
                    <option value="Pengaduan Masyarakat">Pengaduan Masyarakat</option>
                    <option value="Kerjasama / Kunjungan">Kerjasama / Kunjungan</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <FiChevronDown className="w-5 h-5 text-gray-500" />
                  </div>
                </div>
              </div>

              {/* Row 3 */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="font-inter-600 text-sm text-[#1C3F2D]">Pesan</label>
                <textarea 
                  id="message" 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tuliskan pesan Anda secara detail..." 
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#2B694D] focus:border-transparent font-inter-400 placeholder:text-gray-400 resize-y transition-shadow"
                ></textarea>
              </div>

              {/* Footer Form */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-gray-100">
                <p className="font-inter-400 text-xs text-gray-500 max-w-xs text-center sm:text-left">
                  *Data Anda aman dan hanya digunakan untuk keperluan layanan desa.
                </p>
                <button 
                  type="submit"
                  className="w-full sm:w-auto font-inter-600 bg-[#0A2615] hover:bg-[#1C3F2D] text-white text-xs sm:text-sm px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  Kirim Pesan
                  <FiSend className="h-5 w-5" />
                </button>
              </div>

            </form>
          </div>
        </div>

      </div>

      {/* Map Section */}
      <div className="mx-auto w-[90%] max-w-6xl mt-12 rounded-3xl overflow-hidden shadow-sm border border-gray-200 h-[400px] bg-gray-200 relative mb-12">
        <iframe 
          src="https://maps.google.com/maps?q=Desa+Sukorame+Kecamatan+Binangun+Blitar&t=&z=14&ie=UTF8&iwloc=&output=embed" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={false} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        ></iframe>
      </div>
    </div>
  );
};

export default KontakPage;