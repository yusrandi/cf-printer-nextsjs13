import prisma from "@/lib/prisma"
import { KerusakanType } from "@/lib/type/type";
import { Kerusakan } from "prisma/prisma-client";

export async function GET(request: Request) {
 try {
  const kerusakans = await prisma.kerusakan.findMany({
    select: { id: true, kerusakanCode: true, kerusakanName: true, perbaikan: true, pengetahuans: {
      select: { id: true, kerusakan: true, kerusakanId: true, evidence: true, evidenceId: true, bobot: true },
    } },
    orderBy: [
      {
        kerusakanCode: 'asc',
      }
    ],    
  })
  return new Response(JSON.stringify({
    responsecode : 1,
    responsemsg : 'success',
    responsedata : kerusakans,

  }))

 } catch (error) {
  console.log(error);
  
 }
}

export async function POST(request: Request) {
  const body: Kerusakan = await request.json();

 try {

  const kerusakanExist = await prisma.kerusakan.findFirst({
    where:{
        kerusakanCode: body.kerusakanCode
    }
  })

  if (kerusakanExist) {
    return new Response(JSON.stringify({
      responsecode : 0,
      responsemsg : 'Kerusakan Code harus unik',
      responsedata : [],
    }))
  }

    const kerusakan = await prisma.kerusakan.create({
        data: {
            kerusakanCode: body.kerusakanCode,
            kerusakanName: body.kerusakanName,
            perbaikan: body.perbaikan
        }
    })
    
    const kerusakans = await prisma.kerusakan.findMany({
    select: { id: true, kerusakanCode: true, kerusakanName: true, perbaikan: true },
      orderBy: [
        {
          kerusakanCode: 'asc',
        }
      ],    
    })

    return new Response(JSON.stringify({
      responsecode : 1,
      responsemsg : 'success',
      responsedata : kerusakans,
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
