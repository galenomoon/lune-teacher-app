"use client";
import { useState } from "react";
import ClassCard from "@/components/global/class-card";
import { ClassDetailsDrawer } from "@/components/global/class-details-drawer";

import { SalarySkeleton } from "@/components/global/salary-skeleton";
import { ClassCardSkeleton } from "@/components/global/class-card-skeleton";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/auth-context";
import { useTeacherSalary } from "@/hooks/use-teacher-salary";
import { useTeacherSchedule } from "@/hooks/use-teacher-schedule";
import { ChevronRight, Clock, UserPlus } from "lucide-react";
import Header from "./_components/header";
import TeacherWorkedHoursTable from "@/components/global/teacher-worked-hours-table";

export default function Home() {
  const { currentUser } = useAuth();
  const {
    data: salaryData,
    isLoading: isLoadingSalary,
    error: salaryError,
  } = useTeacherSalary();
  const {
    data: scheduleData,
    isLoading: isLoadingSchedule,
    error: scheduleError,
  } = useTeacherSchedule();

  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const hasError = salaryError || scheduleError;

  const handleClassClick = (scheduleItem: any) => {
    setSelectedClass(scheduleItem);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedClass(null);
  };

  if (hasError) {
    return (
      <section className="flex flex-col gap-4">
        <Header />
        <section className="px-4 flex items-center justify-center py-8">
          <p className="text-red-500">Erro ao carregar dados</p>
        </section>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-4">
      <Header />

      {/* Salary Section */}
      {isLoadingSalary ? (
        <SalarySkeleton />
      ) : (
        <section className="px-4 flex items-center justify-between">
          <article className="flex flex-col gap-2">
            <p>Saldo em {salaryData?.month || "Carregando..."}</p>
            <article className="flex flex-col">
              <h1 className="text-2xl font-semibold leading-none">
                {(salaryData?.total || 0).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </h1>
            </article>
          </article>
          {/* <ChevronRight size={24} /> */}
          <article className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-1">
              <Clock size={16} className="text-orange-500" />{" "}
              <span className="text-sm text-muted-foreground">
                <span className="font-semibold">
                  {salaryData?.totalHours || 0}h
                </span>{" "}
                de aulas dadas
              </span>
            </div>
            <div className="flex items-center gap-1">
              <UserPlus size={16} className="text-green-500" />{" "}
              <span className="text-sm text-muted-foreground">
                <span className="font-semibold">
                  {salaryData?.newEnrollments || 0}
                </span>{" "}
                novas matrículas
              </span>
            </div>
          </article>
        </section>
      )}

      <Separator className="my-1" />

      {/* Schedule Section */}
      <article className="flex flex-col gap-4">
        {isLoadingSchedule ? (
          <Skeleton className="h-6 w-48 ml-4" />
        ) : (
          <p className="font-semibold text-xl pl-4">
            Aulas de {scheduleData?.dayLabel || "hoje"}:
          </p>
        )}

        <section className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pr-4">
          {isLoadingSchedule ? (
            // Mostrar 3 skeletons de cards
            Array.from({ length: 3 }).map((_, index) => (
              <div className="snap-start first:pl-4" key={index}>
                <ClassCardSkeleton />
              </div>
            ))
          ) : scheduleData?.schedule?.length ? (
            scheduleData.schedule.map((scheduleItem) => (
              <div className="snap-start first:pl-4" key={scheduleItem.id}>
                <ClassCard
                  scheduleItem={scheduleItem}
                  onClick={handleClassClick}
                />
              </div>
            ))
          ) : (
            <div className="snap-start first:pl-4">
              <p className="text-muted-foreground">Nenhuma aula encontrada</p>
            </div>
          )}
        </section>
      </article>

      <Separator className="my-1" />

      <article className="flex flex-col gap-4 px-4 mb-12">
        <article className="flex items-center gap-2 w-full">
          <p className="font-semibold text-xl ">Registros de aulas:</p>
          <span className="text-xl text-muted-foreground capitalize ">
            {salaryData?.month}
          </span>
        </article>
        <TeacherWorkedHoursTable
          workedHours={salaryData?.workedHours || []}
          isLoading={isLoadingSalary}
        />
      </article>
      {/* Drawer para detalhes da aula */}
      <ClassDetailsDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        scheduleItem={selectedClass}
      />
    </section>
  );
}
