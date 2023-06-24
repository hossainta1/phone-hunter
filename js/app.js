const loadPhone = async (searchText) => {
    const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);

}

const displayPhones = phones => {

    const phoneContainer = document.getElementById('phones-container');
    phoneContainer.textContent = '';

    // Display 20 phone only

    phones = phones.slice(0, 10);


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
                        </div>
                    </div>
       
       
       `;
        phoneContainer.appendChild(phoneDiv);

    });

    // Stop loader

    toggleSpiner(false);


}


document.getElementById('btn-search').addEventListener('click', function () {
    // start loading
    toggleSpiner(true);
    const searchField = document.getElementById('text-field');
    const searchText = searchField.value;
    loadPhone(searchText);
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






// loadPhone();