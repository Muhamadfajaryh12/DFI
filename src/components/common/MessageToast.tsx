import { useEffect, useRef } from "react";
import { Toast } from "primereact/toast";

export default function MessageToast() {
  const toast = useRef(null);

  useEffect(() => {
    if (toast.current) {
      (toast.current as any).show({
        severity: "error",
        summary: "Error",
        detail: "Message Content",
        life: 3000,
      });
    }
  }, []);

  return <Toast ref={toast} />;
}
