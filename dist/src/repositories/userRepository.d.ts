import { User } from "../entities";
import { Repository } from "typeorm";
declare class UserRepository extends Repository<User> {
    findByEmail(email: string): Promise<User | undefined>;
    findByUUID(uuid: string | undefined): Promise<User | undefined>;
}
export default UserRepository;
