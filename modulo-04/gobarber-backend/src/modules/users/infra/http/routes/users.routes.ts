import { Router } from "express";
import multer from 'multer';
import uploadConfig from '../../../../../config/upload';
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";
import CreateUserService from "../../../services/CreateUserService";
import UpdateUserAvatarService from "../../../services/UpdateUserAvatarService";
import ensureAuthentication from '../../middlewares/ensureAuthentication';
import { container } from "tsyringe";

const usersRouter = Router();

const upload = multer(uploadConfig);
// single -> upload unico arquivo
// array -> upload de varios arquivos

usersRouter.post('/', async (req, res) => {

    const { name, email, password } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({ name, email, password });

    return res.json(user);
  
});

usersRouter.patch('/avatar', ensureAuthentication, upload.single('avatar'), async (req, res) => {
      
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);
    const user = await updateUserAvatar.execute({
      user_id: req.user.id,
      avatarFileName: req.file.filename,
    });

    return res.json(user)
  
});

export default usersRouter;
