/* mostly used by landing pages */

import "../../../../ag-grid-community/src/styles/ag-grid.scss";

import "../../../../ag-grid-community/src/styles/ag-theme-material/sass/ag-theme-material.scss";
import "../../../../ag-grid-community/src/styles/ag-theme-fresh/sass/ag-theme-fresh.scss";
import "../../../../ag-grid-community/src/styles/ag-theme-dark/sass/ag-theme-dark.scss";
import "../../../../ag-grid-community/src/styles/ag-theme-blue/sass/ag-theme-blue.scss";
import "../../../../ag-grid-community/src/styles/ag-theme-bootstrap/sass/ag-theme-bootstrap.scss";
import "../../../../ag-grid-community/src/styles/ag-theme-balham/sass/ag-theme-balham.scss";
import "../../../../ag-grid-community/src/styles/ag-theme-balham-dark/sass/ag-theme-balham-dark.scss";

declare var HMR: boolean;

if (HMR) {
    (<any>global).hot = true;
    require("webpack-hot-middleware/client?path=/dev/ag-grid-enterprise-bundle/__webpack_hmr&reload=true");
}

export * from "../../../../ag-grid-community/src/ts/main";

// spl modules
/* MODULES - Don't delete this line */
import "../../../../ag-grid-enterprise/src/modules/chartsModule.ts";
import "../../../../ag-grid-enterprise/src/modules/clipboardModule.ts";
import "../../../../ag-grid-enterprise/src/modules/columnsToolPanelModule.ts";
import "../../../../ag-grid-enterprise/src/modules/filtersToolPanelModule.ts";
import "../../../../ag-grid-enterprise/src/modules/menuModule.ts";
import "../../../../ag-grid-enterprise/src/modules/rangeSelectionModule.ts";
import "../../../../ag-grid-enterprise/src/modules/rowGroupingModule.ts";
import "../../../../ag-grid-enterprise/src/modules/serverSideRowModelModule.ts";
import "../../../../ag-grid-enterprise/src/modules/setFilterModule.ts";
import "../../../../ag-grid-enterprise/src/modules/sideBarModule.ts";
import "../../../../ag-grid-enterprise/src/modules/statusBarModule.ts";
import "../../../../ag-grid-enterprise/src/modules/viewportRowModelModule.ts";
import "../../../../../enterprise-modules/excel-export/src/excelExportModule.ts";
import "../../../../ag-grid-enterprise/src/main.ts";