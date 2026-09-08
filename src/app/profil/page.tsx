"use client";

import { useState, useEffect } from "react";
import {
  Building2,
  Target,
  MapPin,
  Compass,
  History,
  Network,
  Users,
  Layers,
  Landmark,
  ArrowRight,
  ZoomIn,
  Download,
  X,
  ImageIcon,
  ShieldCheck,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import VillageMap from "@/components/VillageMap";
import { fetchProfilDesa, defaultProfilDesa, defaultSejarahDesa, defaultBatasWilayah } from "@/services/profilService";
import { ProfilDesaData } from "@/types/profil";

export default function ProfilPage() {
  const [profilData, setProfilData] = useState<ProfilDesaData>(defaultProfilDesa);
  const [activeTab, setActiveTab] = useState<"semua" | "visi-misi" | "bagan" | "sejarah" | "geografis">("semua");
  const [zoomImage, setZoomImage] = useState<{ src: string; title: string } | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const profil = await fetchProfilDesa();
        if (profil) setProfilData(profil);
      } catch (err) {
        console.error("Error loading profil data:", err);
      }
    }
    loadData();
  }, []);

  const batas = profilData.batas_wilayah || defaultBatasWilayah;

  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-28 pt-6 sm:pt-8 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        
        {/* 1. Header Banner Profil Desa */}
        <div className="bg-[#073623] rounded-3xl p-6 sm:p-8 lg:p-10 text-white shadow-sm relative overflow-hidden">
          <div className="relative z-10 space-y-3 sm:space-y-4 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                href="/"
                className="inline-flex items-center space-x-1.5 bg-white/10 hover:bg-white/20 text-emerald-100 hover:text-white px-3 py-1 rounded-full text-xs font-semibold transition border border-white/10 active:scale-95"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Kembali ke Beranda</span>
              </Link>
              <div className="inline-flex items-center space-x-2 bg-emerald-800/80 border border-emerald-500/40 text-emerald-100 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>Profil Pemerintahan Desa</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Profil Desa Balerejo
            </h1>
            <p className="text-emerald-100/85 text-xs sm:text-sm lg:text-base leading-relaxed">
              Informasi lengkap mengenai visi dan misi pembangunan, bagan struktur organisasi tata kelola desa, asal-usul sejarah, serta peta kondisi geografis Desa Balerejo, Kec. Kawedanan, Kab. Magetan.
            </p>
          </div>
        </div>

        {/* Quick Navigation Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {[
            { id: "semua", label: "Semua Bagian", icon: null },
            { id: "visi-misi", label: "Visi & Misi", icon: Target },
            { id: "bagan", label: "Bagan SOTK & BPD", icon: Network },
            { id: "sejarah", label: "Sejarah Desa", icon: History },
            { id: "geografis", label: "Peta & Geografis", icon: Compass },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow-sm whitespace-nowrap active:scale-95 ${
                  isActive
                    ? "bg-[#063321] text-white"
                    : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200/80"
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 2. SECTION: VISI & MISI DESA */}
        {(activeTab === "semua" || activeTab === "visi-misi") && (
          <section id="visi-misi" className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm border border-slate-200/80 space-y-6">
              <div className="flex items-center space-x-3 text-emerald-900 border-b border-slate-100 pb-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold flex-shrink-0 border border-emerald-100">
                  <Target className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">Visi & Misi Pembangunan</h2>
                  <p className="text-xs text-slate-500">Arah dan landasan strategis penyelenggaraan pemerintahan Desa Balerejo</p>
                </div>
              </div>

              {/* Visi */}
              <div className="bg-emerald-50/60 p-5 sm:p-7 rounded-2xl border border-emerald-100 space-y-2">
                <span className="inline-flex items-center space-x-1.5 text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-100/90 px-2.5 py-0.5 rounded-full">
                  <Landmark className="w-3 h-3 text-emerald-700 flex-shrink-0" />
                  <span>Visi Utama Desa</span>
                </span>
                <p className="text-sm sm:text-lg font-semibold text-[#063321] italic leading-relaxed pt-1">
                  &ldquo;{profilData.visi || defaultProfilDesa.visi}&rdquo;
                </p>
              </div>

              {/* Misi */}
              <div className="space-y-3">
                <h3 className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider">
                  Misi Pembangunan Desa
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {(profilData.misi && profilData.misi.length > 0 ? profilData.misi : defaultProfilDesa.misi).map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-3.5 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/80 hover:border-emerald-300 transition">
                      <div className="w-7 h-7 rounded-xl bg-emerald-800 text-white flex items-center justify-center flex-shrink-0 font-bold text-xs shadow-sm mt-0.5">
                        {idx + 1}
                      </div>
                      <span className="text-xs sm:text-sm text-slate-700 font-normal leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 3. SECTION: BAGAN DESA & STRUKTUR ORGANISASI (BPD & PEMERINTAHAN) */}
        {(activeTab === "semua" || activeTab === "bagan") && (
          <section id="bagan" className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm border border-slate-200/80 space-y-6 sm:space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="flex items-center space-x-3 text-[#004329]">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold flex-shrink-0">
                    <Network className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Bagan Desa</h2>
                    <p className="text-xs text-slate-500">Struktur Organisasi Pemerintahan Desa & Badan Permusyawaratan Desa</p>
                  </div>
                </div>

                <Link
                  href="/pemerintah"
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-xl transition border border-emerald-200 self-start sm:self-auto active:scale-95"
                >
                  <span>Daftar Aparatur Lengkap</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Grid 2 Bagan: Pemerintah Desa & BPD */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                
                {/* 1. Bagan Struktur Organisasi Pemerintahan Desa */}
                <div className="bg-slate-50/70 rounded-3xl p-5 sm:p-6 border border-slate-200/80 space-y-4 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/90 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Eksekutif Desa
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      Struktur Organisasi Pemerintahan Desa
                    </h3>
                    <p className="text-xs text-slate-500">
                      Susunan Kepala Desa, Sekretaris Desa, Kepala Seksi (Kasi), Kepala Urusan (Kaur), dan Kepala Dusun (Kasun).
                    </p>
                  </div>

                  {profilData.bagan_desa_image ? (
                    <div className="space-y-2">
                      <div
                        onClick={() => setZoomImage({ src: profilData.bagan_desa_image!, title: "Struktur Organisasi Pemerintahan Desa Balerejo" })}
                        className="group relative block w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 cursor-zoom-in"
                      >
                        <ImageWithSkeleton
                          src={profilData.bagan_desa_image!}
                          alt="Bagan Struktur Organisasi Desa Balerejo"
                          className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2 text-white text-xs font-semibold backdrop-blur-[2px]">
                          <ZoomIn className="w-4 h-4" />
                          <span>Klik Perbesar</span>
                        </div>
                      </div>
                      <div className="mt-3 text-center">
                        <span className="text-xs font-bold text-slate-800">Bagan Struktur Desa Balerejo</span>
                        <p className="text-[11px] text-slate-500 mt-0.5">Hierarki Kepala Desa, Sekretaris Desa, Kepala Urusan & Seksi</p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-2">
                      <p className="text-xs font-semibold text-slate-600">Bagan Struktur Desa Belum Diunggah</p>
                      <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                        Aparatur desa dapat mengunggah file gambar bagan SOTK resmi melalui Dashboard Admin.
                      </p>
                      <div className="inline-flex items-center space-x-2 text-[11px] font-medium text-emerald-800 bg-emerald-100/60 px-3 py-1 rounded-full mt-2">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Kepala Desa Balerejo (Pimpinan Eksekutif)</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Bagan Struktur Organisasi Badan Permusyawaratan Desa (BPD) */}
                <div className="bg-slate-50/70 rounded-3xl p-5 sm:p-6 border border-slate-200/80 space-y-4 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-emerald-900 bg-emerald-100/90 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Legislatif Desa
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      Struktur Organisasi Badan Permusyawaratan Desa
                    </h3>
                    <p className="text-xs text-slate-500">
                      Susunan Ketua BPD, Wakil Ketua, Sekretaris, dan Anggota Bidang Permusyawaratan Desa Balerejo.
                    </p>
                  </div>

                  {profilData?.bagan_bpd_image ? (
                    <div>
                      <button
                        onClick={() => setZoomImage({ src: profilData.bagan_bpd_image!, title: "Struktur Organisasi BPD Desa Balerejo" })}
                        className="group relative block w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 cursor-zoom-in"
                      >
                        <ImageWithSkeleton
                          src={profilData.bagan_bpd_image!}
                          alt="Bagan Struktur Organisasi BPD Desa Balerejo"
                          className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2 text-white text-xs font-semibold backdrop-blur-[2px]">
                          <ZoomIn className="w-4 h-4" />
                          <span>Klik Perbesar</span>
                        </div>
                      </button>
                      <div className="mt-3 text-center">
                        <span className="text-xs font-bold text-slate-800">Bagan Kelembagaan BPD Balerejo</span>
                      </div>
                      <p className="text-[10px] text-slate-400 text-center">Klik gambar bagan di atas untuk melihat resolusi penuh</p>
                    </div>
                  ) : (
                    <div className="space-y-2 bg-white p-4 rounded-2xl border border-slate-200/80">
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        <li className="flex items-center space-x-2 bg-emerald-50 p-2.5 rounded-xl font-bold text-emerald-950 border border-emerald-200/80">
                          <Users className="w-4 h-4 text-emerald-700" />
                          <span>Ketua Badan Permusyawaratan Desa (BPD)</span>
                        </li>
                        <li className="flex items-center space-x-2 bg-slate-50 p-2.5 rounded-xl font-semibold text-slate-800">
                          <span className="w-2 h-2 rounded-full bg-emerald-600" />
                          <span>Wakil Ketua BPD</span>
                        </li>
                        <li className="flex items-center space-x-2 bg-slate-50 p-2.5 rounded-xl font-medium text-slate-700">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span>Sekretaris BPD</span>
                        </li>
                        <li className="flex items-center space-x-2 bg-slate-50 p-2.5 rounded-xl font-medium text-slate-700">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span>Bidang Penyelenggaraan Pemerintahan & Pembinaan</span>
                        </li>
                        <li className="flex items-center space-x-2 bg-slate-50 p-2.5 rounded-xl font-medium text-slate-700">
                          <span className="w-2 h-2 rounded-full bg-slate-400" />
                          <span>Bidang Pembangunan & Pemberdayaan Masyarakat</span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </section>
        )}

        {/* 4. SECTION: SEJARAH DESA */}
        {(activeTab === "sejarah" || activeTab === "semua") && (
          <section id="sejarah" className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm border border-slate-200/80 space-y-6">
              <div className="flex items-center space-x-3 text-emerald-900 border-b border-slate-100 pb-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold flex-shrink-0 border border-emerald-100">
                  <History className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">Sejarah Desa Balerejo</h2>
                  <p className="text-xs text-slate-500">Asal-usul, nilai kearifan lokal, dan perjalanan sejarah masyarakat desa</p>
                </div>
              </div>

              <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-600 leading-relaxed space-y-4 whitespace-pre-line bg-slate-50/60 p-5 sm:p-7 rounded-2xl border border-slate-200/80">
                {profilData.sejarah || defaultSejarahDesa}
              </div>
            </div>
          </section>
        )}

        {/* 5. SECTION: GEOGRAFIS & PETA LOKASI */}
        {(activeTab === "geografis" || activeTab === "semua") && (
          <section id="geografis" className="scroll-mt-36 animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
              
              <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100/70 text-[#004329] flex items-center justify-center shadow-sm">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">Kondisi Geografis & Batas Administratif</h2>
                  <p className="text-xs text-slate-500">Kondisi fisik, luas wilayah, dan tapal batas administratif Desa Balerejo, Kec. Kawedanan, Kab. Magetan</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
                <div className="lg:col-span-7">
                  <VillageMap />
                </div>

                <div className="lg:col-span-5 space-y-6">
                  {/* Geographic stats summary pills */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                      <span className="text-[10px] sm:text-xs font-medium text-slate-500 uppercase tracking-wide block">Luas Wilayah</span>
                      <span className="text-base sm:text-lg font-extrabold text-slate-900">{profilData.luas_wilayah || "245 Ha"}</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                      <span className="text-[10px] sm:text-xs font-medium text-slate-500 uppercase tracking-wide block">Jumlah Penduduk</span>
                      <span className="text-base sm:text-lg font-extrabold text-[#004329]">{profilData.jumlah_penduduk || "3.620 Jiwa"}</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                      <span className="text-[10px] sm:text-xs font-medium text-slate-500 uppercase tracking-wide block">Ketinggian Tempat</span>
                      <span className="text-base sm:text-lg font-extrabold text-slate-900">{profilData.ketinggian || "± 78 mdpl"}</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                      <span className="text-[10px] sm:text-xs font-medium text-slate-500 uppercase tracking-wide block">Topografi</span>
                      <span className="text-base sm:text-lg font-extrabold text-slate-900">Dataran Rendah</span>
                    </div>
                  </div>

                  {/* Boundary Directions Cards */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-xs font-bold text-slate-700">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      <span>Batas-Batas Wilayah Desa Balerejo</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-xs flex-shrink-0">U</div>
                        <div>
                          <span className="text-[11px] font-semibold text-slate-400 block">Batas Utara</span>
                          <span className="text-xs sm:text-sm font-bold text-slate-800">{batas.utara}</span>
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-xs flex-shrink-0">T</div>
                        <div>
                          <span className="text-[11px] font-semibold text-slate-400 block">Batas Timur</span>
                          <span className="text-xs sm:text-sm font-bold text-slate-800">{batas.timur}</span>
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-xs flex-shrink-0">S</div>
                        <div>
                          <span className="text-[11px] font-semibold text-slate-400 block">Batas Selatan</span>
                          <span className="text-xs sm:text-sm font-bold text-slate-800">{batas.selatan}</span>
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-xs flex-shrink-0">B</div>
                        <div>
                          <span className="text-[11px] font-semibold text-slate-400 block">Batas Barat</span>
                          <span className="text-xs sm:text-sm font-bold text-slate-800">{batas.barat}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Geographic notes banner */}
                  <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-start space-x-3">
                    <Info className="w-4 h-4 text-emerald-800 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-emerald-950 leading-relaxed">
                      Desa Balerejo didominasi oleh lahan persawahan subur, perkebunan palawija, dan pemukiman warga yang asri di kawasan lereng timur Kabupaten Magetan.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

      </div>

      {/* LIGHTBOX MODAL UNTUK ZOOM FOTO BAGAN DESA */}
      {zoomImage && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm p-4 sm:p-8 flex items-center justify-center animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-5xl w-full p-4 sm:p-6 shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <div className="flex items-center space-x-2">
                <Network className="w-5 h-5 text-emerald-700" />
                <h3 className="text-sm sm:text-base font-bold text-slate-900">{zoomImage.title}</h3>
              </div>
              <div className="flex items-center space-x-2">
                <a
                  href={zoomImage.src}
                  download="Bagan_Desa_Balerejo.png"
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-3 py-1.5 rounded-xl transition flex items-center space-x-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh Foto</span>
                </a>
                <button
                  onClick={() => setZoomImage(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="overflow-auto flex-grow flex items-center justify-center bg-slate-50 rounded-2xl p-2">
              <img
                src={zoomImage.src}
                alt={zoomImage.title}
                className="max-h-[70vh] w-auto object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}

    </main>
  );
}