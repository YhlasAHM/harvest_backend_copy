const router = require('express').Router();
const { getAllStands, addStand, updateStand, deleteStands, verifyApi } = require('../controllers/standsController');
const { validateBody } = require('../scripts/helpers/schemaValidate');
const { addStandSchema, updateStandSchema, deleteStandsSchema } = require('../scripts/schemas/standsSchemas');
const { authenticate } = require('../scripts/helpers/authenticate');

/**
 * @swagger
 * /stands/get-all-stands:
 *   get:
 *     summary: Retrieve all stands
 *     tags: [Stands]
 *     responses:
 *       200:
 *         description: A list of stands.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Stand'
 *       500:
 *         description: Internal server error.
 */
router.get('/get-all-stands', authenticate, getAllStands);

/**
 * @swagger
 * /stands/add-stand:
 *   post:
 *     summary: Add a new stand
 *     tags: [Stands]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddStand'
 *     responses:
 *       200:
 *         description: Stand successfully created.
 *       400:
 *         description: Validation error.
 *       500:
 *         description: Internal server error.
 */
router.post('/add-stand', authenticate, validateBody(addStandSchema), addStand);

/**
 * @swagger
 * /stands/update-stand:
 *   put:
 *     summary: Update an existing stand
 *     tags: [Stands]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateStand'
 *     responses:
 *       200:
 *         description: Stand successfully updated.
 *       404:
 *         description: Stand not found.
 *       500:
 *         description: Internal server error.
 */
router.put('/update-stand', authenticate, validateBody(updateStandSchema), updateStand);

/**
 * @swagger
 * /stands/delete-stands:
 *   delete:
 *     summary: Delete multiple stands
 *     tags: [Stands]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stand_guids:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of stand GUIDs to delete
 *             required: ['stand_guids']
 *     responses:
 *       200:
 *         description: Stands successfully deleted.
 *       404:
 *         description: No stands found to delete.
 *       500:
 *         description: Internal server error.
 */
router.delete('/delete-stands', authenticate, validateBody(deleteStandsSchema), deleteStands);

router.get('/verify', authenticate, verifyApi)

module.exports = router;