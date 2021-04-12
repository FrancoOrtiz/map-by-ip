const $form = document.getElementById('form');
const $input = document.getElementById('input');
const $button = document.getElementById('button');
const $ip = document.getElementById('ip');
const $location = document.getElementById('location');
const $timezone = document.getElementById('timezone');
const $isp = document.getElementById('isp');
const key = "at_g1gr0G2jtm53hu4r18FC1L76fcPxM";
let ip = "";
let x = "51.505";
let y = "-0.09";

const enriquito = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
let myMap = L.map('map').setView([x, y], 13);

let naty = L.tileLayer(enriquito, {
    maxZoom: 18
}).addTo(myMap);

let iconMarker = L.icon({
    iconUrl: "./images/icon-location.svg",
    iconSize: [30,40],
    iconAnchor: [30,60]
})

let marker = L.marker([x, y], {icon:iconMarker}).addTo(myMap);

const returnMapValue = async () => {
    try{
        let url = await fetch(`https://geo.ipify.org/api/v1?apiKey=${key}&ipAddress=${ip}`);
        let resp = await url.json();
        return (resp);
    } catch{
        console.log('error bro');
    }
}

const renderValue = async () => {
    const actualValue = await returnMapValue();
    if(actualValue.code === 422){
        $input.value = "";
        $input.placeholder = actualValue.messages; 
    } else {
        $ip.textContent = actualValue.ip;
        $location.textContent = `${actualValue.location.city}, ${actualValue.location.postalCode}`;
        $timezone.textContent = `UTC ${actualValue.location.timezone}`;
        $isp.textContent = actualValue.isp;





        x = actualValue.location.lng;
        y = actualValue.location.lat;
        
        myMap.panTo([y, x], 13);
        marker.setLatLng([y, x])
    }
}


$form.addEventListener('submit', (e) => {
    e.preventDefault();
    let ipValue = $input.value;
    ip = ipValue;
    renderValue();
})

