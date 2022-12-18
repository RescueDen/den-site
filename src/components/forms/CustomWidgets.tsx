import {Widget, WidgetProps} from "@rjsf/utils";

import MyFosterSelection from "./MyFosterSelection";
import {Species} from "../../models/ShelterAnimal";
import React from "react";


/**
 * Define a custom widget for animalId
 * @param props
 * @constructor
 */
const dogIdWidget = (props: WidgetProps) => {
    return (<MyFosterSelection
        allowMultiple={false}
        species={[Species.dog] as Species[]}
        widgetProps={props}
    />);
};

/**
 * Define a custom widget for animalId
 * @param props
 * @constructor
 */
const catIdWidget = (props: WidgetProps) => {
    return (<MyFosterSelection
        allowMultiple={true}
        species={[Species.cat] as Species[]}
        widgetProps={props}
    />);
};

/**
 * Define a custom widget for animalId
 * @param props
 * @constructor
 */
const animalIdWidget = (props: WidgetProps) => {
    return (<MyFosterSelection
        allowMultiple={false}
        species={[Species.cat, Species.dog] as Species[]}
        widgetProps={props}
    />);
};


//Define the list of custom widgets
const customWidgets: { [name: string]: Widget } = {
    "animalIdWidget": animalIdWidget, "dogIdWidget": dogIdWidget, "catIdWidget": catIdWidget
}


//TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = {
export default customWidgets;

