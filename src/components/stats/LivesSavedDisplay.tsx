import React from 'react';

import {Icon, Segment, Container, Grid, Placeholder, Label, Loader, Button} from "semantic-ui-react";
import {AdoptionStat, Stats} from "../../models/Stats";
import {statsService} from "../../services/stats.service";
import * as d3 from "d3";
import {DSVRowString} from "d3";
import {DSVRowArray,Simulation} from "d3";
import {ValueFn} from "d3";
import "./LivesSavedDisplay.css";
//Pass in the year

interface MyProps{
    year: number;
}

//Store the hub state
interface MyState{
    //Keep the internal state of options
    adoptions?: AdoptionStat[];
    error?:string;

    //Store the current width and height
    width:number;
    height:number;

}


class LivesSavedDisplay extends React.Component<MyProps, MyState> {
    state={adoptions:undefined, error:undefined, width:400, height:400}
    private readonly myRef: React.RefObject<SVGSVGElement>;

    constructor(props:MyProps) {
        super(props);
        this.myRef = React.createRef();
    }
    /**
     * No need to keep the article in the app state.  Keep locally to allow it to be removed from mem
     */
    componentDidMount(){
        //Get the data
        statsService.getAdoptionsByYear(this.props.year).then(
            //If successful html will be returned
            adoptionsReturn => {
                //Update the state
                this.setState({adoptions:adoptionsReturn});

            },
            //If there was an error, show to the user
            errorResponse => {
                //Dispatch the error
                try {
                    this.setState({error:errorResponse.response.data.message});
                }catch(e){
                    this.setState({error:errorResponse.toString()});

                }

            }
        );


        const height = 600;
        const width = 1000;
        const velocityDecay = 0.15;
        const forceStrength = 0.03;

        let nodes;
        let bubbles: string & d3.Selection<SVGCircleElement, { radius: any; fill: any; x: number; y: any; /*  Math.random() * height */ }, d3.BaseType, unknown>;

        let rawData = generateRandomData();
        let forceSimulation: d3.Simulation<d3.SimulationNodeDatum, undefined>;

        let radiusScale: d3.ScaleLinear<number, number>;
        let colorScale: d3.ScaleSequential<unknown>;
        let heightScale: d3.ScaleLinear<number, number>;


        radiusScale = d3.scaleLinear()
            .domain([0, 100])
            .range([5, 30]);

        colorScale = d3.scaleSequential(d3.interpolateRainbow)
            .domain([0, 100])
            .interpolator(d3.interpolateRainbow);

        heightScale = d3.scaleLinear()
            .domain([0, 100])
            .range([0, height]);

        nodes = rawData.map(d => {
            return {
                radius: radiusScale(d.randomNumber),
                fill: colorScale(d.randomNumber),
                x: Math.random() * width,
                y: heightScale(d.randomNumber)/*  Math.random() * height */
            }
        })

        /* console.log('node ', nodes);
        console.log('data', rawData); */

        /* nodes.sort((a, b) => b.radius - a.radius) */




        // d3.select(this.myRef.current)
        //     .append('svg')
        //     .attr('height', height)
        //     .attr('width', width)
        //

        bubbles = d3.select(this.myRef.current)
            .selectAll('circle')
            .data(nodes)
            .enter()
            .append('circle')
            .attr('r', d => { return d.radius })
            .attr('fill', d => 'salmon')
            .attr('stroke',
                // @ts-ignore
                d => {
                return d3.rgb('salmon').darker() })
            .call(d3.drag()
                .on('start', dragStarted)
                .on('drag', dragged)
                .on('end', dragEnded)
            )



        forceSimulation = d3.forceSimulation()
            .nodes(nodes)
            .velocityDecay(velocityDecay)
            .on('tick', ticked)
            .force('x', d3.forceX().strength(forceStrength).x(width / 2))
            .force('y', d3.forceY().strength(forceStrength).y(height / 2))
            .force("charge", d3.forceManyBody().strength(charge))


        function dragStarted(d:any) {
            console.log('start');
            forceSimulation.alphaTarget(0.3).restart()
        }
        function dragged(d: any) {
            console.log('drag');
            /* bubbles.attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y); */
            d.fx = d3.event.x
            d.fy = d3.event.y
        }

        function dragEnded(d: any) {
            console.log('end');
            delete d.fx;
            delete d.fy;
            forceSimulation.alphaTarget(0);
        }

        function ticked() {
            bubbles
                .attr("cx", function (d) {
                    return d.x;
                })
                .attr("cy", function (d) {
                    return d.y;
                });
        }

        function radius(d:any) {
            return d.radius + 1
        }

        function charge(d:any) {
            return -Math.pow(d.radius, 2) * forceStrength;
        }


        function generateRandomData() {
            const data = [];
            for (let i = 0; i < 200; i++) {
                data.push(
                    { randomNumber: Math.round(Math.random() * 100) }
                )
            }
            return data;
        }
    };


    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {

        return (
            <svg className="container"
                 ref={this.myRef}
                 width={this.state.width}
                 height={this.state.height}>
            </svg>

        );
        // //If we have no adoptions
        // if(!this.state.adoptions){
        //    return(
        //        <Segment>
        //             <Loader active />
        //
        //             <Placeholder.Header image>
        //                <Placeholder.Line />
        //                <Placeholder.Line />
        //             </Placeholder.Header>
        //             <Placeholder.Paragraph>
        //                <Placeholder.Line />
        //                <Placeholder.Line />
        //                <Placeholder.Line />
        //                <Placeholder.Line />
        //             </Placeholder.Paragraph>
        //         </Segment>
        //    )
        // }else{
        //     return(
        //         <div ref={this.myRef} />
        //
        //
        //
        //     );
        // }





    }

    generateRandomData= () => {
        const data = [];
        for (let i = 0; i < 200; i++) {
            data.push(
                { randomNumber: Math.round(Math.random() * 100) }
            )
        }
        return data;
    }
}

export default LivesSavedDisplay;

// {/*<Segment>*/}
// {/*        <div ref={this.myRef} />;*/}
// {/*        /!*{JSON.stringify(this.state.adoptions)}*!/*/}
// {/*        /!*{this.state.error &&*!/*/}
// {/*        /!*<p>{this.state.error}</p>*!/*/}
// {/*        }*/}
// {/*    </Segment>*/}