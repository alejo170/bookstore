import { cards, templateCard, fragment } from "./nodes.js";

//function to render the books in the template tag (templateCard)
const showBooks = (data) => {
    data.forEach(item => {
        templateCard.querySelector('img').setAttribute("src", item.thumbnailUrl);
        templateCard.querySelector('h3').textContent = item.title;
        templateCard.querySelector('span').textContent = item.price;
        templateCard.querySelector('button').dataset.id = item.id;
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    })
    cards.appendChild(fragment);
}

export { showBooks };