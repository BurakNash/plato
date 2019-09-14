import Settings from "./Settings";

export default {


  getById(id, dataset, embedItem) {
    return fetch(`${Settings.remoteURL}/${dataset}/${id}?${embedItem}`).then((r) =>
      r.json()
    );
  },

  getAll(dataset, embedItem) {
    return fetch(`${Settings.remoteURL}/${dataset}?${embedItem}`).then((r) =>
      r.json()
    );
  },

  post(dataset, newObject) {
    return fetch(`${Settings.remoteURL}/${dataset}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newObject)
    }).then((r) => r.json());
  },

  registerIt(email, password) {
    return fetch(
      `${Settings.remoteURL}/users?email=${email}&password=${password}`
    ).then((response) => response.json());
    },


    search(resource, input) {
      return fetch(`${Settings.remoteURL}/${resource}?name_like=${input}`).then(
        (e) => e.json()
      );
    }

}