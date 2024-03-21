export interface RouteParams {
    id: string;
}
export interface Customer {
    id?: number;
    name: string;
    email: string;
}
export interface Invoice {
    id?: number;
    client_id: number;
    amount: number;
    status: string;
    created_at?: string;
    due_date?: string;
}
