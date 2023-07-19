
export const DiagnosaService = {
    async getData() {
        return await fetch('/api/diagnosa', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json());
    },
    
    async deleteData(id: number) {
        return await fetch(`/api/diagnosa/${id}`,
            {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/json'

                },
                method: 'DELETE'
            }

        )
            .then((res) => res.json());
    },
    
}