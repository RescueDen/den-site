import {ListingData} from "./ContentListing";
import {ItemData} from "./ItemData";

export interface CourseListingData extends ListingData {
    items?: CourseData[]
}

export interface CourseData extends ItemData {
    lessons: LessonData[]
}

export interface LessonData {
    name: number;
    infoId?: string;
    videoId?: string;
    formId?: string;
    embeddedUrl?: string;
}

export default class CourseListing {
    public readonly courseListingData: CourseListingData

    constructor(courseListingData: CourseListingData) {
        this.courseListingData = courseListingData;
    }

    public getCourse(id: string): CourseData | undefined {
        if (this.courseListingData.items) {
            for (let l = 0; l < this.courseListingData.items.length; l++) {
                if (this.courseListingData.items[l].id === id) {
                    return this.courseListingData.items[l];
                }
            }
        }
        return undefined
    }

    public empty(): boolean {
        return this.courseListingData.items?.length == 0;
    }
}

