import {AchievementData} from "../models/Achievements";

/**
 * This model describes the achievements of a user
 */
export default interface AchievementsState {
    achievements: { [asmId: number]: AchievementData[]; }
}
