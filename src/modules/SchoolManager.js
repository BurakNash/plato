import Settings from "./Settings";

export default {
  get(id) {
    return fetch(`${Settings.remoteURL}/schools/${id}`).then((e) => e.json());
  },
  delete(id) {
    return fetch(`${Settings.remoteURL}/schools/${id}`, {
      method: "DELETE"
    }).then((e) => e.json());
  },

  getAll() {
    return fetch(`${Settings.remoteURL}/schools`).then((e) => e.json());
  }
};
