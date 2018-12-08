import React from 'react';
import ImageGallery, {ReactImageGalleryItem} from 'react-image-gallery';
import CawsAnimal from "../../../models/CawsAnimal";
import "react-image-gallery/styles/css/image-gallery.css"

//Add in the props
interface Props {
    animal:CawsAnimal;
}

const AnimalImageGallery =  (myProps:Props) =>{

    //create an array of images
    let imagesItems:ReactImageGalleryItem[] = [];


    //Add each one in props
    for(let imgURL of myProps.animal.data.IMGURLS){

        //Add it to the list
        imagesItems.push({
            original:imgURL,
            thumbnail:imgURL
        });
    }

    return <ImageGallery items={imagesItems} />;



};

export default AnimalImageGallery