import { templateDescription, fragment, descriptionModal, descModal } from "./nodes.js";

//function that detects when the description button is clicked
export const showDescription = e => {
    if(e.target.dataset.action === "description")
    {   
        //show modal window description 
        descModal.style.clipPath= "polygon(50% 0%, 100% 0, 100% 60%, 100% 100%, 0 100%, 0% 60%, 0 0)";
        //call to function setDescription
        setDescription(e.target.parentElement);
    }
    e.stopPropagation();
}
//function that takes the (id) elements of the clicked product and send it to function filterDescription
const setDescription = objeto => {
    const id = objeto.querySelector('button').dataset.id;
    //call to function filterDescription
    filterDescription(id);
}
//function that compares the id of the clicked product and the data from the api.json aand send the resulting data to the function renderDescription
const filterDescription = async (id) => {
    
    try {
        const res = await fetch('api.json');
        const data = await res.json();
        const filter = data.filter(item => item['id'] == id);
        //call to function renderDescription
        renderDescription(filter);
        
    } catch (error) {
        console.log(error);
    }
   
}
//function that renders the description and displays it in the template tag (templateDescription)
const renderDescription = (filter) => {
    descriptionModal.innerHTML = '';
    filter.forEach(item => {
        templateDescription.querySelector('img').setAttribute("src", item.thumbnailUrl);
        templateDescription.querySelector('h3').textContent = item.title;
        templateDescription.querySelectorAll('span')[0].textContent = item.description;
        templateDescription.querySelectorAll('span')[1].textContent = item.pages;
        templateDescription.querySelectorAll('span')[2].textContent = item.published;
        templateDescription.querySelectorAll('span')[3].textContent = item.publisher;
        const clone = templateDescription.cloneNode(true);
        fragment.appendChild(clone);
    })
    descriptionModal.appendChild(fragment);
}