export interface User {
    id: number;
    name: string;
}


import fs from 'fs';

const JSON_FILE_PATH = './src/json/articles.json';

export const readUsersFromFile = async (): Promise<User[]> => {
    const data = await fs.promises.readFile(JSON_FILE_PATH, 'utf-8');
    return JSON.parse(data);
};

export const writeUsersToFile = async (users: User[]): Promise<void> => {
    await fs.promises.writeFile(JSON_FILE_PATH, JSON.stringify(users, null, 2));
};
