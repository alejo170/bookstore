import { showBooks } from "./books.js";

const fetchData = async () => {
    try {
        //call to api.json
        const res = await fetch('api.json');
        const data = await res.json();
        //call to function showBooks
        showBooks(data);
    
    } catch (error) {
        console.log(error);
    }
}

export { fetchData };