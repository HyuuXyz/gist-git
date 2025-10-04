import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Save, GitPullRequest } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const LANGUAGES = [
  "JavaScript",
  "TypeScript",
  "Python",
  "React",
  "CSS",
  "HTML",
  "SQL",
  "Shell",
];

const AddSnippet = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("");
  const [code, setCode] = useState("");
  const [tags, setTags] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) newErrors.title = "Title is required";
    if (title.length > 100) newErrors.title = "Title must be less than 100 characters";
    
    if (!description.trim()) newErrors.description = "Description is required";
    if (description.length > 500) newErrors.description = "Description must be less than 500 characters";
    
    if (!language) newErrors.language = "Language is required";
    
    if (!code.trim()) newErrors.code = "Code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (action: "pr" | "commit") => {
    if (!validate()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    // Simulate submission
    toast.success(
      action === "pr" 
        ? "Pull request created successfully!" 
        : "Snippet committed successfully!"
    );
    
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery="" onSearchChange={() => {}} />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to snippets
          </Link>
          <h1 className="text-4xl font-bold mb-2">Add New Snippet</h1>
          <p className="text-muted-foreground">
            Share your code with the community
          </p>
        </div>

        <Tabs defaultValue="edit" className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="mt-6">
            <Card className="p-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., React Custom Hook - useLocalStorage"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={errors.title ? "border-destructive" : ""}
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive">{errors.title}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of what this snippet does..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className={errors.description ? "border-destructive" : ""}
                  />
                  {errors.description && (
                    <p className="text-sm text-destructive">{errors.description}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Language *</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className={errors.language ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        {LANGUAGES.map((lang) => (
                          <SelectItem key={lang} value={lang}>
                            {lang}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.language && (
                      <p className="text-sm text-destructive">{errors.language}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma-separated)</Label>
                    <Input
                      id="tags"
                      placeholder="e.g., hooks, react, typescript"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="code">Code *</Label>
                  <Textarea
                    id="code"
                    placeholder="Paste your code here..."
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    rows={15}
                    className={`font-mono text-sm ${errors.code ? "border-destructive" : ""}`}
                  />
                  {errors.code && (
                    <p className="text-sm text-destructive">{errors.code}</p>
                  )}
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="preview" className="mt-6">
            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{title || "Untitled Snippet"}</h2>
                  <p className="text-muted-foreground">{description || "No description"}</p>
                </div>

                {language && (
                  <div>
                    <span className="language-badge">{language.toUpperCase()}</span>
                  </div>
                )}

                {tags && (
                  <div className="flex flex-wrap gap-2">
                    {tags.split(",").map((tag, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}

                <div className="code-block">
                  <pre className="text-sm">
                    <code>{code || "// Your code will appear here"}</code>
                  </pre>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={() => handleSubmit("pr")}
            className="gap-2 flex-1"
          >
            <GitPullRequest className="h-4 w-4" />
            Create Pull Request
          </Button>
          <Button
            onClick={() => handleSubmit("commit")}
            variant="secondary"
            className="gap-2 flex-1"
          >
            <Save className="h-4 w-4" />
            Commit as Bot
          </Button>
        </div>

        <p className="text-sm text-muted-foreground text-center mt-4">
          * Required fields
        </p>
      </main>
    </div>
  );
};

export default AddSnippet;
