import prisma from "@/lib/prisma"
import CurrentDateTime from "@/utils/currentdatetime";
import { Diagnosa } from "prisma/prisma-client";

export async function GET(request: Request) {
 try {
  const diagnosas = await prisma.diagnosa.findMany({
    select: { id: true, datetime: true, userId: true, kerusakanId: true, nilai: true, user: true, kerusakan: true},
    orderBy: [
      {
        datetime: 'desc',
      }
    ],    
  })
  return new Response(JSON.stringify({
    responsecode : 1,
    responsemsg : 'success',
    responsedata : diagnosas,

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

export async function POST(request: Request) {
  const body: Diagnosa = await request.json();

 try {

    const diagnosa = await prisma.diagnosa.create({
        data: {
            datetime: CurrentDateTime(),
            userId: body.userId,
            kerusakanId: body.kerusakanId,
            nilai: body.nilai,
        }
    })
    
    const diagnosas = await prisma.diagnosa.findMany({
      select: { id: true, datetime: true, userId: true, kerusakanId: true, nilai: true, user: true, kerusakan: true},
      orderBy: [
        {
          datetime: 'desc',
        }
      ],    
    })

    return new Response(JSON.stringify({
      responsecode : 1,
      responsemsg : 'success',
      responsedata : diagnosas,
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
