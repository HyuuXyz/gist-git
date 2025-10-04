import { useState } from "react";
import { Header } from "@/components/Header";
import { FilterBar } from "@/components/FilterBar";
import { SnippetCard } from "@/components/SnippetCard";
import { SnippetDetail } from "@/components/SnippetDetail";
import { mockSnippets, type Snippet } from "@/data/mockSnippets";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedSnippet, setSelectedSnippet] = useState<Snippet | null>(null);

  const filteredSnippets = mockSnippets.filter((snippet) => {
    const matchesSearch =
      snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.code.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLanguage =
      !selectedLanguage || snippet.language === selectedLanguage;

    return matchesSearch && matchesLanguage;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <FilterBar
        selectedLanguage={selectedLanguage}
        onLanguageSelect={setSelectedLanguage}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Code Snippets Library</h1>
          <p className="text-lg text-muted-foreground">
            Discover, share, and reuse code snippets across your projects
          </p>
        </div>

        {filteredSnippets.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">
              No snippets found matching your criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSnippets.map((snippet) => (
              <SnippetCard
                key={snippet.id}
                {...snippet}
                onClick={() => setSelectedSnippet(snippet)}
              />
            ))}
          </div>
        )}
      </main>

      {selectedSnippet && (
        <SnippetDetail
          {...selectedSnippet}
          onClose={() => setSelectedSnippet(null)}
        />
      )}
    </div>
  );
};

export default Index;
