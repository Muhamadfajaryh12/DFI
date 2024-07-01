import { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";

const TableMain = (props: any) => {
  const {
    headers,
    body,
    contentModal,
    itemId,
    onOpenStoreModal,
    onCloseStoreModal,
  } = props;
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
  const renderBarcodeColumn = (rowData: any) => {
    return (
      <div>
        <img
          src={`http://127.0.0.1:8000/storage/${rowData?.barcode}`}
          alt={`Barcode for ${rowData.barcode}`}
        />
      </div>
    );
  };

  const handleOpenModal = (type: string, id: number | null) => {
    setVisible(true);
    itemId(id);
    setModalType(type);
  };

  const handleCloseModal = () => {
    setVisible(false);
    itemId(null);
    setModalType("");
    onCloseStoreModal();
  };

  const onGlobalFilterChange = (e: any) => {
    const value = e?.target?.value;
    const _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const getGlobalFilterFields = () => {
    if (body.length === 0) return [];
    return Object.keys(body[0]);
  };

  const exportColumns = headers?.map((col: any) => ({
    title: col.name,
    dataKey: col.name.toLowerCase(),
  }));

  const exportPdf = () => {
    import("jspdf").then((jspdfModule) => {
      const jsPDF = jspdfModule.default;
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF();
        // @ts-ignore
        doc.autoTable(exportColumns, body);
        doc.save("export_" + new Date().getTime() + ".pdf");
      });
    });
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(body);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      saveAsExcelFile(excelBuffer);
    });
  };

  const saveAsExcelFile = (buffer: any) => {
    // @ts-ignore
    import("file-saver").then((module: any) => {
      if (module && module.default) {
        const EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(
          data,
          "export_" + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    });
  };

  const renderHeader = () => (
    <div className="flex flex-wrap md:flex-nowrap gap-1 justify-between w-full">
      <div className=" flex flex-wrap sm:flex-nowrap justify-items-center justify-center gap-1">
        <Button
          label="Create"
          icon="pi pi-plus"
          className="sm:w-40 w-72"
          onClick={() => handleOpenModal("store", null)}
        />
        <IconField iconPosition="left" className="w-72">
          <InputIcon className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
            className="w-72"
          />
        </IconField>
      </div>
      <div className="flex flex-wrap gap-1 justify-items-center  md:flex-nowrap justify-center sm:justify-end w-full">
        <Button
          label="XLSX"
          className="sm:w-40 p-button-success w-72"
          onClick={exportExcel}
          icon="pi pi-file-excel"
        />

        <Button
          label="PDF"
          icon="pi pi-file-pdf"
          className="p-button-danger sm:w-40 w-72 "
          onClick={exportPdf}
          data-pr-tooltip="PDF"
        />
      </div>
    </div>
  );

  const actionTemplate = (data: any) => {
    return (
      <div className="flex">
        <Button
          icon="pi pi-info-circle"
          className=" mx-1 p-button-primary p-mr-2"
          onClick={() => handleOpenModal("detail", data.id)}
        />
        <Button
          icon="pi pi-pencil"
          className=" mx-1 p-button-warning p-mr-2"
          onClick={() => handleOpenModal("update", data.id)}
        />
        <Button
          icon="pi pi-trash"
          className=" mx-1 p-button-danger p-mr-2"
          onClick={() => handleOpenModal("delete", data.id)}
        />
      </div>
    );
  };
  const header = renderHeader();

  const renderModalContent = () => {
    switch (modalType) {
      case "store":
        onOpenStoreModal(true);
        return contentModal.store;
      case "update":
        return contentModal.update;
      case "delete":
        return contentModal.delete;
      case "detail":
        return contentModal.detail;
      default:
        return null;
    }
  };

  return (
    <>
      <DataTable
        className="bg-red-200"
        ref={dt}
        value={body}
        header={header}
        tableStyle={{ minWidth: "100%" }}
        paginator
        rows={10}
        rowsPerPageOptions={[10, 25, 50]}
        globalFilterFields={getGlobalFilterFields()}
        filters={filters}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
        emptyMessage="Data not found"
        size={"small"}
        loading={loading}
      >
        {headers?.map((item: any, index: number) => (
          <Column
            key={index}
            field={item.name.toLowerCase()}
            header={item.name}
            sortable
            body={
              item.name.toLowerCase() == "barcode"
                ? renderBarcodeColumn
                : undefined
            }
          />
        ))}

        <Column field="id" header="Action" body={actionTemplate} />
      </DataTable>
      <Dialog
        header={
          modalType === "store"
            ? "Create"
            : modalType === "update"
            ? "Update"
            : modalType === "delete"
            ? "Delete"
            : modalType === "detail"
            ? "Detail"
            : ""
        }
        visible={visible}
        style={{ width: "50vw" }}
        onHide={handleCloseModal}
      >
        {renderModalContent()}
      </Dialog>
    </>
  );
};

export default TableMain;
