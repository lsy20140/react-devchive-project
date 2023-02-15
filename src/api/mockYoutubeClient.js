import axios from 'axios'

export default class MockYoutubeClient {

  async playlist() {
    return axios.get('/playlist.json');
  }
}