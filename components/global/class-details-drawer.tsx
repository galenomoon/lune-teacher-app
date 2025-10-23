"use client";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { User, Users, Calendar, Clock } from "lucide-react";

interface EnrolledStudent {
  id: string;
  firstName: string;
  lastName: string;
}

interface TrialStudent {
  id: string;
  lead: {
    id: string;
    firstName: string;
    lastName: string;
  };
  status: string;
}

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
  enrolledStudents: EnrolledStudent[];
  trialStudents: TrialStudent[];
}

interface ClassDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  scheduleItem: ScheduleItem | null;
}

export function ClassDetailsDrawer({
  isOpen,
  onClose,
  scheduleItem,
}: ClassDetailsDrawerProps) {
  if (!scheduleItem) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SCHEDULED":
        return "bg-blue-500";
      case "PENDING_STATUS":
        return "bg-yellow-500";
      case "CONVERTED":
        return "bg-green-500";
      case "NOT_CONVERTED":
        return "bg-red-500";
      case "RESCHEDULED":
        return "bg-purple-500";
      case "CANCELLED":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "SCHEDULED":
        return "Agendada";
      case "PENDING_STATUS":
        return "Pendente";
      case "CONVERTED":
        return "Convertida";
      case "NOT_CONVERTED":
        return "Não Convertida";
      case "RESCHEDULED":
        return "Reagendada";
      case "CANCELLED":
        return "Cancelada";
      default:
        return "Desconhecido";
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="text-left">
          <DrawerTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {scheduleItem.modalityName}
          </DrawerTitle>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {scheduleItem.startTime} - {scheduleItem.endTime}
            </div>
            {scheduleItem.classLevel && (
              <Badge variant="outline">{scheduleItem.classLevel}</Badge>
            )}
          </div>
        </DrawerHeader>

        <div className="px-4 pb-4">
          <Tabs defaultValue="enrolled" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="enrolled" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Matriculados ({scheduleItem.enrolledStudentsCount})
              </TabsTrigger>
              <TabsTrigger value="trials" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Aulas Avulsas ({scheduleItem.trialStudentsCount})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="enrolled" className="space-y-4 mt-4">
              <div className="space-y-3">
                {scheduleItem.enrolledStudents.length > 0 ? (
                  scheduleItem.enrolledStudents.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">
                            {student.firstName} {student.lastName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Aluno Matriculado
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-green-500 text-white">
                        Ativo
                      </Badge>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Nenhum aluno matriculado nesta turma</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="trials" className="space-y-4 mt-4">
              <div className="space-y-3">
                {scheduleItem.trialStudents.length > 0 ? (
                  scheduleItem.trialStudents.map((trial) => (
                    <div
                      key={trial.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                          <User className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium">
                            {trial.lead.firstName} {trial.lead.lastName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Aula Experimental
                          </p>
                        </div>
                      </div>
                      <Badge
                        className={`${getStatusColor(trial.status)} text-white`}
                      >
                        {getStatusText(trial.status)}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <User className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Nenhuma aula avulsa agendada</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
