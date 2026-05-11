import prisma from "@/lib/prisma"



async function updateCounter(){
    const updateCounter=await prisma.counter.update({where:{}});
}