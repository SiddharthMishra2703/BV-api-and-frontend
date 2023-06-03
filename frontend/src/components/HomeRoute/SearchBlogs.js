import React from 'react'

export default function SearchBlogs() {

    const blogs = [
        "NANO TECHNOLOGY",
        "GeForce RTX 4090",
        "Sophia, the AI Robot",
        "Controversy of FIFA world cup in Qatar",
        "Esports Gets Government Recognition",
        "CHANDRAYAAN-3 TO THE MOON",
        "Are Tattoo Healthy For Our Skin?",
        "The Myth of Adrenal Fatigue",
        "Tage Thompson’s development has the Sabres dreaming of the playoffs",
        "Style Tips on How to Wear Leggings – Outfits"
    ];
     
    let element = (title) => {
        const node = document.createElement("li");
        const textnode = document.createTextNode(title);
        node.appendChild(textnode);
        // document.getElementById("list").appendChild(node);
    }
    
    for(let i=0; i<blogs.length; i++){
        element(blogs[i]);
    }
    
    
    let searchBlog = () => {
        const myNode = document.getElementById("list");
        myNode.innerHTML = '';
        let filter = document.getElementById("search").value.toUpperCase();
        for(let i = 0; i<blogs.length; i++){
            if(blogs[i].toUpperCase().indexOf(filter) > -1){
                element(blogs[i]);
            }
        }
    }

    return (
        <>
            <input className='rounded-pill border border-primary' id="search" type="text" placeholder=" Search Blogs Here!" onKeyUp={searchBlog} />
            <div id="list"></div>
        </>
    )
}
