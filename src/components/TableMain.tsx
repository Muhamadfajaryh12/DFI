import { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

const TableMain = (props: any) => {
  const { headers, body, contentModal, itemId } = props;
  const [visible, setVisible] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalType, setModalType] = useState("");
  const dt = useRef<DataTable<any>>(null);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleOpenModal = (type: string, id: number | null) => {
    setVisible(true);
    itemId(id);
    setModalType(type);
  };

  const onGlobalFilterChange = (e: any) => {
    const value = e?.target?.value;
    const _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const exportColumns = headers.map((col: any) => ({
    title: col.name,
    dataKey: col.name.toLowerCase(),
  }));

  const exportPdf = () => {
    import("jspdf").then((jsPDF: any) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF();

        doc.autoTable(exportColumns, body);
        doc.save("products.pdf");
      });
    });
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between w-full ">
        <div className=" flex">
          <Button
            label="Create"
            icon="pi pi-plus"
            className="mx-2"
            onClick={() => handleOpenModal("store", null)}
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
            onClick={exportPdf}
            data-pr-tooltip="PDF"
          />
        </div>
      </div>
    );
  };

  const actionTemplate = (data: any) => {
    return (
      <div className="flex justify-center">
        <Button
          icon="pi pi-info-circle"
          className=" mx-1 p-button-primary p-mr-2"
        />
        <Button
          icon="pi pi-pencil"
          className=" mx-1 p-button-warning p-mr-2"
          onClick={() => handleOpenModal("update", data.id)}
        />
        <Button
          icon="pi pi-trash"
          className=" mx-1 p-button-danger"
          onClick={() => handleOpenModal("delete", data.id)}
        />
      </div>
    );
  };
  const header = renderHeader();

  const renderModalContent = () => {
    switch (modalType) {
      case "store":
        return contentModal.store;
      case "update":
        return contentModal.update;
      case "delete":
        return contentModal.delete;
      default:
        return null;
    }
  };

  return (
    <>
      <DataTable
        ref={dt}
        value={body}
        header={header}
        tableStyle={{ minWidth: "100%" }}
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
        {headers.map((item: any) => (
          <Column
            field={item.name.toLowerCase()}
            header={item.name}
            sortable
            style={{ width: "25%" }}
          />
        ))}

        <Column
          field="id"
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
        {renderModalContent()}
      </Dialog>
    </>
  );
};

export default TableMain;
