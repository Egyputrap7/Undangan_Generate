"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface FormData {
  noSurat: string;
  hari: string;
  tanggal: string;
  pukul: string;
  tempat: string;
  acara: string;
  ttd: string;
  nb: string;
}

// const handleExport = async () => {
//   const contents = document.querySelectorAll(".pdf-content"); // Ambil semua elemen dengan class pdf-content
//   if (!contents || contents.length === 0) {
//     console.error("Tidak ada konten untuk diekspor.");
//     return;
//   }

//   const pdf = new jsPDF("p", "mm", "a4");
//   const pageWidth = 210; // Lebar halaman A4 dalam mm
//   const pageHeight = 297; // Tinggi halaman A4 dalam mm
//   const margin = 10; // Margin luar dalam mm
//   const padding = 5; // Jarak antara undangan dalam mm

//   // Lebar dan tinggi undangan (setengah halaman A4 dengan margin dan padding)
//   const invitationWidth = (pageWidth - 2 * margin - padding) / 2;
//   const invitationHeight = (pageHeight - 2 * margin - padding) / 2;

//   for (const [index, content] of Array.from(contents).entries()) {
//     // Casting elemen menjadi HTMLElement
//     const element = content as HTMLElement;

//     const canvas = await html2canvas(element, {
//       scale: 2, // Tingkatkan kualitas
//       useCORS: true, // Izinkan cross-origin
//     });

//   const imgData = canvas.toDataURL("image/png");

//   const totalInvitations = 100; // Jumlah total undangan
//   for (let i = 0; i < totalInvitations; i++) {
//     // Tambahkan halaman baru setiap 4 undangan
//     if (i % 4 === 0 && i !== 0) pdf.addPage();

//     // Hitung posisi undangan di halaman (2 kolom x 2 baris)
//     const column = i % 2; // Kolom: 0 untuk kiri, 1 untuk kanan
//     const row = Math.floor((i % 4) / 2); // Baris: 0 untuk atas, 1 untuk bawah

//     const xPos = margin + column * (invitationWidth + padding);
//     const yPos = margin + row * (invitationHeight + padding);

//     // Tambahkan undangan ke halaman
//     pdf.addImage(
//       imgData,
//       "PNG",
//       xPos,
//       yPos,
//       invitationWidth,
//       invitationHeight
//     );
//   }
//   if (index < contents.length - 1) {
//     pdf.addPage();
//   }
//   pdf.save("undangan.pdf");
// };
// };

const handleExport = async () => {
  const contents = document.querySelectorAll(".pdf-content"); // Ambil semua elemen dengan class pdf-content
  if (!contents || contents.length === 0) {
    console.error("Tidak ada konten untuk diekspor.");
    return;
  }

  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = 210; // Lebar halaman A4 dalam mm
  const pageHeight = 297; // Tinggi halaman A4 dalam mm
  const margin = 5; // Margin dalam mm
  const gridWidth = (pageWidth - 3 * margin) / 2; // Lebar grid untuk 2 undangan di atas
  const gridHeight = (pageHeight - 3 * margin) / 2; // Tinggi grid untuk 2 undangan di bawah

  let xPos = margin; // Posisi horizontal pertama (kiri atas)
  let yPos = margin; // Posisi vertikal pertama (atas)

  for (const [index, content] of Array.from(contents).entries()) {
    // Casting elemen menjadi HTMLElement
    const element = content as HTMLElement;

    const canvas = await html2canvas(element, {
      scale: 2, // Tingkatkan kualitas
      useCORS: true, // Izinkan cross-origin
    });

    const imgData = canvas.toDataURL("image/png");
    const imgWidth = gridWidth; // Ukuran gambar sesuai dengan grid
    const imgHeight = (canvas.height * gridWidth) / canvas.width; // Sesuaikan tinggi gambar agar proporsional

    // Tambahkan gambar pada posisi yang ditentukan
    pdf.addImage(imgData, "PNG", xPos, yPos, imgWidth, imgHeight);

    // Tentukan posisi gambar berikutnya
    if ((index + 1) % 2 === 0) {
      // Jika sudah ada 2 gambar dalam satu baris, pindah ke baris berikutnya
      xPos = margin; // Kembali ke posisi kiri
      yPos += gridHeight + margin; // Turun ke baris berikutnya
    } else {
      // Jika masih dalam baris yang sama, pindah ke kolom berikutnya
      xPos += gridWidth + margin; // Pindah ke kolom berikutnya
    }

    // Tambahkan halaman baru jika perlu
    if ((index + 1) % 4 === 0 && index < contents.length - 1) {
      pdf.addPage();
      xPos = margin; // Reset posisi horizontal untuk halaman baru
      yPos = margin; // Reset posisi vertikal untuk halaman baru
    }
  }

  pdf.save("undangan.pdf");
};

const PreviewExport = () => {
  const searchParams = useSearchParams();
  const [namaList, setNamaList] = useState<{ nama: string }[]>([]);

  // Efek untuk memuat data dari nama.json saat halaman pertama kali dimuat
  useEffect(() => {
    const fetchNamaData = async () => {
      try {
        // Ambil data dari /data/nama.json yang ada di folder public
        const response = await fetch("/data/nama.json");
        const data = await response.json();
        setNamaList(data); // Update namaList dengan data dari nama.json
      } catch (error) {
        console.error("Error fetching nama.json:", error);
        setNamaList([]); // Jika gagal, set kosong
      }
    };

    fetchNamaData();
  }, []);

  const formData: FormData = {
    noSurat: searchParams.get("noSurat") || "",
    hari: searchParams.get("hari") || "",
    tanggal: searchParams.get("tanggal") || "",
    pukul: searchParams.get("pukul") || "",
    tempat: searchParams.get("tempat") || "",
    acara: searchParams.get("acara") || "",
    ttd: searchParams.get("ttd") || "",
    nb: searchParams.get("nb") || "",
  };

  const formatTanggal = (date: string) => {
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    const dateObj = new Date(date);
    const day = dateObj.getDate().toString().padStart(2, "0");
    const month = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();

    return `${day} ${month} ${year}`;
  };

  return (
    <div>
      <button
        onClick={handleExport}
        className="bg-blue-500 text-white p-2 rounded mb-4"
      >
        Export PDF
      </button>
      <div className="w-[210mm] h-full  bg-slate-200">
        <div className="w-full   grid grid-cols-2 gap-[4mm] p-1 ">
          {namaList.length > 0 ? (
            namaList.map((item, index) => (
              <div
                key={index}
                className=" pdf-content w-full h-[149mm] border border-black py-1   px-[2mm] box-border font-sans flex flex-col bg-white"
              >
                <table
                  className="w-full border-collapse text-xs table-fixed"
                  style={{
                    width: "100%",
                    tableLayout: "fixed",
                    borderSpacing: 0,
                  }}
                >
                  <tbody>
                    <tr>
                      <td
                        colSpan={2}
                        className="text-center text-sm font-bold pb-[2px]"
                      >
                        Pengurus <br />
                        HIMPUNAN MUDA DOMBAN (HMD) <br />
                        Domban Mororejo Tempel Sleman <br />
                        Masa Bakti Tahun 2025-2027
                      </td>
                    </tr>

                    <tr>
                      <td colSpan={2} className="text-center">
                        <hr className="border-t-4 border-black my-[6px]" />
                        <hr className="border-t-2 border-black my-[3px]" />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="text-left pb-[2px]">
                        No: {formData.noSurat} <br />
                        Hal: Undangan <br />
                        Kepada
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="pl-[10%] text-left pb-[1px]">
                        Yth. Bpk/Sdr/Sdri <br />
                        <strong>{item.nama}</strong>
                        <br />
                        Di Domban Mororejo Tempel
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="pl-[5%] text-left pb-[2px]">
                        <b>Assalamu’alaikum Wr. Wb</b>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2} className=" text-left pb-[3px]">
                        Bersama ini kami Pengurus Himpunan Muda Domban
                        <br />
                        (HMD) mengundang Bapak/Ibu/Saudara/i untuk hadir
                        <br />
                        dalam acara Insya Allah akan kami adakan pada :<br />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="pl-[20%] text-left pb-[1px]">
                        <div className="flex items-baseline">
                          <span className="mr-7">Hari</span>
                          <span className="mr-2">:</span>{" "}
                          {/* Menambahkan margin horizontal untuk memisahkan */}
                          <span>{formData.hari}</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="pl-[20%] text-left pb-[1px]">
                        <div className="flex items-baseline">
                          <span>Tanggal</span>
                          <span className="mx-2">:</span>{" "}
                          {/* Menambahkan margin horizontal untuk memisahkan */}
                          <span>
                            {formData.tanggal
                              ? formatTanggal(formData.tanggal)
                              : ""}
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="pl-[20%] text-left pb-[1px]">
                        <div className="flex items-baseline">
                          <span className="mr-3">Pukul</span>
                          <span className="mx-2">:</span>{" "}
                          {/* Menambahkan margin horizontal untuk memisahkan */}
                          <span>{formData.pukul}  </span>
                          <span className="mr-2"></span> WIB
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="pl-[20%] text-left pb-[1px]">
                        <div className="flex items-baseline">
                          <span className="mr-1">Tempat</span>
                          <span className="mx-2">:</span>{" "}
                          {/* Menambahkan margin horizontal untuk memisahkan */}
                          <span>{formData.tempat}</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="pl-[20%] text-left pb-[1px]">
                        <div className="flex items-baseline">
                          <span className="mr-3">Acara</span>
                          <span className="mx-2">:</span>{" "}
                          {/* Menambahkan margin horizontal untuk memisahkan */}
                          <span>{formData.acara}</span>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td colSpan={2} className="text-left pb-[2px]">
                        Atas perhatian dan kehadirannya kami ucapkan <br />
                        terima kasih.
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="text-left pl-[10%] py-[1px]">
                        <b>Wassalamu’alaikum Wr. Wb</b>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="text-right pb-[5px]">
                        Domban, {formData.ttd}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center ">Ketua Umum</td>
                      <td className="text-center ">Sekretaris</td>
                    </tr>
                    <tr>
                      <td className="text-center pl-[17%] ">
                        <Image
                          src="/assets/radit.png"
                          alt="Tanda Tangan Ketua"
                          width={60}
                          height={30}
                        />
                      </td>
                      <td className="text-center py-2 pl-[17%] w-[90%] h-[25%]">
                        <Image
                          src="/assets/via.png"
                          alt="Tanda Tangan Sekretaris"
                          width={60}
                          height={30}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">Raditya Ananta</td>
                      <td className="text-center">Dhini Widyaning Oktaviani</td>
                    </tr>
                    <tr>
                      <td
                        colSpan={2}
                        className="text-left   font-bold text-[10px] py-[1mm] "
                      >
                        {formData.nb}{" "}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))
          ) : (
            <p>Data undangan tidak ditemukan.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewExport;
