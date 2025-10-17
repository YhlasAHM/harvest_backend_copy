const router = require('express').Router();
const { getAllHarvests, addHarvest, updateHarvest, deleteHarvests, getHarvestMinMax, updateHarvAndHarvDet, verifyApi } = require('../controllers/harvestsController');
const { validateBody } = require('../scripts/helpers/schemaValidate');
const { addHarvestSchema, updateHarvestSchema, deleteHarvestsSchema, updateHarvAndHarvDetSchema } = require('../scripts/schemas/harvestSchemas');
const { authenticate } = require('../scripts/helpers/authenticate');

/**
 * @swagger
 * /harvest/get-all-harvests:
 *   get:
 *     summary: Retrieve all harvests
 *     tags: [Harvests]
 *     responses:
 *       200:
 *         description: A list of harvests.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Harvest'
 *       500:
 *         description: Internal server error.
 */
router.get('/get-all-harvests', getAllHarvests);

/**
 * @swagger
 * /harvest/add-harvest:
 *   post:
 *     summary: Add a new harvest
 *     tags: [Harvests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddHarvest'
 *     responses:
 *       200:
 *         description: Harvest successfully created.
 *       400:
 *         description: Validation error.
 *       500:
 *         description: Internal server error.
 */
// router.post('/add-harvest', validateBody(addHarvestSchema), addHarvest);


router.post('/add-harvest', validateBody(addHarvestSchema), addHarvest)

/**
 * @swagger
 * /harvest/update-harvest:
 *   put:
 *     summary: Update an existing harvest
 *     tags: [Harvests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateHarvest'
 *     responses:
 *       200:
 *         description: Harvest successfully updated.
 *       404:
 *         description: Harvest not found.
 *       500:
 *         description: Internal server error.
 */
// router.put('/update-harvest', validateBody(updateHarvestSchema), updateHarvest);

router.put('/harvest-update', validateBody(updateHarvestSchema), updateHarvest)

/**
 * @swagger
 * /harvest/delete-harvest:
 *   delete:
 *     summary: Delete a harvest
 *     tags: [Harvests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteHarvest'
 *     responses:
 *       200:
 *         description: Harvest successfully deleted.
 *       404:
 *         description: Harvest not found.
 *       500:
 *         description: Internal server error.
 */
// router.delete('/delete-harvests', validateBody(deleteHarvestsSchema), deleteHarvests);

router.delete('/harvest-delete', validateBody(deleteHarvestsSchema), deleteHarvests)

router.get('/minMaxValues', getHarvestMinMax);

router.post('/harvAndDetUpdate', validateBody(updateHarvAndHarvDetSchema), updateHarvAndHarvDet)

router.get('/get-verify-harvest', getHarvestMinMax);

router.get('/verify', authenticate, verifyApi)

module.exports = router;