const router = require('express').Router();
const { getAllAttributes, addAttribute, updateAttribute, deleteAttributes } = require('../controllers/attributesController');
const { validateBody } = require('../scripts/helpers/schemaValidate');
const { addAttributeSchema, updateAttributeSchema, deleteAttributesSchema } = require('../scripts/schemas/attributesSchemas');
const { authenticate } = require('../scripts/helpers/authenticate');

/**
 * @swagger
 * /attributes/get-all-attributes:
 *   get:
 *     summary: Retrieve all attributes
 *     tags: [Attributes]
 *     responses:
 *       200:
 *         description: A list of attributes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Attribute'
 *       500:
 *         description: Internal server error.
 */
router.get('/get-all-attributes', authenticate, getAllAttributes);

/**
 * @swagger
 * /attributes/add-attribute:
 *   post:
 *     summary: Add a new attribute
 *     tags: [Attributes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddAttribute'
 *     responses:
 *       200:
 *         description: Attribute successfully created.
 *       400:
 *         description: Validation error.
 *       500:
 *         description: Internal server error.
 */
router.post('/add-attribute', authenticate, validateBody(addAttributeSchema), addAttribute);

/**
 * @swagger
 * /attributes/update-attribute:
 *   put:
 *     summary: Update an existing attribute
 *     tags: [Attributes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAttribute'
 *     responses:
 *       200:
 *         description: Attribute successfully updated.
 *       404:
 *         description: Attribute not found.
 *       500:
 *         description: Internal server error.
 */
router.put('/update-attribute', authenticate, validateBody(updateAttributeSchema), updateAttribute);

router.delete('/delete-attributes', authenticate, validateBody(deleteAttributesSchema), deleteAttributes);

module.exports = router;