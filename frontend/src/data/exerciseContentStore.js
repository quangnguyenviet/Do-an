// Lưu tạm nội dung bài tập (danh sách câu hỏi) mà gia sư tạo/sửa trong phiên làm việc.
// Không có backend thật nên dùng một Map ở module-scope, tách khỏi mockData.js tĩnh,
// để nội dung không bị mất khi điều hướng qua lại trang chi tiết bài tập trong cùng phiên.
const store = new Map();

export function contentKeyFor(studentId, exerciseId) {
  return `${studentId}:${exerciseId}`;
}

export function getExerciseContent(key) {
  return store.get(key);
}

export function setExerciseContent(key, questions) {
  store.set(key, questions);
}
