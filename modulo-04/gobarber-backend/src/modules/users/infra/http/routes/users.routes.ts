import { Router } from "express";
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import uploadConfig from '../../../../../config/upload';
import ensureAuthentication from '../../middlewares/ensureAuthentication';
import UserAvatarController from "../controllers/UserAvatarController";
import UsersController from "../controllers/UsersController";

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
// single -> upload unico arquivo
// array -> upload de varios arquivos

usersRouter.post('/', celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(), 
        email: Joi.string().email().required(),
        password: Joi.string().required(), 
    }
}), usersController.create);

usersRouter.patch('/avatar', ensureAuthentication, upload.single('avatar'), userAvatarController.update);

export default usersRouter;
