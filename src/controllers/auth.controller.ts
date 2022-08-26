import Koa from 'koa';
import config from '../config';
import { User, Role } from '../entity/User';
import { createUserInput, loginUserInput } from '../schemas/user.schema';
import { signTokens, createUser, findUser } from '../services/user.service';
import { verifyJwt, JwtPayload } from '../utils/jwt';
import { getErrorMessage, isErrorWithProperty } from '../utils/error.handling';

const cookiesOptions = {
  httpOnly: true,
  expires: new Date(
    Date.now() + Number(config.accessTokenExpiresIn) * 60 * 1000
  ),
  maxAge: Number(config.accessTokenExpiresIn) * 60 * 1000
};

export const loginUserHandler = async (ctx: Koa.Context): Promise<void> => {
  try {
    const { username, password }: loginUserInput = ctx.request.body;

    if (!username || !password) {
      ctx.status = 401;
      ctx.body = 'Username or password was not provided';
      return;
    }
    const user = await findUser({ email: username });
    if (!user) {
      ctx.status = 404;
      ctx.body = 'User not found';
      return;
    }
    const isPasswordValid = await User.comparePasswords(
      password,
      user.password
    );
    if (!isPasswordValid) {
      ctx.status = 401;
      ctx.body = 'Invalid password';
      return;
    }
    const { accessToken } = signTokens(user);

    ctx.cookies.set('access_token', accessToken, cookiesOptions);
    ctx.status = 201;
    ctx.body = { token: accessToken };
  } catch (error) {
    ctx.status = 500;
    ctx.body = getErrorMessage(error);
  }
};

export const registerUserHandler = async (ctx: Koa.Context) => {
  try {
    const {
      email,
      password,
      name,
      role = Role.USER
    }: createUserInput = ctx.request.body;
    const user = await createUser({
      email: email.toLowerCase(),
      password,
      name,
      role
    });
    ctx.status = 201;
    ctx.body = { user };
  } catch (error) {
    if (isErrorWithProperty(error, 'code') && error.code === '23505') {
      ctx.status = 409;
    } else {
      ctx.status = 500;
    }
    ctx.body = getErrorMessage(error);
  }
};

export const createUserHandler = async (ctx: Koa.Context) => {
  try {
    const cookiesAccessToken = ctx.cookies.get('access_token') || '';
    const decoded = verifyJwt(cookiesAccessToken) as JwtPayload;

    if (decoded && decoded.role === Role.ADMIN) {
      await registerUserHandler(ctx);
    } else {
      ctx.status = 403;
      ctx.body = 'Not enought permissions to create a new user';
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = getErrorMessage(error);
  }
};
