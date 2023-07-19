import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Pengetahuan } from "prisma/prisma-client";
export async function GET(request: NextRequest, { params }: { params: { id: string } } ) {
    const id = params.id
    try {
        const pengetahuan = await prisma.pengetahuan.findFirst({
            select: { id: true, kerusakan: true, kerusakanId: true, evidence: true, evidenceId: true, bobot: true },
            where:{id: Number.parseInt(id)}
        })

        if (!pengetahuan) {
              return NextResponse.json({
                responsecode : 0,
                responsemsg : 'failed',
                responsedata : 'Data tidak ditemukan',
              });
        }

        return NextResponse.json({
            responsecode : 1,
            responsemsg : 'success',
            responsedata : pengetahuan,
        });


    } catch (error) {
        console.log(error);
        
    }
  
  }

  export async function PATCH(request: NextRequest, { params }: { params: { id: string } } ) {
    const body: Pengetahuan = await request.json();
    
    const id = params.id
    try {
        const pengetahuan = await prisma.pengetahuan.findFirst({
            select: { id: true, kerusakan: true, kerusakanId: true, evidence: true, evidenceId: true, bobot: true },
            where:{id: Number.parseInt(id)}
        })

        if (!pengetahuan) {
              return NextResponse.json({
                responsecode : 0,
                responsemsg : 'failed',
                responsedata : 'Data tidak ditemukan',
              });
        }

        const updatedpengetahuan: Pengetahuan = await prisma.pengetahuan.update({
            data: {
                kerusakanId: body.kerusakanId,
                evidenceId: body.evidenceId,
                bobot: body.bobot
            },
            where: {
              id:Number.parseInt(id),
            },
          })

          const pengetahuans = await prisma.pengetahuan.findMany({
            select: { id: true, kerusakan: true, kerusakanId: true, evidence: true, evidenceId: true, bobot: true },
            orderBy: [
              {
                kerusakanId: 'asc',
              }
            ],    
          })

        return NextResponse.json({
            responsecode : 1,
            responsemsg : 'success',
            responsedata : pengetahuans,
        });


    } catch (error) {
        console.log(error);
        return NextResponse.json({
          responsecode : 0,
          responsemsg : 'failed',
          responsedata : error,
      });
        
    }
  
  }
  
  export async function DELETE(request: Request, { params }: { params: { id: string } } ) {
    const id = params.id
    try {
        const pengetahuan = await prisma.pengetahuan.findFirst({
            select: { id: true, kerusakan: true, kerusakanId: true, evidence: true, evidenceId: true, bobot: true },
            where:{id: Number.parseInt(id)}
        })

        if (!pengetahuan) {
              return NextResponse.json({
                responsecode : 0,
                responsemsg : 'Data tidak ditemukan',
                responsedata : [],
              });
        }

        const updatedpengetahuan: Pengetahuan = await prisma.pengetahuan.delete({
            where: {
              id: Number.parseInt(id),
            },
          })

          const pengetahuans = await prisma.pengetahuan.findMany({
            select: { id: true, kerusakan: true, kerusakanId: true, evidence: true, evidenceId: true, bobot: true },
            orderBy: [
              {
                kerusakanId: 'asc',
              }
            ],    
          })

        return NextResponse.json({
            responsecode : 1,
            responsemsg : 'success',
            responsedata : pengetahuans,
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