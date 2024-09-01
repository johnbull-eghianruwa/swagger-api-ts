export interface Article {
    id: number;
    name: string;
}


import fs from 'fs';

const JSON_FILE_PATH = './src/json/articles.json';

export const readArticlesFromFile = async (): Promise<Article[]> => {
    const data = await fs.promises.readFile(JSON_FILE_PATH, 'utf-8');
    return JSON.parse(data);
};

export const writeArticlesToFile = async (articles: Article[]): Promise<void> => {
    await fs.promises.writeFile(JSON_FILE_PATH, JSON.stringify(articles, null, 2));
};