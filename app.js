//   toggole spinner 
const toggoleSpinner = displaySpinner =>{
const spiner = document.getElementById('spinner');
spiner.style.display = displaySpinner;
};

// toggole search Result 

const toggoleSearchResult = displayResult =>{
    const result= document.getElementById('phone-details');
    result.style.display= displayResult;

};

// load button hidden 
 document.getElementById('button-load').style.visibility='hidden';
 toggoleSpinner('none');

//  searchField 
 const searchPhone =  () => {
 const searchField = document .getElementById('search-field');
const searchText = searchField.value;
// console.log(searchText);
searchField.value ='';
// load data 
const url =`https://openapi.programming-hero.com/api/phones?search=${searchText} `;
// console.log(url)
 fetch(url)
.then(res => res.json())
.then(data => displaySearchResult(data.data.slice(0,20)));
toggoleSpinner('block');
 };

// search phone 
 const displaySearchResult= phones => {
 const searchResult = document.getElementById('search-result');
 searchResult.textContent ='';
 
 if (phones.length == 0 ){
     document.getElementById('no-phone').style.display="block";
     toggoleSpinner('block');
 }else{
    phones.forEach(phone => {
        //  console.log(phone);
         const div= document.createElement('div');
         div.classList.add('col');
         div.innerHTML=`<div class="card h-100">
                        <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="...">
                        <div class="card-body">
                            <h5 class="card-title text-center">${phone.phone_name}</h5>
                             <p class="card-text text-center ">${phone.brand}</p>
                             <div class ="d-flex">
                             <button onclick="phoneDetail('${phone.slug}')" class=" btn btn-success mx-auto justify-content-center"> Details</button>
                             </div>
                        </div>
                       </div>`
                       searchResult.appendChild(div);
                       document.getElementById('no-phone').style.display="none";
                       document.getElementById('button-load').style.visibility='visible';
                       toggoleSpinner('none');              
        })
     } 
 }
 
//  single seacrh result 

 const phoneDetail = (id) =>{
     const url =`https://openapi.programming-hero.com/api/phone/${id}`;
     fetch(url)
     .then(res => res.json())
     .then(data => setDetails(data.data));
     toggoleSpinner('block');
    
 }

 //  clear explore content 
const clearResult = () => {
    const exploreData = Document.getElementById('search-result');
    exploreData.textContent ='';
    toggoleSearchResult('none'); 
}

 const setDetails = (info) =>{
    //  console.log(info);
     const phoneDetails = document.getElementById('phone-details');
    //  clear field 
     phoneDetails.innerText ='';
     document.getElementById('no-phone').style.display="none";

     const div= document.createElement('div');
     div.classList.add('card');
     div.innerHTML =`
     <img src="${info.image}" class="card-img-top w-50 mx-auto" alt="...">
     <div class="card-body">
      <h4 class="card_title text-center mx-auto">${info.name} </h4>
      <br><h5 class="text-center mx-auto"> Main Feautures: </h5>
       <p class="text-center mx-auto">Storage: ${info.mainFeatures.storage}</p>
       <p class="text-center mx-auto"> Chipset: ${info.mainFeatures.chipSet}</p>
       <p class="text-center mx-auto"> Displaysize: ${info.mainFeatures.displaySize}</p>
       <p class="text-center mx-auto"> Memory: ${info.mainFeatures.memory}</p>
       <h5 class="text-center mx-auto"> Others: </h5>
       <p class="text-center mx-auto"> GPS: ${info?.others?.GPS? info.others.GPS: 'It is not available right now'}</p>
       <p class="text-center mx-auto"> Bluetooth: ${info?.others?.Bluetooth? info.others.Bluetooth: 'It is not available right now'}</p>
       <p class="text-center mx-auto"> NFC: ${info?.others?.NFC? info.others.NFC: 'It is not available right now'}</p>
       <p class="text-center mx-auto"> USB: ${info?.others?.USB? info.others.USB: 'It is not available right now'}</p>
       <p class="text-center mx-auto">  ${info?.releaseDate? info.releaseDate: 'Releasedate not found'}</p>
       <h5 class="text-center mx-auto"> Sensor: </h5>
       <p class="text-center mx-auto">${info.mainFeatures.sensors}</p>
     </div>;
     ` 
     phoneDetails.appendChild(div); 
     window.scrollTo(0,0);
 }