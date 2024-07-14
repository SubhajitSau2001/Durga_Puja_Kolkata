const map = L.map('map').setView([22.56602010000006, 88.36565320000005], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors / Coded by <a href="https://www.linkedin.com/in/subhajitsau/"> Subhajit Sau &#128526</a>'
}).addTo(map);

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

















