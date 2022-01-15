const operators_col = [
{ field: 'id', headerName: 'ID', width: 90 },
{
  field: 'firstName',
  headerName: 'Nombre',
  width: 300,
  editable: false,
},
{
  field: 'lastName',
  headerName: 'Apellido',
  width: 150,
  editable: false,
},
{
  field: 'age',
  headerName: 'Edad',
  type: 'number',
  width: 110,
  editable: false,
},
{
  field: 'RFC',
  headerName: 'RFC',
  type: 'string',
  width: 160,
  editable: false,
},
{
  field: 'NumLicencia',
  headerName: 'Licencia',
  type:"number",
  editable: false,
  width: 160,
},
{
  field: 'NSS',
  headerName: 'NSS',
  type:"number",
  editable: false,
  width: 160,
},]

const trucks_col = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field:"ConfigVehicular",
        headerName:"Tipo de vehículo",
        type:"string",
        editable:false,
        width:110
    },
    {
        field:"año",
        headerName:"Año",
        type:"number",
        editable:false,
        width:110
    },
    {
        field:"poliza",
        headerName:"Póliza",
        type:"string",
        editable:false,
        width:110
    },
    {
        field:"permisoSCT",
        headerName:"Tipo permiso",
        type:"string",
        editable:false,
        width:110
    },
    {
        field:"NUMpermisoSCT",
        headerName:"No. permiso",
        type:"string",
        editable:false,
        width:110
    },
    {
        field:"placa_trac",
        headerName:"Placa tractor",
        type:"string",
        editable:false,
        width:110
    },
    {
        field:"placa_caja",
        headerName:"Placa de la caja",
        type:"string",
        editable:false,
        width:110
    },
]


const operators_data = [
  { id: 1, TipoFigura:"01",lastName: 'López Garcia', firstName: 'Anastasio', age: 42, licencia:"EDOM027598", NSS:12345, RFC:"LOGA881113BF0" },
  { id: 2, TipoFigura:"01",lastName: 'Garcia Martinez', firstName: 'Jose Felix', age: 45, licencia:"EDOM021352", NSS:12345, RFC:"GAMF780114I66" },
  { id: 3, TipoFigura:"01",lastName: 'Alvarez Iturbide', firstName: 'Alberto', age: 35, licencia:"DF00232197", NSS:12345, RFC:"AAIA661103AG0" },
  { id: 4, TipoFigura:"01",lastName: 'Gonzales Cedillo', firstName: 'Tomas', age: 16, licencia:"DF001112383", NSS:12345, RFC:"GOCT811118NH4" },
  { id: 5, TipoFigura:"01",lastName: 'López Merino', firstName: 'Antonio', age: 16, licencia:"LFD00008331", NSS:12345, RFC:"MELA7201164N0" },
  { id: 6, TipoFigura:"01",lastName: 'Ortega Lopez', firstName: 'Ernesto', age: 16, licencia:"LFD00041638", NSS:12345, RFC:"OELE9112021W7" }
]
const trucks_data = [
  { id: 1,tipo:"trailer",año:2010, poliza:"280012314", AseguraRespCivil:"QUALITAS",PolizaRespCivil:"280012314",ConfigVehicular:"T3S2",NUMpermisoSCT:"019VIPG18102017021001004",permisoSCT: 'TPAF01',placa_trac:"68AJ5Z", placa_caja:"05UG7V" },
  { id: 2,tipo:"trailer",año:2001, poliza:"130297415800", AseguraRespCivil:"AXA",PolizaRespCivil:"130297415800",ConfigVehicular:"T3S2",NUMpermisoSCT:"093VIFF760707AT3/9",permisoSCT: 'TPAF01',placa_trac:"797AK7", placa_caja:"844UK4", SubTipoRem:"CTR007" },
  { id: 3,tipo:"trailer",año:2017, poliza:"130269627801", AseguraRespCivil:"AXA",PolizaRespCivil:"130269627801",ConfigVehicular:"T3S2",NUMpermisoSCT:"0919VIPG05112019021001000",permisoSCT: 'TPAF01',placa_trac:"13AN8W", placa_caja:"86UM6D" },
  { id: 4,tipo:"trailer",año:2003, poliza:"130297420500", AseguraRespCivil:"AXA",PolizaRespCivil:"130297420500",ConfigVehicular:"T3S2",NUMpermisoSCT:"0019VIFF20052011021001016",permisoSCT: 'TPAF01',placa_trac:"13AF4H", placa_caja:"170WN1" },
  { id: 5,tipo:"trailer",año:1981, poliza:"130294988200", AseguraRespCivil:"AXA",PolizaRespCivil:"130294988200",ConfigVehicular:"C3",NUMpermisoSCT:"019VIPG18102017021001002",permisoSCT: 'TPAF01',placa_trac:"28AH6W", placa_caja:"170WN1" },
  { id: 6,tipo:"trailer",año:2012, poliza:"140218522600", AseguraRespCivil:"AXA",PolizaRespCivil:"140218522600",ConfigVehicular:"C2",NUMpermisoSCT:"0901PWA31052011021001002",permisoSCT: 'TPAF01',placa_trac:"372AS5", placa_caja:"" }
]

export {operators_col,operators_data, trucks_col, trucks_data}