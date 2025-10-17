const router = require('express').Router();
const { getAllSectors, addSector, updateSector, deleteSectors, verifyApi } = require('../controllers/sectorsController');
const { validateBody } = require('../scripts/helpers/schemaValidate');
const { addSectorSchema, updateSectorSchema, deleteSectorsSchema } = require('../scripts/schemas/sectorsSchemas');
const { authenticate } = require('../scripts/helpers/authenticate');

/**
 * @swagger
 * /sectors/get-all-sectors:
 *   get:
 *     summary: Retrieve all sectors
 *     tags: [Sectors]
 *     responses:
 *       200:
 *         description: A list of sectors.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sector'
 *       500:
 *         description: Internal server error.
 */
router.get('/get-all-sectors', authenticate, getAllSectors);

/**
 * @swagger
 * /sectors/add-sector:
 *   post:
 *     summary: Add a new sector
 *     tags: [Sectors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddSector'
 *     responses:
 *       200:
 *         description: Sector successfully created.
 *       400:
 *         description: Validation error.
 *       500:
 *         description: Internal server error.
 */
router.post('/add-sector', authenticate, validateBody(addSectorSchema), addSector);

/**
 * @swagger
 * /sectors/update-sector:
 *   put:
 *     summary: Update an existing sector
 *     tags: [Sectors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateSector'
 *     responses:
 *       200:
 *         description: Sector successfully updated.
 *       404:
 *         description: Sector not found.
 *       500:
 *         description: Internal server error.
 */
router.put('/update-sector', authenticate, validateBody(updateSectorSchema), updateSector);

/**
 * @swagger
 * /sectors/delete-sectors:
 *   delete:
 *     summary: Delete multiple sectors
 *     tags: [Sectors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteSectors'
 *     responses:
 *       200:
 *         description: Sectors successfully deleted.
 *       404:
 *         description: No sectors found to delete.
 *       500:
 *         description: Internal server error.
 */
router.delete('/delete-sectors', authenticate, validateBody(deleteSectorsSchema), deleteSectors);

router.get('/verify', authenticate, verifyApi)

module.exports = router;