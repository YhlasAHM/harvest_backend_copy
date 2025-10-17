const router = require('express').Router();
const { getAllGrades, addGrade, updateGrade, deleteGrades, verifyApi } = require('../controllers/gradeController');
const { validateBody } = require('../scripts/helpers/schemaValidate');
const { addGradeSchema, updateGradeSchema, deleteGradesSchema } = require('../scripts/schemas/gradeSchemas');
const { authenticate } = require('../scripts/helpers/authenticate');

/**
 * @swagger
 * /grade/get-all-grades:
 *   get:
 *     summary: Retrieve all grades
 *     tags: [Grades]
 *     responses:
 *       200:
 *         description: A list of grades.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Grade'
 *       500:
 *         description: Internal server error.
 */
router.get('/get-all-grades', authenticate, getAllGrades);

/**
 * @swagger
 * /grade/add-grade:
 *   post:
 *     summary: Add a new grade
 *     tags: [Grades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddGrade'
 *     responses:
 *       200:
 *         description: Grade successfully created.
 *       400:
 *         description: Validation error.
 *       500:
 *         description: Internal server error.
 */
router.post('/add-grade', authenticate, validateBody(addGradeSchema), addGrade);

/**
 * @swagger
 * /grade/update-grade:
 *   put:
 *     summary: Update an existing grade
 *     tags: [Grades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateGrade'
 *     responses:
 *       200:
 *         description: Grade successfully updated.
 *       404:
 *         description: Grade not found.
 *       500:
 *         description: Internal server error.
 */
router.put('/update-grade', authenticate, validateBody(updateGradeSchema), updateGrade);

router.delete('/delete-grades', authenticate, validateBody(deleteGradesSchema), deleteGrades);

router.get('/verify', authenticate, verifyApi)

module.exports = router;