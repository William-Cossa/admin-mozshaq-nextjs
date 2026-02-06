import Heading from "@/components/Heading";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HelpCircle, Mail, MessageCircle, Phone } from "lucide-react";

export default function HelpPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <Heading 
        title="Ajuda e Suporte" 
        text="Encontre respostas para as suas perguntas ou entre em contacto directo com a nossa equipa." 
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="text-center p-4">
          <CardContent className="pt-6">
            <div className="mx-auto w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-3">
              <Mail className="text-primary" size={20} />
            </div>
            <h3 className="font-bold text-sm mb-1">E-mail</h3>
            <p className="text-xs text-muted-foreground mb-4">suporte@mozshaq.com</p>
            <Button variant="outline" size="sm" className="w-full">Enviar Mensagem</Button>
          </CardContent>
        </Card>

        <Card className="text-center p-4">
          <CardContent className="pt-6">
            <div className="mx-auto w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-3">
              <Phone className="text-primary" size={20} />
            </div>
            <h3 className="font-bold text-sm mb-1">Telefone</h3>
            <p className="text-xs text-muted-foreground mb-4">+258 84 000 0000</p>
            <Button variant="outline" size="sm" className="w-full">Ligar Agora</Button>
          </CardContent>
        </Card>

        <Card className="text-center p-4">
          <CardContent className="pt-6">
            <div className="mx-auto w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-3">
              <MessageCircle className="text-primary" size={20} />
            </div>
            <h3 className="font-bold text-sm mb-1">Chat Directo</h3>
            <p className="text-xs text-muted-foreground mb-4">Disponível 08:00 - 17:00</p>
            <Button variant="outline" size="sm" className="w-full">Iniciar Conversa</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Perguntas Frequentes</CardTitle>
          <CardDescription>
            Respostas rápidas para as dúvidas mais comuns dos nossos utilizadores.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Note: Accordion component needs to be available in UI components */}
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h4 className="font-medium mb-2">Como posso criar um novo curso?</h4>
              <p className="text-sm text-muted-foreground">
                Para criar um novo curso, aceda ao menu "Cursos" na barra lateral e clique no botão "Criar Novo Curso" no canto superior direito.
              </p>
            </div>
            <div className="border-b pb-4">
              <h4 className="font-medium mb-2">Como exportar relatórios de inscrições?</h4>
              <p className="text-sm text-muted-foreground">
                No menu "Relatórios", poderá seleccionar o período pretendido e clicar no botão de exportação para descarregar os dados em formato Excel ou PDF.
              </p>
            </div>
            <div className="border-b pb-4">
              <h4 className="font-medium mb-2">É possível alterar o instrutor de um curso já publicado?</h4>
              <p className="text-sm text-muted-foreground">
                Sim, basta editar o curso, ir à secção de informações básicas e seleccionar o novo instrutor no campo correspondente.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
