import { EntityRepository, Repository } from "typeorm";
import Buy from "../entities/buy";

@EntityRepository(Buy)
class BuyRepository extends Repository<Buy> {}

export default BuyRepository;
