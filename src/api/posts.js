// axios
const posts = [
  { id: 1, title: '제목1', content: '내용1', createAt: '2024-08-01' },
  { id: 2, title: '제목2', content: '내용2', createAt: '2024-08-02' },
  { id: 3, title: '제목3', content: '내용3', createAt: '2024-08-03' },
  { id: 4, title: '제목4', content: '내용4', createAt: '2024-08-04' },
  { id: 5, title: '제목5', content: '내용5', createAt: '2024-08-05' },
];

export function getPost() {
  return posts;
}

export function getPostById(id) {
  const NumId = Number(id);
  return posts.find(item => item.id === NumId);
}
