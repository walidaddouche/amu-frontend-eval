// api.ts
import { supabase } from './supBaseConfig';
export const fetchClientDetails = async (id : number) => {
    const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw new Error(error.message);

    return data;
};
export const fetchInvoicesForCustomer = async (customerId : number) => {
    const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .eq('client_id', customerId);

    if (error) {
        throw error;
    }

    return data;
};


export const fetchClients = async () => {
    const { data, error } = await supabase
        .from('clients')
        .select('*');

    if (error) throw error;

    return data;
};

