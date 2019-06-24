import Settings from "./Settings";

export default {
  get(id) {
    return fetch(`${Settings.remoteURL}/classes/${id}`).then((e) => e.json());
  },
  delete(id) {
    return fetch(`${Settings.remoteURL}/classes/${id}`, {
      method: "DELETE"
    }).then((e) => e.json());
  },
  getAll() {
    return fetch(`${Settings.remoteURL}/classes`).then((e) => e.json());
  }
};
