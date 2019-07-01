import Settings from "./Settings";

export default {
  get(id) {
    return fetch(`${Settings.remoteURL}/classroomStudents?_expand=student/${id}`).then((e) => e.json());
  },
  delete(id) {
    return fetch(`${Settings.remoteURL}/classroomStudents/${id}`, {
      method: "DELETE"
    }).then((e) => e.json());
  },

  getAll() {
    return fetch(`${Settings.remoteURL}/classroomStudents?_expand=student`).then((e) => e.json());
  },


addClassroomStudent(newClassroomStudent) {
    return fetch(`${Settings.remoteURL}/classroomStudents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newClassroomStudent)
    }).then(data => data.json())
}
}