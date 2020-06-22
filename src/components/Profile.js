import React, { useState, useEffect } from 'react';






export default function profile () {

    // const [] = useState();
    // const [] = useState();
    // const [] = useState();
    // const [] = useState();
    // const [] = useState();

    const useStateWithSessionStorage = (key) => {
        const [data, setData] = useState(sessionStorage.getItem(key) || "");
        console.log([data, setData])
        return [data, setData]
        };
    // useEffect () {

    // }

    return (
        <div>
            
        </div>
    )

}