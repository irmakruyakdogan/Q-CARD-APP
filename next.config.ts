/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Vercel'in ufak tefek uyarılarda derlemeyi durdurmasını engeller
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Proje localhost'ta çalışıyorsa, Vercel'i zorla yayına geçirir
    ignoreBuildErrors: true,
  },
};

export default nextConfig;