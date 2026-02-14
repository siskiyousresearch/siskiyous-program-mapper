export type CourseType = 'major' | 'ge' | 'elective' | 'support';

export interface Course {
  id: string;
  code: string;
  title: string;
  units: number;
  type: CourseType;
  description?: string;
  prerequisites?: string[];
  isCompleted?: boolean;
}

export interface Term {
  id: string;
  name: string;
  courses: Course[];
  totalUnits: number;
}

export interface Year {
  id: string;
  name: string;
  terms: Term[];
}

export interface Program {
  id: string;
  title: string;
  degreeType: string;
  description: string;
  years: Year[];
}
