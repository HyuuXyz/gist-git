export interface Snippet {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
  author: string;
  date: string;
}

export const mockSnippets: Snippet[] = [
  {
    id: "1",
    title: "React Custom Hook - useLocalStorage",
    description: "A reusable hook for managing state in localStorage with TypeScript support",
    language: "TypeScript",
    code: `import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}`,
    author: "Sarah Chen",
    date: "2024-01-15",
  },
  {
    id: "2",
    title: "Python Email Validator",
    description: "Validate email addresses using regex with comprehensive pattern matching",
    language: "Python",
    code: `import re

def validate_email(email):
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
    
    if re.match(pattern, email):
        return True
    return False

# Usage
email = "user@example.com"
is_valid = validate_email(email)
print(f"Email {email} is {'valid' if is_valid else 'invalid'}")`,
    author: "Alex Johnson",
    date: "2024-01-14",
  },
  {
    id: "3",
    title: "CSS Gradient Button",
    description: "Modern gradient button with hover animation and smooth transitions",
    language: "CSS",
    code: `.gradient-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 8px;
  color: white;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.gradient-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}

.gradient-button:active {
  transform: translateY(0);
}`,
    author: "Maria Garcia",
    date: "2024-01-13",
  },
  {
    id: "4",
    title: "JavaScript Debounce Function",
    description: "Utility function to limit the rate at which a function can fire",
    language: "JavaScript",
    code: `function debounce(func, wait) {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Usage example
const handleSearch = debounce((query) => {
  console.log('Searching for:', query);
  // Perform search operation
}, 300);

// Call this on input events
input.addEventListener('input', (e) => handleSearch(e.target.value));`,
    author: "David Kim",
    date: "2024-01-12",
  },
  {
    id: "5",
    title: "React Loading Skeleton",
    description: "Reusable skeleton loader component for better UX during data fetching",
    language: "React",
    code: `import React from 'react';

export const Skeleton = ({ 
  width = '100%', 
  height = '20px', 
  className = '' 
}) => {
  return (
    <div
      className={\`skeleton \${className}\`}
      style={{ width, height }}
    />
  );
};

// CSS
const styles = \`
.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
\`;`,
    author: "Emma Wilson",
    date: "2024-01-11",
  },
  {
    id: "6",
    title: "SQL Find Duplicates",
    description: "Query to find duplicate records in a table based on specific columns",
    language: "SQL",
    code: `-- Find duplicate emails in users table
SELECT email, COUNT(*) as count
FROM users
GROUP BY email
HAVING COUNT(*) > 1
ORDER BY count DESC;

-- Get all duplicate records with details
SELECT u.*
FROM users u
INNER JOIN (
  SELECT email
  FROM users
  GROUP BY email
  HAVING COUNT(*) > 1
) duplicates ON u.email = duplicates.email
ORDER BY u.email, u.created_at;`,
    author: "Michael Brown",
    date: "2024-01-10",
  },
  {
    id: "7",
    title: "Shell Script - Git Branch Cleanup",
    description: "Safely delete merged git branches except main and develop",
    language: "Shell",
    code: `#!/bin/bash

# Delete all local branches that have been merged into main
git branch --merged main | grep -v "\\* main" | grep -v "develop" | xargs -n 1 git branch -d

# Delete remote tracking branches that no longer exist on remote
git fetch --prune

echo "Branch cleanup complete!"`,
    author: "James Taylor",
    date: "2024-01-09",
  },
  {
    id: "8",
    title: "TypeScript Generic API Fetch",
    description: "Type-safe fetch wrapper with error handling and generics",
    language: "TypeScript",
    code: `async function fetchAPI<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

// Usage
interface User {
  id: number;
  name: string;
  email: string;
}

const user = await fetchAPI<User>('/api/user/1');`,
    author: "Lisa Anderson",
    date: "2024-01-08",
  },
];
