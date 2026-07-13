"use client";

import { useEffect, useState } from "react";
import { Eye, Pencil, Trash2, Loader2 } from "lucide-react";

import MessageEdit from "./MessageEdit";
import MessageDetail from "./MessageDetail";

import { messageService } from "@/lib/messageService";
import type { Message } from "@/types/message";


interface Props {

    search:string;

    project:string;

    date:string;

    status:string;

}


export default function MessageTable({

search,

project,

date,

status,

}:Props) {

    const [editing, setEditing] = useState<Message | null>(null);

    const [messages, setMessages] = useState<Message[]>([]);

    const [loading, setLoading] = useState(true);

    const [selected, setSelected] = useState<Message | null>(null);



    async function loadMessages() {

        try {

            setLoading(true);

            const data = await messageService.getAll();

            setMessages(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }
    }



    async function handleDelete(id: string) {

        const ok = confirm(
            "Yakin ingin menghapus pesan ini?"
        );


        if (!ok) return;


        try {

            await messageService.delete(id);


            setMessages((prev) =>
                prev.filter(
                    (item) => item.id !== id
                )
            );


            alert(
                "Pesan berhasil dihapus."
            );


        } catch (error) {

            console.error(error);

            alert(
                "Gagal menghapus pesan."
            );

        }
    }



    useEffect(() => {

        loadMessages();

    }, []);




    function getStatusClass(
        status: Message["status"]
    ) {

        switch (status) {

            case "new":
                return "bg-blue-100 text-blue-700";


            case "processing":
                return "bg-yellow-100 text-yellow-700";


            case "done":
                return "bg-green-100 text-green-700";


            default:
                return "bg-stone-100 text-stone-700";

        }
    }





    /*
    =========================
    FILTER DATA
    =========================
    */

    const filteredMessages =
messages.filter((item)=>{


const keyword =
search.toLowerCase();



const matchSearch =
  item.name?.toLowerCase().includes(keyword) ||
  item.phone?.toLowerCase().includes(keyword) ||
  item.email?.toLowerCase().includes(keyword) ||
  item.address?.toLowerCase().includes(keyword) ||
  item.productName?.toLowerCase().includes(keyword) ||
  item.material?.toLowerCase().includes(keyword) ||
  item.service?.toLowerCase().includes(keyword) ||
  item.message?.toLowerCase().includes(keyword);




const matchProject =

project === ""

?

true

:

item.service
?.toLowerCase()
.includes(
project.toLowerCase()
);





const matchDate =

date === ""

?

true

:

new Date(item.createdAt)
.toISOString()
.split("T")[0]
=== date;





const matchStatus =

status === ""

?

true

:

item.status === status;




return (

matchSearch &&

matchProject &&

matchDate &&

matchStatus

);


});






    if (loading) {

        return (

            <div className="
                flex 
                items-center 
                justify-center 
                rounded-2xl 
                bg-white 
                p-12 
                shadow
            ">

                <Loader2
                    className="
                    mr-3 
                    h-5 
                    w-5 
                    animate-spin
                    "
                />

                Memuat pesan...

            </div>

        );

    }





    if (filteredMessages.length === 0) {

        return (

            <div className="
                rounded-2xl 
                bg-white 
                p-12 
                text-center 
                shadow
            ">

                <p className="text-stone-500">

                    Tidak ada pesan ditemukan.

                </p>

            </div>

        );

    }





    return (

        <>

            <div className="
                overflow-x-auto 
                rounded-2xl 
                bg-white 
                shadow
            ">

                <table className="min-w-full">


                    <thead className="bg-stone-100">

                        <tr className="
                            text-left 
                            text-sm 
                            font-semibold 
                            text-stone-700
                        ">

                            <th className="
                                w-16 
                                px-5 
                                py-4 
                                text-center
                            ">
                                No
                            </th>


                            <th className="px-5 py-4">
                                Nama
                            </th>


                            <th className="px-5 py-4">
                                WhatsApp
                            </th>


                            <th className="px-5 py-4">
                                Produk
                            </th>

                            <th className="px-5 py-4">
    Material
</th>


                           


                            <th className="px-5 py-4">
                                Tanggal
                            </th>


                            <th className="px-5 py-4">
                                Status
                            </th>


                            <th className="
                                px-5 
                                py-4 
                                text-center
                            ">
                                Aksi
                            </th>


                        </tr>

                    </thead>



                    <tbody>


                        {filteredMessages.map(
                            (item,index)=>(

                            <tr
                                key={item.id}
                                className="
                                border-t 
                                transition 
                                hover:bg-stone-50
                                "
                            >


                                <td className="
                                    px-5 
                                    py-4 
                                    text-center 
                                    font-medium 
                                    text-stone-600
                                ">

                                    {index + 1}

                                </td>


                                <td className="
                                    px-5 
                                    py-4 
                                    font-medium
                                ">

                                    {item.name}

                                </td>



                                <td className="px-5 py-4">

                                    {item.phone}

                                </td>



                                <td className="px-5 py-4">
    <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
        {item.productName || "-"}
    </span>
</td>

                                <td className="px-5 py-4">
    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
        {item.material || "-"}
    </span>
</td>



                               



                                <td className="
                                    whitespace-nowrap 
                                    px-5 
                                    py-4
                                ">

                                    {new Date(
                                        item.createdAt
                                    ).toLocaleString(
                                        "id-ID",
                                        {
                                            dateStyle:"medium",
                                            timeStyle:"short",
                                        }
                                    )}

                                </td>



                                <td className="px-5 py-4">


                                    <span
                                        className={`
                                        rounded-full 
                                        px-3 
                                        py-1 
                                        text-xs 
                                        font-semibold
                                        ${getStatusClass(
                                            item.status
                                        )}
                                        `}
                                    >

                                        {item.status}

                                    </span>


                                </td>




                                <td className="px-5 py-4">

                                    <div className="
                                        flex 
                                        items-center 
                                        justify-center 
                                        gap-2
                                    ">


                                        <button
                                            onClick={() =>
                                                setSelected(item)
                                            }
                                            className="
                                            inline-flex 
                                            items-center 
                                            gap-2 
                                            rounded-lg 
                                            border 
                                            px-3 
                                            py-2 
                                            text-sm 
                                            hover:bg-stone-100
                                            "
                                        >

                                            <Eye size={16}/>

                                            Detail

                                        </button>



                                        <button
                                            onClick={() =>
                                                setEditing(item)
                                            }
                                            className="
                                            inline-flex 
                                            items-center 
                                            gap-2 
                                            rounded-lg 
                                            border 
                                            border-amber-300 
                                            px-3 
                                            py-2 
                                            text-sm 
                                            text-amber-700 
                                            hover:bg-amber-50
                                            "
                                        >

                                            <Pencil size={16}/>

                                            Edit

                                        </button>




                                        <button
                                            onClick={() =>
                                                handleDelete(
                                                    item.id
                                                )
                                            }
                                            className="
                                            inline-flex 
                                            items-center 
                                            gap-2 
                                            rounded-lg 
                                            border 
                                            border-red-300 
                                            px-3 
                                            py-2 
                                            text-sm 
                                            text-red-600 
                                            hover:bg-red-50
                                            "
                                        >

                                            <Trash2 size={16}/>

                                            Hapus

                                        </button>


                                    </div>

                                </td>


                            </tr>

                        ))}


                    </tbody>


                </table>


            </div>





            {selected && (

                <MessageDetail
                    message={selected}
                    onClose={() =>
                        setSelected(null)
                    }
                />

            )}





            {editing && (

                <MessageEdit
                    message={editing}
                    onClose={() =>
                        setEditing(null)
                    }
                    onSuccess={() => {

                        setEditing(null);

                        loadMessages();

                    }}
                />

            )}



        </>

    );
}