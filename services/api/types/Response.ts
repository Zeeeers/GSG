export interface Response {
    field: string;
    type: 'text' | 'choice' | 'file_url';
    answer: string;
}
