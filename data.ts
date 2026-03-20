import { Course, Payment, User } from "./types/types";

export const performanceData = [
  { label: "A", value: 45, color: "#10b981" },
  { label: "B", value: 65, color: "#2b2bee" },
  { label: "C", value: 30, color: "#f59e0b" },
  { label: "D", value: 15, color: "#ef4444" },
];
export const enrollmentsTrendsData = [
  { month: "Jan", enrollments: 120 },
  { month: "Feb", enrollments: 200 },
  { month: "Mar", enrollments: 150 },
  { month: "Apr", enrollments: 300 },
  { month: "May", enrollments: 250 },
  { month: "Jun", enrollments: 400 },
  { month: "Jul", enrollments: 350 },
  { month: "Aug", enrollments: 450 },
  { month: "Sep", enrollments: 500 },
  { month: "Oct", enrollments: 600 },
  { month: "Nov", enrollments: 550 },
  { month: "Dec", enrollments: 700 },
];
export const mockUsers: User[] = [
  {
    id: "1",
    name: "Sarah Jenkins",
    email: "sarah.j@example.com",
    role: "admin",
    status: "active",
    lastLogin: "2 mins ago",
    avatar: "https://picsum.photos/id/64/100/100",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "m.chen@example.com",
    role: "manager",
    status: "active",
    lastLogin: "1 day ago",
    avatar: "https://picsum.photos/id/65/100/100",
  },
  {
    id: "3",
    name: "John Doe",
    email: "john.doe@university.edu",
    role: "manager",
    status: "pending",
    lastLogin: "Never",
  },
  {
    id: "4",
    name: "Emily Blunt",
    email: "emily.b@example.com",
    role: "manager",
    status: "inactive",
    lastLogin: "2 months ago",
  },
  {
    id: "5",
    name: "David Kim",
    email: "d.kim@tech.io",
    role: "manager",
    status: "active",
    lastLogin: "5 hours ago",
  },
  {
    id: "6",
    name: "John Doe",
    email: "john.doe@university.edu",
    role: "manager",
    status: "pending",
    lastLogin: "Never",
  },
  {
    id: "7",
    name: "Emily Blunt",
    email: "emily.b@example.com",
    role: "manager",
    status: "inactive",
    lastLogin: "2 months ago",
  },
  {
    id: "8",
    name: "David Kim",
    email: "d.kim@tech.io",
    role: "manager",
    status: "active",
    lastLogin: "5 hours ago",
  },
];

export const mockCourses: Partial<Course>[] = [
  {
    id: "1",
    title: "Advanced React Patterns",
    category: "Development",
    instructorIds: ["1"],
    status: "PUBLICADO",
    type: "ONLINE",
    studentsCount: 1204,
    duration: "4h 32m",
    thumbnail: "https://picsum.photos/id/180/800/450",
    description: "Master compound components, control props, and custom hooks.",
  },
  {
    id: "2",
    title: "UX Design Fundamentals",
    category: "Design",
    instructorIds: ["2"],
    status: "RASCUNHO",
    type: "HIBRIDO",
    studentsCount: 850,
    duration: "6h 15m",
    thumbnail: "https://picsum.photos/id/201/800/450",
    description: "Learn wireframing, prototyping, and user research basics.",
  },
  {
    id: "3",
    title: "SEO Strategy 2024",
    category: "Marketing",
    instructorIds: ["1"],
    status: "ENCERRADO",
    type: "PRESENCIAL",
    studentsCount: 2300,
    duration: "2h 10m",
    thumbnail: "https://picsum.photos/id/20/800/450",
    description: "Complete guide to technical SEO and content optimization.",
  },
];

export const mockPayments: Partial<Payment>[] = [
  {
    "id": "PAY-001",
    "studentName": "Sarah Jenkins",
    "courseName": "Padrões Avançados de React",
    "amount": 4500,
    "paymentProof": "/images/pay1.png",
    "status": "pending",
    "createdAt": "2026-03-18T08:30:00.000Z"
  },
  {
    "id": "PAY-002",
    "studentName": "Michael Kim",
    "courseName": "Fundamentos de UX Design",
    "amount": 3200,
    "paymentProof": "/images/pay2.jpeg",
    "status": "approved",
    "createdAt": "2026-03-17T14:10:00.000Z"
  },
  {
    "id": "PAY-003",
    "studentName": "David Ross",
    "courseName": "Gestão de Produto 101",
    "amount": 2800,
    "paymentProof": "/images/pay4.png",
    "status": "rejected",
    "rejectionReason": "Comprovativo ilegível. Por favor envie uma imagem mais nítida.",
    "createdAt": "2026-03-16T11:55:00.000Z"
  },
  {
    "id": "PAY-004",
    "studentName": "Elena Rodriguez",
    "courseName": "Mestria em Figma",
    "amount": 5000,
    "paymentProof": "/images/pay3.png",
    "status": "pending",
    "createdAt": "2026-03-19T09:05:00.000Z"
  },
  {
    "id": "PAY-005",
    "studentName": "Alex Johnson",
    "courseName": "Desenvolvimento Full Stack",
    "amount": 7500,
    "paymentProof": "/images/pay5.png",
    "status": "approved",
    "createdAt": "2026-03-15T16:30:00.000Z"
  },
  {
    "id": "PAY-006",
    "studentName": "Fatima Mousa",
    "courseName": "Marketing Digital Avançado",
    "amount": 3800,
    "paymentProof": "/images/pay4.png",
    "status": "pending",
    "createdAt": "2026-03-19T11:20:00.000Z"
  },
  {
    "id": "PAY-007",
    "studentName": "Carlos Mendez",
    "courseName": "Padrões Avançados de React",
    "amount": 4500,
    "paymentProof": "/images/pay2.jpeg",
    "status": "rejected",
    "rejectionReason": "Valor pago não corresponde ao montante indicado na inscrição.",
    "createdAt": "2026-03-14T13:40:00.000Z"
  },
  {
    "id": "PAY-008",
    "studentName": "Lisa Wang",
    "courseName": "SEO Strategy 2024",
    "amount": 2500,
    "paymentProof": "/images/pay4.png",
    "status": "approved",
    "createdAt": "2026-03-13T10:00:00.000Z"
  },
  {
    "id": "PAY-009",
    "studentName": "Nuno Fernandes",
    "courseName": "Fundamentos de UX Design",
    "amount": 3200,
    "paymentProof": "/images/pay4.png",
    "status": "pending",
    "createdAt": "2026-03-20T07:45:00.000Z"
  },
  {
    "id": "PAY-010",
    "studentName": "Amina Diallo",
    "courseName": "Gestão de Produto 101",
    "amount": 2800,
    "paymentProof": "/images/pay5.png",
    "status": "approved",
    "createdAt": "2026-03-12T09:15:00.000Z"
  }
]
