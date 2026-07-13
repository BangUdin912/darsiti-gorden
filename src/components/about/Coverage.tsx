import Image from "next/image";
import {
  House,
  Building2,
  Hotel,
  School,
  Store,
  Church,
  Landmark,
  Building,
  CheckCircle2,
} from "lucide-react";

const services = [
  {
    icon: House,
    title: "Rumah",
  },
  {
    icon: Building2,
    title: "Kantor",
  },

  {
    icon: Church,
    title: "Masjid",
  },
  {
    icon: School,
    title: "Sekolah",
  },

];

export default function Coverage() {
  return (
    <section className="bg-muted/30 py-24">
      <div className="container mx-auto px-4">

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Left */}
          <div>

            <span className="inline-flex rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-700">
              Area Layanan
            </span>

            <h2 className="mt-5 text-4xl font-bold leading-tight md:text-5xl">
              Kami Melayani Berbagai
              <span className="text-[#D4AF37]"> Jenis Bangunan</span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Darsiti Gorden melayani kebutuhan pemasangan gorden untuk
              hunian pribadi maupun proyek komersial. Tim kami siap membantu
              mulai dari konsultasi, pengukuran, produksi, hingga pemasangan
              dengan hasil yang rapi dan profesional.
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">

              {services.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex items-center gap-4 rounded-2xl border bg-background p-5 transition-all duration-300 hover:border-[#D4AF37] hover:shadow-lg"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4AF37]/10">
                      <Icon className="h-6 w-6 text-[#D4AF37]" />
                    </div>

                    <div>

                      <h3 className="font-semibold">
                        {item.title}
                      </h3>

                      <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        Siap melayani
                      </div>

                    </div>
                  </div>
                );
              })}

            </div>

          </div>

          {/* Right */}

          <div className="relative">

            <Image
              src="/images/gallery/gordenn21.jpg"
              alt="Pemasangan Gorden Darsiti Gorden"
              width={700}
              height={800}
              className="rounded-3xl object-cover shadow-2xl"
            />

            {/* Floating Card */}

            <div className="absolute bottom-8 left-8 rounded-2xl bg-white p-6 shadow-xl">

              <p className="text-4xl font-bold text-[#D4AF37]">
                500+
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                Proyek pemasangan telah diselesaikan
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}