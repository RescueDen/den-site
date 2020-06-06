import CawsAnimal from "../models/ShelterAnimal";

/**
 * This model describes the authorisation
 */
export default interface AnimalState {
    animals: { [id: number]: CawsAnimal; }
}
