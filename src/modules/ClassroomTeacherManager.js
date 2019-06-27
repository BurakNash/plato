import Settings from "./Settings";

export default {
  get(id) {
    return fetch(`${Settings.remoteURL}/classroomTeachers?_expand=teacher/${id}`).then((e) => e.json());
  },
  delete(id) {
    return fetch(`${Settings.remoteURL}/classroomTeachers/${id}`, {
      method: "DELETE"
    }).then((e) => e.json());
  },

  getAll() {
    return fetch(`${Settings.remoteURL}/classroomTeachers?_expand=teacher`).then((e) => e.json());
  },


addClassroomTeacher(newClassroomTeacher) {
    return fetch(`${Settings.remoteURL}/classroomTeachers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newClassroomTeacher)
    }).then(data => data.json())
}
}