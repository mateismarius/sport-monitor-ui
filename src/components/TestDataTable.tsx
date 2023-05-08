import { Box } from "@mui/material";
import { DataGrid, GridColDef, roRO } from "@mui/x-data-grid";
import { EvaluationDto } from "../app/models/evaluationDto";

interface PropsInterface<EvaluationDto> {
  data: EvaluationDto[];
  columns: string[];
}



export default function TestDataTable<EvaluationDto>(props: PropsInterface<EvaluationDto>) {
  const { data } = props;
  const columns: GridColDef[] = [];

  data.forEach((item) => {
    console.log(item);
  });

  return (
    <Box sx={{ height: "70vh", width: "100%" }}>
      <DataGrid
        localeText={roRO.components.MuiDataGrid.defaultProps.localeText}
        rows={data}
        columns={columns}
        getRowHeight={() => "auto"}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}
