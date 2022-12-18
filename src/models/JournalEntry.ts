export interface JournalEntry {

    //Basic params
    id?: number;
    type: string;
    date: Date;

    //Store an id for the animal and person
    authorId?: number;
    authorName?: string;
    animalId: number;

    //And the content
    content: string;
}

