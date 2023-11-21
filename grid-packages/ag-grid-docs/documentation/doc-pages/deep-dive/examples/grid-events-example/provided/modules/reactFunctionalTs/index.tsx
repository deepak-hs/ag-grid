import React, { useState, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { ColDef } from 'ag-grid-community';
import { ICellRendererParams, ValueFormatterParams } from 'ag-grid-community';

// Custom Cell Renderer (Display flags based on cell value)
const CountryFlagCellRenderer = (params: ICellRendererParams) => (
  <span>{params.value && <img alt={`${params.value} Flag`} src={`https://www.ag-grid.com/example-assets/flags/${params.value.toLowerCase()}-flag-sm.png`} height={30} />}</span>
);

// Row Data Interface
interface IRow {
  company: string;
  country: 'USA' | 'China' | 'Kazakhstan';
  date: string;
  mission: string;
  price: number;
  successful: boolean;
}

// Create new GridExample component
const GridExample = () => {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState<IRow[]>([]);
  
  // Column Definitions: Defines & controls grid columns.
  const [colDefs] = useState<ColDef[]>([
    { field: "mission", filter: true },
    { 
      field: "country", 
      cellRenderer: CountryFlagCellRenderer 
    },
    { field: "successful" },
    { field: "date" },
    { 
      field: "price", 
      // Return a formatted string for this column
      valueFormatter: (params: ValueFormatterParams): string => { return '£' + params.value.toLocaleString(); }
    },
    { field: "company" }
  ]);

  // Fetch data & update rowData state
  useEffect(() => {
    fetch('https://downloads.jamesswinton.com/space-mission-data.json') // Fetch data from server
      .then(result => result.json()) // Convert to JSON
      .then(rowData => setRowData(rowData)) // Update state of `rowData`
  }, [])

  // Apply settings across all columns
  const defaultColDefs = useMemo<ColDef>(() => {
    return {
      filter: true,
      editable: true
    };
  }, []);

  // Container: Defines the grid's theme & dimensions.
  return (
    <div className={/** DARK MODE START **/document.documentElement?.dataset.defaultTheme || 'ag-theme-quartz'/** DARK MODE END **/} style={{ width: '100%', height: '100%' }}>
      {/* The AG Grid component, with Row Data & Column Definition props */}
      <AgGridReact 
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDefs}
        pagination={true}
        onCellValueChanged={event => console.log(`New Cell Value: ${event.value}`)}
      />
    </div>
  );
}

// Render GridExample
const root = createRoot(document.getElementById("root")!);
root.render(<GridExample />);