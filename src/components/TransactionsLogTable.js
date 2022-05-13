import React, { useMemo, useAsyncDebounce } from "react";
import "./tabledata.css";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  usePagination,
} from "react-table";
import Filters from "./Filter-tablem";
import TablePagination from "./Pagination-table"; // import Pagination Component from Pagination.js
export default function TransactionsLogTable({ columns, data }) {
  const filterTypes = React.useMemo(
    () => ({
      dateFilter: (rows, id, filterValue) => {
        return (rows = rows.filter((row) => {
          return (
            new Date(row.values.date) >= filterValue[0] &&
            new Date(row.values.date) <= filterValue[1]
          );
        }));
      },
    }),
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    state,
    visibleColumns,
    prepareRow,

    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setGlobalFilter,
    preGlobalFilteredRows,
    setFilter,
    dispatch,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      columns,
      data,
      filterTypes,
    },
    useFilters,
    useGlobalFilter,
    usePagination
  );
  return (
    <div>
      {/** Filters Component */}
      <Filters
        setFilter={setFilter}
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        dispatch={dispatch}
      />
      {/** Table Component */}
      <table {...getTableProps()} className="TransactionsTable">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="TransactionsTableBody">
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <TablePagination
        pageIndex={pageIndex}
        pageOptions={pageOptions}
        previousPage={previousPage}
        canPreviousPage={canPreviousPage}
        nextPage={nextPage}
        canNextPage={canNextPage}
      />
    </div>
  );
}
