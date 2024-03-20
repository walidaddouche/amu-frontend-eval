// api.ts
import {supabase} from './supBaseConfig';
import {Customer} from "../type";

export const fetchClientDetails = async (id: number) => {
    const {data, error} = await supabase
        .from('clients')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw new Error(error.message);

    return data;
};
export const fetchInvoicesForCustomer = async (customerId: number) => {
    const {data, error} = await supabase
        .from('invoices')
        .select('*')
        .eq('client_id', customerId);

    if (error) {
        throw error;
    }

    return data;
};
/**
 * Crée un nouveau client dans la base de données.
 * @param client Les détails du client à créer.
 * @returns Le client créé ou une erreur si l'opération échoue.
 */
export const createClient = async (customer: Customer) => {
    const {data, error} = await supabase
        .from('clients')
        .insert([
            customer
        ]);

    if (error) {
        throw new Error(error.message);
    }

    return data;
};


export const fetchClients = async () => {
    const {data, error} = await supabase
        .from('clients')
        .select('*');

    if (error) throw error;

    return data;
};

