// routes/serviceTypeRoutes.js
const express = require('express');
const router = express.Router();
const serviceTypeController = require('../controllers/serviceTypeController');

router.post('/', serviceTypeController.createServiceType);
router.get('/', serviceTypeController.getServiceTypes);
router.get('/:id', serviceTypeController.getServiceTypeById);
router.put('/:id', serviceTypeController.updateServiceType);
router.delete('/:id', serviceTypeController.deleteServiceType);

module.exports = router;