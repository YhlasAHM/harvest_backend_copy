const router = require('express').Router();
const { addAgronomist, getAllAgronomists, updateAgronomist, deleteAgronomists } = require('../controllers/harvestAgronomistsController');
const { validateBody } = require('../scripts/helpers/schemaValidate');
const { addAgronomistSchema, updateAgronomistSchema, deleteAgronomistsSchema } = require('../scripts/schemas/harvestAgronomistsSchemas');

/**
 * @swagger
 * /harvest-agronomists/get-all-harvest-agronomists:
 *   get:
 *     summary: Retrieve all harvest agronomists
 *     tags: [HarvestAgronomists]
 *     responses:
 *       200:
 *         description: A list of harvest agronomists.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/HarvestAgronomist'
 *       500:
 *         description: Internal server error.
 */
router.get('/get-all-harvest-agronomists', getAllAgronomists);

/**
 * @swagger
 * /harvest-agronomists/add-harvest-agronomist:
 *   post:
 *     summary: Add a new harvest agronomist
 *     tags: [HarvestAgronomists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddHarvestAgronomist'
 *     responses:
 *       200:
 *         description: Harvest agronomist successfully created.
 *       400:
 *         description: Validation error.
 *       500:
 *         description: Internal server error.
 */
router.post('/add-harvest-agronomist', validateBody(addAgronomistSchema), addAgronomist);

/**
 * @swagger
 * /harvest-agronomists/update-harvest-agronomist:
 *   put:
 *     summary: Update an existing harvest agronomist
 *     tags: [HarvestAgronomists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateHarvestAgronomist'
 *     responses:
 *       200:
 *         description: Harvest agronomist successfully updated.
 *       404:
 *         description: Harvest agronomist not found.
 *       500:
 *         description: Internal server error.
 */
router.put('/update-harvest-agronomist', validateBody(updateAgronomistSchema), updateAgronomist);

/**
 * @swagger
 * /harvest-agronomists/delete-harvest-agronomist:
 *   delete:
 *     summary: Delete a harvest agronomist
 *     tags: [HarvestAgronomists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteHarvestAgronomist'
 *     responses:
 *       200:
 *         description: Harvest agronomist successfully deleted.
 *       404:
 *         description: Harvest agronomist not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/delete-harvest-agronomists', validateBody(deleteAgronomistsSchema), deleteAgronomists);

module.exports = router;