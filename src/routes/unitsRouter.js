const router = require('express').Router();
const { getAllUnits, addUnit, updateUnit, deleteUnits, verifyApi } = require('../controllers/unitsController');
const { validateBody } = require('../scripts/helpers/schemaValidate');
const { addUnitSchema, updateUnitSchema, deleteUnitsSchema } = require('../scripts/schemas/unitsSchemas');
const { authenticate } = require('../scripts/helpers/authenticate');

/**
 * @swagger
 * /units/get-all-units:
 *   get:
 *     summary: Retrieve all units
 *     tags: [Units]
 *     responses:
 *       200:
 *         description: A list of units.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Unit'
 *       500:
 *         description: Internal server error.
 */
router.get('/get-all-units', getAllUnits);

/**
 * @swagger
 * /units/add-unit:
 *   post:
 *     summary: Add a new unit
 *     tags: [Units]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddUnit'
 *     responses:
 *       200:
 *         description: Unit successfully created.
 *       400:
 *         description: Validation error.
 *       500:
 *         description: Internal server error.
 */
router.post('/add-unit', validateBody(addUnitSchema), addUnit);

/**
 * @swagger
 * /units/update-unit:
 *   put:
 *     summary: Update an existing unit
 *     tags: [Units]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUnit'
 *     responses:
 *       200:
 *         description: Unit successfully updated.
 *       404:
 *         description: Unit not found.
 *       500:
 *         description: Internal server error.
 */
router.put('/update-unit', validateBody(updateUnitSchema), updateUnit);

router.delete('/delete-units', validateBody(deleteUnitsSchema), deleteUnits);

router.get('/verify', authenticate, verifyApi)

module.exports = router;