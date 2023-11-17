import { WorldService } from '../shared/services/world'
import { computed, ref } from 'vue'
import { DropdownChangeEvent } from 'primevue/dropdown'
import { deletedCountries } from '../shared/jsons/deletedCountries'
import data_countries from "../assets/countries/allowed_countries.json";
import state_data from "../assets/cities/cities_us.json"

export interface Country {
  country_code: string
  country_id: string
  calling_code: string
  name: string
}
export interface CountryPermitidos {
  country_code: string
  name: string
}

export interface StateUS {
  state_code: string
  name: string,
  country_id: string
}
export interface State {
  country_id: string
  id: number
  name: string
}

export enum CountryID {
  Usa = 'USA',
}

export const useWorld = () => {
  const calling_code = ref<string[]>([''])
  const countries = ref<Country[]>([])
  const allowed_countries = ref<CountryPermitidos[]>([])
  const state_us = ref<StateUS[]>([])
  const states = ref<State[]>([])
  const statesTwo = ref<State[]>([])

  const country = ref<Country | null>(null)
  const state = ref<State | null>(null)

  const loadingCountriesField = ref<boolean>(false)
  const loadingStateField = ref<boolean>(false)

  const loadingStatesField = ref<boolean>(false)
  const loadingStatesFieldTwo = ref<boolean>(false)

  const statesInputIsEmpty = computed<boolean>(() => states.value.length === 0)
  const countriesInputIsEmpty = computed<boolean>(() => allowed_countries.value.length === 0)
  const stateInputIsEmpty = computed<boolean>(() => state_us.value.length === 0)
  const showCombo = ref<boolean>(false)

  const fetchCountries = async (shouldDeleteBannedCountries: boolean = false) => {
    loadingCountriesField.value = true

    await new WorldService().getCountries().then((resp: Country[]) => {
      countries.value = resp
      if (shouldDeleteBannedCountries) {
        countries.value = deleteUnavailableCountries(resp)
      }

      const arrayCallingCode = resp.map(c => c.calling_code).sort()
      calling_code.value = [...new Set(arrayCallingCode)]

      loadingCountriesField.value = false
    })
  }
  const fetchAllowedCountries= async () => {
    allowed_countries.value = data_countries
    return allowed_countries;

  }
  const fetchStatesUS = async () => {

    return state_us;


  }

  const fetchStates = async () => {
    loadingStatesField.value = true
    if (!country.value?.country_id) return
    await new WorldService().getStates(country.value?.country_id).then(resp => {
      states.value = resp
      loadingStatesField.value = false
    })
  }

  const fetchStatesTwo = async () => {
    loadingStatesFieldTwo.value = true

    if (!country.value?.country_id) return
    await new WorldService().getStates(country.value?.country_id).then(resp => {
      statesTwo.value = resp
      loadingStatesFieldTwo.value = false
    })
  }

  const setCountry = (payload: Country) => {
    country.value = payload
  }

  const setState = (payload: State) => {
    state.value = payload
  }

  const onChangeCountryHandler = async (event: DropdownChangeEvent) => {
    showCombo.value = false;
    const country = countries.value.find(country => country.country_code === event.value)

    if (event.value == 'US'){
      state_us.value = state_data
      loadingStateField.value = true
      showCombo.value = true;
    }
    if (!country) return
      setCountry(country)
      await fetchStates()
  }

  const onChangeCountryHandlerTwo = async (event: DropdownChangeEvent) => {
    const country = countries.value.find(country => country.country_code === event.value)

    if (!country) return
    setCountry(country)
    await fetchStatesTwo()
  }

  const onChangeStateHandler = async (event: DropdownChangeEvent) => {
    const state = states.value.find(state => state.name === event.value)
    if (!state) return
    setState(state)
  }

  const deleteUnavailableCountries = (countries: Country[]): Country[] => {
    return countries.filter(country => !deletedCountries().countries.includes(country.name.toUpperCase().trim()))
  }


  return {
    countries,
    allowed_countries,
    state_us,
    states,
    statesTwo,
    statesInputIsEmpty,
    countriesInputIsEmpty,
    stateInputIsEmpty,
    loadingCountriesField: loadingCountriesField,
    loadingStateField,
    loadingStatesField,
    loadingStatesFieldTwo,
    country,
    state,
    calling_code,
    fetchCountries,
    fetchAllowedCountries,
    fetchStatesUS,
    fetchStates,
    setCountry,
    setState,
    onChangeCountryHandler,
    onChangeCountryHandlerTwo,
    showCombo,
    onChangeStateHandler,
  }
}
