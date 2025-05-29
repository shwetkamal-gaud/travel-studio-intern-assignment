interface Requests {
    id: number;
    guestPhone: string;
    requestText: string;
    status: string;
    createdAt: string;
}

export const fetchRequests = async (): Promise<Requests[] | undefined> => {
    try {
        const res = await fetch('http://localhost:3000/api/requests');
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching requests:', error);
    }
};
  