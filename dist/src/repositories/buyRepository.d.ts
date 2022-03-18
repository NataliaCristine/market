import { Repository } from "typeorm";
import Buy from "../entities/buy";
declare class BuyRepository extends Repository<Buy> {
}
export default BuyRepository;
