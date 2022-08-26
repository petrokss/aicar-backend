import { FindOptionsWhere } from 'typeorm';
import config from '../config';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import { signJwt } from '../utils/jwt';
import { createUserInput } from '../schemas/user.schema';

const userRepository = AppDataSource.getRepository(User);

export const createUser = async (input: createUserInput) => {
  return await userRepository.save(userRepository.create(input));
};

export const findUser = async (query: FindOptionsWhere<User>) => {
  return await userRepository.findOneBy(query);
};

export const findUserById = async (userId: number) => {
  return await userRepository.findOneBy({ id: userId });
};

export const signTokens = (user: User) => {
  const accessToken = signJwt(
    { sub: user.id, role: user.role },
    {
      expiresIn: `${config.accessTokenExpiresIn || 10}m`
    }
  );
  return { accessToken };
};
