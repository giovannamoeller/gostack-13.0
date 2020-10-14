import { inject, injectable } from 'tsyringe';

import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

interface Request {
    email: string;
}

@injectable()
class SendForgotPasswordEmailService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('MailProvider')
        private mailProvider: IMailProvider,
        @inject('UserTokenRepository')
        private userTokenRepository: IUserTokenRepository){}

    public async execute({ email }: Request): Promise<void> {

        const user = await this.usersRepository.findByEmail(email);

        if(!user) throw new AppError('Usuário não encontrado');

        await this.userTokenRepository.generate(user.id);
        
        this.mailProvider.sendMail(email, 'Pedido de recuperação de senha recebido');
    }

}

export default SendForgotPasswordEmailService;