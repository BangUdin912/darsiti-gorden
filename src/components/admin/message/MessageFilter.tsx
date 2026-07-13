"use client";

import { Search, RotateCcw } from "lucide-react";

const statuses = [
  "new",
  "processing",
  "done",
];


interface Props {

  search: string;
  onSearchChange: (value: string) => void;


  project: string;
  onProjectChange: (value: string) => void;


  date: string;
  onDateChange: (value: string) => void;


  status: string;
  onStatusChange: (value: string) => void;

}



export default function MessageFilter({

  search,
  onSearchChange,

  project,
  onProjectChange,

  date,
  onDateChange,

  status,
  onStatusChange,

}: Props) {


  function resetFilter(){

    onSearchChange("");

    onProjectChange("");

    onDateChange("");

    onStatusChange("");

  }



  return (

    <div className="
      rounded-3xl 
      border 
      border-stone-200 
      bg-white 
      p-5
    ">


      <div className="
        flex 
        flex-col 
        gap-4 
        lg:flex-row 
        lg:items-center
      ">



        {/* Search Pesan */}

        <div className="relative flex-1">


          <Search
            size={18}
            className="
              absolute 
              left-4 
              top-1/2 
              -translate-y-1/2 
              text-stone-400
            "
          />


          <input

            value={search}

            onChange={(e)=>
              onSearchChange(
                e.target.value
              )
            }

            placeholder="
              Cari nama, WhatsApp, atau pesan...
            "

            className="
              w-full
              rounded-full
              border
              border-stone-300
              py-3
              pl-11
              pr-4
              outline-none
              transition
              focus:border-amber-500
            "

          />


        </div>





        {/* Project */}

        <input

          value={project}

          onChange={(e)=>
            onProjectChange(
              e.target.value
            )
          }


          placeholder="Cari proyek..."


          className="
            rounded-full
            border
            border-stone-300
            px-5
            py-3
            outline-none
            focus:border-amber-500
          "

        />





        {/* Tanggal */}

        <input

          type="date"

          value={date}

          onChange={(e)=>
            onDateChange(
              e.target.value
            )
          }


          className="
            rounded-full
            border
            border-stone-300
            px-5
            py-3
            outline-none
            focus:border-amber-500
          "

        />






        {/* Status */}

        <select

          value={status}

          onChange={(e)=>
            onStatusChange(
              e.target.value
            )
          }


          className="
            rounded-full
            border
            border-stone-300
            px-5
            py-3
            outline-none
            focus:border-amber-500
          "

        >


          <option value="">
            Semua Status
          </option>


          {statuses.map((item)=>(

            <option
              key={item}
              value={item}
            >

              {
                item==="new"
                ? "Baru"
                : item==="processing"
                ? "Diproses"
                : "Selesai"
              }


            </option>

          ))}


        </select>






        {/* Reset */}

        <button

          type="button"

          onClick={resetFilter}


          className="
            flex
            items-center
            gap-2
            rounded-full
            border
            border-stone-300
            px-5
            py-3
            hover:bg-stone-100
          "

        >

          <RotateCcw size={18}/>

          Reset


        </button>




      </div>


    </div>

  );

}