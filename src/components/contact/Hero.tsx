import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-[450px]">
      <Image
        src="/images/gallery/gordenn2.jpg"
        alt="Darsiti Gorden"
        fill
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
        <div className="text-center text-white">

          <h1 className="text-5xl font-bold">
            Contact
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-200">
            Tim <span className="font-semibold text-amber-300">Darsiti Gorden</span> siap membantu Anda untuk
            konsultasi, survey lokasi, pengukuran, pemilihan bahan,
            hingga pemasangan gorden berkualitas.
          </p>

        </div>
      </div>
    </section>
  );
}