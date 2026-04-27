// lib/filters/index.ts

export function filterUsers(users: any[], searchParams: Record<string, string>) {
  let filtered = [...users];

  if (searchParams.search) {
    const term = searchParams.search.toLowerCase();
    filtered = filtered.filter(
      (user) =>
        user.name?.toLowerCase().includes(term) ||
        user.email?.toLowerCase().includes(term)
    );
  }

  // Future user filters logic can be placed here
  return filtered;
}

export function filterStudents(students: any[], searchParams: Record<string, string>) {
  let filtered = [...students];

  if (searchParams.search) {
    const term = searchParams.search.toLowerCase();
    filtered = filtered.filter(
      (student) =>
        student.name?.toLowerCase().includes(term) ||
        student.email?.toLowerCase().includes(term)
    );
  }

  if (searchParams.status && searchParams.status !== "all") {
    filtered = filtered.filter((student) => student.status === searchParams.status);
  }

  return filtered;
}

export function filterInstructors(instructors: any[], searchParams: Record<string, string>) {
  let filtered = [...instructors];

  if (searchParams.search) {
    const term = searchParams.search.toLowerCase();
    filtered = filtered.filter(
      (instructor) =>
        instructor.name?.toLowerCase().includes(term) ||
        instructor.email?.toLowerCase().includes(term)
    );
  }

  if (searchParams.status && searchParams.status !== "all") {
    filtered = filtered.filter((instructor) => instructor.status === searchParams.status);
  }

  return filtered;
}

export function filterCourses(courses: any[], searchParams: Record<string, string>) {
  let filtered = [...courses];

  if (searchParams.search) {
    const term = searchParams.search.toLowerCase();
    filtered = filtered.filter(
      (course) =>
        course.title?.toLowerCase().includes(term) ||
        course.description?.toLowerCase().includes(term)
    );
  }

  if (searchParams.type) {
    filtered = filtered.filter((course) => course.format === searchParams.type || course.type === searchParams.type);
  }

  return filtered;
}
