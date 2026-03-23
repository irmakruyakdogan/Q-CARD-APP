"use client";

import { useMemo, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  BriefcaseBusiness,
  Building2,
  Check,
  Flower2,
  Globe,
  Mail,
  Palette,
  Phone,
  Sparkles,
  User,
  UserRound,
} from "lucide-react";

type CardData = {
  firstName: string;
  lastName: string;
  title: string;
  company: string;
  phone: string;
  email: string;
  website: string;
};

const inputBaseClass =
  "w-full rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 pl-11 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100";

const labelClass = "mb-2 block text-sm font-medium text-slate-700";

const themes = [
  {
    id: "neon",
    name: "Neon",
    cardClass: "bg-gradient-to-br from-indigo-600 via-violet-600 to-cyan-500",
  },
  {
    id: "sunset",
    name: "Sunset",
    cardClass: "bg-gradient-to-br from-orange-500 via-rose-500 to-fuchsia-600",
  },
  {
    id: "forest",
    name: "Forest",
    cardClass: "bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700",
  },
] as const;

const pageThemes = [
  {
    id: "aurora",
    name: "Spring Nude",
    pageBg: "bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50",
    panelClass: "bg-white/85 border-rose-100",
    tagClass: "border-rose-200 bg-rose-50 text-rose-700",
  },
  {
    id: "midnight",
    name: "Midnight",
    pageBg: "bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900",
    panelClass: "border-slate-700/60 bg-slate-900/70",
    tagClass: "border-slate-600 bg-slate-800 text-indigo-200",
  },
  {
    id: "rose",
    name: "Mint Garden",
    pageBg: "bg-gradient-to-br from-emerald-50 via-lime-100 to-teal-100",
    panelClass: "border-emerald-100 bg-white/85",
    tagClass: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
] as const;

const themeDecor = {
  aurora: {
    leftEmoji: "🌸",
    rightEmoji: "🫧",
    badge: "Spring Nude Mood",
    blobA: "bg-pink-300/40",
    blobB: "bg-rose-200/40",
  },
  midnight: {
    leftEmoji: "🌙",
    rightEmoji: "💫",
    badge: "Night Spark Mode",
    blobA: "bg-indigo-500/30",
    blobB: "bg-sky-400/20",
  },
  rose: {
    leftEmoji: "🍀",
    rightEmoji: "🌿",
    badge: "Mint Garden Energy",
    blobA: "bg-emerald-300/40",
    blobB: "bg-lime-300/35",
  },
} as const;

const sakuraPieces = [
  { left: "4%", delay: "0s", duration: "10.5s", size: "18px" },
  { left: "10%", delay: "1.2s", duration: "12.5s", size: "20px" },
  { left: "16%", delay: "2.8s", duration: "9.8s", size: "16px" },
  { left: "23%", delay: "0.7s", duration: "11.2s", size: "22px" },
  { left: "29%", delay: "3.4s", duration: "13.4s", size: "17px" },
  { left: "36%", delay: "1.8s", duration: "10.1s", size: "19px" },
  { left: "43%", delay: "4.1s", duration: "12.7s", size: "21px" },
  { left: "50%", delay: "2.2s", duration: "11.7s", size: "18px" },
  { left: "57%", delay: "5.2s", duration: "13.8s", size: "20px" },
  { left: "63%", delay: "0.4s", duration: "9.9s", size: "16px" },
  { left: "70%", delay: "2.6s", duration: "11.3s", size: "21px" },
  { left: "77%", delay: "4.7s", duration: "12.9s", size: "18px" },
  { left: "83%", delay: "1s", duration: "10.6s", size: "17px" },
  { left: "89%", delay: "3.1s", duration: "13.1s", size: "20px" },
  { left: "95%", delay: "2s", duration: "10.9s", size: "19px" },
] as const;

const sparklePieces = [
  { top: "8%", left: "12%", delay: "0.2s" },
  { top: "18%", left: "76%", delay: "0.8s" },
  { top: "31%", left: "58%", delay: "1.4s" },
  { top: "42%", left: "21%", delay: "2s" },
  { top: "61%", left: "84%", delay: "2.6s" },
  { top: "73%", left: "47%", delay: "3.2s" },
  { top: "86%", left: "9%", delay: "3.8s" },
] as const;

export default function Page() {
  const [formData, setFormData] = useState<CardData>({
    firstName: "",
    lastName: "",
    title: "",
    company: "",
    phone: "",
    email: "",
    website: "",
  });
  const [selectedTheme, setSelectedTheme] =
    useState<(typeof themes)[number]["id"]>("neon");
  const [selectedPageTheme, setSelectedPageTheme] =
    useState<(typeof pageThemes)[number]["id"]>("aurora");
  const [springMode, setSpringMode] = useState(true);

  const handleChange =
    (key: keyof CardData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [key]: event.target.value }));
    };

  const fullName = `${formData.firstName} ${formData.lastName}`.trim();
  const initials = `${formData.firstName?.[0] || ""}${formData.lastName?.[0] || ""}`.toUpperCase();
  const selectedThemeData = themes.find((theme) => theme.id === selectedTheme) ?? themes[0];
  const selectedPageThemeData =
    pageThemes.find((theme) => theme.id === selectedPageTheme) ?? pageThemes[0];
  const decorData = themeDecor[selectedPageTheme];
  const filledCount = Object.values(formData).filter((value) => value.trim().length > 0).length;
  const completionRate = Math.round((filledCount / Object.keys(formData).length) * 100);
  const vibeText =
    completionRate >= 100
      ? "Super! Kartin parti modunda hazir."
      : completionRate >= 70
      ? "Harika gidiyor, biraz daha ve tamam!"
      : completionRate >= 35
      ? "Enerji yukseliyor, devam et!"
      : "Baslayalim! Kartini cicek gibi acalim.";

  const fillWithDemoData = () => {
    setFormData({
      firstName: "Irmak",
      lastName: "Akdogan",
      title: "AI Product Designer",
      company: "Future Talent AI",
      phone: "+90 532 123 45 67",
      email: "irmak@example.com",
      website: "https://futuretalentai.com",
    });
  };

  const qrPayload = useMemo(() => {
    const payload = {
      ad: formData.firstName || "-",
      soyad: formData.lastName || "-",
      unvan: formData.title || "-",
      sirket: formData.company || "-",
      telefon: formData.phone || "-",
      email: formData.email || "-",
      website: formData.website || "-",
    };

    return JSON.stringify(payload, null, 2);
  }, [formData]);

  return (
    <main className={`relative min-h-screen overflow-hidden px-6 py-10 ${selectedPageThemeData.pageBg}`}>
      <div
        className={`pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full blur-3xl ${decorData.blobA}`}
      />
      <div
        className={`pointer-events-none absolute -right-24 bottom-16 h-80 w-80 rounded-full blur-3xl ${decorData.blobB}`}
      />
      <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-white/60 px-4 py-2 text-xs font-bold text-slate-700 shadow-md">
        {decorData.badge}
      </div>
      <div className="pointer-events-none absolute left-3 top-1/3 text-6xl opacity-60 md:text-7xl">
        {decorData.leftEmoji}
      </div>
      <div className="pointer-events-none absolute bottom-10 right-4 text-6xl opacity-60 md:text-7xl">
        {decorData.rightEmoji}
      </div>
      {springMode ? (
        <div className="pointer-events-none absolute inset-0">
          {sakuraPieces.map((piece, index) => (
            <span
              key={`${piece.left}-${index}`}
              className="sakura-petal absolute opacity-80"
              style={{
                left: piece.left,
                top: "-12%",
                fontSize: piece.size,
                animationDelay: piece.delay,
                animationDuration: piece.duration,
              }}
            >
              🌸
            </span>
          ))}
          {sparklePieces.map((piece, index) => (
            <span
              key={`${piece.top}-${piece.left}-${index}`}
              className="absolute text-sm opacity-70 animate-pulse"
              style={{ top: piece.top, left: piece.left, animationDelay: piece.delay }}
            >
              ✨
            </span>
          ))}
        </div>
      ) : null}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-2">
        <section className={`rounded-2xl border p-6 shadow-xl backdrop-blur md:p-8 ${selectedPageThemeData.panelClass}`}>
          <h1 className="text-2xl font-bold text-slate-800 md:text-3xl dark:text-white">
            Dijital Kartvizit Olusturucu
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Bilgilerini gir, kartin ve QR kodun aninda olussun.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={fillWithDemoData}
              className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700"
            >
              <Sparkles className="h-4 w-4" />
              Ornek veriyi tek tikla doldur
            </button>
            <p className={`rounded-full border px-3 py-1 text-xs font-medium ${selectedPageThemeData.tagClass}`}>
              Profil doluluk: %{completionRate}
            </p>
            <button
              type="button"
              onClick={() => setSpringMode((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
            >
              <Flower2 className="h-3.5 w-3.5" />
              {springMode ? "Bahar modunu kapat" : "Bahar modunu ac"}
            </button>
          </div>
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-300">
            Bahar modu acikken arka planda kiraz cicekleri belirir.
          </p>
          <p className="mt-2 text-sm font-semibold text-rose-600 dark:text-rose-300">{vibeText}</p>
          <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-white/60">
            <div
              className="h-full rounded-full bg-gradient-to-r from-pink-400 via-fuchsia-500 to-violet-500 transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />
          </div>

          <div className="mt-5">
            <p className={labelClass}>Sayfa Temasi</p>
            <div className="flex flex-wrap gap-2">
              {pageThemes.map((theme) => {
                const isActive = selectedPageTheme === theme.id;
                return (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => setSelectedPageTheme(theme.id)}
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition ${
                      isActive
                        ? "border-indigo-300 bg-indigo-50 text-indigo-700"
                        : "border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:text-indigo-600"
                    }`}
                  >
                    <Palette className="h-3.5 w-3.5" />
                    {theme.name}
                    {isActive ? <Check className="h-3.5 w-3.5" /> : null}
                  </button>
                );
              })}
            </div>
          </div>

          <form className="mt-8 space-y-5">
            <div>
              <label htmlFor="firstName" className={labelClass}>
                Ad
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange("firstName")}
                  placeholder="Ornek: Irmak"
                  className={inputBaseClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="lastName" className={labelClass}>
                Soyad
              </label>
              <div className="relative">
                <UserRound className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange("lastName")}
                  placeholder="Ornek: Akdogan"
                  className={inputBaseClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="title" className={labelClass}>
                Unvan
              </label>
              <div className="relative">
                <BriefcaseBusiness className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange("title")}
                  placeholder="Ornek: Yazilim Gelistirici"
                  className={inputBaseClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="company" className={labelClass}>
                Sirket
              </label>
              <div className="relative">
                <Building2 className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  id="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange("company")}
                  placeholder="Ornek: Future Talent AI"
                  className={inputBaseClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className={labelClass}>
                Telefon
              </label>
              <div className="relative">
                <Phone className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange("phone")}
                  placeholder="+90 5xx xxx xx xx"
                  className={inputBaseClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>
                E-posta
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange("email")}
                  placeholder="ornek@mail.com"
                  className={inputBaseClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="website" className={labelClass}>
                Web Sitesi
              </label>
              <div className="relative">
                <Globe className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={handleChange("website")}
                  placeholder="https://siteniz.com"
                  className={inputBaseClass}
                />
              </div>
            </div>

            <div>
              <p className={labelClass}>Kart Temasi</p>
              <div className="flex flex-wrap gap-2">
                {themes.map((theme) => {
                  const isActive = theme.id === selectedTheme;
                  return (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => setSelectedTheme(theme.id)}
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition ${
                        isActive
                          ? "border-indigo-300 bg-indigo-50 text-indigo-700"
                          : "border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:text-indigo-600"
                      }`}
                    >
                      <Palette className="h-3.5 w-3.5" />
                      {theme.name}
                      {isActive ? <Check className="h-3.5 w-3.5" /> : null}
                    </button>
                  );
                })}
              </div>
            </div>
          </form>
        </section>

        <section className={`rounded-2xl border p-6 shadow-xl backdrop-blur md:p-8 ${selectedPageThemeData.panelClass}`}>
          <h2 className="text-xl font-bold text-slate-800 md:text-2xl dark:text-white">
            Canli Onizleme
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Mobil ekran gorunumunde kartvizitin.
          </p>

          <div className="mt-8 flex flex-col items-center gap-6">
            <div className="w-full max-w-sm rounded-[2.25rem] border border-slate-200 bg-slate-900 p-4 shadow-xl">
              <div className={`rounded-[1.8rem] p-6 text-white ${selectedThemeData.cardClass}`}>
                <div className="mb-6 flex items-center justify-between">
                  <div className="h-1.5 w-16 rounded-full bg-white/40" />
                  <span className="rounded-full bg-white/20 px-2 py-1 text-[10px] font-semibold tracking-wide">
                    PREMIUM
                  </span>
                </div>
                <div className="mb-5 flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-full border border-white/40 bg-white/15 text-sm font-bold">
                    {initials || "AA"}
                  </div>
                  <div>
                    <p className="text-xs text-white/80">Dijital Kartvizit</p>
                    <p className="text-sm font-medium text-white/95">{formData.company || "Sirket"}</p>
                  </div>
                </div>
                <p className="text-2xl font-semibold leading-tight">
                  {fullName || "Ad Soyad"}
                </p>
                <p className="mt-2 text-sm text-white/90">
                  {formData.title || "Unvan"}
                </p>

                <div className="mt-8 space-y-2 text-sm text-white/95">
                  <p>{formData.phone || "+90 ... ... .. .."}</p>
                  <p>{formData.email || "eposta@ornek.com"}</p>
                  <p>{formData.website || "www.ornek.com"}</p>
                </div>
              </div>
            </div>

            <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-lg">
              <p className="mb-4 text-sm font-medium text-slate-600">QR Kod</p>
              <div className="mx-auto inline-flex rounded-2xl bg-slate-50 p-4">
                <QRCodeSVG value={qrPayload} size={180} bgColor="#f8fafc" fgColor="#0f172a" />
              </div>
              <p className="mt-4 text-xs text-slate-500">
                QR kod, girdigin tum kartvizit bilgilerini icerir.
              </p>
              <p className="mt-2 text-xs font-medium text-indigo-600 dark:text-indigo-300">
                Tema: {selectedThemeData.name} | Sayfa: {selectedPageThemeData.name} | Doluluk: %{completionRate}
              </p>
            </div>
          </div>
        </section>
      </div>
      <style jsx global>{`
        @keyframes sakuraFall {
          0% {
            transform: translate3d(0, -10vh, 0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.95;
          }
          50% {
            transform: translate3d(30px, 52vh, 0) rotate(130deg);
            opacity: 0.9;
          }
          100% {
            transform: translate3d(-28px, 110vh, 0) rotate(280deg);
            opacity: 0;
          }
        }

        .sakura-petal {
          animation-name: sakuraFall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform, opacity;
        }
      `}</style>
    </main>
  );
}
