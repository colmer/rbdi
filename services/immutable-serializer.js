import { Record } from "immutable";

const structures = [{ name: "Record", type: Record }];

export const serialize = state => {
  let serialized = {};

  Object.keys(state).forEach(key => {
    const elem = state[key];

    const { name } = elem.constructor;
    const inStructures = structures.some(s => s.name === name);

    serialized[key] = inStructures ? { ...elem.toJS(), _name: name } : elem;
  });
};

export const deserialize = obj => {
  if (!obj) return obj;

  let deserialized = {};

  Object.keys(obj).forEach(key => {
    const elem = obj[key];
    let finalElem;

    const name = elem._name;
    const structure = structures.find(s => s.name === name);

    finalElem = structure ? new structure.type(elem.toJS())() : elem;

    deserialized[key] = finalElem;
  });
};
