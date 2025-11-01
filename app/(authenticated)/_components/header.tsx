import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/contexts/auth-context";

interface HeaderProps {
  selectedMonth?: number;
  selectedYear?: number;
  onMonthChange?: (month: number) => void;
  onYearChange?: (year: number) => void;
}

export default function Header({
  selectedMonth = new Date().getMonth() + 1,
  selectedYear = new Date().getFullYear(),
  onMonthChange,
  onYearChange,
}: HeaderProps) {
  const { currentUser } = useAuth();
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  // Obter a data de criação do professor
  const teacherCreatedDate = currentUser?.createdAt
    ? new Date(currentUser.createdAt)
    : new Date(); // Fallback para data atual se não houver createdAt
  const teacherCreatedYear = teacherCreatedDate.getFullYear();
  const teacherCreatedMonth = teacherCreatedDate.getMonth() + 1;

  const months = [
    { value: 1, label: "Janeiro" },
    { value: 2, label: "Fevereiro" },
    { value: 3, label: "Março" },
    { value: 4, label: "Abril" },
    { value: 5, label: "Maio" },
    { value: 6, label: "Junho" },
    { value: 7, label: "Julho" },
    { value: 8, label: "Agosto" },
    { value: 9, label: "Setembro" },
    { value: 10, label: "Outubro" },
    { value: 11, label: "Novembro" },
    { value: 12, label: "Dezembro" },
  ];

  // Gerar anos: a partir do ano de criação do professor até o ano atual
  const minYear = teacherCreatedYear;
  const years: number[] = [];
  const startYear = Math.max(minYear, currentYear);
  for (let year = startYear; year >= minYear; year--) {
    years.push(year);
  }

  // Filtrar meses baseado no ano selecionado
  // Se for o ano atual, só permitir meses até o mês atual
  // Se for o ano de criação, só permitir meses a partir do mês de criação
  // Se for ambos, aplicar ambas as condições
  const availableMonths = (() => {
    const isCurrentYear = selectedYear === currentYear;
    const isCreatedYear = selectedYear === teacherCreatedYear;

    if (isCurrentYear && isCreatedYear) {
      // Ano atual E ano de criação: meses entre mês de criação e mês atual
      return months.filter(
        (month) =>
          month.value >= teacherCreatedMonth && month.value <= currentMonth
      );
    } else if (isCurrentYear) {
      // Apenas ano atual: até o mês atual
      return months.filter((month) => month.value <= currentMonth);
    } else if (isCreatedYear) {
      // Apenas ano de criação: a partir do mês de criação
      return months.filter((month) => month.value >= teacherCreatedMonth);
    } else {
      // Outros anos: todos os meses
      return months;
    }
  })();

  return (
    <header className="flex flex-col justify-between px-4 mb-4 py-4 h-[130px] bg-purple-lune text-white">
      <section className="flex justify-between items-center">
        <SidebarTrigger className="scale-150" />
        <div className="flex gap-2 items-center">
          <Select
            value={selectedMonth.toString()}
            onValueChange={(value) => onMonthChange?.(parseInt(value))}
          >
            <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white hover:bg-white/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {availableMonths.map((month) => (
                <SelectItem key={month.value} value={month.value.toString()}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {years.length >= 2 && (
            <Select
              value={selectedYear.toString()}
              onValueChange={(value) => onYearChange?.(parseInt(value))}
            >
              <SelectTrigger className="w-20 bg-white/10 border-white/20 text-white hover:bg-white/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </section>
      <h1 className="text-2xl">
        Olá, <span className="font-semibold">{currentUser?.firstName}</span>
      </h1>
    </header>
  );
}
