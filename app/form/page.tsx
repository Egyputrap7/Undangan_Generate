'use client';

import { useState,useEffect  } from 'react';
import { useRouter } from 'next/navigation';

const FormPage = () => {
  const [formData, setFormData] = useState({
    noSurat: '',
    hari: '',
    tanggal: '',
    pukul: '',
    tempat: '',
    acara: '',
    ttd: '',
    nb: '',
  });

  const formatTanggal = (date: string) => {
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
    ];
  
    const dateObj = new Date(date);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = months[dateObj.getMonth()]; // Ambil nama bulan
    const year = dateObj.getFullYear();
  
    return `${day} ${month} ${year}`;
  };




  useEffect(() => {
    // Membuat tanggal dengan format dd-mmmm-yyyy dalam Bahasa Indonesia
    const monthsInIndonesian = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0'); // Menambahkan 0 jika tanggal kurang dari 10
    const month = monthsInIndonesian[currentDate.getMonth()];
    const year = currentDate.getFullYear();

    // Format tanggal: dd-MMMM-yyyy
    const formattedDate = `${day} ${month} ${year}`;

    // Mengupdate nilai 'ttd' di formData
    setFormData((prevData) => ({
      ...prevData,
      ttd: formattedDate,
    }));
  }, []);

 
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
  
    if (name === 'tanggal') {
      setFormData((prev) => ({
        ...prev,
        [name]: value, // Simpan format asli (yyyy-MM-dd)
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Serialize data to URL query
    const query = new URLSearchParams(formData).toString();
    router.push(`/previewExport?${query}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg"
    >
      <div className="mb-4">
        <label htmlFor="noSurat" className="block text-gray-700 font-medium">No Surat:</label>
        <input
          type="text"
          name="noSurat"
          id="noSurat"
          value={formData.noSurat}
          onChange={handleChange}
          required
          className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
  
      <div className="mb-4">
        <label htmlFor="hari" className="block text-gray-700 font-medium">Hari:</label>
        <input
          type="text"
          name="hari"
          id="hari"
          value={formData.hari}
          onChange={handleChange}
          required
          className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
  
      <div className="mb-4">
        <label htmlFor="tanggal" className="block text-gray-700 font-medium">Tanggal:</label>
        <input
          type="date"
          name="tanggal"
          id="tanggal"
          value={formData.tanggal}
          onChange={handleChange}
          required
          className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p>Tanggal yang dipilih: {formatTanggal(formData.tanggal)}</p> 
      </div>
  
      <div className="mb-4">
        <label htmlFor="pukul" className="block text-gray-700 font-medium">Pukul:</label>
        <input
          type="time"
          name="pukul"
          id="pukul"
          value={formData.pukul}
          onChange={handleChange}
          required
          className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
  
      <div className="mb-4">
        <label htmlFor="tempat" className="block text-gray-700 font-medium">Tempat:</label>
        <input
          type="text"
          name="tempat"
          id="tempat"
          value={formData.tempat}
          onChange={handleChange}
          required
          className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
  
      <div className="mb-4">
        <label htmlFor="acara" className="block text-gray-700 font-medium">Acara:</label>
        <input
          type="text"
          name="acara"
          id="acara"
          value={formData.acara}
          onChange={handleChange}
          required
          className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
  
      <div className="mb-4">
        <label htmlFor="ttd" className="block text-gray-700 font-medium">TTD:</label>
        <input
          type="text"
          name="ttd"
          id="ttd"
          value={formData.ttd}
          onChange={handleChange}
          disabled
          className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
  
      <div className="mb-4">
        <label htmlFor="nb" className="block text-gray-700 font-medium">NB:</label>
        <input
          name="nb"
          id="nb"
          value={formData.nb}
          onChange={handleChange}
          required
          className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
  
      <div className="text-center">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
        >
          Preview
        </button>
      </div>
    </form>
  );
  
};

export default FormPage;
