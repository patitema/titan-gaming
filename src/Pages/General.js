import React from 'react';
import '../assets/styles/General.css'
import Nav from "../components/Navbar/Nav"

function General() {
    return (
        <div>
            <Nav />
            <header>
                <div class="container">
                    <img src="/images/Header_pc.png" alt=""></img>
                </div>
                <h2>Серия <span>HYPERBASHMAK 3</span> уже в продаже</h2>
            </header>
            <main>
            </main>
        </div>
    );
}

export default General;
