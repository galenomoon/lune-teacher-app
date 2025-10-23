import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Calendar, Clock, GraduationCap, User2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

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

interface ClassCardProps {
  scheduleItem?: ScheduleItem;
  onClick?: (scheduleItem: ScheduleItem) => void;
}

export default function ClassCard({ scheduleItem, onClick }: ClassCardProps) {
  if (!scheduleItem) {
    return (
      <Card className="hover:shadow-md w-fit transition-shadow gap-0 py-4 px-5">
        <CardHeader className="p-0">
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg font-semibold capitalize">
              Carregando...
            </CardTitle>
            <Badge className="bg-gray-500 text-white">-</Badge>
          </div>
        </CardHeader>
      </Card>
    );
  }

  const formatTime = (timeString: string) => {
    return timeString;
  };

  return (
    <Card 
      className="hover:shadow-md w-fit transition-shadow gap-0 py-4 min-w-[300px] px-5 cursor-pointer hover:scale-105"
      onClick={() => onClick?.(scheduleItem)}
    >
      <CardHeader className="p-0">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold capitalize">
            {scheduleItem.modalityName}
          </CardTitle>
          <Badge className="bg-blue-500 text-white">
            Agendada
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-1 p-0 pb-0">
        <section className="flex items-center space-x-4 justify-between">
          <div className="flex items-center space-x-2 text-sm">
            <User2 className="h-4 w-4 text-blue-500" />
            <span>{scheduleItem.classLevel || "N/A"}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <GraduationCap className="h-4 w-4 text-purple-500" />
            <span>{scheduleItem.classDescription || "N/A"}</span>
          </div>
        </section>
        <section className="flex items-center space-x-4 justify-between">
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="h-4 w-4 text-orange-500" />
            <span className="whitespace-nowrap">
              {formatTime(scheduleItem.startTime)} - {formatTime(scheduleItem.endTime)}
            </span>
          </div>
        </section>
        <Separator className="flex-1 my-3" />
        <div className="flex justify-between text-xs gap-3 text-gray-500">
          <Badge className="bg-green-500 text-white">
            <span className="font-medium">Matrículas:</span>
            <span className="font-bold">{scheduleItem.enrolledStudentsCount}</span>
          </Badge>
          <Badge className="bg-blue-500 text-white">
            <span className="font-medium">Aulas Avulsas:</span>
            <span className="font-bold">{scheduleItem.trialStudentsCount}</span>
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
