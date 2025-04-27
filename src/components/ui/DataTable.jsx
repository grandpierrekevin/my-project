import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useState, useMemo } from "react";
import Papa from "papaparse";
import { FaFileCsv, FaSearch } from "react-icons/fa";
import { Dialog } from "@headlessui/react";

export function DataTable({ columns, data }) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const actionColumn = {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <button
        onClick={() => openModal(row.original)}
        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded-lg transition"
      >
        Détail
      </button>
    ),
  };

  const finalColumns = useMemo(() => [...columns, actionColumn], [columns]);

  const table = useReactTable({
    data,
    columns: finalColumns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleExportCSV = () => {
    const csv = Papa.unparse(
      table.getFilteredRowModel().rows.map((row) => {
        const rowData = {};
        table.getAllColumns().forEach((col) => {
          if (col.getIsVisible()) {
            rowData[col.id] = row.getValue(col.id);
          }
        });
        return rowData;
      })
    );
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "clients.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openModal = (client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedClient(null);
  };

  return (
    <div className="space-y-4">
      {/* Barre de recherche et bouton export */}
      <div className="flex flex-wrap justify-end items-end mb-4">
        <div className="flex items-center gap-2">
          <FaSearch />
          <input
            type="text"
            placeholder="Rechercher..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="border-black border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500 mr-2"
          />
        </div>

        <button
          onClick={handleExportCSV}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          <FaFileCsv className="inline mr-2" />
          Exporter CSV
        </button>
      </div>

      {/* Tableau */}
      <div className="overflow-auto rounded-lg shadow max-h-[60vh]">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-500 text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-6 py-3 text-left font-semibold">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-gray-300 divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modale de détail */}
      <Dialog open={isModalOpen} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-md rounded-2xl bg-white bg-opacity-90 backdrop-blur-md p-6 shadow-lg space-y-4">
            <Dialog.Title className="text-2xl font-bold text-gray-600">Détail Client</Dialog.Title>
            {selectedClient && (
              <div className="space-y-2">
                <p><strong>Nom :</strong> {selectedClient.nom}</p>
                <p><strong>Email :</strong> {selectedClient.email}</p>
                <p><strong>Téléphone :</strong> {selectedClient.telephone}</p>
                {/* Ajoute ici d'autres champs si besoin */}
              </div>
            )}
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="mt-4 bg-gray-400 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Fermer
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <span>Afficher :</span>
          <select
            value={pageSize}
            onChange={(e) => {
              const size = Number(e.target.value);
              setPageSize(size);
              table.setPageSize(size);
            }}
            className="border rounded p-1"
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size} par page
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="p-2 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
          >
            Précédent
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="p-2 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
}
