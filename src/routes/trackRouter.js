const router = require('express').Router();
const { getAllTracks, addTrack, updateTrack, deleteTracks, verifyApi } = require('../controllers/trackController');
const { validateBody } = require('../scripts/helpers/schemaValidate');
const { addTrackSchema, updateTrackSchema, deleteTracksSchema } = require('../scripts/schemas/trackSchemas');
const { authenticate } = require('../scripts/helpers/authenticate');

/**
 * @swagger
 * /track/get-all-tracks:
 *   get:
 *     summary: Retrieve all tracks
 *     tags: [Tracks]
 *     responses:
 *       200:
 *         description: A list of tracks.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Track'
 *       500:
 *         description: Internal server error.
 */
router.get('/get-all-tracks', authenticate, getAllTracks);

/**
 * @swagger
 * /track/add-track:
 *   post:
 *     summary: Add a new track
 *     tags: [Tracks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddTrack'
 *     responses:
 *       200:
 *         description: Track successfully created.
 *       400:
 *         description: Validation error.
 *       500:
 *         description: Internal server error.
 */
router.post('/add-track', authenticate, validateBody(addTrackSchema), addTrack);

/**
 * @swagger
 * /track/update-track:
 *   put:
 *     summary: Update an existing track
 *     tags: [Tracks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTrack'
 *     responses:
 *       200:
 *         description: Track successfully updated.
 *       404:
 *         description: Track not found.
 *       500:
 *         description: Internal server error.
 */
router.put('/update-track', authenticate, validateBody(updateTrackSchema), updateTrack);

/**
 * @swagger
 * /track/delete-tracks:
 *   delete:
 *     summary: Delete multiple tracks
 *     tags: [Tracks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteTracks'
 *     responses:
 *       200:
 *         description: Tracks successfully deleted.
 *       404:
 *         description: No tracks found to delete.
 *       500:
 *         description: Internal server error.
 */
router.delete('/delete-tracks', authenticate, validateBody(deleteTracksSchema), deleteTracks);

router.get('/verify', authenticate, verifyApi)

module.exports = router;