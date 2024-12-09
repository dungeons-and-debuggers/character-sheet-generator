import { isArray, isObject } from './helpers';

export const state = {
  abilityScores: {
    STR: [12, 1],
    DEX: [16, 3],
    CON: [14, 2],
    INT: [12, 1],
    WIS: [13, 1],
    CHA: [10, 0],
  },

  skills: {
    acrobatics: ['P', 'DEX', 7],
    animalHandling: ['P', 'WIS', 5],
    arcana: ['', 'INT', 1],
    athletics: ['', 'STR', 1],
    deception: ['', 'CHA', 0],
    history: ['P', 'INT', 5],
    insight: ['', 'WIS', 1],
    intimidation: ['', 'CHA', 0],
    investigation: ['E', 'INT', 9],
    medicine: ['', 'WIS', 1],
    nature: ['E', 'INT', 9],
    perception: ['E', 'WIS', 9],
    performance: ['', 'CHA', 0],
    persuasion: ['', 'CHA', 0],
    religion: ['', 'INT', 1],
    sleightOfHand: ['E', 'DEX', 11],
    stealth: ['E', 'DEX', 11],
    survival: ['E', 'WIS', 9],
  },
};

const stateHandler = {
  set: function (obj, prop, value) {
    if (prop === '__proto__') return true;
    if (obj[prop] === value) return true;

    const oldValue = Reflect.get(obj, prop);

    if (value && !value._isProxy) {
      if (isArray(value)) {
        console.log(`${JSON.stringify(value)} è un array`);
        obj[prop] = new Proxy([...value], stateHandler);
      } else if (isObject(value)) {
        console.log(`${JSON.stringify(value)} è un oggetto`);
        obj[prop] = new Proxy({ ...value }, stateHandler);
      } else {
        obj[prop] = value;
      }
    }

    // @todo aggiungere nel detail il path completo di cambiamento dell'evento
    document.dispatchEvent(
      new CustomEvent('state.change', {
        detail: {
          oldValue,
          newValue: obj[prop],
        },
      })
    );

    return true;
  },
  get: function (obj, prop) {
    if (prop === '__proto__') return;
    if (prop === '_isProxy') return true;

    const value = Reflect.get(obj, prop);

    if (value && !value._isProxy) {
      if (isArray(value)) {
        console.log(`${JSON.stringify(value)} è un array`);
        obj[prop] = new Proxy([...value], stateHandler);
      }
      if (isObject(value)) {
        console.log(`${JSON.stringify(value)} è un oggetto`);
        obj[prop] = new Proxy({ ...value }, stateHandler);
      }
    }

    return value;
  },
};

export const createState = (object, handler = stateHandler) => {
  for (const prop in object) {
    if (isObject(object[prop]) || isArray(object[prop])) {
      object[prop] = createState(object[prop], handler);
    }
  }
  return new Proxy(object, handler);
};
