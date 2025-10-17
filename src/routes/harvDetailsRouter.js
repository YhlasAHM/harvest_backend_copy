const router = require('express').Router();
const { getAllHarvestDetails, addHarvestDetails, updateHarvestDetails, deleteHarvestDetails, verifyApi } = require('../controllers/harvDetailsController');
const { authenticate } = require('../scripts/helpers/authenticate');
const { validateBody } = require('../scripts/helpers/schemaValidate');
const { addHarvestDetailsSchema, updateHarvestDetailsSchema, deleteHarvestDetailsSchema } = require('../scripts/schemas/harvDetailsSchemas');

/**
 * @swagger
 * /harvest-details/get-all-harvest-details:
 *   get:
 *     summary: Retrieve all harvest details
 *     tags: [HarvestDetails]
 *     responses:
 *       200:
 *         description: A list of harvest details.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/HarvestDetail'
 *       500:
 *         description: Internal server error.
 */
router.get('/get-all-harvest-details/:harvest_guid', getAllHarvestDetails);

/**
 * @swagger
 * /harvest-details/add-harvest-details:
 *   post:
 *     summary: Add a new harvest details
 *     tags: [HarvestDetails]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddHarvestDetail'
 *     responses:
 *       200:
 *         description: Harvest detail successfully created.
 *       400:
 *         description: Validation error.
 *       500:
 *         description: Internal server error.
 */
router.post('/add-harvest-details', validateBody(addHarvestDetailsSchema), addHarvestDetails);

/**
 * @swagger
 * /harvest-details/update-harvest-details:
 *   put:
 *     summary: Update an existing harvest detail
 *     tags: [HarvestDetails]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateHarvestDetail'
 *     responses:
 *       200:
 *         description: Harvest detail successfully updated.
 *       404:
 *         description: Harvest detail not found.
 *       500:
 *         description: Internal server error.
 */
router.put('/update-harvest-details', validateBody(updateHarvestDetailsSchema), updateHarvestDetails);

/**
 * @swagger
 * /harvest-details/delete-harvest-details:
 *   delete:
 *     summary: Delete a harvest details
 *     tags: [HarvestDetails]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteHarvestDetail'
 *     responses:
 *       200:
 *         description: Harvest detail successfully deleted.
 *       404:
 *         description: Harvest detail not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/delete-harvest-details', validateBody(deleteHarvestDetailsSchema), deleteHarvestDetails);

router.get('/verify', authenticate, verifyApi)

module.exports = router;