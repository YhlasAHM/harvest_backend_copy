const router = require('express').Router();
const { getAllGroups, addGroup, updateGroup, deleteGroups, verifyApi } = require('../controllers/groupsController');
const { validateBody } = require('../scripts/helpers/schemaValidate');
const { addGroupSchema, updateGroupSchema, deleteGroupsSchema } = require('../scripts/schemas/groupsSchemas');
const { authenticate } = require('../scripts/helpers/authenticate');

/**
 * @swagger
 * /groups/get-all-groups:
 *   get:
 *     summary: Retrieve all groups
 *     tags: [Groups]
 *     responses:
 *       200:
 *         description: A list of groups.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Group'
 *       500:
 *         description: Internal server error.
 */
router.get('/get-all-groups', getAllGroups);

/**
 * @swagger
 * /groups/add-group:
 *   post:
 *     summary: Add a new group
 *     tags: [Groups]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddGroup'
 *     responses:
 *       200:
 *         description: Group successfully created.
 *       400:
 *         description: Validation error.
 *       500:
 *         description: Internal server error.
 */
router.post('/add-group', validateBody(addGroupSchema), addGroup);

/**
 * @swagger
 * /groups/update-group:
 *   put:
 *     summary: Update an existing group
 *     tags: [Groups]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateGroup'
 *     responses:
 *       200:
 *         description: Group successfully updated.
 *       404:
 *         description: Group not found.
 *       500:
 *         description: Internal server error.
 */
router.put('/update-group', validateBody(updateGroupSchema), updateGroup);

router.delete('/delete-groups', validateBody(deleteGroupsSchema), deleteGroups);

router.get('/verify', authenticate, verifyApi)

module.exports = router;