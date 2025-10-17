const router = require('express').Router();
const {
  getAllObjects,
  addObject,
  updateObject,
  deleteObjects,
  verifyApi,
} = require('../controllers/objectController');
const { validateBody } = require('../scripts/helpers/schemaValidate');
const {
  addObjectSchema,
  updateObjectSchema,
  deleteMultipleObjectsSchema
} = require('../scripts/schemas/objectsSchemas');
const { authenticate } = require('../scripts/helpers/authenticate');

/**
 * @swagger
 * /objects/get-all-objects:
 *   get:
 *     summary: Retrieve all objects
 *     tags: [Objects]
 *     responses:
 *       200:
 *         description: A list of objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Object'
 *       500:
 *         description: Internal server error.
 */
router.get('/get-all-objects', authenticate, getAllObjects);

/**
 * @swagger
 * /objects/add-object:
 *   post:
 *     summary: Add a new object
 *     tags: [Objects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddObject'
 *     responses:
 *       200:
 *         description: Object successfully created.
 *       400:
 *         description: Validation error.
 *       500:
 *         description: Internal server error.
 */
router.post('/add-object', authenticate, validateBody(addObjectSchema), addObject);

/**
 * @swagger
 * /objects/update-object:
 *   put:
 *     summary: Update an existing object
 *     tags: [Objects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateObject'
 *     responses:
 *       200:
 *         description: Object successfully updated.
 *       404:
 *         description: Object not found.
 *       500:
 *         description: Internal server error.
 */
router.put('/update-object', authenticate, validateBody(updateObjectSchema), updateObject);

/**
 * @swagger
 * /objects/delete-multiple-objects:
 *   delete:
 *     summary: Delete multiple objects
 *     tags: [Objects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteMultipleObjects'
 *     responses:
 *       200:
 *         description: Objects successfully deleted.
 *       404:
 *         description: No objects found to delete.
 *       500:
 *         description: Internal server error.
 */
router.delete('/delete-multiple-objects', authenticate, validateBody(deleteMultipleObjectsSchema), deleteObjects);

router.get('/verify', authenticate, verifyApi)

module.exports = router;