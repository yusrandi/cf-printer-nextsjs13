import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Kerusakan } from "prisma/prisma-client";
export async function GET(request: NextRequest, { params }: { params: { id: string } } ) {
    const id = params.id
    try {
        const kerusakan = await prisma.kerusakan.findFirst({
          select: { id: true, kerusakanCode: true, kerusakanName: true, perbaikan: true },
              where:{id: Number.parseInt(id)}
        })

        if (!kerusakan) {
              return NextResponse.json({
                responsecode : 0,
                responsemsg : 'failed',
                responsedata : 'Data tidak ditemukan',
              });
        }

        return NextResponse.json({
            responsecode : 1,
            responsemsg : 'success',
            responsedata : kerusakan,
        });


    } catch (error) {
        console.log(error);
        
    }
  
  }

  export async function PATCH(request: NextRequest, { params }: { params: { id: string } } ) {
    const body: Kerusakan = await request.json();
    
    const id = params.id
    try {
        const kerusakan = await prisma.kerusakan.findFirst({
          select: { id: true, kerusakanCode: true, kerusakanName: true, perbaikan: true },

            where:{id: Number.parseInt(id)}
        })

        if (!kerusakan) {
              return NextResponse.json({
                responsecode : 0,
                responsemsg : 'Data tidak ditemukan',
                responsedata : [],
              });
        }

        const updatedKerusakan: Kerusakan = await prisma.kerusakan.update({
            data: {
                kerusakanCode: body.kerusakanCode,
                kerusakanName: body.kerusakanName,
                perbaikan: body.perbaikan
            },
            where: {
              id:Number.parseInt(id),
            },
          })

          const kerusakans = await prisma.kerusakan.findMany({
    select: { id: true, kerusakanCode: true, kerusakanName: true, perbaikan: true },
            orderBy: [
              {
                kerusakanCode: 'asc',
              }
            ],    
          })

        return NextResponse.json({
            responsecode : 1,
            responsemsg : 'success',
            responsedata : kerusakans,
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
        const kerusakan = await prisma.kerusakan.findFirst({
            select: { kerusakanCode: true, kerusakanName: true },
            where:{id: Number.parseInt(id)}
        })

        if (!kerusakan) {
              return NextResponse.json({
                responsecode : 0,
                responsemsg : 'Data tidak ditemukan',
                responsedata : [],
              });
        }

       await prisma.kerusakan.delete({
            where: {
              id: Number.parseInt(id),
            },
          })

          const kerusakans = await prisma.kerusakan.findMany({
            select: { id: true, kerusakanCode: true, kerusakanName: true, perbaikan: true },
            orderBy: [
              {
                kerusakanCode: 'asc',
              }
            ],    
          })

        return NextResponse.json({
            responsecode : 1,
            responsemsg : 'success',
            responsedata : kerusakans,
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