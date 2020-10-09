import { EventEmitter2 } from 'eventemitter2';

const eventEmitter = new EventEmitter2();

export enum EventType {
  SendEmail = 'SendEmail',
}

interface IEvent {
  payload: any;
  type: EventType;
}

export const LengooEmitter = {
  emit(event: IEvent) {
    eventEmitter.emit(`lengoo:${event.type}`, event.payload);
  },
  addListener(eventType: EventType, listener: (payload: any) => void | Promise<void>) {
    eventEmitter.addListener(`lengoo:${eventType}`, listener);
  },
};
