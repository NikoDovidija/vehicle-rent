const moment = require('moment');
const hoursArray = require('../constants/constants');
// const fake_search_car_results = require('../constants/api_sample.json');
require('url-search-params-polyfill');

export const state = () => ({
    countries: [],

    selectedStartDate: moment().add(4, 'days').format("YYYY-MM-DD"),
    selectedEndDate: moment().add(11, 'days').format("YYYY-MM-DD"),

    selectedStartTime: hoursArray.selectValues[30],
    selectedEndTime: hoursArray.selectValues[35],

    pickupAndDropoffId: null,
    driverAge:30,
    originCountry:null,

    carSearchResults:[]
})

export const mutations = {
    SET_COUNTRIES(state, data) {
        const countriesObjects= data.map((data) => {
            return {
            text: data.name,
            value: data.id
            }
        });
        state.countries = countriesObjects;
    },
    SET_SELECTED_COUNTRY(state, data) {
        state.originCountry = data;
    },
    SET_START_DATE(state, data) {
        state.selectedStartDate = data;
    },
    SET_END_DATE(state, data) {
        state.selectedEndDate = data;
    },
    SET_START_TIME(state, data) {
        state.selectedStartTime = data;
    },
    SET_END_TIME(state, data) {
        state.selectedEndTime = data;
    },
    SET_AGE(state, data) {
        state.driverAge = data;
    },
    SET_LOCATION_IDS(state, data) {
        state.pickupAndDropoffId = data;
    },
    SET_CAR_RESULTS(state, data) {
        state.carSearchResults = data;
    }
}
export const actions = {
    async nuxtServerInit({ commit }) {

         //Fetch and set countries from api
        const fetchedObject  = await this.$axios.$get(`get-residence-countries?format=json`);
        const extractedObjects = fetchedObject.response.data.residenceCountries;
        commit('SET_COUNTRIES', extractedObjects);

        //Select and set Initial country 
        const initialCountry = this.state.countries.filter(count => count.value === 'SI')[0].value;
        const existingValueCountry = initialCountry ? initialCountry : 'Slovenia'
        commit('SET_SELECTED_COUNTRY', existingValueCountry);

        // commit('SET_CAR_RESULTS', fake_search_car_results);

    },
    setSelectedCountry({ commit }, payload) {
        commit('SET_SELECTED_COUNTRY', payload);
    },
    
    setDate({ commit },payload) {
        payload.start ? commit('SET_START_DATE', payload.data) : 
            commit('SET_END_DATE', payload.data)
    },

    setTime({ commit }, payload) {
        payload.start ? commit('SET_START_TIME', payload.data) :
            commit('SET_END_TIME', payload.data)
    },

    checkIfDateIsValid(payload){
        if (!payload.start){
            const evaluation = moment(payload.data).isAfter(this.state.selectedStartDate);
            console.log(evaluation);
        }
    },

    setAge({ commit },payload) {
        commit('SET_AGE', payload);
    },

    setPickupAndDropOffLocationId({ commit }, payload){
        commit('SET_LOCATION_IDS',payload);
    },

    async fetchCarResults({ commit }, payload){
        // await this.$axios.$get(`get-residence-countries?format=json`);
        commit('SET_CAR_RESULTS', payload);
    }   
}

export const getters = {
    countryList(state) {
        return state.countries;
    },
    getInitialCountry(state) {
        return state.originCountry;
    },
    getStartDate(state) {
        return state.selectedStartDate;
    },
    getEndDate(state) {
        return state.selectedEndDate;
    },
    getStartTime(state) {
        return state.selectedStartTime;
    },
    getEndTime(state) {
        return state.selectedEndTime;
    },
    getAge(state) {
        return state.driverAge;
    },
    getUrlString(state){
        const constructedURl = new URLSearchParams([
            ["PickUpLocationId", state.pickupAndDropoffId],
            ["DropOffLocationId", state.pickupAndDropoffId],
            ["PickTime", state.selectedStartDate + "T" + state.selectedStartTime + ":00"],
            ["DropTime", state.selectedEndDate + "T" + state.selectedEndTime + ":00"],
            ["DrvCountry", state.originCountry],
            ["DrvAge", state.driverAge],
            ["Currency", "EUR"],
        ]);
        return constructedURl.toString();
    },
}

