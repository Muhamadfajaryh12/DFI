import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Paginator } from "primereact/paginator";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

const TableMain = (props) => {
  const { products } = props;
  const [visible, setVisible] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  useEffect(() => {
    setLoading(false);
  });
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between w-full ">
        <div className=" flex">
          <Button
            label="Create"
            icon="pi pi-plus"
            className="mx-2"
            onClick={() => setVisible(true)}
          />

          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Keyword Search"
            />
          </span>
        </div>
        <div className="flex">
          <Button
            label="XLSX"
            className="mx-2 p-button-success"
            icon="pi pi-file-excel"
          />

          <Button
            label="PDF"
            icon="pi pi-file-pdf"
            className="p-button-danger"
          />
        </div>
      </div>
    );
  };

  const actionTemplate = () => {
    return (
      <div className="flex justify-center">
        <Button
          icon="pi pi-info-circle"
          className=" mx-1 p-button-primary p-mr-2"
        />

        <Button icon="pi pi-pencil" className=" mx-1 p-button-warning p-mr-2" />
        <Button icon="pi pi-trash" className=" mx-1 p-button-danger" />
      </div>
    );
  };
  const header = renderHeader();

  return (
    <>
      <DataTable
        value={products}
        header={header}
        tableStyle={{ minWidth: "20rem" }}
        paginator
        rows={10}
        rowsPerPageOptions={[10, 25, 50]}
        globalFilterFields={["code", "name"]}
        filters={filters}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
        emptyMessage="Data not found"
        size={"small"}
        loading={loading}
      >
        <Column field="code" header="Code" sortable style={{ width: "25%" }} />
        <Column field="name" header="Name" sortable style={{ width: "25%" }} />
        <Column
          field="category"
          header="Category"
          sortable
          style={{ width: "25%" }}
        />
        <Column
          field="quantity"
          header="Quantity"
          sortable
          style={{ width: "25%" }}
        />
        <Column
          field="action"
          header="Action"
          style={{ width: "25%" }}
          body={actionTemplate}
        />
      </DataTable>
      <Dialog
        header="Header"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <p className="m-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Dialog>
    </>
  );
};

export default TableMain;
