import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  Ctx,
  UseMiddleware,
  Int,
} from 'type-graphql'
import {compare, hash} from 'bcryptjs'
import {verify} from 'jsonwebtoken'

import {isAuth} from './isAuth'
import {User} from './entity/User'
import {MyContext} from './MyContext'
import {sendRefreshToken} from './sendRefreshToken'
import {createAccessToken, createRefreshToken} from './auth'
import {getConnection} from 'typeorm'

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string
  @Field(() => User)
  user: User
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return 'Hi!'
  }

  @Query(() => String)
  @UseMiddleware(isAuth)
  bye(@Ctx() {payload}: MyContext) {
    console.log({payload})
    return `Your user Id is: ${payload!.userId}`
  }

  @Query(() => [User])
  users() {
    return User.find()
  }

  @Mutation(() => Boolean)
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string,
  ) {
    const hashPassword = await hash(password, 12)

    try {
      await User.insert({
        email,
        password: hashPassword,
      })
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }

  @Query(() => User, {nullable: true})
  me(@Ctx() context: MyContext) {
    const authorization = context.req.headers['authorization']

    if (!authorization) {
      return null
    }

    try {
      const token = authorization.split(' ')[1]
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!)
      return User.findOne(payload.userId)
    } catch (err) {
      console.log(err)
      return null
    }
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokenForUser(@Arg('userId', () => Int) userId: number) {
    await getConnection()
      .getRepository(User)
      .increment({id: userId}, 'tokenVersion', 1)

    return true
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() {res}: MyContext) {
    sendRefreshToken(res, '')

    return true
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() {res}: MyContext,
  ) {
    const user = await User.findOne({where: {email}})

    if (!user) {
      throw new Error('Could not find user')
    }

    const valid = await compare(password, user.password)

    if (!valid) {
      throw new Error('bad password')
    }

    // login successful

    sendRefreshToken(res, createRefreshToken(user))

    return {
      accessToken: createAccessToken(user),
      user,
    }
  }
}
