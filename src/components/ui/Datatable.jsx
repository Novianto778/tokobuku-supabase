import { DataGrid } from "@mui/x-data-grid";
import { memo } from "react";

const Datatable = (props) => {
  // console.log("datatable render");
  return (
    <div style={{ height: props.height || 400, width: "100%" }}>
      <DataGrid
        className="datagrid"
        {...props}
        // checkboxSelection
      />
    </div>
  );
};

export default memo(Datatable);

Datatable.whyDidYouRender = true;
