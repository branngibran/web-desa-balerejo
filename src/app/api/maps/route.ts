import { NextResponse } from "next/server";

export async function GET() {
  const mapData = {
    villageName: "Desa Balerejo",
    subDistrict: "Kecamatan Kawedanan",
    district: "Kabupaten Magetan",
    province: "Jawa Timur",
    country: "Indonesia",
    postalCode: "63382",
    address: "Jl. Raya Balerejo, Desa Balerejo, Kec. Kawedanan, Kab. Magetan, Jawa Timur 63382",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Kantor+Desa+Balerejo+Kawedanan+Magetan",
    embedUrl: "https://maps.google.com/maps?q=Kantor+Desa+Balerejo+Kawedanan+Magetan&t=&z=16&ie=UTF8&iwloc=&output=embed",
  };

  return NextResponse.json({
    success: true,
    data: mapData,
  });
}
