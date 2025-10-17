const router = require('express').Router();
const { getAllMaterialTypes, addMaterialType, updateMaterialType, deleteMaterialTypes, verifyApi } = require('../controllers/materialTypesController');
const { validateBody } = require('../scripts/helpers/schemaValidate');
const { addMaterialTypeSchema, updateMaterialTypeSchema, deleteMaterialTypesSchema } = require('../scripts/schemas/materialTypesSchemas');
const { authenticate } = require('../scripts/helpers/authenticate');

/**
 * @swagger
 * /material-types/get-all-material-types:
 *   get:
 *     summary: Retrieve all material types
 *     tags: [Material Types]
 *     responses:
 *       200:
 *         description: A list of material types.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MaterialType'
 *       500:
 *         description: Internal server error.
 */
router.get('/get-all-material-types', getAllMaterialTypes);

/**
 * @swagger
 * /material-types/add-material-type:
 *   post:
 *     summary: Add a new material type
 *     tags: [Material Types]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddMaterialType'
 *     responses:
 *       200:
 *         description: Material type successfully created.
 *       400:
 *         description: Validation error.
 *       500:
 *         description: Internal server error.
 */
router.post('/add-material-type', validateBody(addMaterialTypeSchema), addMaterialType);

/**
 * @swagger
 * /material-types/update-material-type:
 *   put:
 *     summary: Update an existing material type
 *     tags: [Material Types]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateMaterialType'
 *     responses:
 *       200:
 *         description: Material type successfully updated.
 *       404:
 *         description: Material type not found.
 *       500:
 *         description: Internal server error.
 */
router.put('/update-material-type', authenticate, validateBody(updateMaterialTypeSchema), updateMaterialType);

router.delete('/delete-material-types', authenticate, validateBody(deleteMaterialTypesSchema), deleteMaterialTypes);

router.get('/verify', authenticate, verifyApi)

module.exports = router;