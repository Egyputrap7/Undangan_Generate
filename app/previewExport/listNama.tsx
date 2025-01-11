"use client";
import { useEffect, useState } from "react";

// Definisikan tipe untuk props
interface NamaListProps {
  namaList: { nama: string }[]; // Daftar nama untuk undangan
}

const NamaList: React.FC<NamaListProps> = () => {
  const [namaList, setNamaList] = useState<{ nama: string }[]>([]);

  useEffect(() => {
    const fetchNamaData = async () => {
      try {
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

  return (
    <tbody>
      {namaList.length > 0 ? (
        namaList.map((item, index) => (
          <tr key={index}>
            <td
              colSpan={2}
              style={{
                fontSize: "10.5px",
                textAlign: "left",
                paddingLeft: "15%",
              }}
            >
              {item.nama}
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan={2}
            style={{
              fontSize: "10.5px",
              textAlign: "left",
              paddingLeft: "15%",
            }}
          >
            Tamu
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default NamaList;
