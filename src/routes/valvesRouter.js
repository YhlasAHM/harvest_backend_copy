const router = require('express').Router();
const { getAllValves, addValve, updateValve, deleteValves, verifyApi } = require('../controllers/valvesController');
const { validateBody } = require('../scripts/helpers/schemaValidate');
const { addValveSchema, updateValveSchema, deleteValvesSchema, } = require('../scripts/schemas/valvesSchemas');
const { authenticate } = require('../scripts/helpers/authenticate');

/**
 * @swagger
 * /valves/get-all-valves:
 *   get:
 *     summary: Retrieve all valves
 *     tags: [Valves]
 *     responses:
 *       200:
 *         description: A list of valves.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Valve'
 *       500:
 *         description: Internal server error.
 */
router.get('/get-all-valves', authenticate, getAllValves);

/**
 * @swagger
 * /valves/add-valve:
 *   post:
 *     summary: Add a new valve
 *     tags: [Valves]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddValve'
 *     responses:
 *       200:
 *         description: Valve successfully created.
 *       400:
 *         description: Validation error.
 *       500:
 *         description: Internal server error.
 */
router.post('/add-valve', authenticate, validateBody(addValveSchema), addValve);

/**
 * @swagger
 * /valves/update-valve:
 *   put:
 *     summary: Update an existing valve
 *     tags: [Valves]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateValve'
 *     responses:
 *       200:
 *         description: Valve successfully updated.
 *       404:
 *         description: Valve not found.
 *       500:
 *         description: Internal server error.
 */
router.put('/update-valve', authenticate, validateBody(updateValveSchema), updateValve);

/**
 * @swagger
 * /valves/delete-valves:
 *   delete:
 *     summary: Delete multiple valves
 *     tags: [Valves]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteValves'
 *     responses:
 *       200:
 *         description: Valves successfully deleted.
 *       404:
 *         description: No valves found to delete.
 *       500:
 *         description: Internal server error.
 */
router.delete('/delete-valves', authenticate, validateBody(deleteValvesSchema), deleteValves);

router.get('/verify', authenticate, verifyApi)

module.exports = router;