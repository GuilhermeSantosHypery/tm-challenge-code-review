export interface IWeatherCreatedEvent {
  id: string;
}

export interface IWeatherDeletedEvent {
  id: string;
}

export interface IWeatherUpdatedEvent {
  id: string;
}

export const EVENT_EVENTS = {
  CREATED: 'event.created',
  DELETED: 'event.deleted',
  UPDATED: 'event.updated',
  RESTORED: 'event.restored',
};
