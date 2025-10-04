import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Copy, Download, Code, X, Share2 } from "lucide-react";
import { toast } from "sonner";

interface SnippetDetailProps {
  title: string;
  description: string;
  language: string;
  code: string;
  author: string;
  date: string;
  onClose: () => void;
}

export const SnippetDetail = ({
  title,
  description,
  language,
  code,
  author,
  date,
  onClose,
}: SnippetDetailProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard!");
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, "-")}.${language}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Snippet downloaded!");
  };

  const handleEmbed = () => {
    const embedCode = `<iframe src="${window.location.href}" width="100%" height="400"></iframe>`;
    navigator.clipboard.writeText(embedCode);
    toast.success("Embed code copied!");
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Card className="w-full max-w-4xl relative animate-in fade-in-0 zoom-in-95">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="absolute right-4 top-4 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="p-8">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{title}</h1>
                  <p className="text-muted-foreground">{description}</p>
                </div>
                <Badge className="language-badge">{language.toUpperCase()}</Badge>
              </div>

              <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
                <span>by {author}</span>
                <span>•</span>
                <span>{date}</span>
              </div>

              <Accordion type="single" collapsible defaultValue="code" className="mb-6">
                <AccordionItem value="code">
                  <AccordionTrigger className="text-lg font-semibold">
                    <div className="flex items-center gap-2">
                      <Code className="h-5 w-5" />
                      Code
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="code-block">
                      <pre className="text-sm">
                        <code>{code}</code>
                      </pre>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="flex flex-wrap gap-3">
                <Button onClick={handleCopy} className="gap-2">
                  <Copy className="h-4 w-4" />
                  Copy Code
                </Button>
                <Button onClick={handleDownload} variant="secondary" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
                <Button onClick={handleEmbed} variant="outline" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Embed
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
