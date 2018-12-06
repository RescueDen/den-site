import CawsAnimal from "../models/CawsAnimal";

/**
 * This model describes the authorisation
 */
export default interface AnimalState {
    animals: { [id: number]: CawsAnimal; }
}
