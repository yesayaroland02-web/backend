"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var categoryController_1 = require("../controllers/categoryController");
var router = express_1.default.Router();
router.get('/', categoryController_1.getCategories);
router.post('/', categoryController_1.createCategory);
exports.default = router;
