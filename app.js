const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./src/config/swagger');
const ENV = require('./src/config');
const PORT = ENV.NODE_PORT || 3000;
const corsOptions = require('./src/config/corsOptions');

require('dotenv').config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// cors config
// app.use(cors());
app.use(cors(corsOptions));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Routes
const URL = ENV.INIT_URL;
app.use(`${URL}/objects`, require('./src/routes/objectsRouter'));
app.use(`${URL}/blocks`, require('./src/routes/blocksRouter'));
app.use(`${URL}/sectors`, require('./src/routes/sectorsRouter'));
app.use(`${URL}/valves`, require('./src/routes/valvesRouter'));
app.use(`${URL}/archs`, require('./src/routes/archsRouter'));
app.use(`${URL}/tracks`, require('./src/routes/trackRouter'));
app.use(`${URL}/stands`, require('./src/routes/standsRouter'));
app.use(`${URL}/harvest-details`, require('./src/routes/harvDetailsRouter'));
app.use(`${URL}/grades`, require('./src/routes/gradeRouter'));
app.use(`${URL}/harvests`, require('./src/routes/harvestRouter'));
app.use(`${URL}/harvest-agronomists`, require('./src/routes/harvestAgronomistsRouter'));
app.use(`${URL}/employees`, require('./src/routes/employeesRouter'));
app.use(`${URL}/professions`, require('./src/routes/professionsRouter'));
app.use(`${URL}/attributes`, require('./src/routes/attributesRouter'));
app.use(`${URL}/material-types`, require('./src/routes/materialTypesRouter'));
app.use(`${URL}/units`, require('./src/routes/unitsRouter'));
app.use(`${URL}/materials`, require('./src/routes/materialsRouter'));
app.use(`${URL}/groups`, require('./src/routes/groupsRouter'));
app.use(`${URL}/mtrl-attr-groups`, require('./src/routes/mtrlAttrGroupRouter'));
app.use(`${URL}/ast-combs`, require('./src/routes/astCombsRouter'));
app.use(`${URL}/auth`, require('./src/routes/authRouter'));
app.use(`${URL}/users`, require('./src/routes/usersRouter'));
app.use(`${URL}/devices`, require('./src/routes/devicesRouter'));
app.use(`${URL}/statuses`, require('./src/routes/statusesRouter'));
app.use(`${URL}/sensor-types`, require('./src/routes/sensorTypesRouter'));
app.use(`${URL}/sensors`, require('./src/routes/sensorsRouter'));
app.use(`${URL}/thresholds`, require('./src/routes/thresholdsRouter'));
app.use(`${URL}/readings`, require('./src/routes/readingsRouter'));
app.use(`${URL}/alerts`, require('./src/routes/alertsRouter'));

/* new routes */

app.use(`${URL}/order-statuses`, require('./src/routes/tblOrderStatusesRouter'));
app.use(`${URL}/suppliers`, require('./src/routes/tblSuppliersRouter'));
app.use(`${URL}/price-types`, require('./src/routes/tblPriceTypesRouter'));
app.use(`${URL}/clients`, require('./src/routes/tblClientsRouter'));
app.use(`${URL}/orders`, require('./src/routes/tblOrdersRouter'));
app.use(`${URL}/categories`, require('./src/routes/tblCategoryRouter'));
app.use(`${URL}/unit-details`, require('./src/routes/tblUnitDetailsRouter'));
app.use(`${URL}/marks`, require('./src/routes/tblMarksRouter'));
app.use(`${URL}/prices`, require('./src/routes/tblPricesRouter'));
app.use(`${URL}/variants`, require('./src/routes/tblVariantsRouter'));
app.use(`${URL}/order-lines`, require('./src/routes/tblOrderLineRouter'));
app.use(`${URL}/barcodes`, require('./src/routes/tblBarcodesRouter'));
app.use(`${URL}/harv-employees`, require('./src/routes/tblHarvEmployeesRouter'));
app.use(`${URL}/harv-statuses`, require('./src/routes/tblHarvStatusesRouter'));

// Activating server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is successfully running on port http://localhost:${PORT}`);
});