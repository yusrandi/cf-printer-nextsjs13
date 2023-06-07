import prisma from "@/lib/prisma"
import { KerusakanType } from "@/lib/type/type";
import { Kerusakan } from "prisma/prisma-client";

export async function GET(request: Request) {
 try {
  const kerusakans = await prisma.kerusakan.findMany({
    select: { id: true, kerusakanCode: true, kerusakanName: true },
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
      responsemsg : 'failed',
      responsedata : 'Kerusakan Code harus unik',
    }))
  }

    const kerusakan = await prisma.kerusakan.create({
        data: {
            kerusakanCode: body.kerusakanCode,
            kerusakanName: body.kerusakanName
        }
    })
    
    const kerusakans = await prisma.kerusakan.findMany({
      select: { id: true,kerusakanCode: true, kerusakanName: true },
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
    responsemsg : 'failed',
    responsedata : error,
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
