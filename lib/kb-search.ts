import fs from 'fs';
import path from 'path';

// Load knowledge base data
export function loadKnowledgeBase(kbId: string) {
  const kbPath = path.join(process.cwd(), 'data', `${kbId}.json`);
  const data = fs.readFileSync(kbPath, 'utf-8');
  return JSON.parse(data);
}

// Search across all knowledge bases
export function searchKnowledgeBases(query: string) {
  const kb1 = loadKnowledgeBase('kb1-product-docs');
  const kb2 = loadKnowledgeBase('kb2-internal-wiki');
  
  const normalizedQuery = query.toLowerCase();
  
  // Search function for a single KB
  const searchKB = (kb: any) => {
    return kb.articles.filter((article: any) => {
      const titleMatch = article.title.toLowerCase().includes(normalizedQuery);
      const contentMatch = article.content.toLowerCase().includes(normalizedQuery);
      const tagMatch = article.tags.some((tag: string) => 
        tag.toLowerCase().includes(normalizedQuery)
      );
      const categoryMatch = article.category.toLowerCase().includes(normalizedQuery);
      
      return titleMatch || contentMatch || tagMatch || categoryMatch;
    }).map((article: any) => ({
      ...article,
      kb_name: kb.kb_name,
      kb_id: kb.kb_id
    }));
  };
  
  const results1 = searchKB(kb1);
  const results2 = searchKB(kb2);
  
  // Combine and sort by relevance (title matches first, then content matches)
  const allResults = [...results1, ...results2].sort((a, b) => {
    const aTitle = a.title.toLowerCase().includes(normalizedQuery);
    const bTitle = b.title.toLowerCase().includes(normalizedQuery);
    
    if (aTitle && !bTitle) return -1;
    if (!aTitle && bTitle) return 1;
    
    return b.views - a.views; // Secondary sort by views
  });
  
  return allResults;
}

// Get all categories across both KBs
export function getAllCategories() {
  const kb1 = loadKnowledgeBase('kb1-product-docs');
  const kb2 = loadKnowledgeBase('kb2-internal-wiki');
  
  const categories = new Set<string>();
  
  [...kb1.articles, ...kb2.articles].forEach((article: any) => {
    categories.add(article.category);
  });
  
  return Array.from(categories).sort();
}

// Get article by ID
export function getArticleById(articleId: string) {
  const kb1 = loadKnowledgeBase('kb1-product-docs');
  const kb2 = loadKnowledgeBase('kb2-internal-wiki');
  
  const allArticles = [...kb1.articles, ...kb2.articles];
  const article = allArticles.find((a: any) => a.id === articleId);
  
  if (!article) return null;
  
  // Add KB info to article
  const kb = article.id.startsWith('pd') ? kb1 : kb2;
  return {
    ...article,
    kb_name: kb.kb_name,
    kb_id: kb.kb_id
  };
}
