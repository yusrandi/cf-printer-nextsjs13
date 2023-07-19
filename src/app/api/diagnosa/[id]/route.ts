import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Diagnosa } from "prisma/prisma-client";
export async function GET(request: NextRequest, { params }: { params: { id: string } } ) {
    const id = params.id
    try {
        const diagnosa = await prisma.diagnosa.findFirst({
          select: { id: true, datetime: true, userId: true, kerusakanId: true, nilai: true, user: true, kerusakan: true}, 
          where:{id: Number.parseInt(id)}
        })

        if (!diagnosa) {
              return NextResponse.json({
                responsecode : 0,
                responsemsg : 'Data tidak ditemukan',
                responsedata : [],
              });
        }

        return NextResponse.json({
            responsecode : 1,
            responsemsg : 'success',
            responsedata : diagnosa,
        });


    } catch (error) {
        console.log(error);
        
    }
  
  }

  export async function PATCH(request: NextRequest, { params }: { params: { id: string } } ) {
    const body: Diagnosa = await request.json();
    
    const id = params.id
    try {
        const diagnosa = await prisma.diagnosa.findFirst({
            select: { id: true, datetime: true, userId: true, kerusakanId: true, nilai: true, user: true, kerusakan: true}, 
            where:{id: Number.parseInt(id)}
        })

        if (!diagnosa) {
              return NextResponse.json({
                responsecode : 0,
                responsemsg : 'Data tidak ditemukan',
                responsedata : [],
              });
        }

        const updateddiagnosa: Diagnosa = await prisma.diagnosa.update({
            data: {
              userId: body.userId,
              kerusakanId: body.kerusakanId,
              nilai: body.nilai,
            },
            where: {
              id:Number.parseInt(id),
            },
          })

          const diagnosas = await prisma.diagnosa.findMany({
            select: { id: true, datetime: true, userId: true, kerusakanId: true, nilai: true, user: true, kerusakan: true}, 
            orderBy: [
              {
                datetime: 'desc',
              }
            ],    
          })

        return NextResponse.json({
            responsecode : 1,
            responsemsg : 'success',
            responsedata : diagnosas,
        });


    } catch (error) {
        console.log(error);
        return NextResponse.json({
          responsecode : 0,
          responsemsg : error,
          responsedata : [],
      });
        
    }
  
  }
  
  export async function DELETE(request: Request, { params }: { params: { id: string } } ) {
    const id = params.id
    try {
        const diagnosa = await prisma.diagnosa.findFirst({
          select: { id: true, datetime: true, userId: true, kerusakanId: true, nilai: true, user: true, kerusakan: true}, 
         
          where:{id: Number.parseInt(id)}
        })

        if (!diagnosa) {
              return NextResponse.json({
                responsecode : 0,
                responsemsg : 'Data tidak ditemukan',
                responsedata : [],
              });
        }

        const updateddiagnosa: Diagnosa = await prisma.diagnosa.delete({
            where: {
              id: Number.parseInt(id),
            },
          })

          const diagnosas = await prisma.diagnosa.findMany({
            select: { id: true, datetime: true, userId: true, kerusakanId: true, nilai: true, user: true, kerusakan: true}, 
            orderBy: [
              {
                datetime: 'desc',
              }
            ],    
          })

        return NextResponse.json({
            responsecode : 1,
            responsemsg : 'success',
            responsedata : diagnosas,
        });


    } catch (error) {
        console.log(error);
        return NextResponse.json({
            responsecode : 0,
            responsemsg : error,
            responsedata : [],
        });
        
    }
  
  }