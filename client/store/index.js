import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

let md5 = require('md5')

const state = {
  data: []
}

const urlBaseMarvel = 'http://gateway.marvel.com/v1/public/characters?'
var apiCharacters = [
  'storm',
  'deadpool',
  'scarlet%witch'
]
const apiPublicKey = 'b6484b24a171bf019c91b1e617545c8a'
const apiPrivateKey = '06c76b0d8e7d578f6b2f1fe147fe71954eaf9f01'

const mutations = {
  RECEIVE_CHARACTERS (state, { characters }) {
    state.data = characters
  }
}

const actions = {
  async FETCH_CHARACTERS ({ commit }) {
    let datenow = new Date()
    var ts = ((datenow.getTime() * 10000) + 621355968000000000)
    let concat = ts + apiPrivateKey + apiPublicKey
    let apiHash = md5(concat)
    var chars = []
    for (var i = 0; i < 3; i++) {
      let url = urlBaseMarvel + `nameStartsWith=${apiCharacters[i]}` + '&ts=' + ts + '&apikey=' + apiPublicKey + '&hash=' + apiHash + '&limit=1'
      let { data } = await axios.get(url)
      chars.push(data.data.results[0])
    }
    commit('RECEIVE_CHARACTERS', { characters: chars })
  }
}

const getters = {
  characters: state => {
    return state.data.map(data => {
      return {
        name: data.name,
        url: data.urls[1] ? data.urls[1].url : data.urls[0].url,
        image: `${data.thumbnail.path}.${data.thumbnail.extension}`,
        description: data.description === '' ? 'No description listed for this character.' : data.description,
        stories: data.stories.items
      }
    })
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store
