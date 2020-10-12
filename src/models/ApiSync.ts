import axios, { AxiosPromise } from 'axios';

interface HasId {
  id?: number;
}

export class ApiSync<T extends HasId> {
  constructor(public rootUrl: string) {}

  public async fetch(id: number): Promise<AxiosPromise> {
    return axios.get(`${this.rootUrl}/${id}`);
  }

  save(data: T): Promise<AxiosPromise> {
    const { id } = data;

    if (id) {
      return axios.put(`${this.rootUrl}/${id}`, data);
    } else {
      return axios.post(this.rootUrl, data);
    }
  }
}
