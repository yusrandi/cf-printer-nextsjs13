import prisma from "@/lib/prisma"
import { Pengetahuan } from "prisma/prisma-client";

export async function GET(request: Request) {
 try {
  const pengetahuans = await prisma.pengetahuan.findMany({
    select: { id: true, kerusakan: true, kerusakanId: true, evidence: true, evidenceId: true, bobot: true },
    // by: ['kerusakanId'],
    orderBy: [
      {
        kerusakanId: 'asc',
      }
    ],    
  })
  return new Response(JSON.stringify({
    responsecode : 1,
    responsemsg : 'success',
    responsedata : pengetahuans,

  }))

 } catch (error) {
  console.log(error);
  return new Response(JSON.stringify({
    responsecode : 0,
    responsemsg : 'failed',
    responsedata : error,
  }))
  
 }
}

export async function POST(request: Request) {
  const body: Pengetahuan = await request.json();

 try {

  const pengetahuanExist = await prisma.pengetahuan.findFirst({
    where:{
        kerusakanId: body.kerusakanId,
        evidenceId: body.evidenceId,
    }
  })

  if (pengetahuanExist) {
    return new Response(JSON.stringify({
      responsecode : 0,
      responsemsg : 'Kerusakan dengan Evidence sudah tersedia',
      responsedata : [],
    }))
  }

    const pengetahuan = await prisma.pengetahuan.create({
        data: {
            kerusakanId: body.kerusakanId,
            evidenceId: body.evidenceId,
            bobot: body.bobot,

        }
    })
    
    const pengetahuans = await prisma.pengetahuan.findMany({
        select: { id: true, kerusakan: true, kerusakanId: true, evidence: true, evidenceId: true, bobot: true },
        orderBy: [
            {
            kerusakanId: 'asc',
            }
        ],    
    })

    return new Response(JSON.stringify({
      responsecode : 1,
      responsemsg : 'success',
      responsedata : pengetahuans,
    }))

 } catch (error) {
  console.log(error);

  return new Response(JSON.stringify({
    responsecode : 0,
    responsemsg : error,
    responsedata : [],
  }))
  
 }
}
