const router = require('express').Router();
const { getAllArchs, addArch, updateArch, deleteArchs, getArchsForSector, autoGenerate, verifyApi } = require('../controllers/archsController');
const { validateBody } = require('../scripts/helpers/schemaValidate');
const { addArchSchema, updateArchSchema, deleteArchsSchema, autoGenerateSchema } = require('../scripts/schemas/archsSchemas');
const { authenticate } = require('../scripts/helpers/authenticate');

/**
 * @swagger
 * /archs/get-all-archs:
 *   get:
 *     summary: Retrieve all archs
 *     tags: [Archs]
 *     responses:
 *       200:
 *         description: A list of archs.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Arch'
 *       500:
 *         description: Internal server error.
 */
router.get('/get-all-archs', authenticate, getAllArchs);

/**
 * @swagger
 * /archs/add-arch:
 *   post:
 *     summary: Add a new arch
 *     tags: [Archs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddArch'
 *     responses:
 *       200:
 *         description: Arch successfully created.
 *       400:
 *         description: Validation error.
 *       500:
 *         description: Internal server error.
 */
router.post('/add-arch', authenticate, validateBody(addArchSchema), addArch);

/**
 * @swagger
 * /archs/update-arch:
 *   put:
 *     summary: Update an existing arch
 *     tags: [Archs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateArch'
 *     responses:
 *       200:
 *         description: Arch successfully updated.
 *       404:
 *         description: Arch not found.
 *       500:
 *         description: Internal server error.
 */
router.put('/update-arch', authenticate, validateBody(updateArchSchema), updateArch);

/**
 * @swagger
 * /archs/delete-archs:
 *   delete:
 *     summary: Delete multiple archs
 *     tags: [Archs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteArchs'
 *     responses:
 *       200:
 *         description: Archs successfully deleted.
 *       404:
 *         description: No archs found to delete.
 *       500:
 *         description: Internal server error.
 */
router.delete('/delete-archs', authenticate, validateBody(deleteArchsSchema), deleteArchs);

router.get('/get-archs-for-sector', authenticate, getArchsForSector);
router.get('/verify', authenticate, verifyApi)

router.post('/autoGenerate', validateBody(autoGenerateSchema), autoGenerate)

module.exports = router;