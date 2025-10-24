"use client";
import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  CreditCard, 
  Instagram, 
  GraduationCap,
  Clock,
  DollarSign,
  Key,
  CalendarDays
} from "lucide-react";
import Header from "../_components/header";

export default function PerfilPage() {
  const { currentUser, isLoadingCurrentUser } = useAuth();

  if (isLoadingCurrentUser) {
    return (
      <section className="flex flex-col gap-4">
        <Header />
        <div className="px-4 space-y-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </section>
    );
  }

  if (!currentUser) {
    return (
      <section className="flex flex-col gap-4">
        <Header />
        <div className="px-4 flex items-center justify-center py-8">
          <p className="text-red-500">Erro ao carregar dados do usuário</p>
        </div>
      </section>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <section className="flex flex-col gap-4">
      <Header />
      
      <div className="px-4 space-y-6 pb-20">
        {/* Informações Pessoais */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="h-5 w-5" />
              Informações Pessoais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={currentUser.imageUrl || ""} alt={currentUser.firstName} />
                <AvatarFallback className="text-lg">
                  {currentUser.firstName?.charAt(0)}{currentUser.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">
                  {currentUser.firstName} {currentUser.lastName}
                </h3>
                <p className="text-muted-foreground text-sm">
                  Professor desde {formatDate(currentUser.createdAt)}
                </p>
              </div>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{currentUser.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Telefone</p>
                  <p className="text-sm text-muted-foreground">{currentUser.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Data de Nascimento</p>
                  <p className="text-sm text-muted-foreground">{formatDate(currentUser.birthDate)}</p>
                </div>
              </div>
              
              {currentUser.instagram && (
                <div className="flex items-center gap-3">
                  <Instagram className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Instagram</p>
                    <p className="text-sm text-muted-foreground">{currentUser.instagram}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Informações Financeiras */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <DollarSign className="h-5 w-5" />
              Informações Financeiras
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Preço por Hora</p>
                  <p className="text-sm text-muted-foreground">
                    {formatCurrency(currentUser.priceHour)}
                  </p>
                </div>
              </div>
            </div>
            
            {currentUser.pixKey && (
              <>
                <Separator />
                <div className="flex items-center gap-3">
                  <Key className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Chave PIX</p>
                    <p className="text-sm text-muted-foreground break-all">{currentUser.pixKey}</p>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Documentos */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <CreditCard className="h-5 w-5" />
              Documentos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <p className="text-sm font-medium">CPF</p>
                <p className="text-sm text-muted-foreground">{currentUser.cpf}</p>
              </div>
              <div>
                <p className="text-sm font-medium">RG</p>
                <p className="text-sm text-muted-foreground">{currentUser.rg}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Classes e Modalidades */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <GraduationCap className="h-5 w-5" />
              Classes e Modalidades
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Suas Classes ({currentUser.classes?.length || 0})</p>
              <div className="space-y-2">
                {currentUser.classes?.length ? (
                  currentUser.classes.map((classItem) => (
                    <div key={classItem.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{classItem.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {classItem.modality.name}
                          </p>
                        </div>
                        <Badge variant="secondary">
                          {classItem.maxStudents} alunos
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Nenhuma classe encontrada</p>
                )}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <p className="text-sm font-medium mb-2">Modalidades Disponíveis ({currentUser.modalities?.length || 0})</p>
              <div className="flex flex-wrap gap-2">
                {currentUser.modalities?.length ? (
                  currentUser.modalities.map((modality) => (
                    <Badge key={modality.id} variant="outline">
                      {modality.name}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Nenhuma modalidade encontrada</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Informações da Conta */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <CalendarDays className="h-5 w-5" />
              Informações da Conta
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <p className="text-sm font-medium">Conta criada em</p>
                <p className="text-sm text-muted-foreground">{formatDate(currentUser.createdAt)}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Última atualização</p>
                <p className="text-sm text-muted-foreground">{formatDate(currentUser.updatedAt)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
