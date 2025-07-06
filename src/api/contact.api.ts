const API_BASE_URL = 'http://localhost:3000'

export interface IContact {
	_id: string
	name: string
	phoneNumber: string
	gmail?: string
	note?: string
	discord?: string
	telegram?: string
	github?: string
	createdAt: string
	updatedAt: string
}

export async function getAllContacts(): Promise<IContact[]> {
	const response = await fetch(`${API_BASE_URL}/`)
	if (!response.ok) {
		throw new Error('Failed to fetch contacts')
	}
	return await response.json()
}

export async function getContactById(id: string): Promise<IContact> {
	const response = await fetch(`${API_BASE_URL}/${id}`)
	if (!response.ok) {
		throw new Error('Failed to fetch contact')
	}
	return await response.json()
}

export async function createContact(
	contactData: Omit<IContact, '_id' | 'createdAt' | 'updatedAt'>
): Promise<{ message: string; contact: IContact }> {
	const response = await fetch(`${API_BASE_URL}/`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(contactData)
	})
	if (!response.ok) {
		const errorData = await response.json()
		throw new Error(errorData.error || 'Failed to create contact')
	}
	return await response.json()
}

export async function updateContact(
	id: string,
	contactData: Partial<Omit<IContact, '_id' | 'createdAt' | 'updatedAt'>>
): Promise<{ message: string; contact: IContact }> {
	const response = await fetch(`${API_BASE_URL}/${id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(contactData)
	})
	if (!response.ok) {
		const errorData = await response.json()
		throw new Error(errorData.error || 'Failed to update contact')
	}
	return await response.json()
}

export async function deleteContact(id: string): Promise<{ message: string }> {
	const response = await fetch(`${API_BASE_URL}/${id}`, {
		method: 'DELETE'
	})
	if (!response.ok) {
		const errorData = await response.json()
		throw new Error(errorData.error || 'Failed to delete contact')
	}
	return await response.json()
}

getAllContacts().then(data => console.log(data));