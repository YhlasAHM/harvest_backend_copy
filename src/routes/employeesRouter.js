const router = require('express').Router();
const { addEmployee, getAllEmployees, updateEmployee, deleteEmployees, verifyApi } = require('../controllers/employeesController');
const { validateBody } = require('../scripts/helpers/schemaValidate');
const { addEmployeeSchema, updateEmployeeSchema, deleteEmployeesSchema } = require('../scripts/schemas/employeesSchemas');
const { authenticate } = require('../scripts/helpers/authenticate');

/**
 * @swagger
 * /employees/get-all-employees:
 *   get:
 *     summary: Retrieve all employees
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: A list of employees.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 *       500:
 *         description: Internal server error.
 */
router.get('/get-all-employees', getAllEmployees);

/**
 * @swagger
 * /employees/add-employee:
 *   post:
 *     summary: Add a new employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddEmployee'
 *     responses:
 *       200:
 *         description: Employee successfully created.
 *       400:
 *         description: Validation error.
 *       500:
 *         description: Internal server error.
 */
router.post('/add-employee', validateBody(addEmployeeSchema), addEmployee);

/**
 * @swagger
 * /employees/update-employee:
 *   put:
 *     summary: Update an existing employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateEmployee'
 *     responses:
 *       200:
 *         description: Employee successfully updated.
 *       404:
 *         description: Employee not found.
 *       500:
 *         description: Internal server error.
 */
router.put('/update-employee', validateBody(updateEmployeeSchema), updateEmployee);

router.delete('/delete-employees', validateBody(deleteEmployeesSchema), deleteEmployees);

router.get('/verify', authenticate, verifyApi)

module.exports = router;