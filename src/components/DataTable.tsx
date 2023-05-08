import Box from "@mui/material/Box";
import { DataGrid, GridColDef, roRO } from "@mui/x-data-grid";
import { TableState } from "../app/models/datagrid/TableState";

export default function DataTable<T>(props: TableState<T>) {
  const columns: GridColDef[] = [];
  const itm = Object(props.data[0]);
  const colKeys = Object.keys(itm);
  const colNames = props.columnsList;

  for (var i: number = 0; i < colNames.length; i++) {
    var width: number = 173;
    if (i === 0) {
      width = 25;
    } 
    if (colKeys[i] === "id")
    continue;
    columns.push({
      field: colKeys[i],
      headerName: colNames[i],
      width: width,
    });
  }

  return (
    <Box sx={{ height: "70vh", width: "100%" }}>
      <DataGrid
        localeText={roRO.components.MuiDataGrid.defaultProps.localeText}
        rows={props.data}
        columns={columns}
        getRowHeight={() => 'auto'}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}
