const router = require('express').Router();
const { getAllMaterials, addMaterial, updateMaterial, deleteMaterials, verifyApi } = require('../controllers/materialsController');
const { validateBody } = require('../scripts/helpers/schemaValidate');
const { addMaterialSchema, updateMaterialSchema, deleteMaterialsSchema } = require('../scripts/schemas/materialsSchemas');
const { authenticate } = require('../scripts/helpers/authenticate');

/**
 * @swagger
 * /materials/get-all-materials:
 *   get:
 *     summary: Retrieve all materials
 *     tags: [Materials]
 *     responses:
 *       200:
 *         description: A list of materials.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Material'
 *       500:
 *         description: Internal server error.
 */
router.get('/get-all-materials', getAllMaterials);

/**
 * @swagger
 * /materials/add-material:
 *   post:
 *     summary: Add a new material
 *     tags: [Materials]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddMaterial'
 *     responses:
 *       200:
 *         description: Material successfully created.
 *       400:
 *         description: Validation error.
 *       500:
 *         description: Internal server error.
 */
router.post('/add-material', validateBody(addMaterialSchema), addMaterial);

/**
 * @swagger
 * /materials/update-material:
 *   put:
 *     summary: Update an existing material
 *     tags: [Materials]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateMaterial'
 *     responses:
 *       200:
 *         description: Material successfully updated.
 *       404:
 *         description: Material not found.
 *       500:
 *         description: Internal server error.
 */
router.put('/update-material', validateBody(updateMaterialSchema), updateMaterial);

router.delete('/delete-materials', validateBody(deleteMaterialsSchema), deleteMaterials);

router.get('/verify', authenticate, verifyApi)

module.exports = router;