const moment = require('moment');
const hoursArray = require('../constants/constants');
export const state = () => ({
    countries: [],

    selectedStartDate: moment().add(4, 'days').format("YYYY-MM-DD"),
    selectedEndDate: moment().add(11, 'days').format("YYYY-MM-DD"),

    selectedStartTime: hoursArray.selectValues[15],
    selectedEndTime: hoursArray.selectValues[18],

    locationSearchValue: '',
    driverAge:null,
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
    SET_START_TIME(state, data) {
        state.selectedEndime = data;
    }
}
export const actions = {
    async nuxtServerInit({ commit }) {
        const fetchedObject  = await this.$axios.$get(`https://api.vehicle-rent.com/get-residence-countries?format=json`);
        const extractedObjects = fetchedObject.response.data.residenceCountries;

        commit('SET_COUNTRIES', extractedObjects);

        //Initial country 
        commit('SET_SELECTED_COUNTRY', this.state.countries[0]);

        //Initial date 


    },
    async setSelectedCountry({ commit }, payload) {
        commit('SET_SELECTED_COUNTRY', payload);
    },
    
    async setDate({ commit },payload) {
        payload.start ? commit('SET_START_DATE', payload.data) : 
            commit('SET_END_DATE', payload.data)
    },

    async setTime({ commit }, payload) {
        payload.start ? commit('SET_START_TIME', payload.data) :
            commit('SET_END_TIME', payload.data)
    },
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
}