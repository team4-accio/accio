import React, { Component } from "react";
import "./style.css";
import Card from "../Card";

class CollapseBody extends Component {
    constructor(props) {
        //console.log(props)
        super(props);
        this.state = {
            type: props.category,
            items: props.items
        }
    }