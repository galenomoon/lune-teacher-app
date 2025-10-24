import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

export default function Header() {
  const { currentUser } = useAuth();
  const router = useRouter();
  return (
    <header className="flex flex-col justify-between px-4 mb-4 py-4 h-[130px] bg-purple-lune text-white">
      <section className="flex justify-between items-center">
        <SidebarTrigger className="scale-150" />
        <div className="flex gap-8 items-center">
          <Avatar
            onClick={() => router.push("/perfil")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                router.push("/perfil");
              }
            }}
            className="size-12 rounded-full grayscale"
          >
            <AvatarImage
              src={currentUser?.imageUrl || ""}
              alt={currentUser?.firstName}
            />
            <AvatarFallback className="rounded-lg bg-black/40">
              {currentUser?.firstName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
      </section>
      <h1 className="text-2xl">
        Olá, <span className="font-semibold">{currentUser?.firstName}</span>
      </h1>
    </header>
  );
}
