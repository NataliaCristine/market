import { User } from "../entities";
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(User)
class UserRepository extends Repository<User> {
  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        email,
      },
    });
    return user;
  }

  public async findByUUID(uuid: string | undefined): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        uuid,
      },
    });
    return user;
  }
}

export default UserRepository;
