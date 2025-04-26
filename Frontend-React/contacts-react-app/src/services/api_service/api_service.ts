import { API_ENDPOINTS } from "../../constants/endpoint_constants";
import { ContactType } from "../../types/contact_type";
import axiosInstance from "../axios/axios";

export async function GetAllContacts(): Promise<{ success: boolean; data: ContactType[] }> {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.GET_ALL_CONTACTS);
        if (response.status >= 200 && response.status < 300) {
            return { success: true, data: response.data as ContactType[] };
        } else {
            return { success: false, data: [] };
        }
    } catch (error) {
        console.error('Failed to fetch users:', error);
        return { success: false, data: [] };
    }
}

export async function DeleteContact(contactId: number): Promise<{ success: boolean }> {
    try {
        const response = await axiosInstance.delete(`${API_ENDPOINTS.DELETE_CONTACT}${contactId}`);
        if (response.status >= 200 && response.status < 300) {
            return { success: true };
        } else {
            return { success: false };
        }
    } catch (error) {
        console.error('Failed to delete contact:', error);
        return { success: false };
    }
}

export async function AddContact(contact: Omit<ContactType, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean }> {
    try {
        const response = await axiosInstance.post(API_ENDPOINTS.ADD_CONTACT, contact);
        if (response.status >= 200 && response.status < 300) {
            return { success: true };
        } else {
            return { success: false };
        }
    } catch (error) {
        console.error('Failed to add contact:', error);
        return { success: false };
    }
}

export async function UpdateContact(contact: Omit<ContactType, 'updatedAt'>): Promise<{ success: boolean }> {
    try {
        const response = await axiosInstance.put(`${API_ENDPOINTS.UPDATE_CONTACT}${contact.id}`, contact);
        if (response.status >= 200 && response.status < 300) {
            return { success: true };
        } else {
            return { success: false };
        }
    } catch (error) {
        console.error('Failed to update contact:', error);
        return { success: false };
    }
}