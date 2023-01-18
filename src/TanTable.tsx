import { useQuery } from "react-query";
import "./App.css";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { User } from "./Users";
import { fetchUsers } from "./UsersUtils";

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.group({
    id: "details",
    header: () => (
      <span>
        <b>Details</b>
      </span>
    ),
    columns: [
      columnHelper.accessor("id", {
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("name", {
        header: () => <b>Name</b>,
        cell: (info) => info.getValue(),
      }),
    ],
  }),
  columnHelper.group({
    id: "address",
    header: () => (
      <span>
        <b>Address</b>
      </span>
    ),
    columns: [
      columnHelper.accessor("address.street", {
        header: () => <b>Street</b>,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("address.city", {
        header: () => <b>City</b>,
        cell: (info) => info.getValue(),
      }),
    ],
  }),
];

function TanTable() {
  const { isLoading, isError, data } = useQuery("users", fetchUsers);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: </span>;
  }

  // We can assume by this point that `isSuccess === true`
  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} colSpan={header.colSpan}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        {table.getFooterGroups().map((footerGroup) => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map((header) => (
              <th key={header.id} colSpan={header.colSpan}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  );
}

export default TanTable;
