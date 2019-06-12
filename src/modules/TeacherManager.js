import Settings from "./Settings";

export default {
  get(id) {
    return fetch(`${Settings.remoteURL}/teachers/${id}`).then(e => e.json());
  },
  delete(id) {
    return fetch(`${Settings.remoteURL}/teachers/${id}`, {
      method: "DELETE"
    }).then(e => e.json());
  },
  getAll() {
    return fetch(`${Settings.remoteURL}/teachers?_expand=school`).then(e => e.json());
  },
  addTeacher(newTeacher) {
    return fetch(`${Settings.remoteURL}/teachers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTeacher)
    }).then(data => data.json())
},
updateTeacher(editedTeacher) {
    return fetch(`${Settings.remoteURL}/teachers/${editedTeacher.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedTeacher)
    }).then(data => data.json());
}
};
