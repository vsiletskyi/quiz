import axios from "axios";

export default axios.create({
    baseURL: 'https://react-quiz-a5cc3-default-rtdb.europe-west1.firebasedatabase.app/'
})