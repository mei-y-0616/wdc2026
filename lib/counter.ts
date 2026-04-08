// // "use server";

// import {prisma} from "@/lib/prisma";
// import type {Prisma} from "@/app/generated/prisma/client";

// //複数件取得
// export async function counterFindMany(whereObj:Prisma.counterWhereInput)
// {
//     return await prisma.counter.findMany({where:whereObj});
// }

// //一件取得
// export async function counterFindUnique(whereObj:Prisma.counterWhereUniqueInput){
//     return await prisma.counter.findUnique({where:whereObj});
// }

// //件数のみ取得
// export async function counterCount(whereObj:Prisma.counterWhereInput){
//     return await prisma.counter.count({where:whereObj});
// }
