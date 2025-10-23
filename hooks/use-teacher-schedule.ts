import { useQuery } from "@tanstack/react-query";
import api from "@/config/api";

interface ScheduleItem {
  id: string;
  startTime: string;
  endTime: string;
  modalityName: string;
  classLevel: string | null;
  classDescription: string | null;
  enrolledStudentsCount: number;
  trialStudentsCount: number;
  totalStudentsCount: number;
  enrolledStudents: Array<{
    id: string;
    firstName: string;
    lastName: string;
  }>;
  trialStudents: Array<{
    id: string;
    lead: {
      id: string;
      firstName: string;
      lastName: string;
    };
    status: string;
  }>;
}

interface TeacherSchedule {
  date: string;
  isToday: boolean;
  dayLabel: string;
  schedule: ScheduleItem[];
}

export function useTeacherSchedule() {
  return useQuery<TeacherSchedule>({
    queryKey: ["teacherSchedule"],
    queryFn: async () => {
      const { data } = await api.get("api/v1/teachers/me/schedule");
      return data;
    },
  });
}
