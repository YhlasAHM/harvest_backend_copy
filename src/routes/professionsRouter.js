const router = require('express').Router();
const { addProfession, getAllProfessions, updateProfession, deleteProfessions, verifyApi } = require('../controllers/professionsController');
const { validateBody } = require('../scripts/helpers/schemaValidate');
const {
  addProfessionSchema,
  updateProfessionSchema,
  deleteProfessionsSchema
} = require('../scripts/schemas/professionsSchemas');
const { authenticate } = require('../scripts/helpers/authenticate');

/**
 * @swagger
 * /professions/get-all-professions:
 *   get:
 *     summary: Retrieve all professions
 *     tags: [Professions]
 *     responses:
 *       200:
 *         description: A list of professions.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Profession'
 *       500:
 *         description: Internal server error.
 */
router.get('/get-all-professions', getAllProfessions);

/**
 * @swagger
 * /professions/add-profession:
 *   post:
 *     summary: Add a new profession
 *     tags: [Professions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddProfession'
 *     responses:
 *       200:
 *         description: Profession successfully created.
 *       400:
 *         description: Validation error.
 *       500:
 *         description: Internal server error.
 */
router.post('/add-profession', validateBody(addProfessionSchema), addProfession);

/**
 * @swagger
 * /professions/update-profession:
 *   put:
 *     summary: Update an existing profession
 *     tags: [Professions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProfession'
 *     responses:
 *       200:
 *         description: Profession successfully updated.
 *       404:
 *         description: Profession not found.
 *       500:
 *         description: Internal server error.
 */
router.put('/update-profession', validateBody(updateProfessionSchema), updateProfession);

router.delete('/delete-professions', validateBody(deleteProfessionsSchema), deleteProfessions);

router.get('/verify', authenticate, verifyApi)

module.exports = router;