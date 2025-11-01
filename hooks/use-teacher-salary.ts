import { useQuery } from "@tanstack/react-query";
import api from "@/config/api";

export interface WorkedHour {
  id: string;
  workedAt: string;
  startedAt: string;
  endedAt: string;
  duration: number;
  teacherId: string;
  teacherName: string;
  modalityName: string;
  classLevel: string | null;
  classDescription: string | null;
  enrolledStudentsCount: number;
  trialStudentsCount: number;
  totalStudentsCount: number;
  newEnrollmentsCount: number;
  priceSnapshot: number;
  status: string;
  students: Array<{
    id: string;
    firstName: string;
    lastName: string;
  }>;
}

interface TeacherSalarySummary {
  month: string;
  total: number;
  newEnrollments: number;
  totalHours: number;
  workedHours: WorkedHour[];
}

export function useTeacherSalary(month?: number, year?: number) {
  return useQuery<TeacherSalarySummary>({
    queryKey: ["teacherSalary", month, year],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (month) params.append("month", month.toString());
      if (year) params.append("year", year.toString());
      
      const queryString = params.toString();
      const url = queryString
        ? `api/v1/teachers/me/salary-summary?${queryString}`
        : "api/v1/teachers/me/salary-summary";
      
      const { data } = await api.get(url);
      return data;
    },
  });
}
