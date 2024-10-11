const loadAllPhones = async (status, searchText) =>{
    console.log(searchText);
    document.getElementById("spinner").style.display="none";

    // way 1 for api call

    // fetch(`https://openapi.programming-hero.com/api/phones?search=iphone`)
    // .then(res => res.json())
    // .then(data => console.log(data))

    // way 2 for api call

    const  response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText?searchText:"iphone"}`)
        const data = await response.json();
        console.log(data)

        if(status ){
            displayAllPhone(data.data)
        }else{
            displayAllPhone(data.data.slice(0,6))
        }
}


const displayAllPhone = (phones) =>{
    document.getElementById('phones-container');
    innerHTML ="";
    const phoneContainer = document.getElementById("phones-container");

    // for(phone of phones){
    //     console.log(phone)
    // }

   phones.forEach(phone =>{
        const {brand, image, slug} = phone;
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card m-2 bg-green-300 w-96 shadow-xl">
  <figure class="px-10 pt-10">
    <img
      src= ${image}
      class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title text-xl">${brand}</h2>
    <p class="text-base">${slug}</p>
    <div class="card-actions">
      <button onclick="phoneDetails('${slug}')" class="btn btn-success text-base">Show Details</button>
    </div>
  </div>
</div>
        `;

        phoneContainer.appendChild(div)
   });
} 


const handleShowAll = () =>{
    loadAllPhones(true)
}


const handleSearch = () =>{
    document.getElementById("spinner").style.display="block";

    const searchText = document.getElementById("search-box").value;


    setTimeout(function() {
        loadAllPhones(false,searchText)
    }, 3000)
}


const phoneDetails = async (slugs) =>{
   const response = await fetch(`https://openapi.programming-hero.com/api/phone/${slugs}`)
   const data = await response.json();
   console.log(data.data);

   const {brand, mainFeatures, image, slug, name,releaseDate} = data.data;


    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML =`
        <dialog id="my_modal_1" class="modal">
        <div class="modal-box">
        <img class="" src =${image} />
          <h3 class="mt-2 text-lg font-bold">${brand}</h3>
          <p class="">${slug}</p>
          <p class="">${name}</p>
          <p class="">${releaseDate}</p>
          <p class="">${mainFeatures.storage}</p>
          <p class="">${mainFeatures.displaySize}</p>
          <p class="">${mainFeatures.chipSet}</p>
          <p class="">${mainFeatures.memory}</p>
          <div class="modal-action">
            <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button class="btn btn-primary text-base">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    `;
   my_modal_1.showModal();
}

loadAllPhones(false, "iphone");

