import {
  Home,
  Trophy,
  Scissors,
  Star,
  WashingMachine,
  BadgeCheck,
} from "lucide-react";

const features = [
  "Konsultasi Gratis",
  "Survey Lokasi",
  "Bahan Premium",
  "Pemasangan Profesional",
  "Laundry Gorden",
];

const stats = [
  {
    icon: Home,
    value: "500+",
    title: "Pemasangan",
    desc: "Proyek rumah, kantor, hotel & masjid",
  },
  {
    icon: Trophy,
    value: "10+",
    title: "Tahun Pengalaman",
    desc: "Berpengalaman dalam bidang gorden custom",
  },
  {
    icon: Scissors,
    value: "25+",
    title: "Pilihan Bahan",
    desc: "Blackout, vitrase, blind & lainnya",
  },
  {
    icon: WashingMachine,
    value: "Laundry",
    title: "Cuci Gorden",
    desc: "Lepas • Cuci • Pasang Kembali",
  },
];

export default function BrandTrust() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">

        <div className="relative overflow-hidden rounded-[48px] bg-[#7A5A43] px-10 py-16 lg:px-16">

          {/* Background Decoration */}
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#8F6A4E] opacity-40"></div>
          <div className="absolute -left-20 bottom-0 h-48 w-48 rounded-full bg-[#8F6A4E] opacity-20"></div>

          <div className="relative grid gap-12 lg:grid-cols-2">

            {/* LEFT */}
            <div>

              <span className="inline-flex rounded-full bg-[#9B724F] px-5 py-2 text-sm font-semibold text-amber-200">
                ⭐ Dipercaya Pelanggan Purwokerto & Sekitarnya
              </span>

<h2 className="mt-8 text-4xl font-bold leading-tight lg:text-6xl">
  <span className="text-white">
    Darsiti Gorden Telah Membantu Ratusan Pelanggan
  </span>{" "}
  <span className="text-[#FFD54F]">
    Mendapatkan Gorden yang Tepat
  </span>
</h2>

              <p className="mt-8 max-w-xl text-lg leading-8 text-stone-100">
                Dari rumah tinggal, kantor, hotel, hingga masjid.
                Kami menghadirkan solusi gorden yang tidak hanya
                mempercantik ruangan tetapi juga memberikan kenyamanan
                dan privasi yang maksimal.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">

                {features.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-4 backdrop-blur"
                  >
                    <BadgeCheck
                      className="text-green-300"
                      size={20}
                    />

                    <span className="font-semibold text-white">
                      {item}
                    </span>
                  </div>
                ))}

              </div>

            </div>

            {/* RIGHT */}

            <div className="grid gap-6 md:grid-cols-2">

              {stats.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-[32px] bg-white p-8 text-center shadow-xl transition duration-300 hover:-translate-y-2"
                  >

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-500">
                      <Icon size={30} />
                    </div>

                    <h3 className="mt-6 text-5xl font-bold text-amber-500">
                      {item.value}
                    </h3>

                    <h4 className="mt-3 text-2xl font-bold text-stone-800">
                      {item.title}
                    </h4>

                    <p className="mt-3 text-sm leading-7 text-stone-500">
                      {item.desc}
                    </p>

                  </div>
                );
              })}

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}