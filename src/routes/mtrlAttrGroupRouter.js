const router = require('express').Router();
const { getAllMtrlAttrGroups, addMtrlAttrGroup, updateMtrlAttrGroup, deleteMtrlAttrGroups } = require('../controllers/mtrlAttrGroupController');
const { validateBody } = require('../scripts/helpers/schemaValidate');
const { addMtrlAttrGroupSchema, updateMtrlAttrGroupSchema, deleteMtrlAttrGroupsSchema } = require('../scripts/schemas/mtrlAttrGroupSchemas');
const { authenticate } = require('../scripts/helpers/authenticate');

/**
 * @swagger
 * /mtrl-attr-group/get-all-mtrl-attr-groups:
 *   get:
 *     summary: Retrieve all material attribute groups
 *     tags: [Material Attribute Groups]
 *     responses:
 *       200:
 *         description: A list of material attribute groups.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MtrlAttrGroup'
 *       500:
 *         description: Internal server error.
 */
router.get('/get-all-mtrl-attr-groups', authenticate, getAllMtrlAttrGroups);

/**
 * @swagger
 * /mtrl-attr-group/add-mtrl-attr-group:
 *   post:
 *     summary: Add a new material attribute group
 *     tags: [Material Attribute Groups]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddMtrlAttrGroup'
 *     responses:
 *       200:
 *         description: Material attribute group successfully created.
 *       400:
 *         description: Validation error.
 *       500:
 *         description: Internal server error.
 */
router.post('/add-mtrl-attr-group', authenticate, validateBody(addMtrlAttrGroupSchema), addMtrlAttrGroup);

/**
 * @swagger
 * /mtrl-attr-group/update-mtrl-attr-group:
 *   put:
 *     summary: Update an existing material attribute group
 *     tags: [Material Attribute Groups]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateMtrlAttrGroup'
 *     responses:
 *       200:
 *         description: Material attribute group successfully updated.
 *       404:
 *         description: Material attribute group not found.
 *       500:
 *         description: Internal server error.
 */
router.put('/update-mtrl-attr-group', authenticate, validateBody(updateMtrlAttrGroupSchema), updateMtrlAttrGroup);

/**
 * @swagger
 * /mtrl-attr-group/delete-mtrl-attr-group:
 *   delete:
 *     summary: Delete a material attribute group
 *     tags: [Material Attribute Groups]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteMtrlAttrGroup'
 *     responses:
 *       200:
 *         description: Material attribute group successfully deleted.
 *       404:
 *         description: Material attribute group not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/delete-mtrl-attr-groups', authenticate, validateBody(deleteMtrlAttrGroupsSchema), deleteMtrlAttrGroups);

module.exports = router;