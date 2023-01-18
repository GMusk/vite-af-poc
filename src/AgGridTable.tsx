import { useQuery } from "react-query";
import { fetchUsers } from "./UsersUtils";
import { useCallback, useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { User } from "./Users";
import { CellEditingStoppedEvent } from "ag-grid-community";

function AgGridTable() {
  const gridRef = useRef<AgGridReact<User>>(null);

  const { data } = useQuery("users", fetchUsers);

  const columnDefs = useMemo(
    () => [
      { field: "id" },
      { field: "username" },
      { field: "email" },
      { field: "address.street" },
    ],
    []
  );

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
      editable: true,
    }),
    []
  );

  const onGridReady = useCallback(() => {
    if (gridRef.current && gridRef.current.api) {
      gridRef.current.api.sizeColumnsToFit();
    }
  }, []);

  const CellEditingStopped = (event: CellEditingStoppedEvent) => {
    console.log(event);
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      <AgGridReact<User>
        ref={gridRef}
        rowData={data}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onCellEditingStopped={CellEditingStopped}
      />
    </div>
  );
}

export default AgGridTable;
