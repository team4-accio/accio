import React from "react";
import "./style.css";
import moment from "moment";


function HistoryElem(props) {

    function returnStatus() {
        let textColor = "";
        props.status === "approved"
            ? textColor = "#228B22" //green
            : props.status === "pending"
                ? textColor = "#D6B300" //yellow
                : props.status === "rejected"
                    ? textColor = "#770001" //red
                    : textColor = "black";

        return (
            <p style={{ color: textColor }}>{props.status}</p>
        )
    }

    function returnDates(){
        
        let outDate = moment(props.out)
        let returnDate = moment(props.return)
        let isOut = props.status === "approved";
        let textColor = "";

        isOut && returnDate.isBefore(moment())
        ? textColor = "#770001" //red
        : isOut
        ? textColor = "#228B22" // green
        : textColor = "black"

        return (
            <p style={{ color: textColor }}>{outDate.format("DD MMM YYYY")} to {returnDate.format("DD MMM YYYY")}</p>
        )
    }
    

    return (

        <li className="collection-item avatar">
            <span className="title">{props.items[0].category}</span>
            {returnStatus()}
            {returnDates()}
        </li>
    );
}

export default HistoryElem;

