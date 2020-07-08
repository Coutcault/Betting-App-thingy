import React, { useState, useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css'


export default function History(){
  const [pastBets, setPastBets] = useState([])
  const [previousBets, setPreviousBets] = useState([])
 
  const useStateWithSessionStorage = (key) => {
    const [data, setData] = useState(sessionStorage.getItem('token') || "");
    return data
    }
  const auth_token = useStateWithSessionStorage()

  useEffect(() => {
    const getPastBets = async () => {
        const data = {
            auth_token: auth_token
        }
        const configs= {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            mode: "cors",
            body: JSON.stringify(data)
        }
        const response = await fetch("http://localhost:5000/get_all_past_bets", configs);
        const output = await response.json();
        setPastBets(output)
        }
      getPastBets();
        const getPreviousBets = async () => {
        const data = {
            auth_token: auth_token
            }
        const configs= {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            mode: "cors",
            body: JSON.stringify(data)
        }
            const response = await fetch("http://localhost:5000/get_all_previous_bets", configs);
            const output1 = await response.json();
            setPreviousBets(output1)
        }
      getPreviousBets();
    const M = window.M;
    document.addEventListener('DOMContentLoaded', function() {
        const elems = document.querySelectorAll('.modal');
        const instances = M.Modal.init(elems, {});
  })
 }, []  
)

  console.log(pastBets)
  console.log(previousBets)
  return (
    <div class='container'>
      {pastBets.map(
        (bet) => {
          return (
    
          <ul class="collection">
            <li class="collection-item">{bet[9].slice(0, 15)}</li>
              <li>{bet[13]} ${bet[12]} to {bet[5]}</li>
              <li>Details: {bet[10]}</li>
              <li>{bet[6]} : {bet[7]} Line : {bet[8]}</li>
              <li>Risked: ${bet[11]}</li>
              <li>To Win: ${bet[12]}</li>              
          </ul>
      )})}

      {previousBets.map(
        (bet) => {
          return (
            <ul class="collection">
            <li class="collection-item">{bet[9].slice(0, 15)}</li>
              <li>{bet[13]} ${bet[12]} to {bet[2]}</li>
              <li>Details: {bet[10]}</li>
              <li>{bet[6]} : {bet[7]} Line : {bet[8]}</li>
              <li>Risked: ${bet[11]}</li>
              <li>To Win: ${bet[12]}</li>               
          </ul>
      )})}


    </div>
  )

}