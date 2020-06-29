import React, { useState, useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css'

export default function BetReview() {

    useEffect();{
        const M = window.M;
        document.addEventListener('DOMContentLoaded', function() {
            const elems = document.querySelectorAll('.modal');
            const instances = M.Modal.init(elems, {});
        });
    }
    
    return(
        <div>
            <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Submit Ticket</a>

            <div id="modal1" class="modal">
            <div class="modal-content">
                <h4>Ticket Review</h4>
                <p>A bunch of text</p>
            </div>
            <div class="modal-footer">
                <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
            </div>
            </div>
        </div>
    );
}