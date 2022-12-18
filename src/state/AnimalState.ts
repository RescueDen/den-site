import ShelterAnimal from "../models/ShelterAnimal";

export default interface AnimalState {
    animals: { [id: number]: ShelterAnimal; }
}
