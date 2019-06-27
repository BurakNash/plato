import Settings from "./Settings";

export default {
  get(id) {
    return fetch(`${Settings.remoteURL}/classrooms/${id}`).then(e => e.json());
},
delete(id) {
    return fetch(`${Settings.remoteURL}/classrooms/${id}`, {
        "method": "DELETE"
    }).then(e => e.json());
},
getAll() {
    return fetch(`${Settings.remoteURL}/classrooms?_expand=school&_expand=student&_expand=teacher`).then(e => e.json());
},
addClassroom(newClassroom) {
    return fetch(`${Settings.remoteURL}/classrooms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newClassroom)
    }).then(data => data.json())
},
updateClassroom(editedClassroom) {
    return fetch(`${Settings.remoteURL}/classrooms/${editedClassroom.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedClassroom)
    }).then(data => data.json());
}
};
