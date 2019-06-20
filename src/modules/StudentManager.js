import Settings from "./Settings";

export default {
    get(id) {
        return fetch(`${Settings.remoteURL}/students/${id}`).then(e => e.json());
    },
    delete(id) {
        return fetch(`${Settings.remoteURL}/students/${id}`, {
            "method": "DELETE"
        }).then(e => e.json());
    },
    getAll() {
        return fetch(`${Settings.remoteURL}/students?_expand=teacher`).then(e => e.json());
    },
    addStudent(newStudent) {
        return fetch(`${Settings.remoteURL}/students`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newStudent)
        }).then(data => data.json())
    },
    updateStudent(editedStudent) {
        return fetch(`${Settings.remoteURL}/students/${editedStudent.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(editedStudent)
        }).then(data => data.json());
    }
};
