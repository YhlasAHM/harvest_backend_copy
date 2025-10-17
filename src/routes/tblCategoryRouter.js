const router = require('express').Router();
const { addCategory, updateCategory, deleteCategory, getAllCategories, verifyApi } = require('../controllers/tblCategoryController');
const { validateBody } = require('../scripts/helpers/schemaValidate')
const { authenticate } = require('../scripts/helpers/authenticate');
const { addCategorySchema, updateCategorySchema, deleteCategorySchema } = require('../scripts/schemas/tblCategoriesSchemas');

router.get('/get-all-categories', getAllCategories);

router.post('/add-category', validateBody(addCategorySchema), addCategory);

router.put('/update-category', validateBody(updateCategorySchema), updateCategory);

router.delete('/delete-categories', validateBody(deleteCategorySchema), deleteCategory);

router.get('/verify', authenticate, verifyApi)

module.exports = router;