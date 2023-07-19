

export const KerusakanService = {
    async getData() {
        return await fetch('/api/kerusakan', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json());
    },
    
}