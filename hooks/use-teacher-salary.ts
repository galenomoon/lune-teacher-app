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

export function useTeacherSalary() {
  return useQuery<TeacherSalarySummary>({
    queryKey: ["teacherSalary"],
    queryFn: async () => {
      const { data } = await api.get("api/v1/teachers/me/salary-summary");
      return data;
    },
  });
}
