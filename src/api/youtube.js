export default class Youtube {
  
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async search(keyword) {
    return keyword ? '' : this.#codingMusic();
  }

  async #codingMusic() {
    return this.apiClient
    .playlist({
        params: {
          part: 'snippet',
          maxResults: 25,
      },
    })
    .then((res) => res.data.items); 
  }
}