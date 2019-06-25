import Settings from "./Settings";

export default {
  get(id) {
    return fetch(`${Settings.remoteURL}/classes/${id}`).then(e => e.json());
},
delete(id) {
    return fetch(`${Settings.remoteURL}/classes/${id}`, {
        "method": "DELETE"
    }).then(e => e.json());
},
getAll() {
    return fetch(`${Settings.remoteURL}/classes`).then(e => e.json());
},
addClass(newClass) {
    return fetch(`${Settings.remoteURL}/classes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newClass)
    }).then(data => data.json())
},
updateClass(editedClass) {
    return fetch(`${Settings.remoteURL}/classes/${editedClass.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedClass)
    }).then(data => data.json());
}
};
