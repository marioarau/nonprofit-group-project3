import React from "react";

export function NonprofitList({ children }) {
    return (
        <ul className="list-group">{children}</ul>
    );
};

export function NonprofitListItem({
    id,
    orgName,
    city,
    state,
    orgFocus,
    url,
    clickEvent,
    saved
}) {

    return (
        <li className="list-group-item m-2">

            <div className="float-right">
                {!saved ? (
                    <button
                        className="btn btn-success"
                        onClick={event => clickEvent(event, id, orgName, city, state, orgFocus, url)}>Save
                    </button>
                ) : (
                    <button 
                        className="btn btn-danger" 
                        onClick={event => clickEvent(event, id)}>Unsave
                    </button>
                    )
                }
                <button id="donate" className="btn btn-primary ml-2 mr-2" href="/donate" target="_blank" rel="noopener noreferrer">Donate</button>
            </div>
            
            <h3 className="font-weight-bold">{orgName}</h3>

            <h4>{orgFocus}</h4>

            <h5>{city} {state}</h5>

            <button href={url}>Link to Organization</button>

        </li>

    )
}