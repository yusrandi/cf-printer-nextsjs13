import prisma from "@/lib/prisma"
import { Evidence } from "prisma/prisma-client";

export async function GET(request: Request) {
 try {
  const evidences = await prisma.evidence.findMany({
    select: { id: true, evidenceCode: true, evidenceName: true },
    orderBy: [
      {
        evidenceCode: 'asc',
      }
    ],    
  })
  return new Response(JSON.stringify({
    responsecode : 1,
    responsemsg : 'success',
    responsedata : evidences,

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
  const body: Evidence = await request.json();

 try {

  const evidenceExist = await prisma.evidence.findFirst({
    where:{
        evidenceCode: body.evidenceCode
    }
  })

  if (evidenceExist) {
    return new Response(JSON.stringify({
      responsecode : 0,
      responsemsg : 'evidence Code harus unik',
      responsedata : [],
    }))
  }

    const evidence = await prisma.evidence.create({
        data: {
            evidenceCode: body.evidenceCode,
            evidenceName: body.evidenceName
        }
    })
    
    const evidences = await prisma.evidence.findMany({
      select: { id: true,evidenceCode: true, evidenceName: true },
      orderBy: [
        {
          evidenceCode: 'asc',
        }
      ],    
    })

    return new Response(JSON.stringify({
      responsecode : 1,
      responsemsg : 'success',
      responsedata : evidences,
    }))

 } catch (error) {
  console.log(error);

  return new Response(JSON.stringify({
    responsecode : 0,
    responsemsg : error,
    responsedata : [],
  }))
  
 }

 function generateId(idSlice:string) {
  const newId = Number.parseInt(idSlice!) + 10
  let prefix: string = ""
  if (newId < 10) {
    prefix = "0"
  }
  return `K${prefix}${newId}`
 }


}
