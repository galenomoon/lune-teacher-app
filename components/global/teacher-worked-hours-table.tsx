"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Clock,
  User2,
  Star,
  UserPlus,
  Calendar,
  DollarSign,
  CheckCircle,
  ListCollapse,
} from "lucide-react";
import { WorkedHour } from "@/hooks/use-teacher-salary";

interface TeacherWorkedHoursTableProps {
  workedHours: WorkedHour[];
  isLoading: boolean;
}

const dayOfWeekMap: Record<number, string> = {
  0: "DOM",
  1: "SEG",
  2: "TER",
  3: "QUA",
  4: "QUI",
  5: "SEX",
  6: "SÁB",
};

const statusColors = {
  PENDING: "bg-yellow-500 text-white",
  DONE: "bg-green-500 text-white",
  CANCELED: "bg-red-500 text-white",
};

const statusLabels = {
  PENDING: "Pendente",
  DONE: "Realizada",
  CANCELED: "Não Realizada",
};

export default function TeacherWorkedHoursTable({
  workedHours,
  isLoading,
}: TeacherWorkedHoursTableProps) {
  const formatTime = (time: string) => {
    const date = new Date(time);
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getDayOfWeek = (date: string) => {
    const d = new Date(date);
    return dayOfWeekMap[d.getDay()];
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (workedHours.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
        <p className="text-lg font-medium">Nenhum registro encontrado</p>
        <p className="text-sm">Seus registros de aulas aparecerão aqui</p>
      </div>
    );
  }

  return (
    <Accordion type="multiple" className="space-y-2">
      {workedHours.map((workedHour) => {
        const hours = workedHour.duration / 60;
        const totalValue = hours * workedHour.priceSnapshot;

        return (
          <AccordionItem
            key={workedHour.id}
            value={workedHour.id}
            className="border rounded-lg px-4"
          >
            <AccordionTrigger className="hover:no-underline py-2">
              <div className="flex items-center justify-between w-full">
                {/* Resumo - Data e Status */}
                <div className="flex items-center justify-between w-full space-x-4">
                  <div className="flex flex-col text-left">
                    <span className="font-medium text-sm">
                      {getDayOfWeek(workedHour.workedAt)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(workedHour.workedAt)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        workedHour.newEnrollmentsCount < 1
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      <UserPlus className="w-3 h-3 mr-1" />
                      {workedHour.newEnrollmentsCount}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        statusColors[
                          workedHour.status as keyof typeof statusColors
                        ]
                      }`}
                    >
                      {
                        statusLabels[
                          workedHour.status as keyof typeof statusLabels
                        ]
                      }
                    </Badge>
                  </div>
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent className="pb-4">
              <div className="space-y-4 pt-2">
                {/* Modalidade e Turma */}
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center gap-2">
                    <ListCollapse className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-base">
                      {workedHour.modalityName}
                    </span>
                  </div>
                  {(workedHour.classLevel || workedHour.classDescription) && (
                    <div className="pl-6">
                      <span className="text-sm text-muted-foreground">
                        {workedHour.classLevel && workedHour.classDescription
                          ? `${workedHour.classLevel} • ${workedHour.classDescription}`
                          : workedHour.classLevel ||
                            workedHour.classDescription}
                      </span>
                    </div>
                  )}
                </div>

                {/* Detalhes Financeiros */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Valor Total
                      </span>
                      <div className="text-lg font-semibold text-green-600">
                        R${" "}
                        {totalValue.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Duração
                      </span>
                      <div className="text-lg font-semibold text-blue-600">
                        {hours.toFixed(1)}h
                      </div>
                    </div>
                  </div>
                </div>

                {/* Valor por Hora */}
                <div className="flex items-center gap-2 p-3 bg-muted/20 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Valor por hora: R${" "}
                    {workedHour.priceSnapshot.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>

                {/* Lista de Alunos (se houver) */}
                {workedHour.students && workedHour.students.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Alunos Matriculados ({workedHour.students.length})
                    </h4>
                    <div className="space-y-1">
                      {workedHour.students.map((student) => (
                        <div
                          key={student.id}
                          className="flex items-center gap-2 text-sm px-2 py-1.5 rounded bg-blue-50 text-blue-900"
                        >
                          <User2 className="h-3 w-3" />
                          <span>
                            {student.firstName} {student.lastName}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
