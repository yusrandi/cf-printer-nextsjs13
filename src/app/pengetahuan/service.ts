import { Pengetahuan } from "prisma/prisma-client";

export const PengetahuanService = {
    async getData() {
        return await fetch('/api/pengetahuan', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json());
    },
    async createData(pengetahuan: Pengetahuan) {
        return await fetch('/api/pengetahuan',
            {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/json'

                },
                method: 'POST',
                body: JSON.stringify({
                    kerusakanId: pengetahuan.kerusakanId,
                    evidenceId: pengetahuan.evidenceId,
                    bobot: pengetahuan.bobot,
                    
                }),
            }

        )
            .then((res) => res.json());
    },
    async updateData(pengetahuan: Pengetahuan) {
        return await fetch(`/api/pengetahuan/${pengetahuan.id}`,
            {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/json'

                },
                method: 'PATCH',
                body: JSON.stringify({
                    kerusakanId: pengetahuan.kerusakanId,
                    evidenceId: pengetahuan.evidenceId,
                    bobot: pengetahuan.bobot,
                    
                }),
            }

        )
            .then((res) => res.json());
    },

    async deleteData(pengetahuan: Pengetahuan) {
        return await fetch(`/api/pengetahuan/${pengetahuan.id}`,
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