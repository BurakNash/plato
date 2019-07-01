const remoteURL = "http://localhost:5002";

export default {


  getById(id, dataset, embedItem) {
    return fetch(`${remoteURL}/${dataset}/${id}?${embedItem}`).then((r) =>
      r.json()
    );
  },

  getAll(dataset, embedItem) {
    return fetch(`${remoteURL}/${dataset}?${embedItem}`).then((r) => r.json());
  },

  post(dataset, newObject) {
    return fetch(`${remoteURL}/${dataset}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newObject)
    }).then((r) => r.json());
  },

  registerIt(email, password) {
    return fetch(
      `http://localhost:5002/users?email=${email}&password=${password}`
    ).then((response) => response.json());
    },


    search(resource, input) {
      return fetch(`${remoteURL}/${resource}?name_like=${input}`).then(e =>
        e.json()
      );
    }

}