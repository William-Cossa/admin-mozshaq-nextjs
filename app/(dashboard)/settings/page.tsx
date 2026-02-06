import Heading from "@/components/Heading";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <Heading 
        title="Definições" 
        text="Gerencie as configurações do sistema e as suas preferências pessoais." 
      />

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Perfil do Utilizador</CardTitle>
            <CardDescription>
              Actualize a sua informação pessoal e endereço de correio electrónico.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input id="name" defaultValue="William Cossa" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correio Electrónico</Label>
                <Input id="email" defaultValue="williamcossa@mozshaq.com" />
              </div>
            </div>
            <Button>Guardar Alterações</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notificações</CardTitle>
            <CardDescription>
              Escolha como deseja ser notificado sobre as actividades no portal.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Notificações por Correio Electrónico</p>
                <p className="text-xs text-muted-foreground">Receba resumos diários das novas inscrições.</p>
              </div>
              {/* Checkbox component should be used here if available */}
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Alertas de Sistema</p>
                <p className="text-xs text-muted-foreground">Receba alertas críticos sobre o estado do servidor.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-destructive">Zona de Perigo</CardTitle>
            <CardDescription>
              Acções irreversíveis que podem afectar os seus dados.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="destructive">Desactivar Conta</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
