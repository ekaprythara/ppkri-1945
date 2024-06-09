import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

export function DataTable({ columns, data }) {
    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState("");

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting: sorting,
            globalFilter: filtering,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
    });

    return (
        <>
            <div className="rounded-xl p-2">
                <div className="flex justify-end items-center gap-2 mb-5">
                    <InputLabel htmlFor="search">Search:</InputLabel>
                    <TextInput
                        id="search"
                        type="text"
                        value={filtering}
                        onChange={(e) => setFiltering(e.target.value)}
                        className="rounded-md"
                    />
                </div>
                <table className="w-full text-left text-gray-500 border border-gray-300">
                    <thead className="text-base uppercase tracking-wider cursor-default text-gray-700 bg-gray-50 border-b-2 border-gray-300">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        scope="col"
                                        className="px-6 py-3 border-r border-gray-300"
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        <div className="flex justify-center items-center gap-2">
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {
                                                {
                                                    asc: (
                                                        <FaCaretUp size={20} />
                                                    ),
                                                    desc: (
                                                        <FaCaretDown
                                                            size={20}
                                                        />
                                                    ),
                                                }[
                                                    header.column.getIsSorted() ??
                                                        null
                                                ]
                                            }
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="text-base font-lato">
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <tr
                                    key={row.id}
                                    className="odd:bg-white even:bg-gray-50 border-b border-gray-300"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <td
                                            className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap border-r border-gray-300" // Adjust text alignment to left
                                            key={cell.id}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    className="px-6 py-4 text-center text-lg text-gray-600 whitespace-nowrap border-r border-gray-300" // Adjust text alignment to left
                                    colSpan={columns.length}
                                >
                                    No results
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between items-center">
                <div>
                    <span className="font-lato text-lg text-neutral-700">
                        Showing{" "}
                        {data.length &&
                            table.getState().pagination.pageIndex + 1}{" "}
                        to {table.getPageCount()} of {table.getRowCount()}{" "}
                        entries
                    </span>
                </div>
                <div className="flex justify-end items-center mt-5">
                    <button
                        onClick={() => table.firstPage()}
                        className="py-2 px-3 font-lato text-lg bg-white text-black border border-slate-300 hover:bg-blue-700 hover:text-white transition-color duration-300 rounded-l-md mb-2"
                    >
                        First
                    </button>
                    <button
                        onClick={() => table.previousPage()}
                        className="py-2 px-3 font-lato text-lg bg-white text-black border border-slate-300 hover:bg-blue-700 hover:text-white transition-color duration-300 mb-2"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => table.nextPage()}
                        className="py-2 px-3 font-lato text-lg bg-white text-black border border-slate-300 hover:bg-blue-700 hover:text-white transition-color duration-300 mb-2"
                    >
                        Next
                    </button>
                    <button
                        onClick={() => table.lastPage()}
                        className="py-2 px-3 font-lato text-lg bg-white text-black border border-slate-300 hover:bg-blue-700 hover:text-white transition-color duration-300 rounded-r-md mb-2"
                    >
                        Last
                    </button>
                </div>
            </div>
        </>
    );
}
