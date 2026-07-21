"use client";

import Link from "next/link";
import {
  Mail,
  Phone,
  MessageSquare,
} from "lucide-react";

import type { Message } from "@/types/message";


interface Props {
  items: Message[];
}


export default function RecentMessage({
  items,
}: Props) {

  const recent = items?.slice(0, 5) ?? [];


  function getStatusStyle(
    status?: string
  ) {

    switch(status) {

      case "new":
      case "pending":
        return `
          bg-amber-100
          text-amber-700
        `;

      case "process":
        return `
          bg-blue-100
          text-blue-700
        `;

      case "done":
      case "completed":
        return `
          bg-green-100
          text-green-700
        `;

      default:
        return `
          bg-stone-100
          text-stone-600
        `;

    }

  }



  function formatDate(
    date?: string
  ) {

    if (!date) return "-";

    return new Date(date)
      .toLocaleDateString(
        "id-ID",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      );

  }



  return (
    <div
      className="
        rounded-3xl
        border
        border-stone-200
        bg-white
        p-6
        shadow-md
        transition
        hover:shadow-lg
      "
    >


      {/* Header */}
      <div
        className="
          mb-6
          flex
          items-center
          justify-between
        "
      >

        <div>

          <h2
            className="
              text-xl
              font-bold
              text-stone-900
            "
          >
            Pesan Terbaru
          </h2>


          <p
            className="
              mt-1
              text-sm
              text-stone-500
            "
          >
            Konsultasi pelanggan terbaru
          </p>

        </div>



        <Link
          href="/admin/messages"
          className="
            rounded-xl
            bg-amber-50
            px-4
            py-2
            text-sm
            font-semibold
            text-amber-600
            transition
            hover:bg-amber-100
          "
        >
          Lihat Semua
        </Link>


      </div>




      {recent.length === 0 ? (

        <div
          className="
            flex
            h-56
            items-center
            justify-center
            rounded-2xl
            border-2
            border-dashed
            border-stone-200
            bg-stone-50
          "
        >

          <p className="text-stone-400">
            Belum ada pesan.
          </p>

        </div>


      ) : (


        <div className="space-y-4">


          {recent.map((item)=> (

            <div
              key={item.id}
              className="
                group
                rounded-2xl
                border
                border-stone-200
                bg-stone-50
                p-4
                transition-all
                duration-200
                hover:border-amber-300
                hover:bg-white
                hover:shadow-md
              "
            >


              <div
                className="
                  flex
                  gap-4
                "
              >


                {/* Icon */}
                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-amber-100
                  "
                >

                  <Mail
                    size={22}
                    className="text-amber-600"
                  />

                </div>




                {/* Content */}
                <div
                  className="
                    min-w-0
                    flex-1
                  "
                >


                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-3
                    "
                  >

                    <h3
                      className="
                        truncate
                        font-bold
                        text-stone-900
                      "
                    >
                      {item.name}
                    </h3>



                    <span
                      className="
                        shrink-0
                        rounded-full
                        bg-stone-200
                        px-3
                        py-1
                        text-xs
                        text-stone-600
                      "
                    >
                      {formatDate(
                        item.createdAt
                      )}
                    </span>


                  </div>




                  {/* Contact */}
                  <div
                    className="
                      mt-2
                      flex
                      flex-col
                      gap-1
                      text-sm
                      text-stone-500
                    "
                  >

                    {item.email && (

                      <span className="flex items-center gap-2">

                        <Mail size={14}/>

                        {item.email}

                      </span>

                    )}



                    {item.phone && (

                      <span className="flex items-center gap-2">

                        <Phone size={14}/>

                        {item.phone}

                      </span>

                    )}


                  </div>




                  {/* Message */}
                  <p
                    className="
                      mt-3
                      line-clamp-2
                      text-sm
                      text-stone-700
                    "
                  >
                    {item.message}
                  </p>



                  {/* Bottom */}
                  <div
                    className="
                      mt-3
                      flex
                      items-center
                      justify-between
                    "
                  >


                    <div
                      className="
                        flex
                        items-center
                        gap-2
                      "
                    >

                      {item.service && (

                        <span
                          className="
                            rounded-full
                            bg-stone-200
                            px-3
                            py-1
                            text-xs
                            text-stone-600
                          "
                        >
                          {item.service}
                        </span>

                      )}



                      <span
                        className={`
                          rounded-full
                          px-3
                          py-1
                          text-xs
                          font-semibold
                          ${getStatusStyle(item.status)}
                        `}
                      >
                        {item.status ?? "baru"}
                      </span>


                    </div>



<Link
  href={`/admin/messages/${item.id}`}
  className="
    inline-flex
    items-center
    gap-2
    rounded-xl
    border
    border-amber-200
    bg-amber-50
    px-3
    py-2
    text-sm
    font-semibold
    text-amber-600
    transition
    hover:bg-amber-100
  "
>
  <MessageSquare size={16} />

  Detail
</Link>


                  </div>


                </div>


              </div>


            </div>


          ))}


        </div>


      )}


    </div>
  );
}