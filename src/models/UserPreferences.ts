/**
 Simply stores a group of options for easy display
 */
export interface OptionGroup {
    id: string
    name: string
    description: string

    //Store a list of options
    options: Option[]

    //We can also old other groups
    subgroups: OptionGroup[]
}


/**
 * Store the options for each value
 */
export interface Option {
    //Store the name of th option
    id: string
    name: string
    description: string

    //Store the type
    type: "int" | "string" | "float" | "bool"


    //Store min max types if possible
    maxValue?: number
    minValue?: number

    //Store a list of options
    selection?: string[]

    //Set if it is a hidden setting
    hidden: boolean
}


//Get the setting group
export interface SettingGroup {
    //And the value
    settings: { [id: string]: string; }

    //We can also old other groups
    subgroup: { [id: string]: SettingGroup; }
}


//Get the setting group
export interface UserPreferences {
    //And the value
    settings: SettingGroup

    //We can also old other groups
    options: OptionGroup
}
