import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { FilterBar } from "@/components/FilterBar";
import { SnippetCard } from "@/components/SnippetCard";
import { SnippetDetail } from "@/components/SnippetDetail";
import { mockSnippets, type Snippet } from "@/data/mockSnippets";
import { Button } from "@/components/ui/button";
import { RotateCcw, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(
    searchParams.get("lang")
  );
  const [selectedSnippet, setSelectedSnippet] = useState<Snippet | null>(null);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (selectedLanguage) params.set("lang", selectedLanguage);
    setSearchParams(params, { replace: true });
  }, [searchQuery, selectedLanguage, setSearchParams]);

  const filteredSnippets = mockSnippets.filter((snippet) => {
    const matchesSearch =
      snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.code.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLanguage =
      !selectedLanguage || snippet.language === selectedLanguage;

    return matchesSearch && matchesLanguage;
  });

  const hasActiveFilters = searchQuery || selectedLanguage;

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedLanguage(null);
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <FilterBar
        selectedLanguage={selectedLanguage}
        onLanguageSelect={setSelectedLanguage}
      />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Code Snippets Library</h1>
          <p className="text-lg text-muted-foreground">
            Discover, share, and reuse code snippets across your projects
          </p>
        </div>

        {hasActiveFilters && (
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Found {filteredSnippets.length} snippet{filteredSnippets.length !== 1 ? "s" : ""}
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset Filters
            </Button>
          </div>
        )}

        {filteredSnippets.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <p className="text-lg font-medium mb-2">
                No snippets found
              </p>
              <p className="text-muted-foreground mb-6">
                {hasActiveFilters
                  ? "Try adjusting your filters or search query"
                  : "Be the first to add a snippet!"}
              </p>
              {hasActiveFilters ? (
                <Button onClick={resetFilters} variant="outline" className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Clear Filters
                </Button>
              ) : (
                <Link to="/add">
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Your First Snippet
                  </Button>
                </Link>
              )}
            </div>
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

      <Link
        to="/add"
        className="fixed bottom-6 right-6 md:hidden z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all hover:scale-110"
        aria-label="Add snippet"
      >
        <Plus className="h-6 w-6" />
      </Link>
    </div>
  );
};

export default Index;
