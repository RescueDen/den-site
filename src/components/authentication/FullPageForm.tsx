import React, {ReactNode} from "react";
import {Grid} from "semantic-ui-react";


interface FullPageFormProps {
    children: ReactNode
}

const FullPageForm = (props: FullPageFormProps) => {
    return (
        <div className='login-form' style={{height: '100vh'}}>
            {/*Setup the grid to take up the entire */}
            <Grid textAlign='center' style={{height: '100%'}} verticalAlign='middle'>
                {/*Place one column in the middle of the page*/}
                <Grid.Column style={{maxWidth: 450}}>
                    {props.children}
                </Grid.Column>
            </Grid>
        </div>

    )
}

export default FullPageForm