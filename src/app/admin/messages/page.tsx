"use client";

import { useState } from "react";

import MessageFilter from "@/components/admin/message/MessageFilter";
import MessageTable from "@/components/admin/message/MessageTable";

export default function MessagesPage() {

  const [project,setProject] = useState("");

const [date,setDate] = useState("");

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");


  return (
    <div className="min-h-screen bg-stone-50 p-6">


      <div className="mb-6">

        <h1 className="text-2xl font-bold text-stone-800">
          Customer Messages
        </h1>

        <p className="text-sm text-stone-500">
          Rekap seluruh pesan pelanggan yang masuk dari website.
        </p>

      </div>


      {/* Filter */}
      <div className="mb-6">

        <MessageFilter

 search={search}
 onSearchChange={setSearch}


 project={project}
 onProjectChange={setProject}


 date={date}
 onDateChange={setDate}


 status={status}
 onStatusChange={setStatus}

/>

      </div>


      {/* Table */}
      <MessageTable

 search={search}

 project={project}

 date={date}

 status={status}

/>


    </div>
  );
}