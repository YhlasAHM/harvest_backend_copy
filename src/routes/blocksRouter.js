const router = require('express').Router();
const { addBlock, getAllBlocks, updateBlock, deleteBlocks, verifyApi } = require('../controllers/blocksController');
const { validateBody } = require('../scripts/helpers/schemaValidate');
const { addBlockSchema, updateBlockSchema, deleteBlocksSchema } = require('../scripts/schemas/blocksSchemas');
const { authenticate } = require('../scripts/helpers/authenticate');

/**
 * @swagger
 * /blocks/get-all-blocks:
 *   get:
 *     summary: Retrieve all blocks
 *     tags: [Blocks]
 *     responses:
 *       200:
 *         description: A list of blocks.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Block'
 *       500:
 *         description: Internal server error.
 */
router.get('/get-all-blocks', authenticate, getAllBlocks);

/**
 * @swagger
 * /blocks/add-block:
 *   post:
 *     summary: Add a new block
 *     tags: [Blocks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddBlock'
 *     responses:
 *       200:
 *         description: Block successfully created.
 *       400:
 *         description: Validation error.
 *       500:
 *         description: Internal server error.
 */
router.post('/add-block', authenticate, validateBody(addBlockSchema), addBlock);

/**
 * @swagger
 * /blocks/update-block:
 *   put:
 *     summary: Update an existing block
 *     tags: [Blocks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateBlock'
 *     responses:
 *       200:
 *         description: Block successfully updated.
 *       404:
 *         description: Block not found.
 *       500:
 *         description: Internal server error.
 */
router.put('/update-block', authenticate, validateBody(updateBlockSchema), updateBlock);

/**
 * @swagger
 * /blocks/delete-blocks:
 *   delete:
 *     summary: Delete multiple blocks
 *     tags: [Blocks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteBlocks'
 *     responses:
 *       200:
 *         description: Blocks successfully deleted.
 *       404:
 *         description: No blocks found to delete.
 *       500:
 *         description: Internal server error.
 */
router.delete('/delete-blocks', authenticate, validateBody(deleteBlocksSchema), deleteBlocks);

router.get('/verify', authenticate, verifyApi)

module.exports = router;