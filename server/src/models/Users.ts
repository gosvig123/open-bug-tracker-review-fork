import exp from "constants"
import prisma from "../lib/prisma"


class User {
  constructor(
    public id: number,
    public username: string,
    public expiresIn: number
  ) { }

  static async login(githubId: number, accessToken: string, user: string, expiresIn: number): Promise<User> {
    const { id } = await prisma.user.upsert({
      where: {
        id: githubId
      },
      update: {
        github_token: accessToken,
        github_token_expires: expiresIn
      },
      create: {
        id: githubId,
        github_token: accessToken,
        github_token_expires: expiresIn,
        github_user: user
      }
    })
    return new User(id, user, expiresIn)
  }
}

export default User