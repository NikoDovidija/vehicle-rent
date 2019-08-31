const moment = require('moment');
const hoursArray = require('../constants/constants');
export const state = () => ({
    countries: [],

    selectedStartDate: moment().add(4, 'days').format("YYYY-MM-DD"),
    selectedEndDate: moment().add(11, 'days').format("YYYY-MM-DD"),

    selectedStartTime: hoursArray.selectValues[30],
    selectedEndTime: hoursArray.selectValues[35],

    locationSearchValue: '',
    driverAge:30,
    originCountry:null,
})

export const mutations = {
    SET_COUNTRIES(state, data) {
        state.countries = data.map((data) => data.name);
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
    }
}
export const actions = {
    async nuxtServerInit({ commit }) {
        const fetchedObject  = await this.$axios.$get(`https://api.vehicle-rent.com/get-residence-countries?format=json`);
        const extractedObjects = fetchedObject.response.data.residenceCountries;

        commit('SET_COUNTRIES', extractedObjects);

        //Initial country 
        
        const initialCountry = this.state.countries.filter(count => count === 'Slovenia')[0];
        const existingValueCountry = initialCountry ? initialCountry : 'Slovenia'
        commit('SET_SELECTED_COUNTRY', existingValueCountry);

        //Initial date 


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

    async checkIfDateIsValid(payload){
        if (!payload.start){
            const evaluation = moment(payload.data).isAfter(this.state.selectedStartDate);
            console.log(evaluation);
        }
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
}