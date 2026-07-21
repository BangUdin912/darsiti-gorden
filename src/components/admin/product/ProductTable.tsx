"use client";

import { useEffect, useMemo, useState } from "react";

import type { Product } from "@/types/product";
import { productService } from "@/lib/productService";

import ProductRow from "./ProductRow";
import ProductFilter from "./ProductFilter";
import ProductEdit from "./ProductEdit";
import ProductDeleteDialog from "./ProductDeleteDialog";

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // FILTER
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [featured, setFeatured] = useState<boolean | null>(null);


  // MODAL
  const [selected, setSelected] = useState<Product | null>(null);
  const [deleteItem, setDeleteItem] = useState<Product | null>(null);



  /**
   * FETCH PRODUCT
   */
  async function fetchProducts() {

    setLoading(true);

    try {

      const data = await productService.getAll();

      setProducts(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {

      console.error(
        "fetchProducts:",
        error
      );

      setProducts([]);

    } finally {

      setLoading(false);

    }

  }



  useEffect(() => {
    fetchProducts();
  }, []);




  /**
   * FILTER DATA
   */
  const filteredProducts = useMemo(() => {

    return products.filter((item) => {


      const matchSearch =
        item.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );



      const matchCategory =
        category
          ? item.category.includes(category)
          : true;



      const matchFeatured =
        featured === null
          ? true
          : item.featured === featured;



      return (
        matchSearch &&
        matchCategory &&
        matchFeatured
      );

    });

  }, [
    products,
    search,
    category,
    featured,
  ]);




  return (

    <div className="space-y-6">


      {/* FILTER */}
      <ProductFilter

        search={search}
        setSearch={setSearch}

        category={category}
        setCategory={setCategory}

        featured={featured}
        setFeatured={setFeatured}

      />




      {/* TABLE */}
      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          bg-white
        "
      >

        <div
          className="
            w-full
            overflow-x-auto
          "
        >

          <table
            className="
              min-w-[1000px]
              w-full
              text-left
              text-sm
              whitespace-nowrap
            "
          >


            <thead
              className="
                bg-stone-100
                text-stone-700
              "
            >

              <tr>

                <th
                  className="
                    w-16
                    p-3
                    text-center
                  "
                >
                  No
                </th>


                <th
                  className="
                    p-3
                    text-center
                  "
                >
                  Gambar
                </th>


                <th
                  className="
                    p-3
                    text-center
                  "
                >
                  Produk
                </th>


                <th
                  className="
                    p-3
                    text-center
                  "
                >
                  Kategori
                </th>


                <th
                  className="
                    p-3
                    text-center
                  "
                >
                  Harga
                </th>


                <th
                  className="
                    p-3
                    text-center
                  "
                >
                  Featured
                </th>


                <th
                  className="
                    p-3
                    text-center
                  "
                >
                  Aksi
                </th>


              </tr>

            </thead>




            <tbody>


              {loading && (

                <tr>

                  <td
                    colSpan={7}
                    className="
                      p-6
                      text-center
                      text-stone-500
                    "
                  >
                    Loading...
                  </td>

                </tr>

              )}





              {!loading &&
                filteredProducts.length === 0 && (

                <tr>

                  <td
                    colSpan={7}
                    className="
                      p-6
                      text-center
                      text-stone-500
                    "
                  >
                    Tidak ada produk.
                  </td>

                </tr>

              )}






              {!loading &&
                filteredProducts.length > 0 &&

                filteredProducts.map(
                  (item, index) => (

                    <ProductRow

                      key={item.id}

                      no={index + 1}

                      item={item}

                      onEdit={() =>
                        setSelected(item)
                      }

                      onDelete={() =>
                        setDeleteItem(item)
                      }

                    />

                  )
                )
              }



            </tbody>


          </table>


        </div>


      </div>





      {/* EDIT */}

      {selected && (

        <ProductEdit

          item={selected}

          onClose={() =>
            setSelected(null)
          }

          onSuccess={() => {

            setSelected(null);

            fetchProducts();

          }}

        />

      )}






      {/* DELETE */}

      {deleteItem && (

        <ProductDeleteDialog

          item={deleteItem}

          onClose={() =>
            setDeleteItem(null)
          }

          onSuccess={() => {

            setDeleteItem(null);

            fetchProducts();

          }}

        />

      )}



    </div>

  );
}