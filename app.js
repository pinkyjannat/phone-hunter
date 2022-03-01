 const searchPhone =  () => {
 const searchField = document .getElementById('search-field');
const searchText = searchField.value;
console.log(searchText);

// clear data 
searchField.value ='';
// load data 
const url =`https://openapi.programming-hero.com/api/phones?search=${searchText} `;
console.log(url)
 fetch(url)
.then(res => res.json())
.then(data => displaySearchResult(data.data));
 };

// search phone 
 const displaySearchResult= phones => {
 const searchResult = document.getElementById('search-result');
 searchResult.textContent ='';
 if (phones.length== 0){
     document.getElementById('no-phone').style.display="block";
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
                             <button onclick="phoneDetail('${phone.slug}')" class=" btn btn-success mx-auto"> Details</button>
                        </div>
                       </div>`
                       searchResult.appendChild(div);
        })
     } 
 }
 
//  single seacrh result 

 const phoneDetail = (id) =>{
     const url =`https://openapi.programming-hero.com/api/phone/${id}`;
     fetch(url)
     .then(res => res.json())
     .then(data => setDetails(data.data));
 }

 const setDetails = (info) =>{
     console.log(info);
     const phoneDetails = document.getElementById('phone-details');
    //  clear field 
     phoneDetails.textContent ='';

     const div= document.createElement('div');
     div.classList.add('card');
     div.innerHTML =`
     <img src="${info.image}" class="card-img-top w-50 mx-auto" alt="...">
     <div class="card-body">
     <p class="card-text text-center mx-auto">${info.releaseDate}</p>
       <p class="text-center mx-auto">${info.mainFeatures.storage};
       <p class="text-center mx-auto">${info.mainFeatures.chipSet};
       <p class="text-center mx-auto">${info.mainFeatures.displaySize};
       <p class="text-center mx-auto">${info.mainFeatures.memory};
       <p class="text-center mx-auto">${info.mainFeatures.sensors[0]};
       <p class="text-center mx-auto">${info.mainFeatures.others};
       
     </div>
     `
     phoneDetails.appendChild(div);
     
    
 }