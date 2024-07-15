const map = L.map('map').setView([22.515562500000044, 88.35596079900006], 12);

var OSM = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors / Coded by <a href="https://www.linkedin.com/in/subhajitsau/"> Subhajit Sau &#128526</a>'
}).addTo(map);

var CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors / Coded by <a href="https://www.linkedin.com/in/subhajitsau/"> Subhajit Sau &#128526</a>',
    subdomains: 'abcd',
        maxZoom: 19
    });

// Google Map Layer

var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
 });


 // Satelite Layer
var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
   maxZoom: 20,
   subdomains:['mt0','mt1','mt2','mt3']
 });



var baseMaps = {
    "Open Street" : OSM,
    "Satellite": googleSat,
    "Google Streets": googleStreets,
    "DarkBg":CartoDB_DarkMatter
}

L.control.layers(baseMaps).addTo(map)

function generateList(){
    const ul = document.querySelector(".List");
    pujaLisst.forEach((puja) => {
        const li = document.createElement("li")
        const div = document.createElement("div")
        const a = document.createElement("a")
        const p = document.createElement("p")

        a.addEventListener('click',()=>{
            flyToPuja(puja);
        })
        div.classList.add('puja-name')
        a.innerText = puja.properties.Name
        a.href= "#"
        p.innerText = puja.properties.Address

        div.appendChild(a)
        div.appendChild(p)
        li.appendChild(div)
        ul.appendChild(li)
    });

}
generateList()

function makePopupContent(pandel){
    return `
        <div>
            <h4>${pandel.properties.Name}</h4>
            <img src="${pandel.properties.image}" width="305px" padding: "0 16px">
            <P>${pandel.properties.Address}</P> 
        </div>
        `;
}

function onEachFeature(feature, layer){
       layer.bindPopup(makePopupContent(feature), {closeButton:false, offset:L.point(0,-1)});
}

const pujaLayer = L.geoJSON(pujaLisst,{
    onEachFeature: onEachFeature,
    pointToLayer: function(feature, coordinates){
            return L.marker(coordinates)
    }
})
pujaLayer.addTo(map)



const bond = L.geoJSON(boundary,{
    style : function(feature){
        return {
            fillColor: '#ff7800',
            color :'red',
            fillOpacity: 0.2
        }
    }
})

bond.addTo(map)


function flyToPuja(pujaPandal) {
    const lat = pujaPandal.geometry.coordinates[0]
    const lng = pujaPandal.geometry.coordinates[1]
    map.flyTo([lng,lat],18, {
            duration : 3
    });

    setTimeout(()=> {
        L.popup({closeButton:false, offset:L.point(0,-35)})
        .setLatLng([lng,lat])
        .setContent(makePopupContent(pujaPandal))
        .openOn(map);
    },3000)   
}

















