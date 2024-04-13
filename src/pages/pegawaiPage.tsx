import React, { useState, useEffect } from "react";
import LayoutMain from "../templates/LayoutMain";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import TableMain from "../components/TableMain";

// Dummy data (gantilah dengan data sebenarnya dari ProductService)
const dummyData = [
  { code: "001", name: "John Doe", category: "Manager", quantity: 1 },
  { code: "002", name: "Jane Smith", category: "Assistant", quantity: 2 },
  { code: "003", name: "Michael Johnson", category: "Clerk", quantity: 3 },
  { code: "001", name: "John Doe", category: "Manager", quantity: 1 },
  { code: "002", name: "Jane Smith", category: "Assistant", quantity: 2 },
  { code: "003", name: "Michael Johnson", category: "Clerk", quantity: 3 },
  { code: "001", name: "John Doe", category: "Manager", quantity: 1 },
  { code: "002", name: "Jane Smith", category: "Assistant", quantity: 2 },
  { code: "003", name: "Michael Johnson", category: "Clerk", quantity: 3 },
  { code: "001", name: "John Doe", category: "Manager", quantity: 1 },
  { code: "002", name: "Jane Smith", category: "Assistant", quantity: 2 },
  { code: "003", name: "Michael Johnson", category: "Clerk", quantity: 3 },
  { code: "001", name: "John Doe", category: "Manager", quantity: 1 },
  { code: "002", name: "Jane Smith", category: "Assistant", quantity: 2 },
  { code: "003", name: "Michael Johnson", category: "Clerk", quantity: 3 },
];

const PegawaiPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Gunakan dummy data untuk simulasi
    setProducts(dummyData);
  }, []);

  const content = () => <TableMain products={products} />;

  return (
    <>
      <LayoutMain title="Employee" content={content()} />
    </>
  );
};

export default PegawaiPage;
