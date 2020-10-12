import { AxiosPromise, AxiosResponse } from "axios";

interface ModelAttributes<T> {
  get<K extends keyof T>(key: K): T[K];
  getAll(): T;
  set(value: T): void;
}

interface Sync<T> {
  fetch(id: number): Promise<AxiosPromise>;
  save(data: T): Promise<AxiosPromise>
}

interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(evenName: string): void;
}

interface HasId {
  id?: number;
}

export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

  on = this.events.on;
  trigger = this.events.trigger;
  get = this.attributes.get;

  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger('change');
  }

  fetch(): void {
    const id = this.attributes.get('id')

    if (typeof id !== 'number') {
      throw new Error('Cannot fetch without an id')
    }

    this.sync.fetch(id).then(async (response: Promise<AxiosResponse>): Promise<void> => {
      this.set((await response).data)
    });
  }

  save(): void {
    this.sync.save(this.attributes.getAll())
      .then((response: Promise<AxiosResponse>): void => {
        this.trigger('save');
      })
      .catch(() => {
        this.trigger('error')
      });
  }
}