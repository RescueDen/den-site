import CawsAnimal from "../models/ShelterAnimal";
import ArticlesSummary from "../models/ArticlesSummary";

/**
 * This model describes the authorisation
 */
export default interface InfoState {
    infoSummary: ArticlesSummary;
    insideSummary?:ArticlesSummary;
}
