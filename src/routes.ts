import { Router } from 'express';
import multer from 'multer';

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';

import { isAuthenticated } from './middlewares/isAuthenticated';

import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';

import { CreateProductController } from './controllers/product/CreateProductController';

import uploadConfig from './config/multer';
import { ListByCategoryController } from './controllers/product/ListByCategoryController';
import { CreateOrderController } from './controllers/order/CreateOrderController';
import { DeleteOrderController } from './controllers/order/DeleteOrderController';
import { AddItemController } from './controllers/order/AddItemController';
import { DeleteItemController } from './controllers/order/DeleteItemController';
import { SendOrderController } from './controllers/order/SendOrderController';
import { ListOrdersController } from './controllers/order/ListOrdersController';
import { DetailOrderController } from './controllers/order/DetailOrderController';
import { FinishOrderController } from './controllers/order/FinishOrderController';

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

/* ROTAS USER */
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me', isAuthenticated, new DetailUserController().handle);

/* ROTAS CATEGORY */
router.post('/category', isAuthenticated, new CreateCategoryController().handle);
router.get('/categories', isAuthenticated, new ListCategoryController().handle);

/* ROTAS PRODUCTS */
// router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle);
router.post('/product', isAuthenticated, new CreateProductController().handle);
router.get('/category/product', isAuthenticated, new ListByCategoryController().handle);

/* ROTAS ORDERS */
router.post('/order', isAuthenticated, new CreateOrderController().handle);
router.delete('/order', isAuthenticated, new DeleteOrderController().handle);
router.get('/orders', isAuthenticated, new ListOrdersController().handle);

router.post('/order/add', isAuthenticated, new AddItemController().handle);
router.delete('/order/delete', isAuthenticated, new DeleteItemController().handle);
router.put('/order/send', isAuthenticated, new SendOrderController().handle);
router.get('/order/detail', isAuthenticated, new DetailOrderController().handle);
router.put('/order/finish', isAuthenticated, new FinishOrderController().handle);

export { router };