import React from 'react';

import {Icon, Segment, Container, Grid, Placeholder, Label, Loader, Button, Responsive} from "semantic-ui-react";
import {AdoptionStat, Stats} from "../../models/Stats";
import {statsService} from "../../services/stats.service";
import * as d3 from "d3";
import {DSVRowString} from "d3";
import {DSVRowArray,Simulation} from "d3";
import {ValueFn} from "d3";
// import "./LivesSavedDisplay.css";
import {ResponsiveOnUpdateData} from "semantic-ui-react/dist/commonjs/addons/Responsive";
//Pass in the year

interface MyProps{
    //Store the current width and height
    width:number;
    height:number;
    //Keep the internal state of options
    adoptions: AdoptionStat[];



}




class LivesSavedD3 extends React.Component<MyProps> {
    private readonly myRef: React.RefObject<SVGSVGElement>;

    constructor(props:MyProps) {
        super(props);
        this.myRef = React.createRef();
    }
    /**
     * No need to keep the article in the app state.  Keep locally to allow it to be removed from mem
     */
    componentDidMount(){

        //Set some basic params
        const velocityDecay = 0.15;
        const forceStrength = 0.03;



        //Define the upper and lower bounds of the radius
        let radiusScale:d3.ScaleLinear<number, number> = d3.scaleLinear()
            .domain([0, 100])
            .range([5, 30]);

        //Define the base line colors
        let colorScale: d3.ScaleSequential<unknown>  = d3.scaleSequential(d3.interpolateRainbow)
            .domain([0, 100])
            .interpolator(d3.interpolateRainbow);

        //Define the base line limits on height
        let heightScale: d3.ScaleLinear<number, number> = d3.scaleLinear()
            .domain([0, 100])
            .range([0, this.props.height]);

        //Map the adoption data to nodes
        let nodes = this.props.adoptions.map(d => {
            return {
                radius: radiusScale( Math.round(Math.random() * 100) ),
                fill: colorScale(d.ID),
                x: Math.random() * this.props.width,
                y: heightScale(d.ID),
                THUMBNAILURL: d.THUMBNAILURL,
                ID:d.ID
            }
        });

        //Define function to make image txt
        const img_id = function(d:any){ return "img_" + d.ID; }
        const img_url = function(d:any){ return "url(#img_" + d.ID + ")"; }



        //Append defs to the svg
        let defs = d3.select(this.myRef.current).append("defs");


        // create an svg element
        let imgPattern = defs.selectAll("pattern").data(nodes)
            .enter()
            .append("pattern")
            .attr("id", img_id)
            .attr("width", 1)
            .attr("height", 1)
            .attr("patternUnits", "objectBoundingBox")
            .append("image")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", d => { return 2.5*d.radius })
            .attr("height", d => { return 2.5*d.radius })
            .attr("xlink:href", function(d) {
                return d.THUMBNAILURL;
            })

        //Define the actual bubbles based upon the nodes
        let bubbles: string & d3.Selection<SVGCircleElement, { radius: any; fill: any; x: number; y: any; /*  Math.random() * height */ }, d3.BaseType, unknown> =
                d3.select(this.myRef.current)
                .selectAll('circle')
                .data(nodes)
                .enter()
                .append('circle')
                .attr('r', d => { return d.radius })
                .attr('stroke',"#aed957")
                .style("fill", img_url)
                .on('click',onClick)
                // @ts-ignore
                    .call(d3.drag()
                    .on('start', dragStarted)
                    .on('drag', dragged)
                    .on('end', dragEnded)


            )

        //The force simulation causes all of the nodes to fit
        let forceSimulation: d3.Simulation<d3.SimulationNodeDatum, undefined> = d3.forceSimulation()
            .nodes(nodes)
            .velocityDecay(velocityDecay)
            .on('tick', ticked)
            .force('x', d3.forceX().strength(forceStrength).x(this.props.width / 2))
            .force('y', d3.forceY().strength(forceStrength).y(this.props.height / 2))
            .force("charge", d3.forceManyBody().strength(charge))


        //Allow the movement of each of the particles
        function dragStarted(d:any) {
            console.log('start');
            forceSimulation.alphaTarget(0.3).restart()
        }

        //Allow the movement of each of the particles
        function dragged(d: any) {
            console.log('drag');
            /* bubbles.attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y); */
            d.fx = d3.event.x
            d.fy = d3.event.y
        }
        //Allow the movement of each of the particles
        function dragEnded(d: any) {
            console.log('end');
            delete d.fx;
            delete d.fy;
            forceSimulation.alphaTarget(0);
        }

        //Allow the movement of each of the particles
        function onClick(d: any) {
            window.location.assign("/animal/"+d.ID);
        }
        //This function steps in time
        function ticked() {
            bubbles
                .attr("cx", function (d) {
                    return d.x;
                })
                .attr("cy", function (d) {
                    return d.y;
                });
        }

        //Compute the radius as a function
        function radius(d:any) {
            return d.radius + 1
        }

        //The charge is used to compute the values
        function charge(d:any) {
            return -Math.pow(d.radius, 2) * forceStrength;
        }


        // function generateRandomData() {
        //     const data = [];
        //     for (let i = 0; i < 200; i++) {
        //         data.push(
        //             { randomNumber: Math.round(Math.random() * 100) }
        //         )
        //     }
        //     return data;
        // }
    };


    /**
     * Re-render every time this is called
     * @returns {*}
     */
    render() {

        return (
            <svg className="container"
                 ref={this.myRef}
                 width={this.props.width}
                 height={this.props.height}>
            </svg>


        );


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

export default LivesSavedD3;
