import 'reflect-metadata';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';


import AppError from '@shared/errors/AppError'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsers: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
    beforeEach(() => {
        fakeUsers = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        createUser = new CreateUserService(fakeUsers, fakeHashProvider);
    })
    it("should be able to create a new user", async () => {
        const user = await createUser.execute({ name: 'John Doe', email: 'johndoe@example.com', password: '123456'});
        expect(user).toHaveProperty('id');
    });

    it("should not be able to create a new user with same email from another", async () => {
        await createUser.execute({ name: 'John Doe', email: 'johndoe@example.com', password: '123456'});
        await expect(createUser.execute({ name: 'John Doe', email: 'johndoe@example.com', password: '123456'}))
            .rejects.toBeInstanceOf(AppError);
    });

});