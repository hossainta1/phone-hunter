const loadPhone = async (searchText, dataLimit) => {
    const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);

}

const displayPhones = (phones, dataLimit) => {

    const phoneContainer = document.getElementById('phones-container');
    phoneContainer.textContent = '';

    // Display 10 phone only
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    }

    else {
        showAll.classList.add('d-none');
    }




    // Display no  phones found  

    const noPhone = document.getElementById('no-phone-massage');

    if (phones.length === 0) {
        noPhone.classList.remove('d-none');
    }
    else {
        noPhone.classList.add('d-none');
    }

    // Display all phone 

    phones.forEach((phone) => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
       <div class="card p-4">
                        <img src="${phone.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${phone.phone_name}</h5>
                            <p class="card-text">This is a longer card with supporting text below as a natural
                                lead-in to additional content. This content is a little bit longer.</p>
                                <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
                        </div>
                    </div>
       
       
       `;
        phoneContainer.appendChild(phoneDiv);

    });

    // Stop loader

    toggleSpiner(false);


}

const processSearch = (dataLimit) => {
    toggleSpiner(true);
    const searchField = document.getElementById('text-field');
    const searchText = searchField.value;
    loadPhone(searchText, dataLimit);
}


document.getElementById('btn-search').addEventListener('click', function () {
    // start loading

    processSearch(10);

})


// Search input field enter key handler

document.getElementById('text-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(10);
    }
})


const toggleSpiner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none')
    }
}


// Not the best soluation of load to show all

document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();

})


const loadPhoneDetails = async id => {
    const url = ` https://openapi.programming-hero.com/api/phone/${id}`;

    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data)
}


const displayPhoneDetails = phone => {
    console.log(phone);

    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;

    const phoneDatils = document.getElementById('phone-details');
    phoneDatils.innerHTML = `
   <p>Release Date : ${phone.releaseDate ? phone.releaseDate : 'No Releasedate Found'}</p>
   <P>Storage :${phone.mainFeatures ? phone.mainFeatures.storage : 'Storage ingormation not found'}</P>
   <P>Others :${phone.others ? phone.others.Bluetooth : 'No bluetooth information'}</P>
   
   `
}





// loadPhone();