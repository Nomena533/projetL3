import API from './api';

export const getInstrument = () => {
    return API.get("/getInstrument");
}