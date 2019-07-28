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
            //Compute a random radius
            return {
                radius: radiusScale( Math.round(Math.random() * 100) ),
                x: Math.random() * this.props.width,
                y: Math.random()*this.props.height,//heightScale(d.ID),
                THUMBNAILURL: d.THUMBNAILURL,
                ID:d.ID,
                active:false
            }
        });

        //Define function to make image txt
        const img_id = function(d:any){ return "img_" + d.ID; }
        const img_url = function(d:any){ return "url(#img_" + d.ID + ")"; }



        //Append defs to the svg
        let defs = d3.select(this.myRef.current).append("defs");

        //Basic guidelines https://stackoverflow.com/questions/22883994/crop-to-fit-an-svg-pattern
        // create an svg element
        let imgPattern = defs.selectAll("pattern").data(nodes)
            .enter()
            .append("pattern")
            .attr("id", img_id)
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("patternContentUnits", "objectBoundingBox")
            .attr("viewBox", "0 0 150 150")
            .attr("preserveAspectRatio", "xMidYMid slice")
            .append("svg:image")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 150)
            .attr("height", 150)
            .attr("preserveAspectRatio", "xMidYMid slice")
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
                .attr('r', d => { return radius(d) })
                .attr('stroke',"#aed957")
                .attr('stroke-width', 3)
                .style("fill", "#fff")
                .style("fill", img_url)
                .on('click',onClick)
                .on('mouseover',function onClick(d: any) {
                    d3.select(this)
                        .transition()
                        .attr('r', 100);
                    //Bring to top
                    d3.select(this).raise();


                })
                .on('mouseout',function onClick(d: any) {
                        d3.select(this)
                            .transition()
                            .attr('r', d.radius);
                    })
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
            forceSimulation.alphaTarget(0.3).restart()
        }

        //Allow the movement of each of the particles
        function dragged(d: any) {
            /* bubbles.attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y); */
            d.fx = d3.event.x
            d.fy = d3.event.y
        }
        //Allow the movement of each of the particles
        function dragEnded(d: any) {
            delete d.fx;
            delete d.fy;
            forceSimulation.alphaTarget(0);
        }

        //Allow clicking away
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
            if(d.active) {
                return 100 + 1
            }else{
                return d.radius + 1
            }
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
